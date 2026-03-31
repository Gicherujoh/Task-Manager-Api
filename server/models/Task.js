import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Task = sequelize.define("Task", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  due_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  priority: {
    type: DataTypes.ENUM("low", "medium", "high"),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("pending", "in_progress", "done"),
    defaultValue: "pending",
  },
});

export default Task;