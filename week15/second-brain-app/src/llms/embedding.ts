import axios from 'axios';

export const getEmbedding =async(text:string) =>{
  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2",
      {
        inputs: text,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HFKEY}`,
          "Content-Type": "application/json"
        }
      }
    );
    console.log('OK')
    return response.data; 
  } catch (error:any) {
    console.log('OK')
    console.error("Error fetching embedding:", error.response?.data || error.message);
  }
}

