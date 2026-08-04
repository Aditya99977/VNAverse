const AppError = require("../utils/AppError");

const userExamProgressRepository = require("../repositories/userExamProgressRepository");

class UserExamProgressService {

    /*
    ==========================================
    Get Current Exam
    ==========================================
    */

    async getCurrentExam(userId) {

        return userExamProgressRepository.findCurrentExam(
            userId
        );

    }

    /*
    ==========================================
    Get All User Exams
    ==========================================
    */

    async getUserExams(userId) {

        return userExamProgressRepository.findAllByUser(
            userId
        );

    }

    /*
    ==========================================
    Select / Switch Exam
    ==========================================
    */

    async selectExam(userId, examId) {

        // Remove currently active exam

        await userExamProgressRepository.clearCurrentExam(
            userId
        );

        // Check if progress already exists

        let progress =
            await userExamProgressRepository.findByUserAndExam(
                userId,
                examId
            );

        if (progress) {

            return userExamProgressRepository.update(
                progress._id,
                {
                    isCurrent: true,
                    lastActivity: new Date(),
                }
            );

        }

        // Create progress for first-time selection

        return userExamProgressRepository.create({

            user: userId,

            exam: examId,

            isCurrent: true,

            studyStreak: 0,

            longestStudyStreak: 0,

            completedSubjects: [],

            startedAt: new Date(),

            lastActivity: new Date(),

        });

    }

    /*
    ==========================================
    Update Last Activity
    ==========================================
    */

    async updateLastActivity(userId, examId) {

        const progress =
            await userExamProgressRepository.findByUserAndExam(
                userId,
                examId
            );

        if (!progress) {

            throw new AppError(
                "Progress record not found.",
                404
            );

        }

        return userExamProgressRepository.update(

            progress._id,

            {
                lastActivity: new Date(),
            }

        );

    }

}

module.exports = new UserExamProgressService();