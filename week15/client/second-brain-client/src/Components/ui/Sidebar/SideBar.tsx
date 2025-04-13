import { ReactElement } from "react"
import { SideItem } from "./SideItems"
import { Link } from "react-router-dom"

interface SideBarProps {
    SideItem: ReactElement ,
    ItemIcon: ReactElement[],
    width:string,
}

// const defaultItemStyle = {
//     style:
// }
const link = ['','YT', 'X', 'Bookmarks']
export const SideBar =(props:SideBarProps) => {
    return(
        <>
        <div style={{width:`${props.width}px`}} className={`flex h-14 border-t-1  justify-around items-center !w-screen bottom-0 sm:!w-[70px] sm:block sm:h-full  border-r-[0.2px] border-border-color fixed sm:top-[70px] z-[10] bg-mode`} >
            
            {props.ItemIcon.map((i, index) => (
              <Link key={index} to={`/user/:name/${link[index]}`}> <SideItem key={index} item={i} w="1" bg="side-item" square={true} /></Link>
               ))}
        </div>
        <div style={{marginRight:`${props.width}px`}} className={`hidden sm:block`}></div>
        
        </>
    )
} 

