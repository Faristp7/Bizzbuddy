import "dotenv/config";
import express from "express";
import cors from "cors";
import dbConnect from "./config/config.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: [process.env.FRONTEND],
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true,
  })
);

dbConnect();

const port = process.env.PORT;
app.listen(port || 5000, () => {
  console.log(`server running on ${port}`);
});
