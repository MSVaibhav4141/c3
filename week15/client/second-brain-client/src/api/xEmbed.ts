import axios from "axios"

export const xEmbed = async(url:string) => {
    const {data} = await axios.get('https://publish.twitter.com/oembed',{
        params:{
            url
        }
    })
    return data;
}