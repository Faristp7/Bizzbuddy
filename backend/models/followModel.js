import mongoose, { Schema } from "mongoose";

const followSchema = new mongoose.Schema({
  followerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  followingId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
});

followSchema.pre("validate", function (next) {
  if (this.followerId.equals(this.followingId)) {
    const err = new Error("User cannot follow themselves");
    next(err);
  } else {
    next();
  }
});

const FollowModel = mongoose.model("Follow", followSchema);
export default FollowModel;
