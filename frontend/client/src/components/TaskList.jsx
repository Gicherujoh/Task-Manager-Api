import TaskItem from "./TaskItem";
import "./TaskList.css";

const TaskList = ({ tasks, onUpdate, onDelete,}) => {
  if (!tasks.length) return <p className="empty">No tasks found</p>;

  return (
    <div className="table-container">
      <table className="task-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Priority</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;