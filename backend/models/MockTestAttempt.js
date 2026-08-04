const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema(
    {
        question: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question",
            required: true,
        },

        selectedAnswer: {
            type: String,
            default: "",
            trim: true,
        },

        correctAnswer: {
            type: String,
            required: true,
            trim: true,
        },

        isCorrect: {
            type: Boolean,
            required: true,
        },

        marksAwarded: {
            type: Number,
            default: 0,
        },

        timeTaken: {
            type: Number,
            default: 0,
            min: 0,
        },
    },
    {
        _id: false,
    }
);

const mockTestAttemptSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        mockTest: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "MockTest",
            required: true,
            index: true,
        },

        exam: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Exam",
            required: true,
            index: true,
        },

        answers: {
            type: [answerSchema],
            default: [],
        },

        totalQuestions: {
            type: Number,
            required: true,
            min: 1,
        },

        attemptedQuestions: {
            type: Number,
            default: 0,
            min: 0,
        },

        correctAnswers: {
            type: Number,
            default: 0,
            min: 0,
        },

        wrongAnswers: {
            type: Number,
            default: 0,
            min: 0,
        },

        skippedQuestions: {
            type: Number,
            default: 0,
            min: 0,
        },

        score: {
            type: Number,
            default: 0,
        },

        totalMarks: {
            type: Number,
            default: 0,
        },

        accuracy: {
            type: Number,
            default: 0,
            min: 0,
            max: 100,
        },

        totalTime: {
            type: Number,
            default: 0,
            min: 0,
        },

        startedAt: {
            type: Date,
            default: Date.now,
        },

        submittedAt: {
            type: Date,
            default: Date.now,
        },

        status: {
            type: String,
            enum: [
                "in_progress",
                "completed",
                "abandoned",
                "timeout",
            ],
            default: "completed",
            index: true,
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

/*
==========================================
Indexes
==========================================
*/

mockTestAttemptSchema.index({
    user: 1,
    createdAt: -1,
});

mockTestAttemptSchema.index({
    user: 1,
    mockTest: 1,
});

mockTestAttemptSchema.index({
    user: 1,
    exam: 1,
});

mockTestAttemptSchema.index({
    mockTest: 1,
    status: 1,
});

module.exports = mongoose.model(
    "MockTestAttempt",
    mockTestAttemptSchema
);