import mongoose, { Schema } from "mongoose";

const messageSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
  },
  userid: [
    {
      userIds: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
      },
    },
  ],
  messages: [
    {
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
