import mongoose, { model, Schema } from "mongoose";

const tokenSchema = new Schema({
    token:{
        type: String,
        require: true
    },

    userId:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

tokenSchema.index({createdAt:1}, {expireAfterSeconds:3600})

export const Token = model('Token', tokenSchema);