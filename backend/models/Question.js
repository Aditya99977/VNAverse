const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
    {
        subject: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject",
            required: true,
            index: true,
        },

        question: {
            type: String,
            required: true,
            trim: true,
            maxlength: 2000,
        },

        options: {
            type: [
                {
                    type: String,
                    trim: true,
                },
            ],
            required: true,
            validate: {
                validator(options) {
                    return Array.isArray(options) && options.length === 4;
                },
                message: "A question must contain exactly four options.",
            },
        },

        correctAnswer: {
            type: String,
            required: true,
            trim: true,
            validate: {
                validator(answer) {
                    return this.options.includes(answer);
                },
                message: "Correct answer must exist in options.",
            },
        },

        explanation: {
            type: String,
            default: "",
            trim: true,
            maxlength: 3000,
        },

        difficulty: {
            type: String,
            enum: ["Easy", "Medium", "Hard"],
            default: "Easy",
            index: true,
        },

        marks: {
            type: Number,
            default: 1,
            min: 1,
        },

        negativeMarks: {
            type: Number,
            default: 0,
            min: 0,
        },

        language: {
            type: String,
            default: "English",
        },

        tags: {
            type: [String],
            default: [],
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
=====================================
Indexes
=====================================
*/

questionSchema.index({
    subject: 1,
    difficulty: 1,
});

questionSchema.index({
    subject: 1,
    isActive: 1,
});

questionSchema.index({
    tags: 1,
});

/*
=====================================
Normalize Data
=====================================
*/

questionSchema.pre("save", function () {

    if (this.question) {
        this.question = this.question.trim();
    }

    if (Array.isArray(this.options)) {
        this.options = this.options.map(
            (option) => option.trim()
        );
    }

    if (this.correctAnswer) {
        this.correctAnswer = this.correctAnswer.trim();
    }

    if (this.explanation) {
        this.explanation = this.explanation.trim();
    }

    if (Array.isArray(this.tags)) {
        this.tags = this.tags.map(
            (tag) => tag.trim().toLowerCase()
        );
    }

});

module.exports = mongoose.model(
    "Question",
    questionSchema
);