const mongoose = require("mongoose");

const Subject = require("../models/Subject");
const User = require("../models/User");

/*
=========================================
@Get Recommended Subjects
@Route GET /api/subjects/recommended
@Access Private
=========================================
*/
const getRecommendedSubjects = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("preferredExam", "name slug category")
      .lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (!user.preferredExam) {
      return res.status(400).json({
        success: false,
        message: "No preferred exam selected.",
      });
    }

    const subjects = await Subject.find({
      exam: user.preferredExam._id,
      isActive: true,
    })
      .select("name slug description icon color order")
      .sort({ order: 1 })
      .lean();

    return res.status(200).json({
      success: true,
      exam: user.preferredExam,
      count: subjects.length,
      subjects,
    });
  } catch (error) {
    console.error("Get Recommended Subjects Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

/*
=========================================
@Get Subjects By Exam
@Route GET /api/subjects/exam/:examId
@Access Private
=========================================
*/
const getSubjectsByExam = async (req, res) => {
  try {
    const { examId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(examId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid exam id.",
      });
    }

    const subjects = await Subject.find({
      exam: examId,
      isActive: true,
    })
      .populate("exam", "name slug category")
      .select("name slug description icon color order exam")
      .sort({ order: 1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: subjects.length,
      subjects,
    });
  } catch (error) {
    console.error("Get Subjects By Exam Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

/*
=========================================
@Create Subject
@Route POST /api/subjects
@Access Admin
=========================================
*/
const createSubject = async (req, res) => {
  try {
    const {
      name,
      slug,
      exam,
      description,
      icon,
      color,
      order,
    } = req.body;

    // Required field validation
    if (!name || !slug || !exam) {
      return res.status(400).json({
        success: false,
        message: "Name, slug and exam are required.",
      });
    }

    // Validate exam id
    if (!mongoose.Types.ObjectId.isValid(exam)) {
      return res.status(400).json({
        success: false,
        message: "Invalid exam id.",
      });
    }

    // Check duplicate subject in same exam
    const existingSubject = await Subject.findOne({
      exam,
      slug: slug.trim().toLowerCase(),
    });

    if (existingSubject) {
      return res.status(409).json({
        success: false,
        message: "Subject already exists for this exam.",
      });
    }

    const subject = await Subject.create({
      name: name.trim(),
      slug: slug.trim().toLowerCase(),
      exam,
      description: description?.trim() || "",
      icon: icon?.trim() || "book",
      color: color?.trim() || "#2563EB",
      order: order || 1,
    });

    return res.status(201).json({
      success: true,
      message: "Subject created successfully.",
      subject,
    });
  } catch (error) {
    console.error("Create Subject Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
/*
=========================================
@Get All Subjects
@Route GET /api/subjects
@Access Admin
=========================================
*/
const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find()
      .populate("exam", "name slug category")
      .sort({
        createdAt: -1,
      })
      .lean();

    return res.status(200).json({
      success: true,
      count: subjects.length,
      subjects,
    });
  } catch (error) {
    console.error("Get All Subjects Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
/*
=========================================
@Get Subject By ID
@Route GET /api/subjects/:id
@Access Admin
=========================================
*/
const getSubjectById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate Subject ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid subject id.",
      });
    }

    const subject = await Subject.findById(id)
      .populate("exam", "name slug category")
      .lean();

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found.",
      });
    }

    return res.status(200).json({
      success: true,
      subject,
    });
  } catch (error) {
    console.error("Get Subject By ID Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
/*
=========================================
@Update Subject
@Route PUT /api/subjects/:id
@Access Admin
=========================================
*/
const updateSubject = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid subject id.",
      });
    }

    const {
      name,
      slug,
      exam,
      description,
      icon,
      color,
      order,
      isActive,
    } = req.body;

    const subject = await Subject.findById(id);

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found.",
      });
    }

    // Validate Exam ID if provided
    if (exam && !mongoose.Types.ObjectId.isValid(exam)) {
      return res.status(400).json({
        success: false,
        message: "Invalid exam id.",
      });
    }

    // Check duplicate slug within the same exam
    if (slug || exam) {
      const duplicate = await Subject.findOne({
        _id: { $ne: id },
        exam: exam || subject.exam,
        slug: (slug || subject.slug).trim().toLowerCase(),
      });

      if (duplicate) {
        return res.status(409).json({
          success: false,
          message: "Another subject with this slug already exists for this exam.",
        });
      }
    }

    subject.name = name?.trim() ?? subject.name;
    subject.slug = slug?.trim().toLowerCase() ?? subject.slug;
    subject.exam = exam ?? subject.exam;
    subject.description = description?.trim() ?? subject.description;
    subject.icon = icon?.trim() ?? subject.icon;
    subject.color = color?.trim() ?? subject.color;
    subject.order = order ?? subject.order;

    if (typeof isActive === "boolean") {
      subject.isActive = isActive;
    }

    await subject.save();

    return res.status(200).json({
      success: true,
      message: "Subject updated successfully.",
      subject,
    });
  } catch (error) {
    console.error("Update Subject Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
/*
=========================================
@Delete Subject (Soft Delete)
@Route DELETE /api/subjects/:id
@Access Admin
=========================================
*/
const deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate Subject ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid subject id.",
      });
    }

    const subject = await Subject.findById(id);

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found.",
      });
    }

    // Soft Delete
    subject.isActive = false;

    await subject.save();

    return res.status(200).json({
      success: true,
      message: "Subject deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Subject Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
module.exports = {
  getRecommendedSubjects,
  getSubjectsByExam,
  createSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
};