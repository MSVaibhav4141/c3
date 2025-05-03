import { WebSocketServer } from "ws";
import {prismaClient} from "@repo/db/prisma"

const wss = new WebSocketServer({port : 8080})

wss.on("connection", (ws) => {

    ws.on('message', async(data) => {

        await prismaClient.todos.create({
            data:{
                title:data.toString()
            }
        })
        
        ws.send(data.toString())

    })

    ws.on('error' , (err) => {
        console.log(err)
        ws.close()
    })

}) 