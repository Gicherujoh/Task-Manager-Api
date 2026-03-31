import Task from "../models/Task.js";
import { Op } from "sequelize";

/**
 * CREATE TASK
 */
export const createTask = async (req, res) => {
  try {
    const { title, due_date, priority } = req.body;

    // Rule: due_date must be today or later
    if (new Date(due_date) < new Date().setHours(0, 0, 0, 0)) {
      return res.status(400).json({ message: "Due date must be today or later" });
    }

    // Rule: no duplicate title + due_date
    const existing = await Task.findOne({
      where: { title, due_date },
    });

    if (existing) {
      return res.status(400).json({ message: "Task already exists for this date" });
    }

    const task = await Task.create({ title, due_date, priority });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * LIST TASKS
 */
export const getTasks = async (req, res) => {
  try {
    const { status } = req.query;

    const where = status ? { status } : {};

    const tasks = await Task.findAll({
      where,
      order: [
        ["priority", "DESC"],
        ["due_date", "ASC"],
      ],
    });

    if (!tasks.length) {
      return res.json({ message: "No tasks found", data: [] });
    }

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * UPDATE STATUS
 */
export const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const task = await Task.findByPk(id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    const validTransitions = {
      pending: "in_progress",
      in_progress: "done",
    };

    if (validTransitions[task.status] !== status) {
      return res.status(400).json({ message: "Invalid status transition" });
    }

    task.status = status;
    await task.save();

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * DELETE TASK
 */
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByPk(id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    if (task.status !== "done") {
      return res.status(403).json({ message: "Only done tasks can be deleted" });
    }

    await task.destroy();

    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * DAILY REPORT (BONUS)
 */
export const getDailyReport = async (req, res) => {
  try {
    const { date } = req.query;

    const tasks = await Task.findAll({ where: { due_date: date } });

    const summary = {
      high: { pending: 0, in_progress: 0, done: 0 },
      medium: { pending: 0, in_progress: 0, done: 0 },
      low: { pending: 0, in_progress: 0, done: 0 },
    };

    tasks.forEach((task) => {
      summary[task.priority][task.status]++;
    });

    res.json({ date, summary });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};