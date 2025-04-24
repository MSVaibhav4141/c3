import { WebSocketServer } from "ws"; 

const wss = new WebSocketServer({port:8080})

let connectedUser = 0;

// wss.on('connection', (socket) => {
//     connectedUser += 1;

//     socket.on('close', () => {
//         connectedUser -= 1;
//         console.log(connectedUser)
//     })
//     console.log(connectedUser)
// })

wss.on('connection', (socket) => {
    
    socket.on('message', (message) => {
        if(message.toString() === 'ping'){
            socket.send('PONG')
        }
    })

    socket.on('close', () => {
        connectedUser -= 1;
        console.log(connectedUser)
    })
    console.log(connectedUser)
})