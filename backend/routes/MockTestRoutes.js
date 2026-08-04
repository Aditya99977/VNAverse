const express = require("express");

const router = express.Router();

const mockTestController = require("../controllers/MockTestController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

/*
==================================================
Student Routes
==================================================
*/

// Start Mock Test
router.post(
    "/start",
    authMiddleware,
    mockTestController.startMockTest
);

// Submit Mock Test
router.post(
    "/submit",
    authMiddleware,
    mockTestController.submitMockTest
);

// Get User Mock Test History
router.get(
    "/history",
    authMiddleware,
    mockTestController.getHistory
);

// Get Attempt By ID
router.get(
    "/history/:id",
    authMiddleware,
    mockTestController.getById
);

// Delete Attempt
router.delete(
    "/history/:id",
    authMiddleware,
    mockTestController.delete
);

/*
==================================================
Admin Routes
==================================================
*/

// Get All Mock Tests
router.get(
    "/",
    authMiddleware,
    adminMiddleware,
    mockTestController.getAllMockTests
);

// Get Mock Test Statistics
router.get(
    "/statistics",
    authMiddleware,
    adminMiddleware,
    mockTestController.getStatistics
);

// Get Mock Test By ID
router.get(
    "/:id",
    authMiddleware,
    adminMiddleware,
    mockTestController.getMockTestById
);

// Create Mock Test
router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    mockTestController.createMockTest
);

// Update Mock Test
router.put(
    "/:id",
    authMiddleware,
    adminMiddleware,
    mockTestController.updateMockTest
);

// Activate / Deactivate Mock Test
router.patch(
    "/:id/status",
    authMiddleware,
    adminMiddleware,
    mockTestController.toggleMockTestStatus
);

// Delete Mock Test
router.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    mockTestController.deleteMockTest
);

module.exports = router;