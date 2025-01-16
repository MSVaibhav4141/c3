const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const userSchema = new Schema({
    name:String,
    email:{
        type:String,
        unique:true,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    }
})

const todoSchema = new Schema({ 
    description:{
        type:String,
        require:true
    },
    isCompleted:{
        type:Boolean,
        default:false
    },
    userId:{
        type:ObjectId,
        ref:'User'
    },
    time:{
        type:String,
        default:(new Date()).toISOString()
    },
    toBeCompleted:{
        type:String,
    }
})

const User = mongoose.model('User', userSchema);
const Todo = mongoose.model('Todo', todoSchema);

module.exports ={
    User,
    Todo
}