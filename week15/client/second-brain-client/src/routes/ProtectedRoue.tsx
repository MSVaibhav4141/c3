import { Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContent"
import { useEffect } from "react"

export const PrivateRoue = () => {

    const {isAuth, loading} = useAuth()
    const navigate = useNavigate()
    
    useEffect(() => {
        console.log(isAuth, loading)
        if(!isAuth && !loading){
            navigate('/signin')
            return;
        }
    }, [isAuth,loading])

    return <>
    {isAuth && <Outlet />}
    </>
}