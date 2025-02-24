export const ProfileCard = ({name,email, mobNo, address, img}) => {
    return <div className="w-42 h-60 bg-white text-center px-5 pt-10 rounded-lg relative bottom-5 left-2 border-1 border-gray-300 shadow-lg">
        <img src={img} alt="Profile Picture" className="mx-auto  rounded-lg w-20 square"/>
        <p className="font-bold text-sm mt-5">{name}</p>
        <p className="font-normal text-gray-500 mt-2 text-[11px] font-medium">{email}</p>
        <p className="font-normal text-gray-500 text-[11px] font-medium">{mobNo}</p>
        <p className="font-normal text-gray-500 mt-2 text-[11px] font-medium">{address}</p>
    </div>
}