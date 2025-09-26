import express from "express";
import {
  createAssignment,
  getAssignments,
  submitAnswer,
  updateAssignmentStatus,
} from "../controllers/assignmentController.js";

import { protect, requireRole } from "../middlewares/authMiddleware.js";
import { assignmentValidation } from "../middlewares/inputValidation.js";
import { submissionValidation } from "../middlewares/inputValidation.js";
import { validate } from "../middlewares/validation.js";

const router = express.Router();

router.post("/", protect, requireRole("teacher"), validate(assignmentValidation), createAssignment);

router.get("/", protect, getAssignments);

router.patch("/:assignmentId/status", protect, requireRole("teacher"), updateAssignmentStatus);

router.post("/:assignmentId/submit", protect,requireRole("student"), validate(submissionValidation), submitAnswer);

export default router;
