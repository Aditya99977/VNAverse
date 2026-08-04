const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
    {
        email: {
            type: Boolean,
            default: true,
        },

        push: {
            type: Boolean,
            default: true,
        },

        announcements: {
            type: Boolean,
            default: true,
        },
    },
    {
        _id: false,
    }
);

const settingSchema = new mongoose.Schema(
    {
        theme: {
            type: String,
            enum: ["light", "dark", "system"],
            default: "system",
        },

        language: {
            type: String,
            default: "English",
        },
    },
    {
        _id: false,
    }
);

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 50,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            index: true,
        },

        password: {
            type: String,
            required: true,
            select: false,
        },

        role: {
            type: String,
            enum: ["student", "admin"],
            default: "student",
            index: true,
        },

        profileImage: {
            type: String,
            default: "",
        },

        status: {
            type: String,
            enum: ["active", "blocked"],
            default: "active",
            index: true,
        },

        isVerified: {
            type: Boolean,
            default: false,
        },

        settings: {
            type: settingSchema,
            default: () => ({}),
        },

        notifications: {
            type: notificationSchema,
            default: () => ({}),
        },

        lastLogin: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

userSchema.index({
    role: 1,
    status: 1,
});

module.exports = mongoose.model("User", userSchema);