import {  Request } from "express"
import { z } from 'zod'
import { fromZodError } from "zod-validation-error"
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken'
import { ErrorHandeler } from "../utils/errorHandeler"
import bcrypt from "bcrypt"
import { asyncErrorHandler } from "../utils/asyncErrorCatcher"
import { User } from "../models/userModel"
import { checkValidSchema } from "../utils/checkValidSchema"
import { ContentModel } from "../models/contentModel"
import { LinkModel } from "../models/linkSchema";
import { getType, searchDocuments, sendDocToLLm, storeDocument } from "../llms/vectorDb";

const UserSchema  = z.object({
    name:z.string().min(3, {message:"Name must be of 3 characters"}).max(10,{message:"Name must be under 10 characters"}),
    username:z.string().min(3, {message:"Username must be of 3 characters"}).max(20,{message:"Username must be under 10 characters"}),
    password:z.string().min(3).includes('@', {message:"Password must include @ in it"})
})
const SignInSchema = UserSchema.pick({username:true, password:true})

const ContentSchema = z.object({
    link: z.string().url().optional(),
    type: z.string(),
    title: z.string(),
    tags: z.array(z.string()),
})


type ReqBodyRegisteration = z.infer<typeof UserSchema>
type ReqSignInBody = z.infer<typeof SignInSchema>
type ReqContent = z.infer<typeof ContentSchema>


export const userSignup = asyncErrorHandler(
    async(req:Request<{},{},ReqBodyRegisteration>, res, next) => {
    
        const isValidPayload = UserSchema.safeParse(req.body)

        if(!isValidPayload.success) 
            throw new ErrorHandeler(fromZodError(isValidPayload.error).message, 400)

        
        const hashedPassword = bcrypt.hashSync(req.body.password, 10)
        req.body.password = hashedPassword;
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
        
        console.log(req.body)
        const {username, password } = req.body;
        
        const user = await User.findOne({username}).select("+password").exec();

        if(!user){
            throw new ErrorHandeler('User not found',404)
        }
        const isValidPassword = bcrypt.compare(password, user?.password!)
        
        if(!isValidPassword)
            throw new ErrorHandeler('Authentication Failed', 401)
        const JWT_SECRET= process.env.JWT_SECRET as string;
        const token = jwt.sign({id:(user?._id)?.toString()!}, JWT_SECRET)
        
        res.status(200).json({
            token,
            username:user.name
        })
    }
)

export const createContent = asyncErrorHandler(
    async(req:Request<{}, {}, ReqContent>, res, next) => {

        checkValidSchema<ReqContent>(req.body, ContentSchema)

        const id = req.userId
        const content =  await ContentModel.create({...req.body,userId:id})

        await storeDocument(content._id.toString(), content.title as string)

        res.status(200).json({
            message:"Your content has been saved"
        })

    }
)

export const getContent = asyncErrorHandler(
    async(req:Request<{id:string}>, res, next) => {
       checkValidSchema(req.params.id, z.string())

       
       const userId:string = req.userId as string;
       const {id : displayUser} = req.params;

       if(userId !== displayUser){
        const userAccount = await ContentModel.find({userId:displayUser}).populate<{userId:{accountType:boolean}}>("userId", "accountType")

        if(userAccount[0]?.userId.accountType){
            res.status(200).json({
                content:userAccount
            })
        }else{
            res.status(404).json({
                message:"Not Found"
            })
        }
       }

       if(userId === displayUser){
        const userContent = await ContentModel.find({userId})

        res.status(200).json({
            content:userContent
        })
       }
    }
)

export const createShareableLink =asyncErrorHandler( 
    async(req:Request<{},{},{contentId:string}>, res, next) => {
    checkValidSchema<{contentId:string}>(req.body, z.object({contentId: z.string()}))

    const {contentId} = req.body;

    const hash = uuidv4().toString();

    const linkCreated = await LinkModel.create({
        hash,
        contentId
    })    
    res.status(200).json({
        link:linkCreated._id.toString()
    })
})

export const getShareLinkContent = asyncErrorHandler(
    async(req:Request<{link: string}>, res, next) => {
        checkValidSchema(req.params.link, z.string())

        const {link} = req.params;

        const isValidLink = await LinkModel.findById(link).populate<{contentId:ReqContent}>({
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
    async(req:Request<{},{},{link:string}>, res, next) => {
        const linkType = await getType(req.body.link)

        res.status(200).json({
            message:linkType
        })
    }
)