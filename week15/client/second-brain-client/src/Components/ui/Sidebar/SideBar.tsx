import { ReactElement } from "react"
import { SideItem } from "./SideItems"

interface SideBarProps {
    SideItem: ReactElement ,
    ItemIcon: ReactElement[],
    width:string
}

// const defaultItemStyle = {
//     style:
// }

export const SideBar =(props:SideBarProps) => {
    return(
        <>
        <div style={{width:`${props.width}px`}} className={`flex h-14 border-t-1 justify-around items-center !w-screen bottom-0 sm:!w-[70px] sm:block sm:h-full bg-white border-r-[0.2px] border-border-color fixed sm:top-[70px] z-[10]`} >
            
            {props.ItemIcon.map((i, index) => (
               <SideItem key={index} item={i} w="1" bg="side-item" square={true} />
               ))}
        </div>
        <div style={{marginRight:`${props.width}px`}} className={`hidden sm:block`}></div>
        
        </>
    )
} 

