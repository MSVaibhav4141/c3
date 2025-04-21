import axios from "axios"
import { URL } from "./signIn"

export const publicUserContent = async (name:string) => {
    const {data} = await axios.get(`${URL}/public/user/${name}`)

    return data;
}