import * as taskRepository from "../repositories/taskRepository";

export const createTask = async (
  title: string,
  description: string,
  dueDate: Date | undefined,
  userId: string
) => {
  return await taskRepository.createTask({
    title,
    description,
    dueDate,
    user: userId
  });
};

export const getMyTasks = async (userId: string) => {
  return await taskRepository.getTasksByUser(userId);
};

export const updateTask = async (
  taskId: string,
  data: any,
  userId: string
) => {
  const task = await taskRepository.getTaskById(taskId);
  if (!task) throw new Error("Task not found");

  if (task.user.toString() !== userId) {
    throw new Error("Not authorized");
  }

  return await taskRepository.updateTask(taskId, data);
};

export const deleteTask = async (taskId: string, userId: string) => {
  const task = await taskRepository.getTaskById(taskId);
  if (!task) throw new Error("Task not found");

  if (task.user.toString() !== userId) {
    throw new Error("Not authorized");
  }

  return await taskRepository.deleteTask(taskId);
};
