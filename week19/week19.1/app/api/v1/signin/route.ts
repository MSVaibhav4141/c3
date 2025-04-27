import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";

export async function POST(req:NextRequest){

    const {username , password} = await req.json()

    const client = new PrismaClient()

    await client.user.create({
        data:{
            username,
            password
        }
    })

    return NextResponse.json({
        message:"user has been saved succesfully"
    })
}