import { useState } from "react"
import { HomeIcon } from "../assets/Home"
import { People } from "../assets/People"
import { Card } from "../assets/Card"
import { User } from "../assets/User"
import { Settings } from "../assets/Settings"

export const SideBar = () => {

    const sideBarContent = [
        {
            label:"Home",
            icon: HomeIcon
        },
        {
            label:"Webinars",
            icon: People
        },
        {
            label:"Billing",
            icon: Card
        },
        {
            label:"User Management",
            icon: User
        },
        {
            label:"Settings",
            icon: Settings
        },
    ]
    return <>
    <div className="w-14 sm:w-52 h-screen px-3 py-4 border-r-2 border-gray-300 transition-all duration-300 ease-in-out">
    <UpperComponent />
    <NavMenu navContent={sideBarContent}/>
    </div>
    </>
}

const UpperComponent = () => {

    return <div className="w-full flex h-5 items-center justify-between  py-1 mb-6 sm:mb-6">
        <div className="hidden sm:flex bg-blue-400 text-white cursor-pointer rounded-md text-[8px] items-center px-1.5 py-[2px]">
            
            <img src="/webinar.png" alt="webinar svg" className="w-5 h-5 mr-0.5"/>
            
            Webinar<span className="text-green-400">.gg</span></div>
        <img src="/girl.png" className="w-6 h-6 aspect-square rounded" />
    </div>
}

const NavMenu = ({navContent}) => {

    const [isHovered,setHover] = useState({})
    console.log(isHovered)  
    return <>
    {navContent.map((item, i) => {
        console.log(item)
        const IconComponent = item.icon;

        
        return <div key={i} onMouseEnter={() => setHover(prev => ({...prev,fill:true, index:i}))} onMouseLeave={() => setHover(prev => ({...prev,fill:false, index:i}))} className="group w-full flex justify-between mb-6 sm:mb-2 py-px px-px sm:py-1.5 sm:px-1.5 items-center hover:text-blue-400 text-[11px] text-gray-500 hover:font-semibold  hover:bg-blue-200 font-normal rounded transition duration-100">
            <span className="hidden sm:block">{item.label}</span>
             <IconComponent className={'h-4.5 w-4.5 text-gray-500 group-hover:text-blue-400'} thickness={1} fill={isHovered.fill && isHovered.index === i}/>
        </div>
  
    }
    )}
    </>
}