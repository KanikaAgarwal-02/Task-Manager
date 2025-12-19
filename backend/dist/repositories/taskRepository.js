"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTaskById = exports.getTasksByUser = exports.createTask = void 0;
const Task_1 = __importDefault(require("../models/Task"));
const createTask = async (data) => {
    return await Task_1.default.create(data);
};
exports.createTask = createTask;
const getTasksByUser = async (userId) => {
    return await Task_1.default.find({ user: userId });
};
exports.getTasksByUser = getTasksByUser;
const getTaskById = async (taskId) => {
    return await Task_1.default.findById(taskId);
};
exports.getTaskById = getTaskById;
const updateTask = async (taskId, data) => {
    return await Task_1.default.findByIdAndUpdate(taskId, data, { new: true });
};
exports.updateTask = updateTask;
const deleteTask = async (taskId) => {
    return await Task_1.default.findByIdAndDelete(taskId);
};
exports.deleteTask = deleteTask;
