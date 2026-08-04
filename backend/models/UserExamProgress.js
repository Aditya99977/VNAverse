const mongoose = require("mongoose");

const userExamProgressSchema = new mongoose.Schema(
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

        isCurrent: {
            type: Boolean,
            default: false,
        },

        studyStreak: {
            type: Number,
            default: 0,
            min: 0,
        },

        longestStudyStreak: {
            type: Number,
            default: 0,
            min: 0,
        },

        completedSubjects: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Subject",
            },
        ],

        lastActivity: {
            type: Date,
            default: Date.now,
        },

        startedAt: {
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

// One progress record per user per exam
userExamProgressSchema.index(
    {
        user: 1,
        exam: 1,
    },
    {
        unique: true,
    }
);

// Fast lookup of a user's active exam
userExamProgressSchema.index({
    user: 1,
    isCurrent: 1,
});

// Fast lookup of all users for an exam
userExamProgressSchema.index({
    exam: 1,
});

module.exports = mongoose.model(
    "UserExamProgress",
    userExamProgressSchema
);