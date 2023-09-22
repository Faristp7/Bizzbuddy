import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const adminSchema = new mongoose.Schema({
  adminName: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
});

const adminModel = mongoose.model("admin", adminSchema);
export default adminModel;
