import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { uid } from 'uid';
import { ToastContext, useToast } from "../Context/ToastContext";

export const Home = ({socketWS}:{socketWS:WebSocket}) => {

    const navigate = useNavigate()

    const {toast, setRoomId:setRoom, setName} = useToast()

    
    const [roomId, setRoomId] = useState<string>('')

    const inputRef = useRef<HTMLInputElement>(null)
    const nameRef = useRef<HTMLInputElement>(null)

    const generateRoomId = () => {
        const randomId = uid(6)
        setRoomId(randomId);
    }   
    
    
    const handleClick = () => {
        navigator.clipboard.writeText(roomId)
        toast('Room ID is copied to clipboard')
    }
    
    const onClickJoin = () => {
        
        if(!nameRef.current || !inputRef.current) return;

        const roomId = inputRef.current.value;
        const name = nameRef.current.value;
        setRoom(roomId)
        setName(name)
        if(roomId){
            const textFormatData = JSON.stringify({
                type:'join',
                payload: {
                    name: nameRef.current.value,
                    roomId
                }
            })
            
            
            socketWS?.readyState === 1 &&  socketWS?.send(textFormatData)
            
        }
    }
    
    useEffect(() => {
      
        if (!socketWS) return;
      
        const handleMessage = (ev: MessageEvent) => {
          console.log(ev.data);
          navigate('/chat');
        };
      
        socketWS.addEventListener("message", handleMessage);
      
        return () => (
          socketWS.removeEventListener("message", handleMessage)
        );
      }, [socketWS]);
      
    return<>
    <div className="bg-black w-full h-screen text-white overflow-hidden relative flex flex-col justify-around">
    <h1 className="text-center text-5xl font-semibold animate-wiggle">Join a Room. <br />Start the Conversation.</h1>

     <div>
    <div className="mx-auto max-w-[800px] border-gray-200 border-1 rounded-lg text-center mb-4">

        
        {roomId && 
        <p title="Copy RoomId" onClick={handleClick}className="text-3xl cursor-pointer hover:bg-gray-200/40 p-4 transition duration-200 ease-in-out">{roomId}</p>
    }
        {!roomId && 
        <button onClick={generateRoomId} className="  p-4 text-3xl cursor-pointer hover:text-gray-300 hover:-translate-1 transition-all duration-150">Create a room</button>
    }
    </div>

    <div className="mx-auto max-w-[800px] border-gray-200 border-1 rounded-lg text-center p-4 flex items-center">
        <input ref={inputRef} type="text" placeholder="Enter the Romm ID" className="p-2 text-center border-1 border-gray-200 rounded-lg w-full items-center" />
        <input ref={nameRef} type="text" placeholder="Enter your name" className="p-2 text-center border-1 border-gray-200 rounded-lg w-full items-center" />
        <button className="border-1 border-gray-200 p-2 w-[100px] rounded-lg hover:bg-gray-200/40 transition duration-200 ease-in-out cursor-pointer ml-2" onClick={onClickJoin}>Join</button>
    </div>
    </div>
    </div>
    </>
}