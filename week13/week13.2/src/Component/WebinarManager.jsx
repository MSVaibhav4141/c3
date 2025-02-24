import { Calendar, Plus, Recording } from "../assets/Plus"

export const WebinarManager = ({number}) => {
    const icons = [<Calendar className={'w-7 h-7'} /> ,<Plus className={'w-7 h-7'}/>, <Recording className={'w-7 h-7'}/>]
    return <>
    <div className="w-full h-48 border-1 bg-white border-gray-300 shadow-lg grid grid-cols-2 rounded-md items-center justify-items-center">
        {icons.map((i, index) => (
            <div key={index} className="col-span-1 "><UtilityBox icon={i}/></div>
        ))}
       
    </div>
    </>
}

const UtilityBox = ({icon}) => (
    <>
    <div className="w-12 h-12 rounded-sm bg-green-400 flex items-center justify-center text-blue-400">
        {icon}
    </div>
    </>
)