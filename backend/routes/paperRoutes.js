const express = require("express");

const router = express.Router();

const paperController = require("../controllers/paperController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

/*
==================================================
Student Routes
==================================================
*/

// Get All Previous Papers
router.get(
    "/",
    authMiddleware,
    paperController.getAllPapers
);

// Get Papers By Exam
router.get(
    "/exam/:examId",
    authMiddleware,
    paperController.getPapersByExam
);

// Get Papers By Exam & Year
router.get(
    "/exam/:examId/year/:year",
    authMiddleware,
    paperController.getPapersByYear
);

// Record Paper View
router.patch(
    "/:id/view",
    authMiddleware,
    paperController.recordView
);

// Record Paper Download
router.patch(
    "/:id/download",
    authMiddleware,
    paperController.recordDownload
);

// Get Paper By ID
router.get(
    "/:id",
    authMiddleware,
    paperController.getPaperById
);

/*
==================================================
Admin Routes
==================================================
*/

// Get All Previous Papers (Admin)
router.get(
    "/admin/all",
    authMiddleware,
    adminMiddleware,
    paperController.getAllPapersAdmin
);

// Previous Paper Statistics
router.get(
    "/admin/statistics",
    authMiddleware,
    adminMiddleware,
    paperController.getStatistics
);

// Get Previous Paper Details
router.get(
    "/admin/:id",
    authMiddleware,
    adminMiddleware,
    paperController.getPaperDetails
);

// Create Previous Paper
router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    paperController.createPaper
);

// Update Previous Paper
router.put(
    "/:id",
    authMiddleware,
    adminMiddleware,
    paperController.updatePaper
);

// Publish Previous Paper
router.patch(
    "/:id/publish",
    authMiddleware,
    adminMiddleware,
    paperController.publishPaper
);

// Unpublish Previous Paper
router.patch(
    "/:id/unpublish",
    authMiddleware,
    adminMiddleware,
    paperController.unpublishPaper
);

// Activate Previous Paper
router.patch(
    "/:id/activate",
    authMiddleware,
    adminMiddleware,
    paperController.activatePaper
);

// Deactivate Previous Paper
router.patch(
    "/:id/deactivate",
    authMiddleware,
    adminMiddleware,
    paperController.deactivatePaper
);

// Delete Previous Paper
router.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    paperController.deletePaper
);

module.exports = router;