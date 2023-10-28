import mongoose, { Schema } from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    roomId: {
      type: String,
      required: true,
    },
    recipientId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    messages: [
      {
        sender: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        message: {
          type: String,
          required: true,
        },
        timestamps: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

const messageModel = mongoose.model("Message", messageSchema);
export default messageModel;
