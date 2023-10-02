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
      default : 'https://photos.app.goo.gl/775Ky9eDSLgW8KiJ6'
    },
    bannerImage : {
      type :String,
      default : 'https://photos.app.goo.gl/ecD4H5qJoMXPHU7r6'
    },
    activeStatus: {
      type: Boolean,
      default: true,
    },
    bussinessId : {
      type : Schema.Types.ObjectId,
      ref: 'Business'
    }
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
