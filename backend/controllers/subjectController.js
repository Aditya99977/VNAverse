const mongoose = require("mongoose");

const Subject = require("../models/Subject");
const User = require("../models/User");

const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

/*
==================================================
Get Recommended Subjects
==================================================
*/

exports.getRecommendedSubjects = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user.id)
        .populate("preferredExam", "name slug category")
        .lean();

    if (!user) {

        return res.status(404).json(

            ApiResponse.error(
                "User not found."
            )

        );

    }

    if (!user.preferredExam) {

        return res.status(400).json(

            ApiResponse.error(
                "No preferred exam selected."
            )

        );

    }

    const subjects = await Subject.find({

        exam: user.preferredExam._id,

        isActive: true,

    })

        .select("name slug description icon color order")

        .sort({

            order: 1,

        })

        .lean();

    return res.status(200).json(

        ApiResponse.success(

            "Recommended subjects fetched successfully.",

            {

                exam: user.preferredExam,

                count: subjects.length,

                subjects,

            }

        )

    );

});

/*
==================================================
Get Subjects By Exam
==================================================
*/

exports.getSubjectsByExam = asyncHandler(async (req, res) => {

    const { examId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(examId)) {

        return res.status(400).json(

            ApiResponse.error(
                "Invalid exam id."
            )

        );

    }

    const subjects = await Subject.find({

        exam: examId,

        isActive: true,

    })

        .populate("exam", "name slug category")

        .select("name slug description icon color order exam")

        .sort({

            order: 1,

        })

        .lean();

    return res.status(200).json(

        ApiResponse.success(

            "Subjects fetched successfully.",

            {

                count: subjects.length,

                subjects,

            }

        )

    );

});

/*
==================================================
Create Subject
==================================================
*/

exports.createSubject = asyncHandler(async (req, res) => {

    const {

        name,

        slug,

        exam,

        description,

        icon,

        color,

        order,

    } = req.body;

    if (!name || !slug || !exam) {

        return res.status(400).json(

            ApiResponse.error(

                "Name, slug and exam are required."

            )

        );

    }

    if (!mongoose.Types.ObjectId.isValid(exam)) {

        return res.status(400).json(

            ApiResponse.error(
                "Invalid exam id."
            )

        );

    }

    const existingSubject = await Subject.findOne({

        exam,

        slug: slug.trim().toLowerCase(),

    });

    if (existingSubject) {

        return res.status(409).json(

            ApiResponse.error(

                "Subject already exists for this exam."

            )

        );

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

    return res.status(201).json(

        ApiResponse.success(

            "Subject created successfully.",

            subject

        )

    );

});

/*
==================================================
Get All Subjects
==================================================
*/

exports.getAllSubjects = asyncHandler(async (req, res) => {

    const subjects = await Subject.find()

        .populate("exam", "name slug category")

        .sort({

            createdAt: -1,

        })

        .lean();

    return res.status(200).json(

        ApiResponse.success(

            "Subjects fetched successfully.",

            {

                count: subjects.length,

                subjects,

            }

        )

    );

});

/*
==================================================
Get Subject By ID
==================================================
*/

exports.getSubjectById = asyncHandler(async (req, res) => {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {

        return res.status(400).json(

            ApiResponse.error(

                "Invalid subject id."

            )

        );

    }

    const subject = await Subject.findById(id)

        .populate("exam", "name slug category")

        .lean();

    if (!subject) {

        return res.status(404).json(

            ApiResponse.error(

                "Subject not found."

            )

        );

    }

    return res.status(200).json(

        ApiResponse.success(

            "Subject fetched successfully.",

            subject

        )

    );

});

/*
==================================================
Update Subject
==================================================
*/

exports.updateSubject = asyncHandler(async (req, res) => {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {

        return res.status(400).json(

            ApiResponse.error(

                "Invalid subject id."

            )

        );

    }

    const subject = await Subject.findById(id);

    if (!subject) {

        return res.status(404).json(

            ApiResponse.error(

                "Subject not found."

            )

        );

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

    if (exam && !mongoose.Types.ObjectId.isValid(exam)) {

        return res.status(400).json(

            ApiResponse.error(

                "Invalid exam id."

            )

        );

    }

    if (slug || exam) {

        const duplicate = await Subject.findOne({

            _id: {

                $ne: id,

            },

            exam: exam || subject.exam,

            slug: (slug || subject.slug)

                .trim()

                .toLowerCase(),

        });

        if (duplicate) {

            return res.status(409).json(

                ApiResponse.error(

                    "Another subject with this slug already exists for this exam."

                )

            );

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

    return res.status(200).json(

        ApiResponse.success(

            "Subject updated successfully.",

            subject

        )

    );

});

/*
==================================================
Delete Subject
==================================================
*/

exports.deleteSubject = asyncHandler(async (req, res) => {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {

        return res.status(400).json(

            ApiResponse.error(

                "Invalid subject id."

            )

        );

    }

    const subject = await Subject.findById(id);

    if (!subject) {

        return res.status(404).json(

            ApiResponse.error(

                "Subject not found."

            )

        );

    }

    subject.isActive = false;

    await subject.save();

    return res.status(200).json(

        ApiResponse.success(

            "Subject deleted successfully."

        )

    );

});