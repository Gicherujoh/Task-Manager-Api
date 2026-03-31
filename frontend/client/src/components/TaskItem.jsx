import "./TaskItem.css"
const TaskItem = ({ task, onUpdate, onDelete ,}) => {
  const nextStatus = {
    pending: "in_progress",
    in_progress: "done",
  };

  return (
    <tr>
      <td>{task.title}</td>
      <td>{task.priority}</td>
      <td>{task.due_date}</td>
      <td>{task.status}</td>

    <td className="actions">
  {/* Show Edit + Move if NOT done */}
  {task.status !== "done" && (
    <>
    <button
      className="btn-delete"
      onClick={() => onDelete(task.id)}
    >
      Delete
    </button>
      <button
        className="btn-update"
        onClick={() =>
          onUpdate(task.id, nextStatus[task.status])
        }
      >
        Move → {nextStatus[task.status]}
      </button>
    </>
  )}

  {/* Show Delete ONLY if done */}
  {task.status === "done" && (
    <button
      className="btn-delete"
      onClick={() => onDelete(task.id)}
    >
      Delete
    </button>
  )}
   </td>
    </tr>
  );
};

export default TaskItem;