import express from "express";
import {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask,
  getDailyReport,
} from "../controllers/taskController.js";
import { validateTask } from "../middleware/validateTask.js";
const router = express.Router();

router.post("/tasks",validateTask, createTask);
router.get("/tasks", getTasks);
router.patch("/tasks/:id/status", updateTaskStatus);
router.delete("/tasks/:id", deleteTask);
router.get("/tasks/report", getDailyReport);

export default router;