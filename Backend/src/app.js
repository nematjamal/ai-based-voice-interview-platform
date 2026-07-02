import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js";
import resumeRoutes from "./routes/resume.route.js";
import interviewRoutes from "./routes/interview.route.js";
import categoryRoutes from "./routes/category.routes.js";
import aiRoutes from "./routes/ai.route.js";
import conversationRoutes from "./routes/conversation.route.js";
import codingRoutes from "./routes/coding.route.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("API Running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/conversation", conversationRoutes);
app.use("/api/coding", codingRoutes);

export default app;