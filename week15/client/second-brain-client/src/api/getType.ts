import axios from "axios"
import { URL } from "./signIn"

type getTypeProp = {
    link:string,
    token:string|null
}

type response = {
    message: {
        category: string,
        topTags:  Record<string, string>[],
        suggested: Record<string, string>[]
    }
}
export const getTypes = async (args:getTypeProp) : Promise<response> => {
    const data = await axios.post(`${URL}/get/type`, {link:args.link}, 
        {
            headers: {
                Authorization: args.token,
                'Content-Type' : "application/json",
            }
        }
    )

    return data.data;
}