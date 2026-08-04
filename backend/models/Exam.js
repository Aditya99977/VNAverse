const mongoose = require("mongoose");

const examSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            maxlength: 100,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        shortName: {
            type: String,
            required: true,
            trim: true,
            maxlength: 20,
        },

        category: {
            type: String,
            required: true,
            enum: [
                "Banking",
                "SSC",
                "Railway",
                "UPSC",
                "State PSC",
                "Teaching",
                "Police",
                "Defence",
                "Insurance",
                "Other",
            ],
            index: true,
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

        isActive: {
            type: Boolean,
            default: true,
            index: true,
        },

        displayOrder: {
            type: Number,
            default: 1,
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

examSchema.index({
    category: 1,
    isActive: 1,
});

examSchema.index({
    displayOrder: 1,
});

module.exports = mongoose.model("Exam", examSchema);