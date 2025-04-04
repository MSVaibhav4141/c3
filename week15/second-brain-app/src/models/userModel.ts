import mongoose, { model } from "mongoose";
import { boolean } from "zod";

const userScehma = new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        require:true
    },
    username :{
        type:String,
        unique:true,
        require:true
    },
    password:{
        type:String,
        select:false,
        unique:true,
        require:true,
    },
    accountType:{
        type:Boolean,
        default:false
    }
})

export const User = model('User', userScehma);