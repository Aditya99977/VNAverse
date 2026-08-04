const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
    {
        exam: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Exam",
            required: true,
            index: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },

        slug: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },

        shortName: {
            type: String,
            default: "",
            trim: true,
            maxlength: 30,
        },

        description: {
            type: String,
            default: "",
            trim: true,
            maxlength: 1000,
        },

        icon: {
            type: String,
            default: "book",
        },

        color: {
            type: String,
            default: "#2563EB",
        },

        displayOrder: {
            type: Number,
            default: 1,
        },

        totalQuestions: {
            type: Number,
            default: 0,
            min: 0,
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
================================================
Indexes
================================================
*/

subjectSchema.index({
    exam: 1,
    slug: 1,
}, {
    unique: true,
});

subjectSchema.index({
    exam: 1,
    displayOrder: 1,
});

subjectSchema.index({
    exam: 1,
    isActive: 1,
});

module.exports = mongoose.model("Subject", subjectSchema);