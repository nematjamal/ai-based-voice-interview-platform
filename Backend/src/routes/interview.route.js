import express from "express";
import {
  createInterview,
  getInterviews,
  getInterviewById,
  StartInterview,
  finishInterview,
  getInterviewHistory
} from "../controllers/interview.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { checkRole } from "../middleware/role.middleware.js";

const router = express.Router();

router.get("/", getInterviews);
router.post("/create", protectRoute, checkRole("ADMIN"), createInterview);
router.post("/start", protectRoute, StartInterview);
router.post("/finish",protectRoute,finishInterview);
router.get("/history", protectRoute,getInterviewHistory);
router.get("/:id", getInterviewById);
export default router;
