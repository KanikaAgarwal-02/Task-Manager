import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";
import userRoutes from "./routes/userRoutes";
import testRoutes from "./routes/testRoutes";
import cookieParser from "cookie-parser";
import taskRoutes from "./routes/taskRoutes";
import { initSocket } from "./sockets";

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(
  cors({ 
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "https://task-manager-virid-kappa-44.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/test", testRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("Task Manager API is running 🚀");
});

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "https://task-manager-virid-kappa-44.vercel.app",
    ],
    credentials: true,
  }
});

initSocket(io);

io.on("connection", socket => {
  console.log("🔌 User connected:", socket.id);
});

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ Mongo Error", err));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
