const express = require("express");

const router = express.Router();

const practiceController = require("../controllers/practiceController");

const authMiddleware = require("../middleware/authMiddleware");

/*
==========================================
Practice Routes
==========================================
*/

router.post(
    "/start",
    authMiddleware,
    practiceController.startPractice
);

router.post(
    "/submit",
    authMiddleware,
    practiceController.submitPractice
);

router.get(
    "/history",
    authMiddleware,
    practiceController.getPracticeHistory
);

router.get(
    "/:id",
    authMiddleware,
    practiceController.getPracticeById
);

router.delete(
    "/:id",
    authMiddleware,
    practiceController.deletePractice
);

module.exports = router;