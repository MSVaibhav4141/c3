import axios from "axios"
import { URL } from "./signIn"

export const getSingleSharePost = async(hash:string) => {
    const {data} = await axios.get(`${URL}/share/content/${hash}`)
    return data;
}