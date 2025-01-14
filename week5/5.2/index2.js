const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())  // => express.json() = bodyParser.json()   
// since payload coming is in json we will use .json else someelse line express.urlencoded etc 
// why we call the function here json() 
// but normally in our function we call it as app.use(logger) 
// reason is express.json() return another function that need to be used 

// using body to get the payload 

app.post('/sum', (req, res) => {
    const a = Number(req.body.a); 
    const b = Number(req.body.b);
    console.log(typeof(a))
    const result = a + b;

    res.status(200).json({result:`Sum is ${result}`})
})

app.listen(3000)