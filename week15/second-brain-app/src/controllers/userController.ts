import {  Request } from "express"
import { makeIssue, z } from 'zod'
import { fromZodError } from "zod-validation-error"
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken'
import { ErrorHandeler } from "../utils/errorHandeler"
import bcrypt from "bcrypt"
import { asyncErrorHandler } from "../utils/asyncErrorCatcher"
import { IUser, User } from "../models/userModel"
import { checkValidSchema } from "../utils/checkValidSchema"
import { ContentModel } from "../models/contentModel"
import { LinkModel } from "../models/linkSchema";
import { getType, searchDocuments, sendDocToLLm, storeDocument } from "../llms/vectorDb";
import { Tags } from "../models/tagsModel";
import axios from "axios";
import { AllowedUser } from "../models/allowedUsers";
import mongoose from "mongoose";
import crypto from 'crypto'
import { Token } from "../models/tokeModel";
import { sendMail } from "../utils/sendMail";
import { htmlForMail } from "../utils/htmlForMail";

const UserSchema  = z.object({ 
    name:z.string().min(3, {message:"Name must be of 3 characters"}).max(10,{message:"Name must be under 10 characters"}),
    username:z.string().min(3, {message:"Username must be of 3 characters"}).max(60,{message:"Username must be under 10 characters"}),
    password:z.string().min(3).includes('@', {message:"Password must include @ in it"})
})
const SignInSchema = UserSchema.pick({username:true, password:true})

const ContentSchema = z.object({
    link: z.string().url().optional(),
    type: z.string(),
    title: z.string(),
    tags: z.array(z.string()),
    body: z.string().optional(),
    html:z.string().optional()
})


type ReqBodyRegisteration = z.infer<typeof UserSchema>
type ReqSignInBody = z.infer<typeof SignInSchema>
type ReqContent = z.infer<typeof ContentSchema>
type ResetPassword = {
    token:string,
    userId:string,
    password:string,
    confirmPassword:string
}

export const userSignup = asyncErrorHandler(
    async(req:Request<{},{},ReqBodyRegisteration>, res, next) => {
    
        const isValidPayload = UserSchema.safeParse(req.body)

        if(!isValidPayload.success) 
            throw new ErrorHandeler(fromZodError(isValidPayload.error).message, 400)

        
        // const hashedPassword = bcrypt.hashSync(req.body.password, 10)
        // req.body.password = hashedPassword;
        req.body.name = req.body.name.toLowerCase()
        req.body.username = req.body.username.toLowerCase()
        const result  = await User.create(req.body)

        const JWT_SECRET= process.env.JWT_SECRET as string;
        const token = jwt.sign({id:result._id},JWT_SECRET)

        res.status(200).json({
            username:result.name,
            token
        })
    }
    
)

export const userSignIn = asyncErrorHandler(
    async(req:Request<{},{},ReqSignInBody>, res, next) => {
        checkValidSchema<ReqSignInBody>(req.body ,SignInSchema)
        
        req.body.username = req.body.username.toLowerCase();
        const {username, password } = req.body;
        
        const user = await User.findOne({username}).select("+password").exec();

        if(!user){
            throw new ErrorHandeler('User not found',404)
        }
        const isValidPassword = await bcrypt.compare(password, user?.password!)
        if(!isValidPassword)
        {
            throw new ErrorHandeler('Authentication Failed', 401)
        } 
        const JWT_SECRET= process.env.JWT_SECRET as string;
        const token = jwt.sign({id:(user?._id)?.toString()!}, JWT_SECRET)
        
        res.status(200).json({
            token,
            username:user.name
        })
    }
)

export const checkForToken = asyncErrorHandler(
    async(req:Request<{token:string, userId:string}>, res) => {
        const {token, userId} = req.params;

        const isToken = await Token.findOne({userId})

        if(!isToken){
            throw new ErrorHandeler('expired',400)
        }
        
        const isHashed = await bcrypt.compare(token, isToken?.token!) 
        
        if(!isHashed){
            throw new ErrorHandeler('expired',400)
        }

        res.status(200).json({
            success:true
        })
    }


)

