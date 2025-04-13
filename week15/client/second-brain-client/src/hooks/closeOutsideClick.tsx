import { useEffect, useState } from "react"


export const useCloseOnOutClick = (element:HTMLElement | null) => {

    const [clickStatus, setClick] = useState(true)
    
    useEffect(() => {
        const handleClick = (e:Event) => {

            if(element && !element.contains(e.target as Node)){
                setClick( true);
            }else{
                element && setClick(false)
            }
        }

        document.body.addEventListener('click', handleClick)

        return () => (
            document.body.removeEventListener('click', handleClick)
        )
    },[element])

    return clickStatus
}