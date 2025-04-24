import { useEffect, useRef, useState } from "react"

export const App = () => {

  const [socket, setSocket] = useState<WebSocket>()

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080')
    setSocket(ws)
    
    
    ws.onmessage = (event) => {
      alert(event.data)
    }

    ws.send('yoyo')

    return () => ws.close()
  }, [])



  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    console.log(socket)
    if(socket)
    socket.send(inputRef.current?.value!)
  }
  return <>
  <div>
    <input ref={inputRef} type="text" placeholder="Enter Text"/>
    <button onClick={handleClick}>PING</button>
  </div>
  </>
}