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

        timeTaken: {
            type: Number,
            default: 0,
            min: 0,
        },

        marksAwarded: {
            type: Number,
            default: 0,
        },
    },
    {
        _id: false,
    }
);

const practiceAttemptSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        exam: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Exam",
            required: true,
            index: true,
        },

        subject: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject",
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
            min: 0,
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

        status: {
            type: String,
            enum: [
                "completed",
                "abandoned",
            ],
            default: "completed",
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

/*
=====================================
Indexes
=====================================
*/

practiceAttemptSchema.index({
    user: 1,
    createdAt: -1,
});

practiceAttemptSchema.index({
    user: 1,
    exam: 1,
});

practiceAttemptSchema.index({
    user: 1,
    subject: 1,
});

practiceAttemptSchema.index({
    exam: 1,
    subject: 1,
});

module.exports = mongoose.model(
    "PracticeAttempt",
    practiceAttemptSchema
);