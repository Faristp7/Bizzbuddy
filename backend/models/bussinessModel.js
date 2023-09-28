import mongoose from "mongoose";

const bussinessSchema = new mongoose.Schema(
  {
    bussinessName: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
    },
    phone: {
      type: Number,
    },
    email: {
      type: String,
    },
    location: {
      type: String,
    },
    tags: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const bussinessModel = mongoose.model("Bussiness", bussinessSchema);
export default bussinessModel;
