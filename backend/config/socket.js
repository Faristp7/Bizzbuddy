const configureSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    socket.on("joinRoom", (data) => {
      socket.join(data);
    });

    socket.on("sendMessage", (data) => {
      socket.to(data.room).emit("receiveMessage", data);
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
