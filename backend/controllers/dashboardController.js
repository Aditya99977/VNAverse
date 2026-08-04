const dashboardService = require("../services/dashboardService");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

/*
==========================================
Student Dashboard
GET /api/dashboard
==========================================
*/

exports.getDashboard = asyncHandler(async (req, res) => {

    const dashboard =
        await dashboardService.getDashboard(
            req.user.id,
            req.query.examId || null
        );

    res.status(200).json(

        ApiResponse.success(
            "Dashboard fetched successfully.",
            dashboard
        )

    );

});