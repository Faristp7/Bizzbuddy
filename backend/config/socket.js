const configureSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("Socket connected", socket.id);

    socket.on("joinRoom", (conversationId) => {
      socket.join(conversationId)
    });

    socket.on("sendMessage", (data) => {
      io.to(data.conversationId).emit("receiveMessage", data);
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
