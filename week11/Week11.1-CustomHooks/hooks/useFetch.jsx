import { useEffect, useState } from "react"

export const useFetch = (url) => {
const [loading,setLoading] = useState(false)
const [error, setError] = useState(null)
const [jokes, setJokes] = useState({})          
console.log("Hey i am called")  
const getResponse = async() => {
    try{
        setLoading(true);
        const response  =  await fetch(url)
        const json = await response.json();
        setJokes(json)
        setLoading(false)
    }catch(e){
        setError(e.message)
    }
    

}    
useEffect(() => {
    getResponse();
}, [url])

return {jokes, loading, error};
}