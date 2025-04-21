import axios from "axios"
import { URL } from "./signIn"

export const getAllUsers = async(input: string) => {
    const {data} = await axios.get(`${URL}/allow/get/user/${input}`, {
        headers:{
            Authorization:localStorage.getItem('authorization'),
            'Content-Type': 'application/jsonr'
        }
    })
    return data;
}