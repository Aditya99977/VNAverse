const asyncHandler = require("../utils/asyncHandler");

const ApiResponse = require("../utils/ApiResponse");

const paperService = require("../services/paperService");

/*
==================================================
Student APIs
==================================================
*/

/*
==================================================
Get All Previous Papers
==================================================
*/

exports.getAllPapers = asyncHandler(async (req, res) => {

    const papers =
        await paperService.getAllPapers(
            req.query
        );

    res.status(200).json(

        ApiResponse.success(

            "Previous papers fetched successfully.",

            papers

        )

    );

});

/*
==================================================
Get Previous Paper By ID
==================================================
*/

exports.getPaperById = asyncHandler(async (req, res) => {

    const paper =
        await paperService.getPaperById(
            req.params.id
        );

    res.status(200).json(

        ApiResponse.success(

            "Previous paper fetched successfully.",

            paper

        )

    );

});
/*
==================================================
Record Paper View
==================================================
*/

exports.recordView = asyncHandler(async (req, res) => {

    const paper =
        await paperService.recordView(
            req.params.id
        );

    res.status(200).json(

        ApiResponse.success(

            "Paper view recorded successfully.",

            paper

        )

    );

});

/*
==================================================
Record Paper Download
==================================================
*/

exports.recordDownload = asyncHandler(async (req, res) => {

    const paper =
        await paperService.recordDownload(
            req.params.id
        );

    res.status(200).json(

        ApiResponse.success(

            "Paper download recorded successfully.",

            paper

        )

    );

});

/*
==================================================
Get Papers By Exam
==================================================
*/

exports.getPapersByExam = asyncHandler(async (req, res) => {

    const papers =
        await paperService.getPapersByExam(
            req.params.examId
        );

    res.status(200).json(

        ApiResponse.success(

            "Previous papers fetched successfully.",

            papers

        )

    );

});

/*
==================================================
Get Papers By Year
==================================================
*/

exports.getPapersByYear = asyncHandler(async (req, res) => {

    const papers =
        await paperService.getPapersByYear(

            req.params.examId,

            req.params.year

        );

    res.status(200).json(

        ApiResponse.success(

            "Previous papers fetched successfully.",

            papers

        )

    );

});

/*
==================================================
Admin APIs
==================================================
*/

/*
==================================================
Create Previous Paper
==================================================
*/

exports.createPaper = asyncHandler(async (req, res) => {

    const paper =
        await paperService.createPaper(
            req.body
        );

    res.status(201).json(

        ApiResponse.success(

            "Previous paper created successfully.",

            paper

        )

    );

});

/*
==================================================
Update Previous Paper
==================================================
*/

exports.updatePaper = asyncHandler(async (req, res) => {

    const paper =
        await paperService.updatePaper(

            req.params.id,

            req.body

        );

    res.status(200).json(

        ApiResponse.success(

            "Previous paper updated successfully.",

            paper

        )

    );

});

/*
==================================================
Get All Previous Papers (Admin)
==================================================
*/

exports.getAllPapersAdmin = asyncHandler(async (req, res) => {

    const papers =
        await paperService.getAllPapersAdmin(
            req.query
        );

    res.status(200).json(

        ApiResponse.success(

            "Previous papers fetched successfully.",

            papers

        )

    );

});

/*
==================================================
Get Previous Paper Details
==================================================
*/

exports.getPaperDetails = asyncHandler(async (req, res) => {

    const paper =
        await paperService.getPaperDetails(
            req.params.id
        );

    res.status(200).json(

        ApiResponse.success(

            "Previous paper fetched successfully.",

            paper

        )

    );

});

/*
==================================================
Publish Previous Paper
==================================================
*/

exports.publishPaper = asyncHandler(async (req, res) => {

    const paper =
        await paperService.publishPaper(
            req.params.id
        );

    res.status(200).json(

        ApiResponse.success(

            "Previous paper published successfully.",

            paper

        )

    );

});

/*
==================================================
Unpublish Previous Paper
==================================================
*/

exports.unpublishPaper = asyncHandler(async (req, res) => {

    const paper =
        await paperService.unpublishPaper(
            req.params.id
        );

    res.status(200).json(

        ApiResponse.success(

            "Previous paper unpublished successfully.",

            paper

        )

    );

});

/*
==================================================
Activate Previous Paper
==================================================
*/

exports.activatePaper = asyncHandler(async (req, res) => {

    const paper =
        await paperService.activatePaper(
            req.params.id
        );

    res.status(200).json(

        ApiResponse.success(

            "Previous paper activated successfully.",

            paper

        )

    );

});

/*
==================================================
Deactivate Previous Paper
==================================================
*/

exports.deactivatePaper = asyncHandler(async (req, res) => {

    const paper =
        await paperService.deactivatePaper(
            req.params.id
        );

    res.status(200).json(

        ApiResponse.success(

            "Previous paper deactivated successfully.",

            paper

        )

    );

});

/*
==================================================
Delete Previous Paper
==================================================
*/

exports.deletePaper = asyncHandler(async (req, res) => {

    await paperService.deletePaper(
        req.params.id
    );

    res.status(200).json(

        ApiResponse.success(

            "Previous paper deleted successfully."

        )

    );

});

/*
==================================================
Previous Paper Statistics
==================================================
*/

exports.getStatistics = asyncHandler(async (req, res) => {

    const statistics =
        await paperService.getStatistics();

    res.status(200).json(

        ApiResponse.success(

            "Previous paper statistics fetched successfully.",

            statistics

        )

    );

});