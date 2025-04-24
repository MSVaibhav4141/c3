import { PrismaClient } from "@prisma/client";
import express from 'express'
import { router } from "./routes";

const app = express()


export const client = new PrismaClient(
    {log: [{ level: 'query', emit: 'event' }]}
)

app.use(express.json())
app.use('/v1',router)

app.listen(3000)