import  express from "express";
import { router } from "./router";
import { dbConnect } from "./utils/dbConnect";


const app = express()

dbConnect();
app.use(express.json())

app.use('/v1', router)

app.listen(3000)

