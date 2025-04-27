export default function Signup(){
    return <>
    <div className="h-screen flex items-center">
    <div className="mx-auto w-[400px] border-1 border-gray-200 px-3 py-5 flex flex-col rounded-lg self-center ">
        <input type="text" placeholder="Enter your username" className="p-2 rounded-md mb-2"/>
        <input type="password" placeholder="Enter your password" className="p-2 rounded-md mb-2"/>
        <button className="px-4 py-2 w-full bg-gray-700 hover:bg-gray-600 rounded-lg cursor-pointer">SignUp</button>
    </div>
    </div>
    </>
}