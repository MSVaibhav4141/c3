const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const PORT = 3000;
const userRoute = require('./routes/userRoute')
const todoRoute = require('./routes/todoRoute.js')

app.use(bodyParser.urlencoded({extended:true}))

app.use('/v1',userRoute)
app.use('/v1',todoRoute)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})