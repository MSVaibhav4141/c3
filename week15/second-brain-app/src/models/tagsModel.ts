import { model, Schema } from "mongoose";

const tagSchema = new Schema({
    tag: String
})

export const Tags = model('Tag',tagSchema )