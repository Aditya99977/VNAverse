const asyncHandler = require("../utils/asyncHandler");

const ApiResponse = require("../utils/ApiResponse");

const mockTestService = require("../services/mockTestService");

/*
==================================================
Student APIs
==================================================
*/

/*
==================================================
Start Mock Test
==================================================
*/

exports.startMockTest = asyncHandler(async (req, res) => {

    const result =
        await mockTestService.startMockTest({

            userId: req.user.id,

            mockTestId: req.body.mockTestId,

        });

    res.status(200).json(

        ApiResponse.success(

            "Mock test started successfully.",

            result

        )

    );

});

/*
==================================================
Submit Mock Test
==================================================
*/

exports.submitMockTest = asyncHandler(async (req, res) => {

    const result =
        await mockTestService.submitMockTest({

            userId: req.user.id,

            mockTestId: req.body.mockTestId,

            answers: req.body.answers,

            totalTime: req.body.totalTime,

        });

    res.status(200).json(

        ApiResponse.success(

            "Mock test submitted successfully.",

            result

        )

    );

});

/*
==================================================
Mock Test History
==================================================
*/

exports.getHistory = asyncHandler(async (req, res) => {

    const history =
        await mockTestService.getHistory(
            req.user.id
        );

    res.status(200).json(

        ApiResponse.success(

            "Mock test history fetched successfully.",

            history

        )

    );

});

/*
==================================================
Attempt Details
==================================================
*/

exports.getById = asyncHandler(async (req, res) => {

    const attempt =
        await mockTestService.getById(
            req.params.id
        );

    res.status(200).json(

        ApiResponse.success(

            "Mock test attempt fetched successfully.",

            attempt

        )

    );

});

/*
==================================================
Delete Attempt
==================================================
*/

exports.delete = asyncHandler(async (req, res) => {

    await mockTestService.delete(
        req.params.id
    );

    res.status(200).json(

        ApiResponse.success(

            "Mock test attempt deleted successfully."

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
Create Mock Test
==================================================
*/

exports.createMockTest = asyncHandler(async (req, res) => {

    const mockTest =
        await mockTestService.createMockTest(
            req.body
        );

    res.status(201).json(

        ApiResponse.success(

            "Mock test created successfully.",

            mockTest

        )

    );

});

/*
==================================================
Get All Mock Tests
==================================================
*/

exports.getAllMockTests = asyncHandler(async (req, res) => {

    const mockTests =
        await mockTestService.getAllMockTests(
            req.query
        );

    res.status(200).json(

        ApiResponse.success(

            "Mock tests fetched successfully.",

            mockTests

        )

    );

});

/*
==================================================
Get Mock Test By ID
==================================================
*/

exports.getMockTestById = asyncHandler(async (req, res) => {

    const mockTest =
        await mockTestService.getMockTestById(
            req.params.id
        );

    res.status(200).json(

        ApiResponse.success(

            "Mock test fetched successfully.",

            mockTest

        )

    );

});

/*
==================================================
Update Mock Test
==================================================
*/

exports.updateMockTest = asyncHandler(async (req, res) => {

    const mockTest =
        await mockTestService.updateMockTest(

            req.params.id,

            req.body

        );

    res.status(200).json(

        ApiResponse.success(

            "Mock test updated successfully.",

            mockTest

        )

    );

});

/*
==================================================
Publish / Unpublish Mock Test
==================================================
*/

exports.toggleMockTestStatus = asyncHandler(async (req, res) => {

    const mockTest =
        await mockTestService.toggleMockTestStatus(
            req.params.id
        );

    res.status(200).json(

        ApiResponse.success(

            "Mock test status updated successfully.",

            mockTest

        )

    );

});

/*
==================================================
Delete Mock Test
==================================================
*/

exports.deleteMockTest = asyncHandler(async (req, res) => {

    const mockTest =
        await mockTestService.deleteMockTest(
            req.params.id
        );

    res.status(200).json(

        ApiResponse.success(

            "Mock test deleted successfully.",

            mockTest

        )

    );

});

/*
==================================================
Mock Test Statistics
==================================================
*/

exports.getStatistics = asyncHandler(async (req, res) => {

    const statistics =
        await mockTestService.getStatistics();

    res.status(200).json(

        ApiResponse.success(

            "Mock test statistics fetched successfully.",

            statistics

        )

    );

});