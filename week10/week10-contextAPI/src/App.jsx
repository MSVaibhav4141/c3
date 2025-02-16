import { useState } from "react"

//Rolling up the state
//prop Drilling = drilling prop from parent children (not immidiate children though)

export default function App(){
 const [bulbOn, setBulb] = useState(true)
 return <>
  <Lights bulbOn={bulbOn} setBulb={setBulb}/>
  </>
}

function Lights({bulbOn, setBulb}){
  return <>
  <LightBulb bulbOn={bulbOn}/>
  <LightSwitch bulbOn={bulbOn} setBulb={setBulb}/>
  </>
}

function LightBulb({bulbOn}){
  return<>
  {bulbOn ?
   <img width='100' src="https://5.imimg.com/data5/WL/SG/MY-8835990/10w-gls-light-bulb-1000x1000.jpg"/> : 
   <img width='100' src="https://w7.pngwing.com/pngs/859/425/png-transparent-light-bulb-illustration-incandescent-light-bulb-lamp-bulb-candle-product-light-thumbnail.png" />}
  </>
}

function LightSwitch({setBulb}){ 

  const toggleBulb = () => {
    setBulb((e => !e))
  }

  return<>
  <button onClick={toggleBulb}>Toggle</button>
  </>
}
