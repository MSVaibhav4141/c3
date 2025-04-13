import axios from "axios"
import { URL } from "./signIn"


export const getContent = async(id:string|undefined) => {
    
if(id){

const {data} = await axios.get(`${URL}/get/content/${id}`,{
    headers:{
        Authorization:localStorage.getItem('authorization'),
        "Content-Type":"application/json"
    }
})
return data;
}else
return {content:[]}
}