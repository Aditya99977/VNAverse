const Performance = require("../models/Performance");

class PerformanceRepository {
    /*
    ==========================================
    Create Performance
    ==========================================
    */

    async create(data) {
        return Performance.create(data);
    }

    /*
    ==========================================
    Find By ID
    ==========================================
    */

    async findById(id) {
        return Performance.findById(id)
            .populate("user")
            .populate("exam")
            .populate("subject");
    }

    /*
    ==========================================
    Find By User
    ==========================================
    */

    async findByUser(userId) {
        return Performance.find({
            user: userId,
        })
            .populate("exam")
            .populate("subject")
            .sort({
                updatedAt: -1,
            });
    }

    /*
    ==========================================
    Find By Exam
    ==========================================
    */

    async findByExam(userId, examId) {
        return Performance.find({
            user: userId,
            exam: examId,
        })
            .populate("subject")
            .sort({
                updatedAt: -1,
            });
    }

    /*
    ==========================================
    Find By Subject
    ==========================================
    */

    async findBySubject(
        userId,
        examId,
        subjectId
    ) {
        return Performance.findOne({
            user: userId,
            exam: examId,
            subject: subjectId,
        });
    }

    /*
    ==========================================
    Find By User + Exam + Subject
    ==========================================
    */

    async findByUserExamSubject(
        userId,
        examId,
        subjectId
    ) {
        return Performance.findOne({
            user: userId,
            exam: examId,
            subject: subjectId,
        });
    }

    /*
    ==========================================
    Upsert Performance
    ==========================================
    */

    async upsert(filter, data) {
        return Performance.findOneAndUpdate(
            filter,
            data,
            {
                new: true,
                upsert: true,
                runValidators: true,
            }
        );
    }

    /*
    ==========================================
    Update
    ==========================================
    */

    async update(id, data) {
        return Performance.findByIdAndUpdate(
            id,
            data,
            {
                new: true,
                runValidators: true,
            }
        );
    }

    /*
    ==========================================
    Delete
    ==========================================
    */

    async delete(id) {
        return Performance.findByIdAndDelete(id);
    }

    /*
    ==========================================
    Count
    ==========================================
    */

    async count(filters = {}) {
        return Performance.countDocuments(filters);
    }
}

module.exports = new PerformanceRepository();