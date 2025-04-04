import mongoose, { model, ObjectId } from "mongoose";
import { string } from "zod";


const LinkSchema = new mongoose.Schema({

    hash :String,
    contentId : {
        type:mongoose.Types.ObjectId,
        ref:"Content"
    }
})

type LinkSchemaModel = {
    hash:string,
    contentId: ObjectId
}
export const LinkModel = model<LinkSchemaModel>('Link', LinkSchema);