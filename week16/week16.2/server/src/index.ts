import { WebSocket, WebSocketServer } from "ws";

const ws = new WebSocketServer({port:8080})

type IncomingMessage = | 
    {
      type : 'chat',
      payload:{
        name:string,
        roomId:string,
        text: string
      }
    }  |
    {
        type:'join',
        payload:{
            roomId:string,
            name:string
        }
    
    }


const roomMap = new Map<string, WebSocket[]>()

ws.on('connection', (socket) => {

    socket.on('message', (data) => {

        const message:IncomingMessage = JSON.parse(data.toString());

        if(message.type === "join"){
            
            if(!roomMap.get(message.payload.roomId))
            {
                roomMap.set(message.payload.roomId, [])
            }

            const socketsArray = roomMap.get(message.payload.roomId)
            socketsArray?.push(socket);

            (socket as any).roomId = message.payload.roomId

            socketsArray?.forEach(i => i.send(`${message.payload.name} has joined the room`))
            socket.on('close', () => {
                const socketsArray = roomMap.get(message.payload.roomId);
    
                socketsArray?.forEach(i => {
                    i.send(`${message.payload.name} is disconnected`)
                })
            })
        }

        if(message.type === 'chat'){
            const {roomId, name, text} = message.payload;

            const actualRoom = (socket as any).roomId;

            if(actualRoom !== roomId){
                socket.send('No spoofing allowed')
                socket.close()
            }else{
                const socketsArray = roomMap.get(roomId);
                const payload = JSON.stringify({
                    text,
                    name
                })
                socketsArray?.forEach(i => {
                    i.send(payload)
                })
            }

            socket.on('close', () => {
                const socketsArray = roomMap.get(roomId);
    
                socketsArray?.forEach(i => {
                    i.send(`${name} is disconnected`)
                })
            })
        }

     
    })
})