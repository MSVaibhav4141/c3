import 'dotenv/config'
import { app } from "./app";
import { dbmsConnnection } from "./utils/dbConnect";

app.listen(3000, () => {
    console.log('server is up')
})

dbmsConnnection();