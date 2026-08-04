const mongoose = require("mongoose");

const mockTestSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 150,
        },

        description: {
            type: String,
            default: "",
            trim: true,
            maxlength: 1000,
        },

        exam: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Exam",
            required: true,
            index: true,
        },

        subjects: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Subject",
            },
        ],

        questions: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Question",
                required: true,
            },
        ],

        duration: {
            type: Number,
            required: true,
            min: 1,
        },

        totalQuestions: {
            type: Number,
            required: true,
            min: 1,
        },

        totalMarks: {
            type: Number,
            required: true,
            min: 1,
        },

        negativeMarks: {
            type: Number,
            default: 0,
            min: 0,
        },

        difficulty: {
            type: String,
            enum: ["Easy", "Medium", "Hard", "Mixed"],
            default: "Mixed",
        },

        isPremium: {
            type: Boolean,
            default: false,
        },

        isPublished: {
            type: Boolean,
            default: true,
        },

        isActive: {
            type: Boolean,
            default: true,
            index: true,
        },
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

mockTestSchema.index({
    exam: 1,
    isActive: 1,
});

mockTestSchema.index({
    exam: 1,
    difficulty: 1,
});

module.exports = mongoose.model(
    "MockTest",
    mockTestSchema
);