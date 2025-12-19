import { io } from "socket.io-client";

const socket = io(
  "https://task-manager-backend-lef3.onrender.com",
  {
    withCredentials: true,
    transports: ["websocket"],
  }
);

export default socket;
