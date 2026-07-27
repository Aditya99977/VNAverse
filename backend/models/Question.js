const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: [true, "Question is required."],
            trim: true,
            maxlength: [1000, "Question cannot exceed 1000 characters."],
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

                message: "A question must contain exactly 4 options.",
            },
        },

        correctAnswer: {
            type: String,
            required: [true, "Correct answer is required."],
            trim: true,

            validate: {
                validator(value) {
                    return this.options.includes(value);
                },

                message:
                    "Correct answer must exist in the options array.",
            },
        },

        subject: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject",

            required: [true, "Subject is required."],

            index: true,
        },

        difficulty: {
            type: String,

            enum: ["Easy", "Medium", "Hard"],

            default: "Easy",

            index: true,
        },

        explanation: {
            type: String,

            default: "",

            trim: true,
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

        toJSON: {
            virtuals: true,

            transform(doc, ret) {
                ret.id = ret._id;

                delete ret._id;

                return ret;
            },
        },

        toObject: {
            virtuals: true,
        },
    }
);

/*
========================================
Indexes
========================================
*/

questionSchema.index({
    subject: 1,
    difficulty: 1,
});

questionSchema.index({
    subject: 1,
    isActive: 1,
});

/*
========================================
Normalize Options
========================================
*/

questionSchema.pre("save", function (next) {
    this.options = this.options.map((option) => option.trim());

    this.correctAnswer = this.correctAnswer.trim();

    next();
});

module.exports = mongoose.model("Question", questionSchema);