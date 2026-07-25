const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subject name is required."],
      trim: true,
      maxlength: [100, "Subject name cannot exceed 100 characters."],
    },

    slug: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
      required: [true, "Exam reference is required."],
      index: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
      maxlength: [500, "Description cannot exceed 500 characters."],
    },

    icon: {
      type: String,
      default: "book",
      trim: true,
    },

    color: {
      type: String,
      default: "#2563EB",
      trim: true,
    },

    order: {
      type: Number,
      default: 1,
      min: 1,
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

subjectSchema.index({ exam: 1, order: 1 });
subjectSchema.index({ exam: 1, slug: 1 }, { unique: true });

module.exports = mongoose.model("Subject", subjectSchema);