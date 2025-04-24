import { useEffect, useRef, useState } from "react"
import { useToast } from "../Context/ToastContext"

export const ChatRoom = ({socketWS}:{socketWS:WebSocket}) => {

    type recivePayload ={
        name:string,
        text:string
    }
    const [chats, setChats] = useState<recivePayload[]>([])

    const {roomId, name} = useToast()

    const scrollbarStyle = `[&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-500
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500`


    const inputRef = useRef<HTMLInputElement>(null)

    const sendMessage = () => {
        if(!inputRef.current) return;

        if(socketWS && inputRef.current.value){
            if(socketWS.readyState === 1){
                const message = JSON.stringify({
                    type:'chat',
                    payload:{
                        name,
                        text:inputRef.current.value,
                        roomId
                    }
                })
                socketWS.send(message)
            }

            inputRef.current.value = ""
        }
    }

    useEffect(() => {   
        const handleMessage = (e: MessageEvent) => {
            console.log(e.data)
            try{
                const data = JSON.parse(e.data);
                setChats(prev => ([...prev, data]))
            }catch(e:any){
                console.log(e.message)
            }
        }
        
        socketWS.addEventListener('message', handleMessage)

        return () => (
            socketWS.addEventListener('message', handleMessage)
        )
    }, [socketWS])

    return<div className="max-w-[800px] bg-black h-screen text-white overflow-hidden relative flex flex-col justify-around mx-auto">
    <h1 className="text-center text-5xl font-semibold">You are inside a room {roomId}</h1>

    <div className=" border-gray-200 border-1 rounded-lg  mb-4">

        <div className={`h-[500px] overflow-y-auto ${scrollbarStyle} p-4`}>
            {chats.map((i, index) => {
                return (
                    <div className="bg-gray-800/70 mb-4 rounded-xl w-fit max-w-[400px] p-2" key={index}>
                        <div className="font-semibold mb-2">{i.name}</div>
                        <div>{i.text}</div>
                    </div>
                )
            })}
        </div>
        <div className="mx-auto max-w-[800px] border-gray-200 border-1 rounded-lg text-center p-4 flex items-center">
            <input ref={inputRef} type="text" placeholder="Type message" className="p-2 text-center border-1 border-gray-200 rounded-lg w-full items-center" />
            <button onClick={sendMessage} className="border-1 border-gray-200 p-2 w-[100px] rounded-lg hover:bg-gray-200/40 transition duration-200 ease-in-out cursor-pointer ml-2">Send</button>
        </div>
    </div>
    </div>
}