const socketIO = require("socket.io");

class SocketService {
  constructor() {
    this.io = null;
  }

  init(server) {
    this.io = socketIO(server, {
      cors: {
        origin: "*",
        credentials: true,
      },
      pingInterval: 25000,
      pingTimeout: 60000,
    });

    this.io.on("connection", (socket) => {
      console.log("Socket connected:", socket.id);

      socket.on("disconnect", () => {
        console.log("Socket disconnected:", socket.id);
      });
    });
  }

  getIO() {
    if (!this.io) {
      throw new Error("Socket.io not initialized. Call init(server) first.");
    }
    return this.io;
  }
}

module.exports = new SocketService();
