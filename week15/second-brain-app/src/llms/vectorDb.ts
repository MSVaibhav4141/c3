import { Pinecone } from '@pinecone-database/pinecone';
import {  getEmbedding } from './embedding';
import { GoogleGenAI } from "@google/genai";


export async function storeDocument(docId:string, text:string) {
    try{
        const pc = new Pinecone({ apiKey:process.env.PINECONE_KEY as string});
        const index = pc.index('secondbrain');
            const embedding = await getEmbedding(text);

            console.log(embedding)
        await index.upsert([{ id: docId, values: embedding ,metadata:{title: text}}]);
        console.log(`Stored ${docId} in Pinecone`);
    }catch(e:any){
        console.log(e.message)
    }
   
  }
  
  export async function searchDocuments(query:string, topK = 5): Promise<[string]> {
    const pc = new Pinecone({ apiKey:process.env.PINECONE_KEY as string});
    const index = pc.index('secondbrain');
    const queryEmbedding = await getEmbedding(query);
    const result = await index.query({
      vector: queryEmbedding,
      topK,
      includeMetadata: true,
    });
  
        const matchingResult = result.matches.map((i) => `Doc${i.id} ${i.metadata?.title || 'Unititled'}`)
        return matchingResult as [string];
  }
  


  
  export const sendDocToLLm = async(text:string, results:[string]): Promise<any> => {

    const docs = results.join('\n')
      const ai = new GoogleGenAI({ apiKey: process.env.GEMENI_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `Given the following list of documents:\n\n${docs}\n\nBased on the title: "${text}", identify the most relevant document(s).\n\nReturn:\n- Only one document if it's clearly the most relevant.\n- Up to three documents if multiple are similarly relevant.\n\nRespond ONLY with a JSON array of objects, each in the format:\n{\n  "id": "original_id_without_the_'Doc'_prefix",\n  "content": "document content"\n}\n\ninclude markdown, backticks, or explanations in the response. Only return the raw JSON.`
    });
    return response.text
  }
  
