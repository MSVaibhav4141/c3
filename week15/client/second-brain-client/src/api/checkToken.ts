import axios from "axios"
import { URL } from "./signIn"

export const checkToken = async(token:string, id:string) => {
    const {data} = await axios.get(`${URL}/check/reset/${token}/${id}`)

    return data;
}