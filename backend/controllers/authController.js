const authService = require("../services/authService");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

/*
==========================================
Register
POST /api/auth/register
==========================================
*/

exports.register = asyncHandler(async (req, res) => {

    const result = await authService.register(req.body);

    res.status(201).json(
        ApiResponse.success(
            "Registration successful.",
            result
        )
    );

});

/*
==========================================
Login
POST /api/auth/login
==========================================
*/

exports.login = asyncHandler(async (req, res) => {

    const result = await authService.login(
        req.body.email,
        req.body.password
    );

    res.status(200).json(
        ApiResponse.success(
            "Login successful.",
            result
        )
    );

});

/*
==========================================
Current User
GET /api/auth/me
==========================================
*/

exports.getCurrentUser = asyncHandler(async (req, res) => {

    const user =
        await authService.getCurrentUser(
            req.user.id
        );

    res.status(200).json(
        ApiResponse.success(
            "User fetched successfully.",
            user
        )
    );

});
/*
==========================================
Change Password
PUT /api/auth/change-password
==========================================
*/

exports.changePassword = asyncHandler(async (req, res) => {

    const result =
        await authService.changePassword(

            req.user.id,

            req.body.currentPassword,

            req.body.newPassword

        );

    res.status(200).json(

        ApiResponse.success(

            "Password changed successfully.",

            result

        )

    );

});
/*
==========================================
Logout
POST /api/auth/logout
==========================================
*/

exports.logout = asyncHandler(async (req, res) => {

    const result =
        await authService.logout();

    res.status(200).json(

        ApiResponse.success(

            "Logout successful.",

            result

        )

    );

});