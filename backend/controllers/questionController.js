const questionService = require("../services/questionService");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

/*
==========================================
Get All Questions
GET /api/questions
==========================================
*/

exports.getAllQuestions = asyncHandler(async (req, res) => {
    const questions = await questionService.getAllQuestions(req.query);

    res.status(200).json(
        ApiResponse.success(
            "Questions fetched successfully.",
            questions
        )
    );
});

/*
==========================================
Get Question By ID
GET /api/questions/:id
==========================================
*/

exports.getQuestionById = asyncHandler(async (req, res) => {
    const question = await questionService.getQuestionById(
        req.params.id
    );

    res.status(200).json(
        ApiResponse.success(
            "Question fetched successfully.",
            question
        )
    );
});

/*
==========================================
Get Questions By Subject
GET /api/questions/subject/:subjectId
==========================================
*/

exports.getQuestionsBySubject = asyncHandler(async (req, res) => {
    const questions =
        await questionService.getQuestionsBySubject(
            req.params.subjectId
        );

    res.status(200).json(
        ApiResponse.success(
            "Questions fetched successfully.",
            questions
        )
    );
});

/*
==========================================
Get Random Questions
GET /api/questions/random
==========================================
*/

exports.getRandomQuestions = asyncHandler(async (req, res) => {
    const questions =
        await questionService.getRandomQuestions(req.query);

    res.status(200).json(
        ApiResponse.success(
            "Random questions fetched successfully.",
            questions
        )
    );
});

/*
==========================================
Search Questions
GET /api/questions/search
==========================================
*/

exports.searchQuestions = asyncHandler(async (req, res) => {
    const questions =
        await questionService.searchQuestions(
            req.query.keyword
        );

    res.status(200).json(
        ApiResponse.success(
            "Search completed.",
            questions
        )
    );
});

/*
==========================================
Create Question
POST /api/questions
==========================================
*/

exports.createQuestion = asyncHandler(async (req, res) => {
    const question =
        await questionService.createQuestion(req.body);

    res.status(201).json(
        ApiResponse.success(
            "Question created successfully.",
            question
        )
    );
});

/*
==========================================
Update Question
PUT /api/questions/:id
==========================================
*/

exports.updateQuestion = asyncHandler(async (req, res) => {
    const question =
        await questionService.updateQuestion(
            req.params.id,
            req.body
        );

    res.status(200).json(
        ApiResponse.success(
            "Question updated successfully.",
            question
        )
    );
});

/*
==========================================
Deactivate Question
PATCH /api/questions/:id/status
==========================================
*/

exports.deactivateQuestion = asyncHandler(async (req, res) => {
    const question =
        await questionService.deactivateQuestion(
            req.params.id
        );

    res.status(200).json(
        ApiResponse.success(
            "Question deactivated successfully.",
            question
        )
    );
});

/*
==========================================
Activate Question
PATCH /api/questions/:id/activate
==========================================
*/

exports.activateQuestion = asyncHandler(async (req, res) => {
    const question =
        await questionService.activateQuestion(
            req.params.id
        );

    res.status(200).json(
        ApiResponse.success(
            "Question activated successfully.",
            question
        )
    );
});

/*
==========================================
Delete Question
DELETE /api/questions/:id
==========================================
*/

exports.deleteQuestion = asyncHandler(async (req, res) => {
    await questionService.deleteQuestion(req.params.id);

    res.status(200).json(
        ApiResponse.success(
            "Question deleted successfully."
        )
    );
});