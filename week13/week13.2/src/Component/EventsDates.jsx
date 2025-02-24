import { AngleDown, Calendar, LeftArrow, RightArrow } from "../assets/Plus"

export const EventsDates = ({numbers}) => {
    return <>
    <div>
        <div>
            <p className="text-xs font-medium">Monday, 14 October</p>
            <h3 className="text-md font-bold text-blue-400 mb-6">Good morning, Prabhleen!👋</h3>
        </div>
        <div>
            <div className="bg-white w-full h-70 px-4 py-4 rounded-md">
                 <div className="flex bg-gray-200 rounded justify-between py-1">
                    <div className="flex">
                    <Calendar className={'ml-2 text-gray-800'}   />
                    <p className="text-xs font-medium flex items-center mr-4 ml-3">Monday, 14 October 2024</p>
                    <AngleDown className={'text-gray-500 w-3'}/>
                    </div>
                    <span className="flex">
                        <LeftArrow className={'text-gray-500'}/>
                        <RightArrow className={'text-gray-500'}/>
                    </span>
                </div>
             {Array(numbers).fill('').map((item,index)=> <EventInfoBar key={index}/>)} 
            </div>
        </div>
    </div>
    </>
}

const EventInfoBar = () => (
    <div className="flex h-15  border-b-1 border-gray-300">
    <div className="h-10 border-r-1 border-green-400 pr-2 mt-2">
        <p className=" font-medium text-sm my-1">11:30 AM</p>
        <p className="text-[10px] text-gray-500 font-medium">11:30 AM</p>
    </div>
    <div className="pl-1.5 mt-2">
        <p className="text-[10px] text-gray-500 font-medium my-1">Live</p>
        <p className=" font-medium text-sm">UX Webinar</p>
    </div>
</div>
)