import { useQuery } from "@tanstack/react-query"
import { getSingleSharePost } from "../api/getSingleSharePost"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Cards } from "../Components/ui/Cards"
import { BackIcon, Home, LogoNavbar, XIcon, YTIcon } from "../Components/ui/Icons"
import { Button } from "../Components/ui/Button"
import { useAuth } from "../context/AuthContent"


export const SharedPostPage = () => {

    
    const {hash} = useParams()
    const {isAuth, loading, username} = useAuth()
    const {data,isSuccess,isLoading } = useQuery({
        queryKey:['shared'],
        queryFn:() => hash && getSingleSharePost(hash)
    }) 

    const navigate = useNavigate()
    return<>
    <div className="w-full h-screen flex justify-center ">
    <div className="flex-1">
        <div className="font-light  hidden lg:block  leading-15 text-center text-4xl border-border-color border-1 text-grey-400 shadow-md text-wrap w-[90%] rounded-xl p-3 m-5 hover:shadow-xl duration-200">
            <p>You're peeking</p>
            <p>into the attic of</p>
            <p>someone's</p>
            <p> mind.</p>
        <div className="text-end px-6">
        <LogoNavbar className="!text-sm"/></div>
        </div>
        </div>
    <div className="flex-2 max-w-[700px] mx-auto">
        <div className="w-full h-screen">
        {isLoading && <>Loading</>}
        {isSuccess && <div className="p-4 border-l-1 border-r-1 border-border-color min-h-screen">
            <div className="flex dark:text-grey-400 mb-4">
                <span onClick={() => navigate('/')}>
                <BackIcon className="dark:text-grey-400 hover:text-purple-400 duration-150 transition" stroke={1.5} />
                </span>
                <h2>Post by <strong>{data.content.userId.name}</strong></h2>
            </div>
            <Cards data={data.content} ytHeight="h-[60vh]" />
            </div>}
        </div>
    </div>
    <div className="flex-1">
        {!loading && isAuth && (
            <div className="font-light hidden lg:block leading-15 text-4xl border-border-color border-1 text-grey-400 shadow-md text-wrap w-[90%] text-center rounded-xl p-3 m-5 hover:shadow-xl duration-200">
            <p>Step back into </p>
            <p> your Second</p>
            <p> Brain.</p>

            <Link to={`/user/${username}`}><Button variant="primary" size="sm" title="" className="text-sm font-semibold w-full my-2 !bg-purple-200 hover:!bg-purple-400" startIcon={<Home />}/></Link>
            <Link to={`/user/${username}/X`}><Button variant="primary" size="sm" title="" className="text-sm font-semibold w-full my-2 !bg-purple-200 hover:!bg-purple-400" startIcon={<XIcon />}/></Link>
            <Link to={`/user/${username}/YT`}><Button variant="primary" size="sm" title="" className="text-sm font-semibold w-full my-2 !bg-purple-200 hover:!bg-purple-400" startIcon={<YTIcon />}/></Link>
        </div>
        )}
        
        {!loading && !isAuth && (
            <div className="font-light hidden lg:block leading-15 text-4xl border-border-color border-1 text-grey-400 shadow-md text-wrap w-[90%] text-center rounded-xl p-3 m-5 hover:shadow-xl duration-200">
            <p>Create your own </p>
            <p>digital brain</p>
            <p>it remembers</p>
            <p>everything.</p>
            <Button variant="primary" size="sm" title="Create Yours" className="text-sm font-semibold w-full my-2 !bg-purple-200 hover:!bg-purple-400" />
            <Button variant="secondary" size="sm" title="Login" className="text-sm font-semibold w-full my-2 !bg-black-200 !text-grey-400 hover:!bg-purple-400 !border-border-color" />
        <div className="text-end px-6">
        <LogoNavbar className="!text-sm"/></div>
        </div>
        )}
        
        </div>
    </div>
    </>
}