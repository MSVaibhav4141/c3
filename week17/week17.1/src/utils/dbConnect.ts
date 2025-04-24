import { Client } from "pg"

export const client = new Client('postgresql://neondb_owner:npg_rW0XqJUFx1Hi@ep-plain-voice-a4tqd4y8-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require')

export const dbConnect = async() =>{
    await client.connect()
    console.log('Connrcted to db')
}

