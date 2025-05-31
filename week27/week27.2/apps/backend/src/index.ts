import express, { type Request } from 'express'
import { prismaClient } from 'db/client'
import bcrypt  from 'bcrypt'

const app = express()

app.use(express.json())

app.get("/todos", async(req, res) => {

    try{
       const todos =  await prismaClient.todo.findMany()
       res.json({
        todos
       }).status(200)
    }catch(e){
        console.log(e)
    }

})

app.post('/add/todo' ,async(req:Request<{},{},{title:string}>, res) => {

    const {title} = req.body;


    await prismaClient.todo.create({
        data:{
            title,
            userId:"abd5e8d3-5302-4051-9714-ceda43abb672"
        }
    })

    res.json({
        title
    }).status(200)
})
app.post('/signup', async(req:Request<{},{},{username:string, password:string}>, res) => {

    const {username ,password} = req.body;

    const saltedPassword = await bcrypt.hash(password, 10)

    await prismaClient.user.create({
        data:{
            username,
            password:saltedPassword
        }
    })

    res.json({
        username,
        password
    })
})


app.listen(8080, () => {
    console.log('Server is up')
    })