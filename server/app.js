import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";


dotenv.config();

const app = express();

//const URL = process.env.FRONTEND_URL
const allowedOrigins = [
  process.env.FRONTEND_LOCAL_URL,
  process.env.FRONTEND_URL
].filter(Boolean)// removes undefined/null

app.use(cors({
  origin: allowedOrigins, // Express-cors handles arrays automatically
  credentials: true
}));
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