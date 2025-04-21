import axios from "axios"
import { URL } from "./signIn";

export const disableSharing = async(id:string) => {
    const {data} = await axios.delete(`${URL}/remove/link/${id}`, {
        headers:{
            Authorization: localStorage.getItem('authorization'),
            "Content-Type" : 'application/json'
        }
    })

    return data;
} 