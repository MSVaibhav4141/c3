import axios from "axios";

type signInPayload = {
    username:string,
    password:string
}

export const URL = import.meta.env.VITE_SERVER_HOST;

export const signInFn = async (args:signInPayload) => {

   const response =  await axios.post(`${URL}/signin`, args)
   return (response.data)
   
}