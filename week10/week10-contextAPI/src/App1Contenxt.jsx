import { useContext } from "react";
import { createContext } from "react"
import { useState } from "react"



const BulbContent = createContext();
function BulbContentProvider({children}){
    const [bulbOn , setBulb] = useState(true)

    return <BulbContent.Provider value={{bulbOn, setBulb}}>
        {children}
        </BulbContent.Provider>

}

export default function App1(){

    return <>
    <BulbContentProvider >
    <Lights />
    </BulbContentProvider>
    </>
}

function Lights(){
    return<>
    <LightBulb />
    <LightSwitch />
    </>
}

function LightBulb(){
    const {bulbOn} = useContext(BulbContent)
    return <>
    {bulbOn ? <div>Bulb On</div> : <div>Bulb Off</div>}
    </>
}

function LightSwitch(){
    const {setBulb} = useContext(BulbContent)
    const toggleBulb = () => {
        setBulb((e => !e) )
    }
    return <>
    <button onClick={toggleBulb}>Toggle</button>
    </>
}