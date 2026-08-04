const express = require("express");

const router = express.Router();

const performanceController = require("../controllers/performanceController");

const authMiddleware = require("../middleware/authMiddleware");

/*
==========================================
Performance Routes
==========================================
*/

router.get(
    "/",
    authMiddleware,
    performanceController.getUserPerformance
);

router.get(
    "/exam/:examId",
    authMiddleware,
    performanceController.getExamPerformance
);

router.get(
    "/exam/:examId/subject/:subjectId",
    authMiddleware,
    performanceController.getSubjectPerformance
);

router.delete(
    "/:id",
    authMiddleware,
    performanceController.deletePerformance
);

module.exports = router;