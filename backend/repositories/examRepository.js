const Exam = require("../models/Exam");

class ExamRepository {
    /*
    ==========================================
    Create Exam
    ==========================================
    */

    async create(examData) {
        return Exam.create(examData);
    }

    /*
    ==========================================
    Find By ID
    ==========================================
    */

    async findById(examId) {
        return Exam.findById(examId);
    }

    /*
    ==========================================
    Find By Slug
    ==========================================
    */

    async findBySlug(slug) {
        return Exam.findOne({
            slug: slug.toLowerCase(),
        });
    }

    /*
    ==========================================
    Get Active Exams
    ==========================================
    */

    async findActive() {
        return Exam.find({
            isActive: true,
        }).sort({
            displayOrder: 1,
            name: 1,
        });
    }

    /*
    ==========================================
    Get All Exams
    ==========================================
    */

    async findAll(filters = {}) {
        return Exam.find(filters).sort({
            displayOrder: 1,
            createdAt: -1,
        });
    }

    /*
    ==========================================
    Update Exam
    ==========================================
    */

    async update(examId, data) {
        return Exam.findByIdAndUpdate(
            examId,
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

    async deactivate(examId) {
        return Exam.findByIdAndUpdate(
            examId,
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
    Delete Permanently
    ==========================================
    */

    async delete(examId) {
        return Exam.findByIdAndDelete(examId);
    }

    /*
    ==========================================
    Count Exams
    ==========================================
    */

    async count(filters = {}) {
        return Exam.countDocuments(filters);
    }
}

module.exports = new ExamRepository();