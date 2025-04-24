import { Route, Routes } from "react-router-dom"
import { Home } from "./Pages/Home"
import { ChatRoom } from "./Pages/ChatRoom"
import { useEffect, useRef, useState } from "react"
import { Toast } from "./Components/Toaster"

export const App = () => {

  const [socket, setSocket] = useState<WebSocket>()


  useEffect(() => {
    
    const ws = new WebSocket('ws://localhost:8080')

      setSocket(ws);
  
      
    
    return () => {
      if(ws.readyState === 1)
      ws.close()}
  }, [])


  return <div>
    {socket && 
    <Routes>
    <Route path="/" element={<Home socketWS={socket}/>}></Route>
    <Route path="/chat" element={<ChatRoom socketWS={socket}/>}></Route>
  </Routes>}
  <Toast/>
  </div>
}