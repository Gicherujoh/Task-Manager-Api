import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getTasks = (status) =>
  API.get(`/tasks${status ? `?status=${status}` : ""}`);

export const createTask = (data) => API.post("/tasks", data);

export const updateTaskStatus = (id, status) =>
  API.patch(`/tasks/${id}/status`, { status });

export const deleteTask = (id) =>
  API.delete(`/tasks/${id}`);

export const getDailyReport = (date) =>
  API.get(`/tasks/report?date=${date}`);