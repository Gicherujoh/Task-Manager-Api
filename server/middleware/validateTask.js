// middleware/validateTask.js
export const validateTask = (req, res, next) => {
  const { title, due_date, priority } = req.body;

  if (!title || !due_date || !priority) {
    return res.status(400).json({ error: "title, due_date, and priority are required" });
  }

  const allowedPriorities = ["low", "medium", "high"];
  if (!allowedPriorities.includes(priority)) {
    return res.status(400).json({ error: "priority must be low, medium, or high" });
  }

  // Optional: check date format
  if (!/^\d{4}-\d{2}-\d{2}$/.test(due_date)) {
    return res.status(400).json({ error: "due_date must be in YYYY-MM-DD format" });
  }

  next();
};