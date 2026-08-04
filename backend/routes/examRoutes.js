const express = require("express");

const examController = require("../controllers/examController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

/*
==========================================
Public Routes
==========================================
*/

router.get(
    "/",
    examController.getActiveExams
);

router.get(
    "/all",
    examController.getAllExams
);

/*
==========================================
Authenticated User Routes
==========================================
*/

router.put(
    "/select",
    authMiddleware,
    examController.selectExam
);

router.get(
    "/current",
    authMiddleware,
    examController.getCurrentExam
);

router.get(
    "/my-exams",
    authMiddleware,
    examController.getUserExams
);

/*
==========================================
Admin Routes
==========================================
*/

router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    examController.createExam
);

router.put(
    "/:id",
    authMiddleware,
    adminMiddleware,
    examController.updateExam
);

router.patch(
    "/:id/status",
    authMiddleware,
    adminMiddleware,
    examController.deactivateExam
);

router.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    examController.deleteExam
);

/*
==========================================
Dynamic Routes (Keep Last)
==========================================
*/

router.get(
    "/:id",
    examController.getExamById
);

module.exports = router;