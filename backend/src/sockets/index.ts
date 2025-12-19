import { Server } from "socket.io";

let io: Server;

export const initSocket = (serverIo: Server) => {
  io = serverIo;

  io.on("connection", socket => {
    console.log("🔌 Socket connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected:", socket.id);
    });
  });
};

export const emitTaskUpdate = (event: string, data: any) => {
  if (io) {
    io.emit(event, data);
  }
};
