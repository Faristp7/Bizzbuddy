import mongoose, { Schema } from "mongoose";
import Comment from "./commentModel.js";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    view: {
      type : Boolean,
      default : false
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        default : [],
      },
    ],
    reports: [
      {
        userId: {
          type: String,
          required: true,
        },
        message: {
          type: String,
          required: true,
        },
      },
    ],
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    comments: [Comment.schema],
  },
  { timestamps: true }
);

const postModel = mongoose.model("Post", postSchema);
export default postModel;
