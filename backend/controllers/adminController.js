const fs = require("fs");
const csv = require("csv-parser");
const mongoose = require("mongoose");

const Question = require("../models/Question");
const User = require("../models/User");
const Test = require("../models/MockTestAttempt");

const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

/*
==================================================
Admin Test
==================================================
*/

exports.adminTest = asyncHandler(async (req, res) => {

    return res.status(200).json(

        ApiResponse.success(

            "Welcome Admin"

        )

    );

});

/*
==================================================
Update Question
==================================================
*/

exports.updateQuestion = asyncHandler(async (req, res) => {

    const question = await Question.findByIdAndUpdate(

        req.params.id,

        req.body,

        {

            new: true,

            runValidators: true,

        }

    );

    if (!question) {

        return res.status(404).json(

            ApiResponse.error(

                "Question not found."

            )

        );

    }

    return res.status(200).json(

        ApiResponse.success(

            "Question updated successfully.",

            question

        )

    );

});

/*
==================================================
Delete Question
==================================================
*/

exports.deleteQuestion = asyncHandler(async (req, res) => {

    const question = await Question.findByIdAndDelete(

        req.params.id

    );

    if (!question) {

        return res.status(404).json(

            ApiResponse.error(

                "Question not found."

            )

        );

    }

    return res.status(200).json(

        ApiResponse.success(

            "Question deleted successfully."

        )

    );

});

/*
==================================================
Admin Dashboard
==================================================
*/

exports.getAdminDashboard = asyncHandler(async (req, res) => {

    const [

        totalUsers,

        totalQuestions,

        totalTests,

        subjectStats,

        averageScore

    ] = await Promise.all([

        User.countDocuments(),

        Question.countDocuments(),

        MockTestAttempt.countDocuments({
    status: "completed",
}),

        Question.aggregate([

            {

                $group: {

                    _id: "$subject",

                    totalQuestions: {

                        $sum: 1

                    }

                }

            },

            {

                $sort: {

                    totalQuestions: -1

                }

            }

        ]),

        MockTestAttempt.aggregate([
             {
        $match: {
            status: "completed",
        },
    },

            {

                $group: {

                    _id: null,

                    average: {

                        $avg: "$score"

                    }

                }

            }

        ])

    ]);

    return res.status(200).json(

        ApiResponse.success(

            "Dashboard fetched successfully.",

            {

                totalUsers,

                totalQuestions,

                totalTests,

                averageScore:

                    averageScore.length > 0

                        ? Number(

                            averageScore[0].average.toFixed(2)

                        )

                        : 0,

                subjectStats,

            }

        )

    );

});

/*
==================================================
Bulk CSV Upload
==================================================
*/

exports.uploadCSV = asyncHandler(async (req, res) => {

    if (!req.file) {

        return res.status(400).json(

            ApiResponse.error(

                "Please upload a CSV file."

            )

        );

    }

    const questions = [];    await new Promise((resolve, reject) => {

        fs.createReadStream(req.file.path)

            .pipe(csv())

            .on("data", (row) => {

                questions.push({

                    question: row.question,

                    options: [

                        row.option1,

                        row.option2,

                        row.option3,

                        row.option4,

                    ],

                    correctAnswer: row.correctAnswer,

                    subject: row.subject,

                    difficulty: row.difficulty,

                });

            })

            .on("end", resolve)

            .on("error", reject);

    });

    if (!questions.length) {

        fs.unlinkSync(req.file.path);

        return res.status(400).json(

            ApiResponse.error(

                "CSV file does not contain any questions."

            )

        );

    }

    await Question.insertMany(

        questions,

        {

            ordered: false,

        }

    );

    if (fs.existsSync(req.file.path)) {

        fs.unlinkSync(req.file.path);

    }

    return res.status(200).json(

        ApiResponse.success(

            `${questions.length} questions uploaded successfully.`

        )

    );

});

/*
==================================================
Get All Users
==================================================
*/

exports.getAllUsers = asyncHandler(async (req, res) => {

    const users = await User.find()

        .select("-password")

        .sort({

            createdAt: -1,

        });

    const result = await Promise.all(

        users.map(async (user) => {

            const tests = await MockTestAttempt.find({

                user: user._id,

                submitted: true,

            });

            const totalTests = tests.length;

            const averageScore =

                totalTests > 0

                    ? Number(

                        (

                            tests.reduce(

                                (sum, test) =>

                                    sum + test.score,

                                0

                            ) / totalTests

                        ).toFixed(2)

                    )

                    : 0;

            const highestScore =

                totalTests > 0

                    ? Math.max(

                        ...tests.map(

                            test => test.score

                        )

                    )

                    : 0;

            return {

                ...user.toObject(),

                totalTests,

                averageScore,

                highestScore,

            };

        })

    );

    return res.status(200).json(

        ApiResponse.success(

            "Users fetched successfully.",

            result

        )

    );

});

/*
==================================================
Get User Details
==================================================
*/

exports.getUserDetails = asyncHandler(async (req, res) => {

    const user = await User.findById(

        req.params.id

    ).select("-password");

    if (!user) {

        return res.status(404).json(

            ApiResponse.error(

                "User not found."

            )

        );

    }

    const tests = await MockTestAttempt.find({

        user: user._id,

    })

        .populate("questions")

        .sort({

            createdAt: -1,

        });

    return res.status(200).json(

        ApiResponse.success(

            "User details fetched successfully.",

            {

                user,

                tests,

            }

        )

    );

});

/*
==================================================
Delete User
==================================================
*/exports.deleteUser = asyncHandler(async (req, res) => {

    const session = await mongoose.startSession();

    session.startTransaction();

    try {

        const user = await User.findById(req.params.id).session(session);

        if (!user) {

            await session.abortTransaction();

            session.endSession();

            return res.status(404).json(

                ApiResponse.error(

                    "User not found."

                )

            );

        }

        await MockTestAttempt.deleteMany(

            {

                user: req.params.id,

            },

            {

                session,

            }

        );

        await User.findByIdAndDelete(

            req.params.id,

            {

                session,

            }

        );

        await session.commitTransaction();

        session.endSession();

        return res.status(200).json(

            ApiResponse.success(

                "User deleted successfully."

            )

        );

    }

    catch (error) {

        await session.abortTransaction();

        session.endSession();

        throw error;

    }

});

/*
==================================================
Get All Questions
==================================================
*/

exports.getAllQuestions = asyncHandler(async (req, res) => {

    const questions = await Question.find()

        .sort({

            createdAt: -1,

        });

    return res.status(200).json(

        ApiResponse.success(

            "Questions fetched successfully.",

            questions

        )

    );

});