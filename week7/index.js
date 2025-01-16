const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const dbConnection = require('./dbConnection')
const {User, Todo} = require('./db')
const auth = require('./middleware')
const { asyncErrorHandeler, errorHandeler } = require('./errorHadeler')
const app = express()
const JWT_SECRET = 'MYHOOD'

dbConnection();

app.use(express.json())

console.log(asyncErrorHandeler)

app.post('/signup' ,asyncErrorHandeler(
    async(req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name;
        
        const passHased = await bcrypt.hash(password, 10)
        await User.create({
            email: email,
            password: passHased,
            name: name
        });
        
        res.json({
            message: "You are signed up"
        })
    }
))

app.post('/signin' ,async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const response = await User.findOne({
        email: email,
    });

    const isCorrect = await bcrypt.compare(password, response.password)
    if(!isCorrect){
        return errorHandeler(res ,"Incorrect Password", 403)
    }
    if (response) {
        const token = jwt.sign({
            id: response._id.toString()
        }, JWT_SECRET)

        res.json({
            token
        })
    } else {
        res.status(403).json({
            message: "Incorrect creds"
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
    const todos = await Todo.find({userId:req.userId})
    res.status(200).json({
        todos
    })

})


app.put('/todo/status',auth, asyncErrorHandeler(
    async (req, res) => {

    const {id, state} = req.body;

    const todo = await Todo.findOneAndUpdate({_id:id},{isCompleted:state});

    res.status(200).json({
        message:"Todo updated successfully"
    })
})) 



app.put('/todo/update',auth, asyncErrorHandeler(
    async (req, res) => {

    const {id, description} = req.body;

    await Todo.findOneAndUpdate({_id:id},{description});

    res.status(200).json({
        message:"Todo updated successfully"
    })
})) 



app.listen(3000, () => {
    console.log('Hey bro')
})