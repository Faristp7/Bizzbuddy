import mongoose, { Schema } from "mongoose";

const messageSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
  },
  messages: [
    {
      userId: {
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
