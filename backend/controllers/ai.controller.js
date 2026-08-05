import { Job } from "../models/job.model.js";
import { User } from "../models/user.model.js";
import { Application } from "../models/application.model.js";
import { analyzeResumeSuitability } from "../utils/aiScanner.js";

/**
 * Scan Student's Suitability for a given Job Role
 */
export const scanStudentSuitability = async (req, res) => {
    try {
        const userId = req.id;
        const { jobId } = req.params;

        if (!jobId) {
            return res.status(400).json({
                message: "Job ID is required.",
                success: false
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found.",
                success: false
            });
        }

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job position not found.",
                success: false
            });
        }

        // Run AI Resume & Skill suitability scanner
        const analysis = await analyzeResumeSuitability(user, job);

        return res.status(200).json({
            message: "Resume suitability analysis completed.",
            success: true,
            analysis,
            jobTitle: job.title
        });

    } catch (error) {
        console.error("Error scanning student suitability:", error);
        return res.status(500).json({
            message: "Failed to scan resume suitability.",
            success: false,
            error: error.message
        });
    }
};

/**
 * AI Scan & Rank All Applicants for Recruiter Dashboard
 */
export const scanAndRankJobApplicants = async (req, res) => {
    try {
        const { jobId } = req.params;

        if (!jobId) {
            return res.status(400).json({
                message: "Job ID is required.",
                success: false
            });
        }

        const job = await Job.findById(jobId).populate({
            path: 'applications',
            populate: {
                path: 'applicant'
            }
        });

        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        }

        if (!job.applications || job.applications.length === 0) {
            return res.status(200).json({
                message: "No applicants to rank.",
                success: true,
                applications: []
            });
        }

        // Run AI evaluation across all applicants
        const updatedApplications = [];

        for (const app of job.applications) {
            if (app.applicant) {
                const analysis = await analyzeResumeSuitability(app.applicant, job);
                app.aiAnalysis = analysis;
                await app.save();
            }
            updatedApplications.push(app);
        }

        // Rank by Match Score descending
        updatedApplications.sort((a, b) => (b.aiAnalysis?.matchScore || 0) - (a.aiAnalysis?.matchScore || 0));

        return res.status(200).json({
            message: `Successfully scanned & ranked ${updatedApplications.length} applicants using AI.`,
            success: true,
            applications: updatedApplications
        });

    } catch (error) {
        console.error("Error scanning and ranking applicants:", error);
        return res.status(500).json({
            message: "Failed to rank applicants.",
            success: false,
            error: error.message
        });
    }
};
