"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emitTaskUpdate = exports.initSocket = void 0;
let io;
const initSocket = (serverIo) => {
    io = serverIo;
    io.on("connection", socket => {
        console.log("🔌 Socket connected:", socket.id);
        socket.on("disconnect", () => {
            console.log("❌ Socket disconnected:", socket.id);
        });
    });
};
exports.initSocket = initSocket;
const emitTaskUpdate = (event, data) => {
    if (io) {
        io.emit(event, data);
    }
};
exports.emitTaskUpdate = emitTaskUpdate;
