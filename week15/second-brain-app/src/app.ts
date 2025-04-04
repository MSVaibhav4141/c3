import express from 'express';
import {router as userRoute} from './routes/userRoute'
import { errorCatcher } from './utils/errorCatcher';
export const app = express();

app.use(express.json())

app.use('/v1', userRoute)

app.use(errorCatcher)