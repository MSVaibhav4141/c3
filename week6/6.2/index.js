const express = require('express')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const app = express()
const users = []

const JWT_SECRET = 'Myname@31'

const auht = (req , res, next) => {
    try{
    const authorization = req.headers.authorization;
    const decodedToken = jwt.verify(authorization, JWT_SECRET)
    req.username = decodedToken.username
    next()
    }catch(e){
        return res.status(401).json({
            err:e.message
        })
    }
}

app.use(cors())
app.use(express.json())

app.post('/signup', (req, res) => {
    const {username ,password} = req.body
    users.push({
        username,
        password
    })
    res.status(200).json({
        message:"Succesfully signed up"
    })
})

app.post('/signin', (req, res) => {
 const {username, password} = req.body

 const obj = users.find(item => item.password ===password && item.username === username)

 if(!obj)return res.status(403).json({
    message:"Invalid credentials"
 })
 const token = jwt.sign({username}, JWT_SECRET) // must include payload in obj else same encoded message each time would be thrown out
 return res.status(200).json({
    token
 })

})

app.get('/me',auht, (req, res) => {
    
    const obj = users.find(item => item.username === req.username)

    if(obj){
        return res.status(200).json({    
            username : obj.username,
            password : obj.password 
        })
    }else{
        return res.sendStatus(403)
    }
})

app.listen(3000, () => {
    console.log("How you doing")
})