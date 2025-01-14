// process.argv // will give you all the passed arg in cli
// not in window run alias <desiredname> = 'node index.js' so its a cli like now i can run desiredname -h and itll run try it 
const fs = require('fs')
const {Command} = require('commander')
const path = require('path')
const program = new Command()

program
.name('todo')
.description('Adding todo to file')
.version('0.0.1')

program.command('add')
.description('Add todo to desired file')
.option('--upper','Upper  case your todo')
.option('--lower','Lower  case your todo')
.argument('<todo>','name of the todo in the list')
.action((file,option) =>{
   const dataFetched =  fs.readFileSync(path.join(__dirname,'todo.json'),'utf-8', (err,data) => {
        if(err){
            console.log(err)
        }
    })

    const data = dataFetched ? JSON.parse(dataFetched) : []
    const todo = option.upper ? file.toUpperCase() : (option.lower ? file.toLowerCase() : file)
    data.push(
        {
        id:data[data.length - 1]?.id + 1 || 1,
        title:todo,
        time:(new Date()).toLocaleTimeString(), 
        date:(new Date()).toLocaleDateString()
        }
    )

    const dataToWrite = JSON.stringify(data)
    fs.writeFile(path.join(__dirname,'todo.json'),dataToWrite,(err,data) => {
    if(err){
        console.log(err)
    }else{
        console.log('Todo Added Successfully')
    }
   } )
})

program.command('update')
.description('update todo to an exsisting todo')
.option('--upper','Upper  case your todo')
.option('--lower','Lower  case your todo')
.argument('<id>','id of the todo in the list')
.argument('<todo>','name of the todo in the list')
.action((id,newTodo,option) =>{
   const dataFetched =  fs.readFileSync(path.join(__dirname,'todo.json'),'utf-8', (err,data) => {
        if(err){
            console.log(err)
        }
    })

    const data = dataFetched ? JSON.parse(dataFetched) : []
    
    if(data.length === 0)return;
    
    const todo = option.upper ? newTodo.toUpperCase() : (option.lower ? newTodo.toLowerCase() : newTodo)
    
    console.log(data)
    const obj = data.find(item => item.id == id)
    console.log(obj)
    if(obj){
        obj.title = todo
    }else{
        return new Error("No todo with given id")
    }
    const dataToWrite = JSON.stringify(data)
    fs.writeFile(path.join(__dirname,'todo.json'),dataToWrite,(err,data) => {
    if(err){
        console.log(err)
    }else{
        console.log('Todo updated Successfully')
    }
   } )
})

program.command('delete')
.description('delete todo to an exsisting todo')
.argument('<id>','id of the todo in the list')
.action((id) =>{
   const dataFetched =  fs.readFileSync(path.join(__dirname,'todo.json'),'utf-8', (err,data) => {
        if(err){
            console.log(err)
        }
    })

    const data = dataFetched ? JSON.parse(dataFetched) : []
    
    if(data.length === 0)return;
    const obj = data.find(item => item.id === Number(id))
    if(!obj){
        console.error("No todo with given id")
        return
    }
    const dataFiltered = data.filter(item => item.id !== Number(id)).map((i,index) => ({...i,id:index+1}))
    
   

    const dataToWrite = JSON.stringify(dataFiltered)

    fs.writeFile(path.join(__dirname,'todo.json'),dataToWrite,(err,data) => {
    if(err){
        console.log(err)
    }else{
        console.log('Todo deleted Successfully')
    }
   } )
})


program.parse()