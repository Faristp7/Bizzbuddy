import mongoose, { Schema } from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    recipientId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const messageModel = mongoose.model("Message", messageSchema);
export default messageModel;
