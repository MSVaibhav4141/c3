import axios from "axios"
import { URL } from "./signIn"

export const deleteUser = async(id:string) => {
    const {data} = await axios.delete(`${URL}/remove/user/${id}`, {
        headers:{
            Authorization:localStorage.getItem('authorization'),
            'Content-Type':'application/json'
        }
    })
    return data;
}