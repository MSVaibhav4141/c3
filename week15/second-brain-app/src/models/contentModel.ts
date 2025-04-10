import mongoose, { model } from "mongoose";

const contentSchema = new mongoose.Schema({
    link:{
        type:String,
    },
    type: {
        type:String,
        require: true
    },
    title:{
        type:String,
        require:true
    },
    tags:[{
        type:String
    }],
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    }
})

export const ContentModel = model('Content', contentSchema);