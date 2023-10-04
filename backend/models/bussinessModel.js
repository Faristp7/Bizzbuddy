import mongoose, { Schema } from "mongoose";

const businessSchema = new mongoose.Schema(
  {
    bussinessName: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    Description: {
      type: String,
    },
    bannerImage: {
      type: String,
      default:
        "https://lh3.googleusercontent.com/pw/ADCreHdhXl06FAM-isf-foliJ3Z9_683JRwNj7S3NtA9a7OVuM--UC12wcJHwmqwSh7RqKsvECrmll5hQQeEf-W7oTZCwDKw9j0ex5SYoR0BsyUrDeVIRTaBizICpK3gBZOGlOO8OvQ-XFF_FINSZl8otPFz=w1080-h607-s-no?authuser=0",
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
