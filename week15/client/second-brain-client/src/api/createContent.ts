import axios from "axios";
import { URL } from "./signIn";

type postContent = {
   data:{ title: string;
    type: string;
    tags: string[];
    link?: string | undefined;},
    token:string | null
}

export const createContent = async(args:postContent) => {
    const response = await axios.post(`${URL}/add/content`, args.data, {
        headers:{
            Authorization : args.token,
            "Content-Type": "application/json",
        },
    })
    return response.data
}