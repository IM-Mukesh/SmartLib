import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import founderRoutes from "./routes/founderRoutes";
import adminRoutes from "./routes/adminRoutes";
import studentRoutes from "./routes/studentRoutes";
import feeRoutes from "./routes/feeRoutes";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/founder", founderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/fees", feeRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to SmartLib API");
});

export default app;
