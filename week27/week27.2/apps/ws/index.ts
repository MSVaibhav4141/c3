import {prismaClient} from 'db/client'

Bun.serve({
  port:8081,
  fetch(req, server) {
    // upgrade the request to a WebSocket
    if (server.upgrade(req)) { //commit 
      return; // do not return a Response
    }
    return new Response("Upgrade failed", { status: 500 });
  },
  websocket: {
    message(ws,message){
        
         prismaClient.todo.create({
            data:{
                title:message.toString(),
                userId:"abd5e8d3-5302-4051-9714-ceda43abb672"

            }
         }).then(res => {
             ws.send('Message added to todo')
         })

    }
  }, // handlers
});