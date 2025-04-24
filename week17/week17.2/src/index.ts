import express from 'express'
import { dbConnect } from './utils/dbConnect';
import { router } from './router';

const app = express()

dbConnect();

app.use(express.json())
app.use('/v1', router)

app.listen(3000)