import { useEffect } from "react"

type debouceProp =  HTMLInputElement | null


export const useDebouncing = (props:debouceProp) => {
    const element = props;
    // const time = useRef<number>(0)
    useEffect(() => {

        if(element){
            element.addEventListener('change', () => {
                setTimeout(() => {
                    console.log('sneding')
                },2000)
            })
            return () => (
                element.removeEventListener('change', () => {
                    setTimeout(() => {
                        console.log('removing')
                    },2000)
                })
            )
        }

    }, [element])
}