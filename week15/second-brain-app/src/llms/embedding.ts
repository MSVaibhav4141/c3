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
   return response.data; // Embedding array
  } catch (error:any) {
    console.error("Error fetching embedding:", error.response?.data || error.message);
  }
}

