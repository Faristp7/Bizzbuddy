import "dotenv/config";
import cors from "cors";
import http from "http";
import morgan from "morgan";
import express from "express";
import { Server } from "socket.io";
import dbConnect from "./config/config.js";
import userRouter from "./routers/userRoute.js";
import configureSocket from "./config/socket.js";
import adminRouter from "./routers/adminRoute.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

const corsOptions = {
  origin: [process.env.FRONTEND],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD"],
  credentials: true,
};

app.use(cors(corsOptions));

dbConnect();

const server = http.createServer(app);
const io = new Server(server, {
  cors: corsOptions,
});

configureSocket(io)

app.use("/", userRouter);
app.use("/admin", adminRouter);

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export { io };
