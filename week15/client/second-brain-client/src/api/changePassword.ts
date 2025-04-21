import axios from "axios"
import { URL } from "./signIn"

type PasswordType = {
    token:string | null,
    userId:string | null,
    password:string,
    confirmPassword:string
}

export const changePassword = async(args:PasswordType) => {
    const {data} = await axios.post(`${URL}/reset/password`,{
        ...args
    })

    return data;
}