const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()

const JWT_SECRET='usre#@'
const users = []

app.use(express.json())
const string='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLNOPQRSTUVWXYZ1234567890'
const generateToken = () => {

    let array = string.split('')
    let str =  ''
    for(let i = 0;i < 32; i++){
        str += array[Math.floor(Math.random() * array.length)]
    }
    return str    
}


app.post('/signup', (req, res) => {
    const {username , password} = req.body

    users.push({username, password})

    res.status(200).json({
        message:"You are signed in"
    })
})

app.post('/signin', (req, res) => {
    const {username, password} = req.body;

    const obj = users.find(item => item.username === username && item.password === password)
    if(!obj)return res.status(401).json({message:'Unauth'});

    // const token = generateToken()
    const token = jwt.sign({
        username
    }, JWT_SECRET)
    
    res.status(200).json({
        token
    })
})

app.get('/me', (req, res) => {
    const token = req.headers.authorization;
    // const user = users.find(item => item.token === token) not needed after jwt as it will verify the username via the token provided at the time of login

    const decodedToken = jwt.verify(token, JWT_SECRET)

    // now here whatever let it be users course or whatever since we know ther eusername we could directly ping the db with there username and hence can get the content assign to them

    const user = users.find(item => item.username = decodedToken.username)

    user ? 
    res.status(200).json({
        username: user.username,
        password: user.password
    }) : 
    res.status(401).json({
        error:"Invalid Token"
    })
})

app.listen(3000, () => {
    console.log('How u doing')
}) 
