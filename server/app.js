import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";


dotenv.config();

const app = express();

const URL = process.env.FRONTEND_URL

app.use(cors({ origin:URL}));
app.use(express.json());

app.use("/api", taskRoutes);

const PORT = process.env.PORT || 5000;

sequelize.sync()
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(" Database connection failed:", err);
  });