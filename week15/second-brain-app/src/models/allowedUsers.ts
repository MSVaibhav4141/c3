import mongoose, { model, Schema } from 'mongoose'


type AllowedUserType = {
    owner:mongoose.Types.ObjectId,
    allowedTo:mongoose.Types.ObjectId
}
const allowedUserSchema = new Schema({
    owner : {
        type: mongoose.Types.ObjectId,
        ref:'User'
    },
    allowedTo:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    }
})

export const AllowedUser = model<AllowedUserType>('allowedUser', allowedUserSchema)