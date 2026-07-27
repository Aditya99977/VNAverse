const mongoose = require("mongoose");

const Question = require("../models/Question");
const Subject = require("../models/Subject");

/*
=================================================
Add Question
POST /api/questions
=================================================
*/

exports.addQuestion = async (req, res) => {
    try {
        const {
            question,
            options,
            correctAnswer,
            subject,
            difficulty,
            explanation,
        } = req.body;

        // ==========================
        // Validation
        // ==========================

        if (
            !question ||
            !options ||
            !correctAnswer ||
            !subject
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Question, options, correct answer and subject are required.",
            });
        }

        if (!mongoose.Types.ObjectId.isValid(subject)) {
            return res.status(400).json({
                success: false,
                message: "Invalid subject.",
            });
        }

        const subjectExists = await Subject.findById(subject);

        if (!subjectExists) {
            return res.status(404).json({
                success: false,
                message: "Subject not found.",
            });
        }

        const newQuestion = await Question.create({
            question,
            options,
            correctAnswer,
            subject,
            difficulty,
            explanation,
        });

        await newQuestion.populate({
            path: "subject",
            select: "name slug exam",
            populate: {
                path: "exam",
                select: "name slug category",
            },
        });

        return res.status(201).json({
            success: true,
            message: "Question added successfully.",
            question: newQuestion,
        });
    } catch (error) {
        console.error("Add Question Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

/*
=================================================
Get Questions
GET /api/questions
=================================================
*/

exports.getQuestions = async (req, res) => {
    try {
        const {
            exam,
            subject,
            difficulty,
        } = req.query;

        const filter = {
            isActive: true,
        };

        // ==========================
        // Filter By Subject
        // ==========================

        if (subject) {
            filter.subject = subject;
        }

        // ==========================
        // Filter By Difficulty
        // ==========================

        if (difficulty) {
            filter.difficulty = difficulty;
        }

        // ==========================
        // Filter By Exam
        // ==========================

        if (exam) {
            const subjects = await Subject.find({
                exam,
                isActive: true,
            }).select("_id");

            filter.subject = {
                $in: subjects.map((s) => s._id),
            };
        }

        const questions = await Question.find(filter)
            .populate({
                path: "subject",
                select: "name slug exam",
                populate: {
                    path: "exam",
                    select: "name slug category",
                },
            })
            .sort({
                createdAt: -1,
            });

        return res.status(200).json({
            success: true,
            count: questions.length,
            questions,
        });
    } catch (error) {
        console.error("Get Questions Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

/*
=================================================
Get Random Questions
GET /api/questions/random
=================================================
*/

exports.getRandomQuestions = async (req, res) => {
    try {
        const {
            exam,
            subject,
            difficulty,
            limit = 10,
        } = req.query;

        const match = {
            isActive: true,
        };

        // ==========================
        // Subject Filter
        // ==========================

        if (subject) {
            match.subject = new mongoose.Types.ObjectId(subject);
        }

        // ==========================
        // Difficulty Filter
        // ==========================

        if (difficulty) {
            match.difficulty = difficulty;
        }

        // ==========================
        // Exam Filter
        // ==========================

        if (exam) {
            const subjects = await Subject.find({
                exam,
                isActive: true,
            }).select("_id");

            match.subject = {
                $in: subjects.map(
                    (item) => item._id
                ),
            };
        }

        const questions = await Question.aggregate([
            {
                $match: match,
            },
            {
                $sample: {
                    size: Number(limit),
                },
            },
        ]);

        await Question.populate(questions, {
            path: "subject",
            select: "name slug exam",
            populate: {
                path: "exam",
                select: "name slug category",
            },
        });

        return res.status(200).json({
            success: true,
            count: questions.length,
            questions,
        });
    } catch (error) {
        console.error("Random Question Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};