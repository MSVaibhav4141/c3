import { ChangeEvent, ChangeEventHandler } from "react"

interface IProp{
    placeholder:string,
    onChange ?: (e: ChangeEvent<HTMLInputElement>) => void
}
export  function Input({placeholder, onChange}: IProp){
    return(
    <input type="text" placeholder={placeholder}  onChange={onChange}/>
    )
}