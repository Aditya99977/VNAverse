const mongoose = require("mongoose");

const previousPaperSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 200,
        },

        description: {
            type: String,
            default: "",
            trim: true,
            maxlength: 500,
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
            default: null,
            index: true,
        },

        year: {
            type: Number,
            required: true,
            min: 2000,
        },

        shift: {
            type: String,
            default: "",
            trim: true,
        },

        language: {
            type: String,
            enum: [
                "English",
                "Hindi",
                "Bilingual",
            ],
            default: "English",
        },

        pdfUrl: {
            type: String,
            required: true,
            trim: true,
        },

        answerKeyUrl: {
            type: String,
            default: "",
            trim: true,
        },

        totalQuestions: {
            type: Number,
            default: 0,
            min: 0,
        },

        duration: {
            type: Number,
            default: 0,
            min: 0,
        },

        downloads: {
            type: Number,
            default: 0,
            min: 0,
        },

        views: {
            type: Number,
            default: 0,
            min: 0,
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

previousPaperSchema.index({

    exam: 1,

    year: -1,

});

previousPaperSchema.index({

    exam: 1,

    subject: 1,

    year: -1,

    isActive: 1,

});

previousPaperSchema.index({

    exam: 1,

    isActive: 1,

});

module.exports = mongoose.model(
    "PreviousPaper",
    previousPaperSchema
);