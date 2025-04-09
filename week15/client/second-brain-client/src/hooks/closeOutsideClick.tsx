import { useEffect, useState } from "react"


export const useCloseOnOutClick = (element:HTMLElement | null) => {

    const [clickStatus, setClick] = useState(true)
    
    useEffect(() => {
        const handleClick = (e:Event) => {

            if(element && !element.contains(e.target as Node)){
                setClick( true);
            }else{
                setClick(false)
            }
        }

        document.body.addEventListener('click', handleClick)

        return () => (
            document.body.addEventListener('click', handleClick)
        )
    },[element])

    return clickStatus
}