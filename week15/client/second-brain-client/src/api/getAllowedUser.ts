import axios from "axios"
import { URL } from "./signIn"


export const getAllowedUsers = async<T>(): Promise<T> =>  {
    const {data} = await axios.get<T>(`${URL}/users/allowed`, 
        {
            headers:{
                Authorization:localStorage.getItem('authorization'),
                "Content-Type":"application/json"
            }
        }
    )
    return data;
}