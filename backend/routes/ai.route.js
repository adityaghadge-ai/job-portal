import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { scanStudentSuitability, scanAndRankJobApplicants } from "../controllers/ai.controller.js";

const router = express.Router();

// Student AI suitability scanner
router.route("/scan-suitability/:jobId").get(isAuthenticated, scanStudentSuitability);

// Recruiter AI applicant scanner and ranker
router.route("/rank-applicants/:jobId").post(isAuthenticated, scanAndRankJobApplicants);

export default router;
