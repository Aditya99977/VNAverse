const jwt = require("jsonwebtoken");

const AppError = require("../utils/AppError");

const userRepository = require("../repositories/userRepository");

const asyncHandler = require("../utils/asyncHandler");

const authMiddleware = asyncHandler(async (req, res, next) => {

    /*
    ==========================================
    Authorization Header
    ==========================================
    */

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new AppError(
            "Access token is required.",
            401
        );
    }

    /*
    ==========================================
    Extract Token
    ==========================================
    */

    const token = authHeader.split(" ")[1];

    /*
    ==========================================
    Verify JWT
    ==========================================
    */

    let decoded;

    try {

        decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

    } catch (error) {

        throw new AppError(
            "Invalid or expired token.",
            401
        );

    }

    /*
    ==========================================
    Find User
    ==========================================
    */

    const user = await userRepository.findById(
        decoded.id
    );

    if (!user) {
        throw new AppError(
            "User not found.",
            404
        );
    }

    /*
    ==========================================
    Account Status
    ==========================================
    */

    if (user.status !== "active") {
        throw new AppError(
            "Your account has been blocked.",
            403
        );
    }

    /*
    ==========================================
    Attach User
    ==========================================
    */

    req.user = {
        id: user._id,
        role: user.role,
        email: user.email,
    };

    next();

});

module.exports = authMiddleware;