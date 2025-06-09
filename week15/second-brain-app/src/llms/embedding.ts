import axios from 'axios';

export const getEmbedding =async(text:string) =>{
  try {
    const response = await axios.post(
      "https://router.huggingface.co/hf-inference/models/sentence-transformers/all-MiniLM-L6-v2/pipeline/feature-extraction",
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

