import axios from "axios"
import { URL } from "./signIn"

export const getContent = ({token}:{token:string}) => {

const {data} = axios.get(`${URL}/get/content/`)
}