import { useEffect, useRef, useState } from "react";
import { useCounter } from "../hooks/useCounter";
import { useFetch } from "../hooks/useFetch";
import { usePrev } from "../hooks/usePrev";
import { useDebounce } from "../hooks/useDebounce";
import { useIsOnline } from "../hooks/useIsOnline";

export default function App(){
  
  const {count, increaseCount} = useCounter()
  const [input, setInput] = useState('')
  const [countTest, setCount] = useState(1);
  const currentBrowserStatus = useIsOnline();

  // -----------------Usefetch hook---------------- 
  const {jokes, error ,loading} = useFetch('https://official-joke-api.appspot.com/jokes/'+count);

  useEffect(() => {
    console.log(error)
  }, [error])
  

  // -------Different variant of useDebouce--------
  // const sendTobackend = () => {
  //   console.log("Sent to backend")
  // }
  // const isDebouced = useDebounce(sendTobackend) 
 

  
  const prev = usePrev(count)

  const isDebounced = useDebounce(input,1000)

  useEffect(() => {
    alert('Request sent to backend')
  }, [isDebounced])


  useEffect(() => {
    if(!currentBrowserStatus)
    document.body.style.backgroundColor = 'red'
    if(currentBrowserStatus)
    document.body.style.backgroundColor = '#242424'
  }, [currentBrowserStatus])
  
  return <>
  <div>
  <p>{count}</p>
  <p>{countTest}</p>
  {loading ? <div>Loading</div> : 
  (<>
    <p>{jokes.setup || `No jokes for no ${count}`}</p>
    <p>{jokes.punchline || `No jokes for no ${count}`}</p>
    </>
  )}

 <p>Last joke was number {prev}</p>

  <button onClick={increaseCount}>Tell me a joke {count}</button>
  {/* <input placeholder="Type Something" onChange={isDebouced}></input> */}
  <input placeholder="Type Something" onChange={(e) => setInput(e.target.value)}></input>
  <button onClick={() => setCount(countTest + 1)}>Increment</button>

  </div>
  </>
}