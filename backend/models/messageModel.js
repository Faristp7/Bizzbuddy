import mongoose, { Schema } from "mongoose";

const messageSchema = new mongoose.Schema({
  conversationId: {
    type: String,
    required: true,
    unique: true,
  },
  participants: [
    {
      type: Schema.Types.ObjectId,
      required: true,
    },
  ],
  messages: [
    {
      senderId: {
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
});

const messageModel = mongoose.model("Message", messageSchema);
export default messageModel;
