import mongoose, { model, ObjectId } from "mongoose";


const LinkSchema = new mongoose.Schema({

    hash :String,
    contentId : {
        type:mongoose.Types.ObjectId,
        ref:"Content"
    },
    userId : {
        type:mongoose.Types.ObjectId,
        ref:"User"
    }
})

type LinkSchemaModel = {
    hash:string,
    contentId: ObjectId,
    userId:ObjectId
}
export const LinkModel = model<LinkSchemaModel>('Link', LinkSchema);