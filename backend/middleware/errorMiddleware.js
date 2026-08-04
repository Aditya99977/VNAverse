const AppError = require("../utils/AppError");

const errorMiddleware = (
    error,
    req,
    res,
    next
) => {
    if (!(error instanceof AppError)) {
        console.error(error);

        error = new AppError(
            "Internal Server Error",
            500
        );
    }

    res.status(error.statusCode).json({
        success: false,
        message: error.message,
    });
};

module.exports = errorMiddleware;