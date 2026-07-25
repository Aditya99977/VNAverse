const mongoose = require("mongoose");

const examSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Exam name is required."],
      unique: true,
      trim: true,
      maxlength: [100, "Exam name cannot exceed 100 characters."],
    },

    slug: {
      type: String,
      required: [true, "Exam slug is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },

    category: {
      type: String,
      required: [true, "Category is required."],
      enum: ["Banking", "SSC", "Railway"],
      index: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters."],
    },

    icon: {
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
  }
);

// Useful indexes
examSchema.index({ category: 1, isActive: 1 });

module.exports = mongoose.model("Exam", examSchema);