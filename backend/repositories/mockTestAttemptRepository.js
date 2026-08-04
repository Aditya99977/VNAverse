const MockTestAttempt = require("../models/MockTestAttempt");

class MockTestAttemptRepository {
    /*
    ==========================================
    Create Attempt
    ==========================================
    */

    async create(attemptData) {
        return MockTestAttempt.create(attemptData);
    }

    /*
    ==========================================
    Find By ID
    ==========================================
    */

    async findById(attemptId) {
        return MockTestAttempt.findById(attemptId)
            .populate("user")
            .populate("exam")
            .populate("mockTest");
    }

    /*
    ==========================================
    Find User Attempts
    ==========================================
    */

    async findByUser(userId) {
        return MockTestAttempt.find({
            user: userId,
        })
            .populate("exam")
            .populate("mockTest")
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
        return MockTestAttempt.find({
            user: userId,
        })
            .populate("exam")
            .populate("mockTest")
            .sort({
                createdAt: -1,
            })
            .limit(limit);
    }

    /*
    ==========================================
    Find By Mock Test
    ==========================================
    */

    async findByMockTest(mockTestId) {
        return MockTestAttempt.find({
            mockTest: mockTestId,
        })
            .populate("user")
            .sort({
                createdAt: -1,
            });
    }

    /*
    ==========================================
    Find By Exam
    ==========================================
    */

    async findByExam(userId, examId) {
        return MockTestAttempt.find({
            user: userId,
            exam: examId,
        })
            .populate("mockTest")
            .sort({
                createdAt: -1,
            });
    }

    /*
    ==========================================
    Latest Attempt
    ==========================================
    */

    async findLatest(userId) {
        return MockTestAttempt.findOne({
            user: userId,
        })
            .sort({
                createdAt: -1,
            })
            .populate("mockTest");
    }

    /*
    ==========================================
    Update Attempt
    ==========================================
    */

    async update(attemptId, data) {
        return MockTestAttempt.findByIdAndUpdate(
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
        return MockTestAttempt.findByIdAndDelete(
            attemptId
        );
    }

    /*
    ==========================================
    Count Attempts
    ==========================================
    */

    async count(filters = {}) {
        return MockTestAttempt.countDocuments(
            filters
        );
    }

    /*
    ==========================================
    Recent Attempts
    ==========================================
    */

    async findRecent(limit = 10) {
        return MockTestAttempt.find()
            .populate("user")
            .populate("exam")
            .populate("mockTest")
            .sort({
                createdAt: -1,
            })
            .limit(limit);
    }
}

module.exports = new MockTestAttemptRepository();