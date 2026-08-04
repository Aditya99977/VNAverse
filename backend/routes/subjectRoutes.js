const express = require("express");

const subjectController = require("../controllers/subjectController");

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
    subjectController.getAllSubjects
);

router.get(
    "/exam/:examId",
    subjectController.getSubjectsByExam
);

router.get(
    "/:id",
    subjectController.getSubjectById
);

/*
==========================================
Authenticated User
==========================================
*/

router.get(
    "/recommended/me",
    authMiddleware,
    subjectController.getRecommendedSubjects
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
    subjectController.createSubject
);

router.put(
    "/:id",
    authMiddleware,
    adminMiddleware,
    subjectController.updateSubject
);

router.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    subjectController.deleteSubject
);

module.exports = router;