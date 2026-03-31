import { useState } from "react";
import "./TaskForm.css";

const TaskForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    title: "",
    due_date: "",
    priority: "low",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form);
    setForm({ title: "", due_date: "", priority: "low" });
  };

  return (
    <div className="task-form-card">
      <h2>Add New Task</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          required
        />

        <input
          type="date"
          value={form.due_date}
          onChange={(e) =>
            setForm({ ...form, due_date: e.target.value })
          }
          required
        />

        <select
          value={form.priority}
          onChange={(e) =>
            setForm({ ...form, priority: e.target.value })
          }
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>

        <button type="submit">+ Add Task</button>
      </form>
    </div>
  );
};

export default TaskForm;