const Question = require("../models/Question");

class QuestionRepository {
    /*
    ==========================================
    Create Question
    ==========================================
    */

    async create(questionData) {
        return Question.create(questionData);
    }

    /*
    ==========================================
    Find Question By ID
    ==========================================
    */

    async findById(questionId) {
        return Question.findById(questionId)
            .populate({
                path: "subject",
                populate: {
                    path: "exam",
                },
            });
    }

    /*
    ==========================================
    Find Multiple Questions By IDs
    ==========================================
    */

    async findByIds(questionIds) {
        return Question.find({
            _id: { $in: questionIds },
            isActive: true,
        }).lean();
    }

    /*
    ==========================================
    Get All Questions
    ==========================================
    */

    async findAll(filters = {}) {
        return Question.find(filters)
            .populate({
                path: "subject",
                populate: {
                    path: "exam",
                },
            })
            .sort({
                createdAt: -1,
            })
            .lean();
    }

    /*
    ==========================================
    Get Questions By Subject
    ==========================================
    */

    async findBySubject(subjectId) {
        return Question.find({
            subject: subjectId,
            isActive: true,
        })
            .sort({
                createdAt: -1,
            })
            .lean();
    }

    /*
    ==========================================
    Get Questions By Difficulty
    ==========================================
    */

    async findByDifficulty(subjectId, difficulty) {
        return Question.find({
            subject: subjectId,
            difficulty,
            isActive: true,
        }).lean();
    }

    /*
    ==========================================
    Get Random Questions
    ==========================================
    */

    async getRandomQuestions(match, limit = 10) {
        return Question.aggregate([
            {
                $match: match,
            },
            {
                $sample: {
                    size: Number(limit),
                },
            },
        ]);
    }

    /*
    ==========================================
    Search Questions
    ==========================================
    */

    async search(keyword) {
        return Question.find({
            question: {
                $regex: keyword,
                $options: "i",
            },
        }).lean();
    }

    /*
    ==========================================
    Update Question
    ==========================================
    */

    async update(questionId, data) {
        return Question.findByIdAndUpdate(
            questionId,
            data,
            {
                new: true,
                runValidators: true,
            }
        );
    }

    /*
    ==========================================
    Soft Delete
    ==========================================
    */

    async deactivate(questionId) {
        return Question.findByIdAndUpdate(
            questionId,
            {
                isActive: false,
            },
            {
                new: true,
            }
        );
    }

    /*
    ==========================================
    Restore Question
    ==========================================
    */

    async activate(questionId) {
        return Question.findByIdAndUpdate(
            questionId,
            {
                isActive: true,
            },
            {
                new: true,
            }
        );
    }

    /*
    ==========================================
    Delete Permanently
    ==========================================
    */

    async delete(questionId) {
        return Question.findByIdAndDelete(questionId);
    }

    /*
    ==========================================
    Count Questions
    ==========================================
    */

    async count(filters = {}) {
        return Question.countDocuments(filters);
    }
}

module.exports = new QuestionRepository();