import api from "./api";

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: "pending" | "completed";
  priority: "low" | "medium" | "high" | "urgent";
  dueDate: string;
  user: string;
}

/* Get all tasks */
export const getTasks = async (): Promise<Task[]> => {
  const res = await api.get("/tasks");
  return res.data;
};

/* Create task */
export const createTask = async (data: {
  title: string;
  description: string;
  dueDate: string;
  priority: "low" | "medium" | "high" | "urgent";
}) => {
  const res = await api.post("/tasks", data);
  return res.data;
};

/* Update task status */
export const updateTask = async (id: string, status: string) => {
  const res = await api.put(`/tasks/${id}`, { status });
  return res.data;
};

/* Delete task */
export const deleteTask = async (id: string) => {
  const res = await api.delete(`/tasks/${id}`);
  return res.data;
};
