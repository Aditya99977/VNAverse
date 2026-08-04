const practiceService = require("../services/practiceService");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

/*
==========================================
Start Practice
POST /api/practice/start
==========================================
*/

exports.startPractice = asyncHandler(async (req, res) => {

    const result = await practiceService.startPractice({

        userId: req.user.id,

        examId: req.body.examId,

        subjectId: req.body.subjectId,

        difficulty: req.body.difficulty,

        questionCount: req.body.questionCount,

    });

    res.status(200).json(

        ApiResponse.success(
            "Practice started successfully.",
            result
        )

    );

});

/*
==========================================
Submit Practice
POST /api/practice/submit
==========================================
*/

exports.submitPractice = asyncHandler(async (req, res) => {

    const result = await practiceService.submitPractice({

        userId: req.user.id,

        examId: req.body.examId,

        subjectId: req.body.subjectId,

        answers: req.body.answers,

        totalTime: req.body.totalTime,

    });

    res.status(200).json(

        ApiResponse.success(
            "Practice submitted successfully.",
            result
        )

    );

});

/*
==========================================
Practice History
GET /api/practice/history
==========================================
*/

exports.getPracticeHistory = asyncHandler(async (req, res) => {

    const history =
        await practiceService.getPracticeHistory(
            req.user.id
        );

    res.status(200).json(

        ApiResponse.success(
            "Practice history fetched successfully.",
            history
        )

    );

});

/*
==========================================
Practice Details
GET /api/practice/:id
==========================================
*/

exports.getPracticeById = asyncHandler(async (req, res) => {

    const practice =
        await practiceService.getPracticeById(
            req.params.id
        );

    res.status(200).json(

        ApiResponse.success(
            "Practice details fetched successfully.",
            practice
        )

    );

});

/*
==========================================
Delete Practice
DELETE /api/practice/:id
==========================================
*/

exports.deletePractice = asyncHandler(async (req, res) => {

    await practiceService.deletePractice(
        req.params.id
    );

    res.status(200).json(

        ApiResponse.success(
            "Practice deleted successfully."
        )

    );

});