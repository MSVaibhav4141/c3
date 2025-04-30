import { CreateRoomSchema, CreateUserSchema, LoginUserSchema } from "@repo/common/types"
import { NextFunction, Request, Response } from "express"
import { JWT_SECRET } from "@repo/backend-common/config"
import { z } from "zod"
import jwt from 'jsonwebtoken'
import {prismaClient } from '@repo/db/client'
import bcrypt from 'bcrypt'

type IReqSignUp = z.infer<typeof CreateUserSchema>
type IReqSignIn = z.infer<typeof LoginUserSchema>
type IReqRoom = z.infer<typeof CreateRoomSchema>

export const userSignup = async (req: Request<{},{},IReqSignUp>,res : Response ,next : NextFunction) => {
    const {email, username, password} = req.body   

    const isSafe = CreateUserSchema.safeParse(req.body)

    if(!isSafe.success){
       console.log(isSafe.error.message)
       return
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    req.body = {...req.body, password: hashedPassword}

    await prismaClient.user.create({
        data:req.body
    })
    res.status(200).json({
        username,
        email
    })
}

export const userSigin = async(req: Request<{},{},IReqSignIn>,res : Response ,next : NextFunction) => {
    const {email, password} = req.body   

    const isSafe = LoginUserSchema.safeParse(req.body)

    if(!isSafe.success){
        throw Error('Htt Bey')
    }

    //Check DB For user
    const user = await prismaClient.user.findFirst(
        {
            where:{email}
        }
    )

    if(!user){
        throw new Error("Cant find a user")
    }
    
    const isCorrect = await bcrypt.compare(password, user?.password)
    
    if(!isCorrect){
        throw new Error("Cant find a user")
    }


    const token = jwt.sign({userId:user.id}, JWT_SECRET) 

    res.status(200).json({
        token
    })
}

export const createRomm = async(req : Request<{},{},IReqRoom>, res : Response, next : NextFunction) => {

    const {roomId} = req.body

    const parseData = CreateRoomSchema.safeParse(req.body)

    if(!parseData.success){
        console.log(parseData.error.message)
        return
    }

    await prismaClient.room.create({
        data:{
            slug:roomId,
            adminId: parseInt(req.userId)
        }
    })

    res.status(200).json({
        message:'Room created successfully'
    })

}