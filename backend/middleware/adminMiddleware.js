const AppError = require("../utils/AppError");

const adminMiddleware = (req, res, next) => {

    if (!req.user) {

        throw new AppError(
            "Unauthorized.",
            401
        );

    }

    if (req.user.role !== "admin") {

        throw new AppError(
            "Access denied. Admin only.",
            403
        );

    }

    next();

};

module.exports = adminMiddleware;