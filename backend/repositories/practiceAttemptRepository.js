const PracticeAttempt = require("../models/PracticeAttempt");

class PracticeAttemptRepository {
    /*
    ==========================================
    Create Practice Attempt
    ==========================================
    */

    async create(attemptData) {
        return PracticeAttempt.create(attemptData);
    }

    /*
    ==========================================
    Find By ID
    ==========================================
    */

    async findById(attemptId) {
        return PracticeAttempt.findById(attemptId)
            .populate("user")
            .populate("exam")
            .populate("subject");
    }

    /*
    ==========================================
    Find User Attempts
    ==========================================
    */

    async findByUser(userId) {
        return PracticeAttempt.find({
            user: userId,
        })
            .populate("exam")
            .populate("subject")
            .sort({
                createdAt: -1,
            });
    }
    /*
==========================================
Recent Attempts By User
==========================================
*/

async findRecentByUser(userId, limit = 5) {
    return PracticeAttempt.find({
        user: userId,
    })
        .populate("exam")
        .populate("subject")
        .sort({
            createdAt: -1,
        })
        .limit(limit);
}

    /*
    ==========================================
    Find By Exam
    ==========================================
    */

    async findByExam(userId, examId) {
        return PracticeAttempt.find({
            user: userId,
            exam: examId,
        })
            .populate("subject")
            .sort({
                createdAt: -1,
            });
    }

    /*
    ==========================================
    Find By Subject
    ==========================================
    */

    async findBySubject(userId, subjectId) {
        return PracticeAttempt.find({
            user: userId,
            subject: subjectId,
        }).sort({
            createdAt: -1,
        });
    }

    /*
    ==========================================
    Latest Attempt
    ==========================================
    */

    async findLatest(userId) {
        return PracticeAttempt.findOne({
            user: userId,
        }).sort({
            createdAt: -1,
        });
    }

    /*
    ==========================================
    Update Attempt
    ==========================================
    */

    async update(attemptId, data) {
        return PracticeAttempt.findByIdAndUpdate(
            attemptId,
            data,
            {
                new: true,
                runValidators: true,
            }
        );
    }

    /*
    ==========================================
    Delete Attempt
    ==========================================
    */

    async delete(attemptId) {
        return PracticeAttempt.findByIdAndDelete(
            attemptId
        );
    }

    /*
    ==========================================
    Count Attempts
    ==========================================
    */

    async count(filters = {}) {
        return PracticeAttempt.countDocuments(
            filters
        );
    }

    /*
    ==========================================
    Recent Attempts
    ==========================================
    */

    async findRecent(limit = 10) {
        return PracticeAttempt.find()
            .populate("user")
            .populate("exam")
            .populate("subject")
            .sort({
                createdAt: -1,
            })
            .limit(limit);
    }
}

module.exports = new PracticeAttemptRepository();