import { Request, Response } from "express";
import * as taskService from "../services/taskService";
import { emitTaskUpdate } from "../sockets";

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, dueDate } = req.body;
    const userId = (req as any).userId;

    const task = await taskService.createTask(
      title,
      description,
      dueDate,
      userId
    );

    emitTaskUpdate("taskCreated", task);

    res.status(201).json(task);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const tasks = await taskService.getMyTasks(userId);
    res.json(tasks);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const taskId = req.params.id;

    const task = await taskService.updateTask(
      taskId,
      req.body,
      userId
    );

    emitTaskUpdate("taskUpdated", task);

    res.json(task);
  } catch (error: any) {
    res.status(403).json({ message: error.message });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const taskId = req.params.id;

    await taskService.deleteTask(taskId, userId);

    emitTaskUpdate("taskDeleted", taskId);

    res.json({ message: "Task deleted successfully" });
  } catch (error: any) {
    res.status(403).json({ message: error.message });
  }
};
