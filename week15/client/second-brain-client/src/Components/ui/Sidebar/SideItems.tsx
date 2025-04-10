import { ReactElement } from "react"

interface SideItemProp{
    item:ReactElement,
    w:string,
    height?:string,
    square?:boolean
    bg:string
}


const defaultItemStyle:Record<string, string> = {
    'style':`transition ease-in-out duration-150 flex justify-center items-center`,
    'square':`aspect-square`
}

export const SideItem = (props:SideItemProp) => {

    return (
        <div onClick={() => console.log('hiii')} className={`hover:bg-purple-200 sm:mb-4 m-1  rounded-sm ${defaultItemStyle.style} ${props.square && defaultItemStyle['square']}`}> {props.item}</div>
    )
}