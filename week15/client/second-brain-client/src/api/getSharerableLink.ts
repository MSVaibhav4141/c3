import axios from "axios"
import { URL } from "./signIn"

export const getShareLink = async({id}:{id:string}) => {
    const {data} = await axios.get(`${URL}/share/${id}`,{
        headers:{
            Authorization:localStorage.getItem('authorization'),
            "Content-Type":"application/json"
        }
    }
    )

    return data;
}