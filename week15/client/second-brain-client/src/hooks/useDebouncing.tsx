import { useEffect, useState } from "react"

type debouceProp =  {
    input:string,
    delay:number
}


export const useDebouncing = (props:debouceProp) => {
    const {input, delay} = props;
    const [value, setValue] = useState(input)
    // const time = useRef<number>(0)
    useEffect(() => {
       const timer =  setTimeout(() => {
            setValue(input)
        }, delay);
        
        return () => clearTimeout(timer)
    }, [delay,input])

    return value;

}