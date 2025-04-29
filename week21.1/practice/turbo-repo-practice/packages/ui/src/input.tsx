import { RefObject } from "react"

type IProp = {
    placeholder:string,
    reference?:RefObject<HTMLInputElement | null>
}

export const Input = ({placeholder, reference} : IProp) => {

    return(
        <div>
            <input ref={reference} placeholder={placeholder}></input>
        </div>
    )
}