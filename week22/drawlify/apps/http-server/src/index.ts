import express from 'express'
import { router } from './router/router';

const app = express();

app.use(express.json())

app.use('/v1', router)

app.listen(3001, () => {
    console.log("Server is up")
})