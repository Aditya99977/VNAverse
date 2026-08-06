const AppError = require("../utils/AppError");

/*
==================================================
Global Error Middleware
==================================================
*/

const errorMiddleware = (error, req, res, next) => {

    console.error("\n====================================");
    console.error("❌ ERROR OCCURRED");
    console.error("====================================");
    console.error("Message :", error.message);
    console.error("Name    :", error.name);

    if (error.stack) {
        console.error("\nStack Trace:");
        console.error(error.stack);
    }

    console.error("====================================\n");

    /*
    ==================================
    Known Application Errors
    ==================================
    */

    if (error instanceof AppError) {

        return res.status(error.statusCode).json({

            success: false,

            message: error.message,

        });

    }

    /*
    ==================================
    Mongoose Validation Error
    ==================================
    */

    if (error.name === "ValidationError") {

        const errors = Object.values(error.errors).map(

            (item) => item.message

        );

        return res.status(400).json({

            success: false,

            message: errors.join(", "),

        });

    }

    /*
    ==================================
    Invalid MongoDB ObjectId
    ==================================
    */

    if (error.name === "CastError") {

        return res.status(400).json({

            success: false,

            message: `Invalid ${error.path}.`,

        });

    }

    /*
    ==================================
    Duplicate Key Error
    ==================================
    */

    if (error.code === 11000) {

        return res.status(409).json({

            success: false,

            message: "Duplicate record found.",

        });

    }

    /*
    ==================================
    Unknown Error
    ==================================
    */

    return res.status(500).json({

        success: false,

        message: error.message || "Internal Server Error",

    });

};

module.exports = errorMiddleware;