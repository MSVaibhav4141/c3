import axios from "axios"
import { URL } from "./signIn"

export const getSearchResult = async ({input}:{input:string}) => {
    console.log(input)
    const {data} = await axios.post(`${URL}/search`, {text:input},{
        headers:{
            Authorization:localStorage.getItem('authorization'),
            "Content-Type": 'application/json'
        }
    })
    return data;
    
}