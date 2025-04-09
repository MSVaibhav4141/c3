import axios from "axios";
import { URL } from "./signIn";

type postContent = {
    title: string;
    type: string;
    tags: string[];
    link?: string | undefined;
}

export const createContent = async(args:postContent) => {
    const response = await axios.post(`${URL}/add/content`, args)
    return response.data.message
}