const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const dbConnection = require('./dbConnection')
const {User, Todo} = require('./db')
const auth = require('./middleware')
const app = express()
const JWT_SECRET = 'MYHOOD'

dbConnection();

app.use(express.json())

app.post('/signup' ,async(req, res) => {
    const {email, password, name} = req.body;

    await User.create({
        email,
        password,
        name
    })
    
    res.status(200).json({
        message:'Signed Up Successfully'
    })

})

app.post('/signin' ,async (req, res) => {
    const {email, password} = req.body;

   const user = await User.findOne({email, password})
   if(user){
    const token = jwt.sign({userId:user._id}, JWT_SECRET)
    res.status(200).json({
        message:"Successfully Logged in",
        token
    })
    }
    else{
    return res.status(403).json({
        message:"Not loggein"
    })
}
})
app.post('/todo' ,auth ,async(req, res) => {
    const {description} = req.body;

    await Todo.create({
        userId:req.userId,
        description
    })

    res.status(200).json({
        message:'Todo added successfully'
    })
})
app.get('/todos' ,auth ,async(req, res) => {
    await Todo.find({userId:req.userId})

})

app.listen(3000, () => {
    console.log('Hey bro')
})