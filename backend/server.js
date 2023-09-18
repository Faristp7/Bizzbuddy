import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import dbConnect from "./config/config.js";
import userRouter from "./routers/userRoute.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  cors({
    origin: [process.env.FRONTEND],
    methods: ["get", "post", "delete", "put", "patch"],
    credentials: true,
  })
);

app.use("/", userRouter);

dbConnect();

const port = process.env.PORT;
app.listen(port || 5000, () => {
  console.log(`server running on ${port}`);
});
