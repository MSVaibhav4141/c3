import axios from "axios"
import { URL } from "./signIn"

export const getSharedPost = async() => {
    const {data} = await axios.get(`${URL}/all/shared`,{
        headers:{
            Authorization: localStorage.getItem('authorization'),
            "Content-Type":'application/json'
        }
    })

    return data;
}