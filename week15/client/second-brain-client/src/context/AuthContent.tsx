import { useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { createContext, ReactElement, useContext, useEffect, useState } from "react"
import { URL } from "../api/signIn"

type AuthStoreType = {
    isAuth:boolean|undefined,
    username:string|undefined,
    loading:boolean,
    login: (token:string) => void,
    logout: () => void,
    id:string | undefined
}

type Response = {
    isAuth:true | false,
    username:string|undefined,
    id:string|undefined
}

const checkIfAuth = async():Promise<Response> => { 
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
    const [id, setId] = useState<string | undefined>(undefined)
    const [loading, setLoading] = useState<boolean>(true)

    const queryClient = useQueryClient()

    const {data, isLoading} = useQuery({
        queryKey:['isAuth'],
        queryFn: checkIfAuth,
        retry:false
    })

    const login = (token:string) => {
        if(token)
        {
        localStorage.setItem('authorization', token)
        queryClient.invalidateQueries({queryKey:['isAuth']})
        setAuth(true)
    }
    }

    const logout = () => {
        localStorage.removeItem('authorization')
        setAuth(false)
    }

    useEffect(() => {
        setAuth(data?.isAuth)
        setName(data?.username)
        setId(data?.id)
    }, [data])

    useEffect(() => {
        setLoading(false)
    }, [isLoading])
    return<>
    <AuthContext.Provider value={{loading,isAuth,login,logout,username,id }}>
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