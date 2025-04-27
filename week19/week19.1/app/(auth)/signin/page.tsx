export default function SignIn(){
    return(
    <div className="flex items-center justify-center">
        <div className="border-1 border-gray-200 rounded-lg p-5">
            <input type="text" className="p-2 rounded-md mb-2" />
            <input type="password" className="p-2 rounded-md mb-2"/>
            <button className="w-full rounded-lg bg-gray-800 hover:bg-gray-700">SignIn</button>
        </div>
    </div>)
}