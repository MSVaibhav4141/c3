import axios from "axios"
import { URL } from "./signIn"

export const getUserName = async(name:string) => {
        const {data} = await axios.get(`${URL}/user/${name}`)
        return data;
}