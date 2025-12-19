import Task from "../models/Task";

export const createTask = async (data: any) => {
  return await Task.create(data);
};

export const getTasksByUser = async (userId: string) => {
  return await Task.find({ user: userId });
};

export const getTaskById = async (taskId: string) => {
  return await Task.findById(taskId);
};

export const updateTask = async (taskId: string, data: any) => {
  return await Task.findByIdAndUpdate(taskId, data, { new: true });
};

export const deleteTask = async (taskId: string) => {
  return await Task.findByIdAndDelete(taskId);
};