export const resetUserPassword = asyncErrorHandler(
    async(req:Request<{},{},ResetPassword> ,res ,next ) => {
        const {token, userId, password, confirmPassword} = req.body;

        const isToken = await Token.findOne({userId}).populate<{ userId: IUser }>('userId');

        if(!isToken){
           throw new ErrorHandeler('Token is either invalid or expired',400)
        }
        
        const isValidToken = await bcrypt.compare(token,isToken.token!)

        if(!isValidToken){
            throw new ErrorHandeler('Token is either invalid or expired',400)
        }
        
        if(confirmPassword !== password){
            throw new ErrorHandeler('Password and confirm password must be same',400)
        }

            
        isToken.userId.password = password;
        await isToken.userId.save();
        await Token.deleteMany({userId})
        const JWT_SECRET= process.env.JWT_SECRET as string;
        const tokenGenerated = jwt.sign({id:userId.toString()}, JWT_SECRET)

        res.status(200).json({
            message:'yaay',
            token:tokenGenerated
        }) 
    }
)


export const sendResetTokenOnMail = asyncErrorHandler(
    async(req:Request<{},{},{email:string}> ,res ,next ) => {
        const {email} = req.body;
        
        const user = await User.findOne({username:email})

        if(!user){
            res.status(200).json({
                message:'If mail is correct'
            })
        }

        const hash = crypto.randomBytes(32).toString('hex');
        const token = await bcrypt.hash(hash, 10);

        await Token.deleteMany({userId:user?._id})

         await Token.create({
            token,
            userId:user?._id
        })

        const frontUrl = `${process.env.FRONT_URL}/change/password?token=${hash}&id=${user?._id}`;
        const html = htmlForMail(frontUrl)
        await sendMail({reciver:user?.username!,html} )
        res.status(200).json({
            userId:user?._id,
            token:hash
        })
    }
)


export const getUserDetails = asyncErrorHandler(
    async(req, res, next) => {
        const data = await User.findById(req.userId)
        res.status(200).json({
            user:data
        })
    }
)

export const getUserName = asyncErrorHandler(
    async(req:Request<{name:string}>, res, next) => {
        const data = await User.findOne({name:req.params.name.toLowerCase()}).select('name accountType -_id').exec()

        if(!data){
            throw new ErrorHandeler("Account doesn't exists",404);
        }

        res.status(200).json({
            user:data
        })
    }
)

export const createContent = asyncErrorHandler(
    async(req:Request<{}, {}, ReqContent>, res, next) => {

        checkValidSchema<ReqContent>(req.body, ContentSchema)

        const id = req.userId
        if(req.body.type === 'YouTube')
        {
            const YT_Id = (req.body.link)?.split('v=')[1] 
            const YT_Mob_Id_Array =  (req.body.link)?.split('si=')[0].split('/')
            const YT_Id_Mob =  YT_Mob_Id_Array && YT_Mob_Id_Array[YT_Mob_Id_Array?.length - 1] 

            if(YT_Id){
                req.body = {...req.body, link:YT_Id}
            }else{
                req.body = {...req.body, link:YT_Id_Mob}
            }
        }

        if(req.body.type === 'X (formerly Twitter)'){
            const X_Id = (req.body.link)?.split('status/')[1].split('?')[0]

            req.body = {...req.body, link:X_Id}

        }
        const content =  await ContentModel.create({...req.body,userId:id})

        await storeDocument(content._id.toString(), content.title as string)

        res.status(200).json({
            message:"Your content has been saved"
        })

    }
)

