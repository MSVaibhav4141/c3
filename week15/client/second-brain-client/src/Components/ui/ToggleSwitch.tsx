import { useState } from "react"

type toggleProp = {
    w:number,
    h:number,
    initalState?:boolean 
    onChange?:() => void
}
export const ToggleSwitch = (props:toggleProp) => {

    const [click, setClick]= useState<boolean>(props.initalState || false)
    const handleClick = () => {
        setClick(prev => !prev)
    }


    const parentStyleyle:Record<string,string> = {
        'true': `bg-purple-500`,
        'false': `bg-gray-400`
    }

  
    return<>
    <div onClick={() =>{ handleClick(); props.onChange && props.onChange()}} style={{width:props.w, height:props.h}} className={`  rounded-xl relative flex items-center ${parentStyleyle[click.toString()]} duration-350`}>
        <div  style={{width:props.h-5 , height:props.h-5, left:click ? props.w - (props.h - 5) - 3 : 3 }} className={` absolute rounded-[50%] bg-gray-200 transition-all duration-350`}></div>
    </div>
    </>
}