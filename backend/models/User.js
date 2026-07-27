const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const aiPreferenceSchema = new mongoose.Schema(
    {
        subject: {
            type: String,
            default: "",
            trim: true,
        },

        difficulty: {
            type: String,
            enum: ["Easy", "Medium", "Hard"],
            default: "Medium",
        },

        mode: {
            type: String,
            enum: ["Explain", "Solve", "Quiz", "Hint", "Interview"],
            default: "Explain",
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
            required: [true, "Name is required."],
            trim: true,
            minlength: 3,
            maxlength: 50,
        },

        email: {
            type: String,
            required: [true, "Email is required."],
            unique: true,
            trim: true,
            lowercase: true,
            index: true,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                "Please enter a valid email address.",
            ],
        },

        password: {
            type: String,
            required: [true, "Password is required."],
            minlength: 8,
            select: false,
        },

        role: {
            type: String,
            enum: ["student", "admin"],
            default: "student",
            index: true,
        },

        // ==========================
        // Preferred Exam
        // ==========================

        preferredExam: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Exam",
            default: null,
            index: true,
        },

        profileImage: {
            type: String,
            default: "",
        },

        aiPreferences: {
            type: aiPreferenceSchema,
            default: () => ({}),
        },

        // ==========================
        // Account Status
        // ==========================

        status: {
            type: String,
            enum: ["active", "blocked"],
            default: "active",
            index: true,
        },

        // ==========================
        // Email Verification
        // ==========================

        isVerified: {
            type: Boolean,
            default: false,
        },

        verificationToken: {
            type: String,
            default: null,
            select: false,
        },

        verificationTokenExpires: {
            type: Date,
            default: null,
            select: false,
        },

        // ==========================
        // Study Statistics
        // ==========================

        studyStats: {
            questionsSolved: {
                type: Number,
                default: 0,
                min: 0,
            },

            aiChats: {
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
        },

        // ==========================
        // Study Streak
        // ==========================

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

        lastStudyDate: {
            type: Date,
            default: null,
        },

        // ==========================
        // Activity
        // ==========================

        lastActive: {
            type: Date,
            default: Date.now,
            index: true,
        },

        passwordChangedAt: {
            type: Date,
            default: null,
            select: false,
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
                delete ret.__v;
                delete ret.password;
                delete ret.verificationToken;
                delete ret.verificationTokenExpires;
                delete ret.passwordChangedAt;

                return ret;
            },
        },

        toObject: {
            virtuals: true,
        },
    }
);

// ==========================================
// Normalize Email (Mongoose 9 Compatible)
// ==========================================

userSchema.pre("save", function () {
    if (this.isModified("email") && typeof this.email === "string") {
        this.email = this.email.trim().toLowerCase();
    }
});

// ==========================================
// Instance Methods
// ==========================================

userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.isAdmin = function () {
    return this.role === "admin";
};

// ==========================================
// Indexes
// ==========================================

userSchema.index({ role: 1, status: 1 });
userSchema.index({ preferredExam: 1, status: 1 });
userSchema.index({ lastActive: -1 });

module.exports = mongoose.model("User", userSchema);