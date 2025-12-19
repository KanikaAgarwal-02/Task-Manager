import { Router } from "express";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} from "../controllers/taskControllers";
import { protect } from "../middlewares/authMiddleware";

const router = Router();

router.use(protect);

router.post("/", protect, createTask);
router.get("/", protect, getTasks);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);

export default router;