export const getContent = asyncErrorHandler(
    async(req:Request<{name:string}>, res, next) => {

       checkValidSchema(req.params.name, z.string())
       
       const {name : displayUser} = req.params;
       const userId:string = req.userId as string;

       const user = await User.aggregate([
        {$match:{name: displayUser}},
       ])


        if(userId === user[0]._id.toString()){
            const userContent = await ContentModel.find({userId})
    
            res.status(200).json({
                content:userContent
            })
           }
        else if(user.length > 0 && user[0].accountType){
            const posts = await ContentModel.aggregate([
                {$match:{userId:user[0]._id}}
            ])

            res.status(200).json({  
                posts
            })
           }
        else if(!user[0].accountType){
          const posts = await AllowedUser.aggregate([
            {$match:{owner:user[0]._id, allowedTo:new mongoose.Types.ObjectId(userId)}},
            {$lookup:{
                from:'contents',
                localField:'owner',
                foreignField:'userId',
                as:'userPosts'
            }},
            {$unwind:'$userPosts'},
            {$replaceRoot:{newRoot:'$userPosts'}}

           ])

              if(posts.length > 0){
            res.status(200).json({
                posts
                })
             }else{
            throw new ErrorHandeler('No user found',404)
               }
       }   
       else{

        throw new ErrorHandeler('No user found',404)

       }
    }
)

export const deleteContent = asyncErrorHandler(
    async(req:Request<{postId:string}> ,res ,next) => {

        const {postId} = req.params;

        const isDeleted = await ContentModel.deleteOne({userId:req.userId, _id:postId})
        
        if(!isDeleted){
            throw new ErrorHandeler("You are unauthorized to perform this action",401)
        }
        await LinkModel.deleteOne({userId:req.userId, contentId:postId})

        res.status(200).json({
            message:"Post has been successfully deleted"
        })

    }
)

export const getUserContentPublic = asyncErrorHandler(
    async(req:Request<{name:string}>, res, next) => {
       checkValidSchema(req.params.name, z.string())
       

       const {name : displayUser} = req.params;


       const userPost =  await User.aggregate([
        {$match:{name : displayUser, accountType:true}},
        {$project:{
            'name':0,
            'username':0,
            'password':0,
            "_id":1
        }},
        {$lookup:{
            from:'contents',
            localField:'_id',
            foreignField:'userId',
            as:'public_post'
        }},
        {$unwind:'$public_post'},
        {$replaceRoot:{
            newRoot:'$public_post'
        }}
       ])

       if(userPost.length > 0){
        res.status(200).json({
            posts:userPost
        })
       }else{
        res.status(404).json({
            posts:'Not Found'
        })
       }
    }
)


export const getExsitingAllowedUsers = asyncErrorHandler(
    async(req:Request<{name:string}>, res, next) => {
        const {name} = req.params;

        const users = await User.aggregate([
            {$match:{name:{$regex:`^${name}`, $options:'i'},
                     _id:{$ne: new mongoose.Types.ObjectId(req.userId)}}},
            {$lookup:{
                from:'allowedusers',
                localField:'_id',
                foreignField:'allowedTo',
                as:'allowedUser'
            }},
            
            {$match:{'allowedUser.owner':{$ne: (new mongoose.Types.ObjectId(req.userId)) }}},
            {$project:{
                'name':1,
            }}
        ])

        res.status(200).json({
            users
        })

    }
)

export const allowAccessToUser = asyncErrorHandler(
    async(req:Request<{},{},{name:string}>, res, next) => {
        const {name} = req.body;

        const isExists = await User.findOne({name})

        if(isExists && isExists._id.toString() === req.userId){
            throw new ErrorHandeler("You can't add yourself to the list", 400)
        }
        else if(isExists){
            const doExists = await AllowedUser.findOne({owner:req.userId, allowedTo:isExists._id})

            if(doExists){
                throw new ErrorHandeler("User Already exists", 400)
            }
            await AllowedUser.create({
                owner: req.userId,
                allowedTo:isExists._id
            })

            res.status(200).json({
                message:'User added successfully'
            })
        }else{
            throw new ErrorHandeler('No User Found',404)
        }
    }
)

export const removeAccesFromUser = asyncErrorHandler(
    async(req:Request<{userId:string},{},{}>, res, next) => {
        
        const {userId} = req.params

        await AllowedUser.deleteMany({owner:req.userId, allowedTo:userId})

        res.status(200).json({
            message:"User removed successfully"
        })
    }
)


