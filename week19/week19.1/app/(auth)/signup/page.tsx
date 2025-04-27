"use client"

import axios from "axios"
import { RefObject, useRef } from "react"

export default function SignUp(){

    const username = useRef<HTMLInputElement>(null)
    const password = useRef<HTMLInputElement>(null)

    return(
    <div className="flex items-center justify-center h-screen">
        <div className="border-1 border-gray-200 rounded-lg p-5 flex flex-col">
            <input ref={username} type="text" className="p-2 rounded-md mb-2" placeholder="username"/>
            <input ref={password} type="password" className="p-2 rounded-md mb-2" placeholder="password" />
            <button className="w-full rounded-lg bg-gray-800 hover:bg-gray-700 h-[70px]" onClick={() => {
                console.log(username , password)
                axios.post('http://localhost:3000/api/v1/signin',{
                    username: username.current?.value,
                    password: password.current?.value
                }).then(res => {
                    alert(res.data.message)
                })
            }}>SignUp</button>
        </div>
    </div>)
}