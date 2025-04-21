import axios from "axios"
import { URL } from "./signIn"

export const allowUser = async(name:string) => {   
    const {data} = await axios.post(`${URL}/allow/user`, {name},{
        headers:{
            Authorization:localStorage.getItem('authorization'),
            'Content-Type':'application/json'
        }
    }
        
)
return data;
}