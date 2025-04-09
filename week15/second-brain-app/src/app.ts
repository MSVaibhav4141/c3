import express from 'express';
import {router as userRoute} from './routes/userRoute'
import { errorCatcher } from './utils/errorCatcher';
import cors from 'cors'
export const app = express();

app.use(cors())

app.use(express.json())

app.use('/v1', userRoute)

app.use(errorCatcher)