export const getAllowedUser = asyncErrorHandler(
    async(req, res, next) => {
        const users = await AllowedUser.find({owner:req.userId}).select('allowedTo').populate('allowedTo',"name")

        res.status(200).json({
            users
        })
    }
)

export const changeVisibilty = asyncErrorHandler(
    async(req:Request<{},{},{type:boolean}>, res, next) => {
        await User.findOneAndUpdate({_id:req.userId},{accountType:req.body.type})

        res.status(200).json({
            message:"Account visibilty has changed"
        })
    }
)

export const createShareableLink =asyncErrorHandler( 
    async(req:Request<{contentId:string},{},{}>, res, next) => {
    checkValidSchema<string>(req.params.contentId,  z.string())

    const {contentId} = req.params;
    const userId = req.userId
    const hash = uuidv4().toString();

    const isExists = await LinkModel.find({contentId})

    if(isExists.length > 0){
        res.status(200).json({
            link:isExists[0].hash.toString()
        })
        return;
    }

    const linkCreated = await LinkModel.create({
        hash,
        contentId,
        userId
    })    

    await ContentModel.findOneAndUpdate({_id:contentId, userId:req.userId}, {isShared:true})
    res.status(200).json({
        link:linkCreated.hash.toString()
    })
})

export const deleteShareableLink = asyncErrorHandler(
    async(req:Request<{postId:string}> ,res, next) => {
        const {postId} = req.params

        await LinkModel.deleteOne({contentId:postId, userId:req.userId});
        await ContentModel.findOneAndUpdate({_id:postId, userId:req.userId}, {isShared:false})

        res.status(200).json({
            message:"Sharable link is now deleted"
        })
    }
)
export const createTag = asyncErrorHandler(
    async(req:Request<{},{},{tag:string}>, res, next) => {
        checkValidSchema(req.body.tag,z.string())

        await Tags.create(req.body)
       
        res.status(200).json({
        message:'Tags are created'
     })
        
    }
)

export const getAllSharedPost = asyncErrorHandler(
    async (req, res, next) => {
        console.log(req.userId)
        const posts = await LinkModel.find({userId:req.userId}).populate('contentId')
        console.log(posts)
        const postsOnly = posts.map(i => i.contentId)
        res.status(200).json({
            posts:postsOnly
        })
    }
)

export const getShareLinkContent = asyncErrorHandler(
    async(req:Request<{hash: string}>, res, next) => {
        checkValidSchema(req.params.hash, z.string())

        const {hash} = req.params;

        const isValidLink = await LinkModel.findOne({hash}).populate<{contentId:ReqContent}>({
            path: 'contentId',
            populate: {
              path: 'userId',
              select: 'name' // choose what to fetch from user
            }
          });

        if(isValidLink){
            res.status(200).json({
                content: isValidLink.contentId
            })
        }else{
            res.status(404).json({
                message:'Not found'
            })
        }
    }
)

export const searchDoc = asyncErrorHandler(
    async(req:Request<{},{},{text:string}>, res ,next) => {
        const {text} = req.body;

        if(text.length === 0) return ;

        const result = await searchDocuments(text)

        const matchingContent =await sendDocToLLm(text, result)
        const cleaned = matchingContent
        .replace(/^```json\s*/i, '')  
        .replace(/```$/, '');            

        console.log(matchingContent)
        res.status(200).json({
            message:JSON.parse(cleaned)
        })
    }
)

export const getTypeLink = asyncErrorHandler(
    async(req:Request<{},{},{link:string,title:string}>, res, next) => {
        const linkType = await getType(req.body)

        res.status(200).json({
            message:linkType
        })
    }
)


export const bookMark = asyncErrorHandler(
    async(req:Request<{},{},{id:string}>,res ,next) => {
        const postId = req.body.id;

        const post = await ContentModel.findOne({userId:req.userId, _id:postId});

        if(post && post?.isBookMark){
            post.isBookMark = false
        }else if(post && !post?.isBookMark){
            post.isBookMark = true
        }
        
        await post?.save();

        res.status(200).json({
            message:`Bookmark ${post?.isBookMark ? 'added' : 'removed'}`
        })
    })