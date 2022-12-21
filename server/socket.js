let io;

module.exports = {
  init: (httpServer) => {
    const { Server } = require("socket.io");

    io = new Server(httpServer, {
      cors: {
        origin: ["http://localhost:3001", "http://localhost:3002"],
        methods: ["GET", "POST"],
      },
    });
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error("Socket.io not initialized");
    }
    return io;
  },
};
