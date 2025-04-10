import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { createContext, ReactElement, useContext, useEffect, useState } from "react"
import { URL } from "../api/signIn"

type AuthStoreType = {
    isAuth:boolean|undefined,
    username:string|undefined,
    loading:boolean,
    login: (token:string) => void,
    logout: () => void
}

const checkIfAuth = async() => { 
    const response = await axios.get(`${URL}/isauth`,{
        headers: {
            Authorization : localStorage.getItem('authorization'),
            "Content-Type": "application/json",

        }
    });
    return response.data
}


const AuthContext = createContext<AuthStoreType| undefined>(undefined)
export const AuthProvider = ({children}:{children: ReactElement}) => {

    const [isAuth, setAuth] = useState<boolean | undefined>(undefined)
    const [username, setName] = useState<string | undefined>(undefined)
    const [loading, setLoading] = useState<boolean>(true)

    const {data} = useQuery({
        queryKey:['isAuth'],
        queryFn: checkIfAuth,
    })

    const login = (token:string) => {
        localStorage.setItem('authorization', token)
        setAuth(true)
    }

    const logout = () => {
        localStorage.removeItem('authorization')
        setAuth(false)
    }

    useEffect(() => {
        setAuth(data?.isAuth)
        setName(data?.username)
        setLoading(false)
    }, [data])


    return<>
    <AuthContext.Provider value={{loading,isAuth,login,logout,username, }}>
    {children}
    </AuthContext.Provider>
    </>
}

//creatng custom hook to drect access context value

// export const useAuth = ()  => {
//    const {isAuth} = useContext(AuthContext)
//    console.log(isAuth)

// }
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
  };