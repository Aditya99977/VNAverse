require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const morgan = require("morgan");

const practiceRoutes = require("./routes/practiceRoutes");

// =============================================
// Environment Validation
// =============================================

const requiredEnvironmentVariables = ["MONGO_URI", "JWT_SECRET"];

const missingEnvironmentVariables = requiredEnvironmentVariables.filter(
    (name) => !process.env[name]
);

if (missingEnvironmentVariables.length > 0) {
    throw new Error(
        `Missing required environment variables: ${missingEnvironmentVariables.join(
            ", "
        )}`
    );
}

// =============================================
// Routes
// =============================================

const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const profileRoutes = require("./routes/ProfileRoutes");
const questionRoutes = require("./routes/questionRoutes");
const adminRoutes = require("./routes/adminRoutes");
const mockTestRoutes = require("./routes/MockTestRoutes");
const paperRoutes = require("./routes/paperRoutes");
const examRoutes = require("./routes/examRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const performanceRoutes = require("./routes/performanceRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

const isProduction = process.env.NODE_ENV === "production";

const allowedOrigins = (process.env.FRONTEND_URL || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

if (isProduction && allowedOrigins.length === 0) {
    throw new Error("FRONTEND_URL is required in production.");
}

if (isProduction) {
    app.set("trust proxy", 1);
}

// =============================================
// Security Middleware
// =============================================

app.use(
    helmet({
        crossOriginResourcePolicy: {
            policy: "cross-origin",
        },
    })
);

app.use(hpp());

app.use(
    "/api",
    rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
        standardHeaders: true,
        legacyHeaders: false,
        message: {
            success: false,
            message:
                "Too many requests. Please try again after 15 minutes.",
        },
    })
);

app.use(
    cors({
        origin(origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            return callback(
                new Error("Origin is not allowed by CORS.")
            );
        },
        credentials: true,
    })
);

// =============================================
// Body Parser
// =============================================

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

// =============================================
// Logger
// =============================================

if (!isProduction) {
    app.use(morgan("dev"));
}

// =============================================
// Static Files
// =============================================

app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"))
);

// =============================================
// API Routes
// =============================================

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/mocktests", mockTestRoutes);
app.use("/api/papers", paperRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/practice", practiceRoutes);
app.use("/api/performance", performanceRoutes);

// =============================================
// Root Route
// =============================================

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        application: "VNAverse",
        company: "Vision Nexus Academy",
        message: "Welcome to the VNAverse Backend API.",
        version: "1.0.0",
        status: "Running",
    });
});

// =============================================
// Health Check
// =============================================

app.get("/health", (req, res) => {
    const databaseConnected =
        mongoose.connection.readyState === 1;

    res.status(databaseConnected ? 200 : 503).json({
        success: databaseConnected,
        status: databaseConnected ? "OK" : "DEGRADED",
        database: databaseConnected
            ? "connected"
            : "disconnected",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
    });
});

// =============================================
// 404 Handler
// =============================================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found.",
    });
});

// =============================================
// Global Error Handler
// =============================================

app.use((error, req, res, next) => {

    console.log("\n========================================");
    console.log("❌ GLOBAL ERROR");
    console.log("========================================");
    console.log("Message:");
    console.log(error.message);

    console.log("\nName:");
    console.log(error.name);

    console.log("\nStatus:");
    console.log(error.statusCode || error.status || 500);

    console.log("\nStack:");
    console.log(error.stack);

    console.log("\nComplete Error Object:");
    console.dir(error, { depth: null });

    console.log("========================================\n");

    const statusCode =
        error.statusCode || error.status || 500;

    res.status(statusCode).json({

        success: false,

        message: error.message || "Internal Server Error",

    });

});

// =============================================
// Start Server
// =============================================

async function startServer() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const server = app.listen(PORT, () => {
            console.log(
                `🚀 VNAverse API is running on port ${PORT}`
            );
        });

        const shutDown = (signal) => {
            console.log(
                `${signal} received. Closing VNAverse API...`
            );

            server.close(() => {
                mongoose.connection
                    .close(false)
                    .finally(() => process.exit(0));
            });
        };

        process.once("SIGINT", () => shutDown("SIGINT"));
        process.once("SIGTERM", () => shutDown("SIGTERM"));
    } catch (error) {
        console.error(
            "MongoDB connection failed:",
            error.message
        );
        process.exit(1);
    }
}

startServer();