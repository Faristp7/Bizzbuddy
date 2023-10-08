import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
    },
    password: {
      type: String,
    },
    bio: {
      type: String,
    },
    profileImage: {
      type: String,
      default:
        "https://lh3.googleusercontent.com/pw/ADCreHfCGxjp-YU9hZn8Mza2BWQLIoQza0mRF1dQ8Lo7H7h8xEPcZSZqH70tqeeiuRqaQwnuBqtR56r3M43UpA1b5HRANUvHdhsQe97J5Y_UT_Kk5UYeiWCGSo8LLr0WgNTFuYjpJV0qSPt6vB2wbuIfD6nt=w400-h400-s-no?authuser=0",
    },
    activeStatus: {
      type: Boolean,
      default: true,
    },
    bussinessId: {
      type: Schema.Types.ObjectId,
      ref: "Business",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(this.password, salt);

    this.password = hashedPassword;

    return next();
  } catch (error) {
    console.log(error);
  }
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
