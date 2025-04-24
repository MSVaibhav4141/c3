import { Client  } from "pg";

const URI = `postgresql://neondb_owner:npg_rW0XqJUFx1Hi@ep-plain-voice-a4tqd4y8-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require`
export const client = new Client({connectionString: URI})

export const dbConnect = async() => {
    await client.connect()
    console.log('Connected to the DB')
}