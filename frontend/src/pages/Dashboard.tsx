import { useEffect, useState } from "react";
import socket from "../socket/socket";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskService";
import type { Task } from "../services/taskService";

const SkeletonCard = () => {
  return (
    <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 animate-pulse">
      <div className="h-4 w-2/3 bg-white/20 rounded mb-3"></div>
      <div className="h-3 w-full bg-white/10 rounded mb-2"></div>
      <div className="h-3 w-5/6 bg-white/10 rounded mb-4"></div>

      <div className="flex justify-between items-center">
        <div className="h-3 w-24 bg-white/10 rounded"></div>
        <div className="h-6 w-16 bg-white/20 rounded-full"></div>
      </div>

      <div className="flex gap-2 mt-4">
        <div className="flex-1 h-8 bg-white/20 rounded-lg"></div>
        <div className="flex-1 h-8 bg-white/20 rounded-lg"></div>
      </div>
    </div>
  );
};

type FilterType = "all" | "pending" | "completed" | "overdue";
type SortType = "none" | "dueDate";

export default function Dashboard() {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState<
    "low" | "medium" | "high" | "urgent"
  >("medium");

  const [filter, setFilter] = useState<FilterType>("all");
  const [sortBy, setSortBy] = useState<SortType>("none");

  const [notifications, setNotifications] = useState<string[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const [unreadCount, setUnreadCount] = useState(0);

  /* Socket updates */
  useEffect(() => {
    socket.on("taskCreated", (task) => {
      setNotifications((prev) => [`🆕 Task created: ${task.title}`, ...prev]);
      setUnreadCount((c) => c + 1);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    });

    socket.on("taskUpdated", (task) => {
      setNotifications((prev) => [`✅ Task completed: ${task.title}`, ...prev]);
      setUnreadCount((c) => c + 1);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    });

    socket.on("taskDeleted", () => {
      setNotifications((prev) => [`❌ Task deleted`, ...prev]);
      setUnreadCount((c) => c + 1);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    });

    return () => {
      socket.off("taskCreated");
      socket.off("taskUpdated");
      socket.off("taskDeleted");
    };
  }, [queryClient]);

  /* Fetch tasks */
  const { data: tasks, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  /* Filtering */
  let visibleTasks = tasks ?? [];

  if (filter === "pending") {
    visibleTasks = visibleTasks.filter((t) => t.status !== "completed");
  }

  if (filter === "completed") {
    visibleTasks = visibleTasks.filter((t) => t.status === "completed");
  }

  if (filter === "overdue") {
    visibleTasks = visibleTasks.filter((t) => isOverdue(t));
  }

  /* Sorting */
  if (sortBy === "dueDate") {
    visibleTasks = [...visibleTasks].sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    );
  }

  /* Mutations */
  const createMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority("medium");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      updateTask(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate({ title, description, dueDate, priority });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white p-6">
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent">
          Task Management Dashboard
        </h1>

        <button
          onClick={() => {
            setShowNotifications(!showNotifications);
            setUnreadCount(0);
          }}
          className="absolute bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full shadow-lg hover:scale-105 transition"
        >
          🔔
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-2 rounded-full">
              {unreadCount}
            </span>
          )}
        </button>
      </div>
      <button
        onClick={() => {
          localStorage.removeItem("isAuth");
          window.location.href = "/login";
        }}
        className="px-4 py-2 bg-red-600 rounded-lg"
      >
        Logout
      </button>

      {/* Header */}
      <h1 className="text-4xl font-extrabold text-white mb-8 drop-shadow-[0_0_0px_rgba(99,102,241,0.6)]">
        🚀 Task Management Dashboard
      </h1>

      {/* Create Task */}
      <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-xl mb-12">
        <h2 className="text-xl font-semibold text-blue-300 mb-4">
          ➕ Create Task
        </h2>

        <form onSubmit={submitHandler} className="grid gap-5">
          <input
            className="p-3 rounded-lg bg-black/40 border border-white/10"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            className="p-3 rounded-lg bg-black/40 border border-white/10"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-3">
            <input
              type="date"
              className="p-3 rounded-lg bg-black/40 border border-white/10"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />

            <select
              value={priority}
              onChange={(e) =>
                setPriority(
                  e.target.value as "low" | "medium" | "high" | "urgent"
                )
              }
              className="p-3 rounded-lg bg-black/40 border border-white/10"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          <button className="bg-gradient-to-r from-blue-500 to-purple-600 py-3 rounded-lg font-semibold">
            Add Task
          </button>
        </form>
      </div>

      {/* Filters & Sort */}
      <div className="flex flex-wrap gap-4 mb-10">
        {["all", "pending", "completed", "overdue"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as FilterType)}
            className={`px-4 py-2 rounded-full text-sm ${
              filter === f
                ? "bg-gradient-to-r from-blue-500 to-purple-500"
                : "bg-white/5 hover:bg-white/15 transition"
            }`}
          >
            {f.toUpperCase()}
          </button>
        ))}

        <button
          onClick={() => setSortBy(sortBy === "dueDate" ? "none" : "dueDate")}
          className="ml-auto px-4 py-2 rounded-full bg-white/10"
        >
          Sort by Due Date
        </button>
      </div>

      {/* Task Cards */}
      {isLoading ? (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {visibleTasks.map((task: Task) => (
            <div
              key={task._id}
              className={`p-6 rounded-3xl shadow-xl backdrop-blur-xl border border-white/10 hover:scale-[1.02] transition
        ${
          isOverdue(task)
            ? "bg-gradient-to-br from-red-600/30 to-red-900/40"
            : "bg-white/10"
        }`}
            >
              {/* existing task card content */}
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg text-blue-300">
                  {task.title}
                </h3>
                <PriorityBadge priority={task.priority} />
              </div>

              <p className="text-sm text-gray-300">
                {task.description || "No description"}
              </p>

              <p className="text-xs text-gray-400 mt-3">
                📅 Due: {task.dueDate}
              </p>

              <div className="flex gap-2 mt-4">
                {!isOverdue(task) && task.status !== "completed" && (
                  <button
                    onClick={() =>
                      updateMutation.mutate({
                        id: task._id,
                        status: "completed",
                      })
                    }
                    className="flex-1 bg-green-600 py-2 rounded-lg text-sm"
                  >
                    Complete
                  </button>
                )}

                <button
                  onClick={() => deleteMutation.mutate(task._id)}
                  className="flex-1 bg-red-600 py-2 rounded-lg text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showNotifications && (
        <div className="fixed top-0 right-0 h-full w-80 bg-black/80 backdrop-blur-xl border-l border-white/10 p-5 z-40 transform transition-transform duration-300 translate-x-0">
          <h2 className="text-xl font-bold text-blue-300 mb-6">
            Notifications
          </h2>

          {notifications.length === 0 ? (
            <p className="text-gray-400 text-sm">No notifications yet</p>
          ) : (
            <ul className="space-y-3">
              {notifications.map((note, index) => (
                <li key={index} className="bg-white/10 p-3 rounded-lg text-sm">
                  {note}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

/* Priority Badge */
const PriorityBadge = ({ priority }: { priority: string }) => {
  const colors: any = {
    low: "bg-green-500/20 text-green-400",
    medium: "bg-yellow-500/20 text-yellow-300",
    high: "bg-orange-500/20 text-orange-400",
    urgent: "bg-red-500/20 text-red-400",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[priority]}`}
    >
      {priority}
    </span>
  );
};

/* Overdue logic */
const isOverdue = (task: Task) => {
  const today = new Date().setHours(0, 0, 0, 0);
  const due = new Date(task.dueDate).setHours(0, 0, 0, 0);
  return task.status !== "completed" && due < today;
};
