import { useEffect, useState } from "react";
import "./Home.css"
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import DailyReport from "../components/DailyReport"
import {
  getTasks,
  createTask,
  updateTaskStatus,
  deleteTask,
  getDailyReport
} from "../services/api";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [report, setReport] = useState(null);
  const [reportDate, setReportDate] = useState("");

  // Fetch all tasks
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
      setError("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };
  const fetchReport = async () => {
  try {
    if (!reportDate) {
      alert("Select a date first");
      return;
    }

    const res = await getDailyReport(reportDate);
    setReport(res.data);
  } catch (err) {
    console.error("Failed to fetch report:", err);
  }
};
  useEffect(() => {
    fetchTasks();
  }, []);

  // Add new task
  const handleAdd = async (data) => {
    try {
      // Ensure required fields exist
      if (!data.title || !data.due_date || !data.priority) {
        alert("Please provide title, due date, and priority");
        return;
      }
      await createTask(data);
      fetchTasks();
    } catch (err) {
      console.error("Failed to add task:", err);
      alert("Failed to add task.");
    }
  };

  // Update task status
  const handleUpdate = async (id, status) => {
    try {
      await updateTaskStatus(id, status);
      fetchTasks();
    } catch (err) {
      console.error("Failed to update task:", err);
      alert("Failed to update task.");
    }
  };

  // Delete task
  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (err) {
      console.error("Failed to delete task:", err);
      alert("Failed to delete task.");
    }
  };

  return (
    <div>
      <h1>Task Manager</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <TaskForm onAdd={handleAdd} />
      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        
        <TaskList
          tasks={tasks}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}
      <div className="daily-report">
        <DailyReport/>
      </div>
    </div>

  );
};

export default Home;