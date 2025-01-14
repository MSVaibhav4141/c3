const express = require('express')
const router = express.Router()
var uniqid = require('uniqid'); 
const fs = require('fs');
const path = require('path');


// CREATE TODOS  
router.post('/add', (req, res) => {

    if(!req.body.title){
        return res.status(404).json({
            err:'Please enter the todo'
        })
    }

    const todo = {
        id:uniqid(),
        title:req.body.title,
        date: (new Date()).toLocaleTimeString()
    }

    //Reading data from the todos.json
    const data = fs.readFile(path.join(__dirname,'../todos.json'), 'utf-8', (err, data) => {
        if(err){
           return res.status(500).json({
                message:err.message
            })
        }else{

            // Fetching data and parsing it 
            const dataFetched = data ? JSON.parse(data) : []
            dataFetched.push(todo)
            console.log(dataFetched)
            const newData = JSON.stringify(dataFetched)

            // Writing data to file 
            fs.writeFile(path.join(__dirname,'../todos.json'),newData,(err , data) => {
                if(err){
                    return res.status(200).json({
                        err:err?.message
                    })
                }else{
                    return res.status(200).json({ 
                        message:'Todo added successfully'
                    })
                }
            })
        }
    })
   
})


//GET ALL TODOS
router.get('/todos', (req, res) => {
    fs.readFile(path.join(__dirname,'../todos.json'),'utf-8', (err, data) => {
        if(err){
            return res.status(200).json({
                err:err?.message
            })
        }else{
            const todos = JSON.parse(data)
            return res.status(200).json({
                todos
            })
        }
    })
})


// UPDATE TODOS
router.put('/update', (req,res) => {
    const {title , id} = req.body;

    if(!title){  
        return res.status(404).json({
            err:'Please enter the todo'
        })
    }

    fs.readFile(path.join(__dirname,'../todos.json'), 'utf8', (err, data)=> {
        if(err){
            return res.status(500).json({
                err:err.message
            })
        }else{
            const dataFetched = JSON.parse(data)
            const obj = dataFetched.find(item => item.id === id)

            if(!obj){
                return res.status(404).json({
                    err:'Please enter the correct id'
                })
            }

            obj.title = req.body.title
            const newData = JSON.stringify(dataFetched)

            fs.writeFile(path.join(__dirname,'../todos.json'), newData, (err, data) => {
                if(err){
                    return res.status(500).json({
                        err:err.message
                    })
                }else{
                    return res.status(200).json({
                        message:`Todo with ${id} is updated`
                    })
                }
            })
        }
    })
})



// DELETE A TODO
router.delete('/delete', (req, res) => {
    const {id} = req.body;

    if(!id){
        return res.status(404).json({
            err:'Please enter the id'
        })
    }

    fs.readFile(path.join(__dirname,'../todos.json'), 'utf-8', (err, data) => {
        if(err){
            return res.status(500).json({
                err:err.message
            })
        }else{
            const dataFetched = JSON.parse(data)
            const filterData = dataFetched.filter(item => item.id !== id)
            const newData = JSON.stringify(filterData)

            fs.writeFile(path.join(__dirname, '../todos.json'), newData, (err) => {
                if(err){
                    return res.status(500).json({
                        err:err.message
                    })
                }else{
                    return res.status(200).json({
                        message:`Todo with ${id} is deleted`
                    })
                }
            })

        }
    })
})


module.exports = router;