const mongoose = require("mongoose");

const performanceSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        exam: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Exam",
            required: true,
        },

        subject: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject",
            required: true,
        },

        questionsSolved: {
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

        practiceSessions: {
            type: Number,
            default: 0,
            min: 0,
        },

        mockTestsTaken: {
            type: Number,
            default: 0,
            min: 0,
        },

        totalMarks: {
            type: Number,
            default: 0,
            min: 0,
        },

        obtainedMarks: {
            type: Number,
            default: 0,
            min: 0,
        },

        accuracy: {
            type: Number,
            default: 0,
            min: 0,
            max: 100,
        },

        averageTimePerQuestion: {
            type: Number,
            default: 0,
            min: 0,
        },

        totalStudyTime: {
            type: Number,
            default: 0,
            min: 0,
        },

        strongestTopic: {
            type: String,
            default: "",
            trim: true,
        },

        weakestTopic: {
            type: String,
            default: "",
            trim: true,
        },

        lastActivity: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

/*
=================================================
Indexes
=================================================
*/

// One performance record per User + Exam + Subject
performanceSchema.index(
    {
        user: 1,
        exam: 1,
        subject: 1,
    },
    {
        unique: true,
    }
);

// Fast lookup of all subjects for a user in an exam
performanceSchema.index({
    user: 1,
    exam: 1,
});

// Fast lookup of subjects belonging to an exam
performanceSchema.index({
    exam: 1,
    subject: 1,
});

module.exports = mongoose.model(
    "Performance",
    performanceSchema
);