const Subject = require("../models/Subject");

class SubjectRepository {
    /*
    ==========================================
    Create Subject
    ==========================================
    */

    async create(subjectData) {
        return Subject.create(subjectData);
    }

    /*
    ==========================================
    Find By ID
    ==========================================
    */

    async findById(subjectId) {
        return Subject.findById(subjectId)
            .populate("exam");
    }

    /*
    ==========================================
    Find By Slug
    ==========================================
    */

    async findBySlug(examId, slug) {
        return Subject.findOne({
            exam: examId,
            slug: slug.toLowerCase(),
        });
    }

    /*
    ==========================================
    Get Subjects By Exam
    ==========================================
    */

    async findByExam(examId) {
        return Subject.find({
            exam: examId,
            isActive: true,
        })
            .sort({
                displayOrder: 1,
                name: 1,
            })
            .populate("exam");
    }

    /*
    ==========================================
    Get Active Subjects
    ==========================================
    */

    async findActive(filters = {}) {
        return Subject.find({
            ...filters,
            isActive: true,
        })
            .sort({
                displayOrder: 1,
                name: 1,
            })
            .populate("exam");
    }

    /*
    ==========================================
    Get All Subjects
    ==========================================
    */

    async findAll(filters = {}) {
        return Subject.find(filters)
            .sort({
                displayOrder: 1,
                createdAt: -1,
            })
            .populate("exam");
    }

    /*
    ==========================================
    Update Subject
    ==========================================
    */

    async update(subjectId, data) {
        return Subject.findByIdAndUpdate(
            subjectId,
            data,
            {
                new: true,
                runValidators: true,
            }
        );
    }

    /*
    ==========================================
    Update Question Count
    ==========================================
    */

    async updateQuestionCount(
        subjectId,
        totalQuestions
    ) {
        return Subject.findByIdAndUpdate(
            subjectId,
            {
                totalQuestions,
            },
            {
                new: true,
            }
        );
    }

    /*
    ==========================================
    Soft Delete
    ==========================================
    */

    async deactivate(subjectId) {
        return Subject.findByIdAndUpdate(
            subjectId,
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

    async delete(subjectId) {
        return Subject.findByIdAndDelete(subjectId);
    }

    /*
    ==========================================
    Count Subjects
    ==========================================
    */

    async count(filters = {}) {
        return Subject.countDocuments(filters);
    }
}

module.exports = new SubjectRepository();