import express from 'express'
import {prismaClient} from '@repo/db/prisma'

const app = express()

app.get('/get/todos' , async(req, res) =>{
	const data = await prismaClient.todos.findMany()

	res.status(200).json({
		data
	})
})

app.listen(3001, () => {
	console.log("server is up");
}) 
