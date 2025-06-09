import { Pinecone } from '@pinecone-database/pinecone';
import {  getEmbedding } from './embedding';
import { GoogleGenAI } from "@google/genai";
import { Tags } from '../models/tagsModel';
import mongoose from 'mongoose';
import axios, { AxiosError } from 'axios';
import { ErrorHandeler } from '../utils/errorHandeler';


export async function storeDocument(docId:string, text:string, userId: string) {
    try{
        const pc = new Pinecone({ apiKey:process.env.PINECONE_KEY as string});
        const index = pc.index('secondbrain');
            const embedding = await getEmbedding(text);

            console.log(embedding)
        await index.upsert([{ id: docId,values: embedding ,metadata:{title: text, userId}}]);
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
  
        const matchingResult = result.matches.map((i) => `Doc${i.id} ${i.metadata?.title || 'Unititled'} userId${i.metadata?.userId || 'Unititled'}`)
        return matchingResult as [string];
  }
  


  export const sendDocToLLm = async(text:string, results:string[], userId: string): Promise<any> => {
    
    const docs = results.join('\n')
      const ai = new GoogleGenAI({ apiKey: process.env.GEMENI_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `Given the following list of documents:\n\n${docs}\n\nBased on the title: "${text}", identify the most relevant document(s).\n\nReturn:\n- Only one document if it's clearly the most relevant.\nImportant:\n- **Only return documents where the userId matches the userId provided: "${userId}"**.\n- Up to three documents if multiple are similarly relevant.\n\nRespond ONLY with a JSON array of objects, each in the format:\n{\n  "id": "original_id_without_the_'Doc'_prefix",\n"userId":"original_userId_without_the_userId_prefix",\n"content": "document content"\n}\n\ninclude markdown, backticks, or explanations in the response. Only return the raw JSON.`
    });
    return response.text
  }
  

  type promptType = {
    link:string ,
    tags:mongoose.Document[] | null |undefined,
    title?:string
  } 
  type promptTitleType = {
    title:string ,
    tags:mongoose.Document[] | null |undefined
  } 
  const generatePrompt = (props: promptType) => `
  I have a URL: "${props.link}". 
  
  Classify it into one of these categories: YouTube, X (formerly Twitter), GitHub, Reddit, Medium, Instagram, Blog, News Article, Documentation, Product Page, NPMjs, Other.
  
  If the link is a YouTube URL and the title is present (title: "${props.title}"), then use that title to extract top 3 matching tags from the following list: ${props.tags}, and suggest 3 new tags under "suggested". 
  
  If the link is a YouTube URL and the title is undefined or not present, return all fields as empty:
  {
    "category": "YouTube",
    "title": "",
    "topTags": [],
    "suggested": []
  }
  
  For non-YouTube URLs, extract metadata (title, description, content summary) if available. From the metadata, return the top 5 matching tags from the list above under "topTags", and 3 suggested tags under "suggested".
  
  If no relevant tags are found from the list, return "topTags" as an empty array.
  
  Always return a raw JSON object in the following format:
  {
    "category": "<category>",
    "title": "<title>",
    "topTags": [ { "id": "<tag_id>", "name": "<tag_name>" } ],
    "suggested": [ { "name": "<suggested_tag>" } ]
  }
  
  Do NOT return markdown, code blocks, backticks, or explanations — only raw JSON.
  `;

    const titlePrompt = (props: promptTitleType) => `
  I have a title: "${props.title}". Based on this, suggest the top 3 tags either from the following list of tags with IDs: ${props.tags}. Return up to 3 tags that best match the title under the key "topTags". If none match, return an empty array for "topTags" and generate 3 new relevant tags based on the title under "suggested", like: "suggested": [ { "name": "..." }, ... ]. Always return "category" as "Other". If the title provides no useful context, leave "suggested" as an empty array. Respond ONLY with raw JSON in the following format: { "category": "Other", "topTags": [ { "id": "<tag_id>", "name": "<tag_name>" } ], "suggested": [ { "name": "<suggested_tag>" } ] }. Do not include markdown, code blocks, or explanation — only return the raw JSON object.
  `.trim();
  

  export const getType = async(body:Record<string, string>): Promise<any> => {
    const tags = await Tags.find({});
    let result
    try{
       result = await axios.get(`https://youtube.com/oembed?url=${body.link}&format=json`)
    }
    catch(e:any){
      console.log(e.data)
    }

      const ai = new GoogleGenAI({ apiKey: process.env.GEMENI_KEY });

      const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: body.link ? generatePrompt({link:body.link, tags:tags,title:result?.data.title}) : titlePrompt({title:body.title, tags:tags}) 
    });

    const rawMessage =  response.text?.toString() as string;
    const cleaned = rawMessage.replace(/```json|```/g, '').trim();

    const data = await JSON.parse(cleaned);

    if(data.category === 'YouTube' && !result?.data.title){
      throw new ErrorHandeler("Wrong Youtube Link is passed",400)
    }else{
    return data;
    }
  }
  
