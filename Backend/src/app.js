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

/* =========================
   CORS CONFIG (FIXED)
========================= */

const allowedOrigins = [
  "http://localhost:5173",
  "https://ai-based-voice-interview.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow Postman / server-to-server requests
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS Not Allowed"), false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// ✅ IMPORTANT: preflight request handling
app.options("*", cors());

/* =========================
   MIDDLEWARE
========================= */

app.use(express.json());
app.use(cookieParser());

// extra safety header
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

/* =========================
   ROUTES
========================= */

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