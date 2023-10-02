import mongoose, { Schema } from "mongoose";

const businessSchema = new mongoose.Schema(
  {
    bussinessName: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref : "User"
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
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

const businessModel = mongoose.model("Business", businessSchema);
export default businessModel;
