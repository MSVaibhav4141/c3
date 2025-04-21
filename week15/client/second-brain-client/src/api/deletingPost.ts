import axios from "axios"
import { URL } from "./signIn"

export const deletePost = async(postId:string) => {
    const {data} = await axios.delete(`${URL}/delete/content/${postId}`, {
        headers:{
            Authorization: localStorage.getItem('authorization'),
            "Content-Type": 'application/json'
        }
    })

    return data;
}