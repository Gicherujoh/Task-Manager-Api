import axios from "axios";

const baseURL =
    import.meta.env.MODE === "development"
    ? import.meta.env.VITE_BACKEND_LOCAL + "/api"
    : import.meta.env.VITE_BACKEND_URL;

    console.log(import.meta.env.VITE_BACKEND_URL)
const API = axios.create({ baseURL });

export const getTasks = (status) =>
  API.get(`/tasks${status ? `?status=${status}` : ""}`);

export const createTask = (data) => API.post("/tasks", data);

export const updateTaskStatus = (id, status) =>
  API.patch(`/tasks/${id}/status`, { status });

export const deleteTask = (id) =>
  API.delete(`/tasks/${id}`);

export const getDailyReport = (date) =>
  API.get(`/tasks/report?date=${date}`);