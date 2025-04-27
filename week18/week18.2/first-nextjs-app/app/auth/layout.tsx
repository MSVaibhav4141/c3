import { ReactNode, Suspense } from "react";

export default function Layout({children}:{children:ReactNode}){
    return<>
    <div className="border-b-1 border-gray-200">Navbar</div>
    {children}
    </>
}