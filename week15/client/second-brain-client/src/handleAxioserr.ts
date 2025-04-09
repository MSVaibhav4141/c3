import { AxiosError } from "axios";
import { toast } from "react-toastify";

export const throwAxiosError = (err:any,{}) => {
    const error = err as AxiosError<{error:string}>;
    
    toast(error.response?.data?.error)
}