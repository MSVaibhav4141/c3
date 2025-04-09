import { useEffect, useState } from 'react';
import './App.css'

function App() {
  const [isVisible, setVisibile] = useState(true)

  useEffect(() => {
    setInterval(() => {
      setVisibile(p => !p)
    }, 5000);
  }, [])


  console.log('parenr')

  return (
    <>
    {isVisible && <Counter />}
    </>
  )
} 

function Counter() {

  const [timer, setTimer] = useState(0)

  console.log('rerender')
  // here what is happenong is react is calling counter on each state change therefore - multple instances of setintercval are called therefore makingour app go crazy
  // so we want to use useeffect as to only call setinterval when our component  mounts 
 
  // or

  // useEffect(() => {
  //   setInterval(() => {  not working why?
  //     console.log('setiner')
  //     setTimer(timer + 1 )
  //   }, 1000)
  // }, [timer])

 

  useEffect(() => {
    let clock  = setInterval(() => {
       setTimer(timer => timer + 1 )  //suprising here it will rerender to new value but not when i do setCount(count + 1) 
     }, 1000)
 
     return () => {
       clearInterval(clock)
     }
   }, [])

   
  const handleClick = () => {
    setCount(p => p + 1)
  }
  return<>
  <div>
    {/* <h1>Counter {count} </h1> */}
    <button onClick={handleClick}>Increase</button>
    <button onClick={() => setCount(p => p - 1)}>Decrease</button>
    <button onClick={() => setCount(0)}>reset</button>
    <div>
   <strong >hi {timer}</strong>
   </div>
   </div>
  </>
}
export default App
