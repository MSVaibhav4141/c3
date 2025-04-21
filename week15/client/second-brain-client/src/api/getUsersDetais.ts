import axios from "axios"
import { URL } from "./signIn";

export const getUserDetails = async() => {
    try{
    const {data} = await axios.get(`${URL}/user/info`, {
        headers:{
            Authorization:localStorage.getItem('authorization'),
            'Content-Type' : "application/json",

        }
    })
    console.log(data)
    return data;
}catch(e:any){
    console.log(e)
}
}