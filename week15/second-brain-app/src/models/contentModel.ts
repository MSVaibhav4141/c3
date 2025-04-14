import mongoose, { model } from "mongoose";
import { string } from "zod";

const contentSchema = new mongoose.Schema({
  link: {
    type: String,
  },
  type: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  body: {
    type: String,
  },
  tags: [
    {
      type: String,
    },
  ],
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  html: {
    type: String
  },
  isBookMark:{
    type:Boolean
  }
});

export const ContentModel = model("Content", contentSchema);
