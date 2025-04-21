import axios from "axios"
import { URL } from "./signIn"

export const resetPasswordMail = async(email:string) => {
    const {data} = await axios.post(`${URL}/send/reset/password`, {
        email
    })

    return data;
}