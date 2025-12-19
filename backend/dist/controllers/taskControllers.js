"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTasks = exports.createTask = void 0;
const taskService = __importStar(require("../services/taskService"));
const sockets_1 = require("../sockets");
const createTask = async (req, res) => {
    try {
        const { title, description, dueDate } = req.body;
        const userId = req.userId;
        const task = await taskService.createTask(title, description, dueDate, userId);
        (0, sockets_1.emitTaskUpdate)("taskCreated", task);
        res.status(201).json(task);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.createTask = createTask;
const getTasks = async (req, res) => {
    try {
        const userId = req.userId;
        const tasks = await taskService.getMyTasks(userId);
        res.json(tasks);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.getTasks = getTasks;
const updateTask = async (req, res) => {
    try {
        const userId = req.userId;
        const taskId = req.params.id;
        const task = await taskService.updateTask(taskId, req.body, userId);
        (0, sockets_1.emitTaskUpdate)("taskUpdated", task);
        res.json(task);
    }
    catch (error) {
        res.status(403).json({ message: error.message });
    }
};
exports.updateTask = updateTask;
const deleteTask = async (req, res) => {
    try {
        const userId = req.userId;
        const taskId = req.params.id;
        await taskService.deleteTask(taskId, userId);
        (0, sockets_1.emitTaskUpdate)("taskDeleted", taskId);
        res.json({ message: "Task deleted successfully" });
    }
    catch (error) {
        res.status(403).json({ message: error.message });
    }
};
exports.deleteTask = deleteTask;
