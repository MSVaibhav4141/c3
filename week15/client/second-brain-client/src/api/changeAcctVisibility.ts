import axios from "axios"
import { URL } from "./signIn"

export const changeVisiblty = async(type:boolean) => {
    const {data} = await axios.put(`${URL}/change/visibility`, {
        type
    },{
        headers:{
            Authorization:localStorage.getItem('authorization'),
            "Content-Type":'application/json'
        }
    })

    return data;
}