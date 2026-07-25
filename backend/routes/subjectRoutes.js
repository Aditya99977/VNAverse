const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
  getRecommendedSubjects,
  getSubjectsByExam,
  createSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
} = require("../controllers/subjectController");

/*
=========================================
Subject Routes
=========================================
*/

/*
=========================================
Student Routes
=========================================
*/

// Get recommended subjects
router.get(
  "/recommended",
  authMiddleware,
  getRecommendedSubjects
);

// Get subjects by exam
router.get(
  "/exam/:examId",
  authMiddleware,
  getSubjectsByExam
);

/*
=========================================
Admin Routes
=========================================
*/

// Get all subjects
router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  getAllSubjects
);

// Get subject by id
router.get(
  "/:id",
  authMiddleware,
  adminMiddleware,
  getSubjectById
);

// Create subject
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createSubject
);

// Update subject
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateSubject
);

// Soft delete subject
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteSubject
);

module.exports = router;