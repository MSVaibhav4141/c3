import { JWT_SECRET } from "@repo/backend-common/config";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'

export const auth = (req: Request, res: Response ,next: NextFunction) => {
    try{

        const token = req.headers['authorization'] ?? ""

        const user = jwt.verify(token, JWT_SECRET) as JwtPayload

        if(!user.userId){
            throw new Error("Not allowed")
        }

        req.userId = user.userId;
        next();
    }catch(e){
        console.log(e)
    }   
} 