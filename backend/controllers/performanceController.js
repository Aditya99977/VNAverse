const performanceService = require("../services/performanceService");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

/*
==========================================
Get User Performance
GET /api/performance
==========================================
*/

exports.getUserPerformance = asyncHandler(async (req, res) => {

    const performance =
        await performanceService.getUserPerformance(
            req.user.id
        );

    res.status(200).json(
        ApiResponse.success(
            "Performance fetched successfully.",
            performance
        )
    );

});

/*
==========================================
Get Exam Performance
GET /api/performance/exam/:examId
==========================================
*/

exports.getExamPerformance = asyncHandler(async (req, res) => {

    const performance =
        await performanceService.getExamPerformance(
            req.user.id,
            req.params.examId
        );

    res.status(200).json(
        ApiResponse.success(
            "Exam performance fetched successfully.",
            performance
        )
    );

});

/*
==========================================
Get Subject Performance
GET /api/performance/exam/:examId/subject/:subjectId
==========================================
*/

exports.getSubjectPerformance = asyncHandler(async (req, res) => {

    const performance =
        await performanceService.getSubjectPerformance(
            req.user.id,
            req.params.examId,
            req.params.subjectId
        );

    res.status(200).json(
        ApiResponse.success(
            "Subject performance fetched successfully.",
            performance
        )
    );

});

/*
==========================================
Delete Performance
DELETE /api/performance/:id
==========================================
*/

exports.deletePerformance = asyncHandler(async (req, res) => {

    await performanceService.deletePerformance(
        req.params.id
    );

    res.status(200).json(
        ApiResponse.success(
            "Performance deleted successfully."
        )
    );

});