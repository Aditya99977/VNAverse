const express = require("express");

const router = express.Router();

const questionController = require("../controllers/questionController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

/*
==========================================
Public Routes
==========================================
*/

router.get(
    "/",
    questionController.getAllQuestions
);

router.get(
    "/random",
    questionController.getRandomQuestions
);

router.get(
    "/search",
    questionController.searchQuestions
);

router.get(
    "/subject/:subjectId",
    questionController.getQuestionsBySubject
);

router.get(
    "/:id",
    questionController.getQuestionById
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
    questionController.createQuestion
);

router.put(
    "/:id",
    authMiddleware,
    adminMiddleware,
    questionController.updateQuestion
);

router.patch(
    "/:id/status",
    authMiddleware,
    adminMiddleware,
    questionController.deactivateQuestion
);

router.patch(
    "/:id/activate",
    authMiddleware,
    adminMiddleware,
    questionController.activateQuestion
);

router.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    questionController.deleteQuestion
);

module.exports = router;