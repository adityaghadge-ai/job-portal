import "./config/env.js";

import dns from "dns";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.USE_GOOGLE_DNS === "true") {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
    console.log("✅ Using Google DNS");
}

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS
app.use(
    cors({
        origin: "https://job-portal-2-1eaf.onrender.com",
        credentials: true,
    })
);

// API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// ================= Production =================

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("/{*splat}", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend","dist","index.html"));
});

// ==============================================

app.get("/", (req, res) => {
    res.send("🚀 Job Portal Backend Running...");
});

const PORT = process.env.PORT || 8000;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

startServer();