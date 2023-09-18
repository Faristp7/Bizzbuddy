import mongoose from "mongoose";

const url = process.env.MONGODB;
function dbConnect() {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(url)
    .then(() => console.log("database connected"))
    .catch((err) => console.log(err));
}
export default dbConnect;
