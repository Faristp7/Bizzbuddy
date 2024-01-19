import { sendMessage } from "../controllers/userController.js";

const configureSocket = (io) => {
  io.on("connection", (socket) => {

    socket.on("joinRoom", (conversationId) => {
      socket.join(conversationId)
    });

    socket.on("sendMessage", (data) => {
      socket.broadcast.to(data.conversationId).emit("receiveMessage", data);
      sendMessage(data)
    });

    socket.on("disconnect", () => {
      console.log("disconnected", socket.id);
    });

    socket.on("error", (error) => {
      console.log("socket error", error);
    });
  });
};

export default configureSocket;
