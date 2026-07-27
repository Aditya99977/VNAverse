const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
    addQuestion,
    getQuestions,
    getRandomQuestions,
} = require("../controllers/questionController");

/*
=================================================
Question Routes
Base Route: /api/questions
=================================================
*/

/*
POST /
Create Question
(Admin Only)
*/

router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    addQuestion
);

/*
GET /
Get All Questions
Supports:
?exam=
?subject=
?difficulty=
*/

router.get(
    "/",
    getQuestions
);

/*
GET /random
Random Practice Questions

Supports:
?exam=
?subject=
?difficulty=
?limit=
*/

router.get(
    "/random",
    getRandomQuestions
);

module.exports = router;