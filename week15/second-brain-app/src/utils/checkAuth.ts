import { RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/userModel";

export const checkAuth: RequestHandler = async(req , res, next) => {
    const token = req.headers['authorization']
    const JWT_SECRET = process.env.JWT_SECRET;
    const isValid = jwt.verify(token!, JWT_SECRET!)

    // const user = await User.find

    if(isValid){
        const {id} = jwt.decode(token!) as JwtPayload
        const user = await User.findById(id)

         res.status(200).json({
            isAuth:true,
            username:user?.name
        })
    }else{
        res.status(401).json({
            isAuth:false
        })
    }   
}