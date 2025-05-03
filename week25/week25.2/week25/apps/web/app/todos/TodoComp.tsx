'use client'

import { WS_URL } from "@repo/backend-common/config"
import {useEffect, useRef, useState } from "react"
import { ITodo } from "./page"

export const TodoComp = ({data}: {data : any}) => {
    
    const [socket , setSocket ] = useState<WebSocket>()
    const [todo, setTodo] = useState<ITodo[]>([])
    useEffect(() => {
        const ws = new WebSocket(WS_URL)

        ws.onopen = () => {
            console.log('COnnection established')
            setSocket(ws)
        }


        return () => {
            ws.readyState === 1 && ws.close()
        }
    }, [])
    const inputRef = useRef<HTMLInputElement>(null)

    const handleWsTodo = () => {
        socket?.send(inputRef.current?.value!)
    }

    useEffect(() => {
        console.log('socket')
        if(socket){
        socket.onmessage = (e) => {
            console.log(e.data)
            setTodo(prev => [...prev,JSON.parse(JSON.stringify({title:e.data}))]);
          };
          }
    }, [socket])

    useEffect(() => {
        if(data){
       setTodo(data.data)
          }
    }, [data])
    return(
        <>
        <div>
        {todo && todo.map((i: ITodo,index: number) => (
                <div key={index}>
                <div>{i.title}</div>
                {/* <div >{i.completed.toString()}</div> */}
                </div>
            ))}
        </div>
    <input ref={inputRef} type="text" />
    <button  onClick={handleWsTodo}>Send</button>
    </>
)
}