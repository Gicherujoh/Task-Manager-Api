import axios from "axios";

// frontend/api.js
// const baseURL = import.meta.env.MODE === "development"
//     ? `${import.meta.env.VITE_BACKEND_LOCAL}/api`
//     : import.meta.env.VITE_BACKEND_URL; // This already has /api
const baseURL = import.meta.env.VITE_BACKEND_URL 
  ? import.meta.env.VITE_BACKEND_URL 
  : "http://localhost:5000/api";

console.log("Active API URL:", baseURL);
  console.log("Axios Base URL:", baseURL); //
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