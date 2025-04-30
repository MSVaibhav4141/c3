import { WebSocketServer } from "ws";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { JWT_SECRET } from '@repo/backend-common/config'

const wss = new WebSocketServer({port: 8080})

wss.on('connection', (sokcet, request) => {
    const url = request.url

    const params = new URLSearchParams(url?.split('?')[1])
    const token = params.get('token') ?? ""

    const user  = jwt.verify(token, JWT_SECRET) as JwtPayload;

    if(!user.id){
        sokcet.close()
        return
    }

    sokcet.on('message', (data) => {
        sokcet.send('PONG')
    })

    sokcet.on('error', (err) => {
        console.log(err.message)
    })


})