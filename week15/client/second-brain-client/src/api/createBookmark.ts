import axios from "axios"
import { URL } from "./signIn"

export const createBookmark = async({id}:{id:string}) => {
    const {data} = await axios.post(`${URL}/create/bookmark`, {id}, {
        headers:{
            Authorization:localStorage.getItem('authorization'),
            "Content-Type":'application/json'
        }
    })

    return data
}