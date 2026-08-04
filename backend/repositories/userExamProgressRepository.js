const UserExamProgress = require("../models/UserExamProgress");

class UserExamProgressRepository {
    /*
    ==========================================
    Create Progress
    ==========================================
    */

    async create(progressData) {
        return UserExamProgress.create(progressData);
    }

    /*
    ==========================================
    Find By ID
    ==========================================
    */

    async findById(id) {
        return UserExamProgress.findById(id)
            .populate("user")
            .populate("exam");
    }

    /*
    ==========================================
    Find By User & Exam
    ==========================================
    */

    async findByUserAndExam(userId, examId) {
        return UserExamProgress.findOne({
            user: userId,
            exam: examId,
        })
            .populate("user")
            .populate("exam");
    }

    /*
    ==========================================
    Get Current Exam
    ==========================================
    */

    async findCurrentExam(userId) {
        return UserExamProgress.findOne({
            user: userId,
            isCurrent: true,
        })
            .populate("exam");
    }

    /*
    ==========================================
    Get All User Exams
    ==========================================
    */

    async findAllByUser(userId) {
        return UserExamProgress.find({
            user: userId,
        })
            .populate("exam")
            .sort({
                updatedAt: -1,
            });
    }

    /*
    ==========================================
    Reset Current Exam
    ==========================================
    */

    async clearCurrentExam(userId) {
        return UserExamProgress.updateMany(
            {
                user: userId,
                isCurrent: true,
            },
            {
                $set: {
                    isCurrent: false,
                },
            }
        );
    }

    /*
    ==========================================
    Update
    ==========================================
    */

    async update(id, updateData) {
        return UserExamProgress.findByIdAndUpdate(
            id,
            updateData,
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
        return UserExamProgress.findByIdAndDelete(id);
    }
}

module.exports = new UserExamProgressRepository();