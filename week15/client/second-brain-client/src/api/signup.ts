import axios from "axios"
import { URL } from "./signIn"

type signUpPayLoad = {
        name:string,
        username:string,
        password:string
}

export const signUpFn = async(args:signUpPayLoad) => {
    const {data} = await axios.post(`${URL}/signup`, args)
    return data
}