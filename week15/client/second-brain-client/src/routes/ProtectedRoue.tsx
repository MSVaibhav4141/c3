import { Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContent"
import { useEffect } from "react"

export const PrivateRoue = () => {

    const {isAuth} = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        if(!isAuth){
            navigate('/signin')
        }
    }, [isAuth])

    return <>
    {isAuth && <Outlet />}
    
    </>
}