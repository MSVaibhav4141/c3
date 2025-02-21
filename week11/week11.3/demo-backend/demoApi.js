const express= require('express')
const cors = require('cors')
const app = express();

app.use(cors())
app.get('/get/detail' , (req, res) => {
    const networks = Math.floor(Math.random() * 100)
    const jobs = Math.floor(Math.random() * 100)
    const messaging = Math.floor(Math.random() * 100)
    const notifications = Math.floor(Math.random() * 100)

    res.json({
        networks,
        jobs,
        messaging,
        notifications
    }).status(200)
})
app.listen(5010, () => {
    console.log('Listening')
})