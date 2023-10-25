import "dotenv/config";
import cors from "cors";
import http from "http";
import morgan from "morgan";
import express from "express";
import { Server } from "socket.io";
import dbConnect from "./config/config.js";
import userRouter from "./routers/userRoute.js";
import adminRouter from "./routers/adminRoute.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(
  cors({
    origin: [process.env.FRONTEND],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD"],
    credentials: true,
  })
);

dbConnect();

const server = http.createServer(app);
const io = new Server(server);

app.use("/", userRouter);
app.use("/admin", adminRouter);


const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

io.use((socket, next) => {
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD"],
    credentials: true,
  })(socket.request, socket.request.res, next);
});

io.on("connection", (socket) => {
  console.log("A user connected" , socket);
});

export { io };
