const AppError = require("../utils/AppError");

const userRepository = require("../repositories/userRepository");
const examRepository = require("../repositories/examRepository");
const performanceRepository = require("../repositories/performanceRepository");
const practiceAttemptRepository = require("../repositories/practiceAttemptRepository");
const mockTestAttemptRepository = require("../repositories/mockTestAttemptRepository");
const userExamProgressRepository = require("../repositories/userExamProgressRepository");

class DashboardService {

    /*
    ==========================================
    Student Dashboard
    ==========================================
    */

    async getDashboard(userId, examId = null) {

        /*
        ======================================
        User
        ======================================
        */

        const user = await userRepository.findById(userId);

        if (!user) {
            throw new AppError(
                "User not found.",
                404
            );
        }

        /*
        ======================================
        Available Exams
        ======================================
        */

        const availableExams =
            await examRepository.findActive();

        /*
        ======================================
        Current Exam
        ======================================
        */

        let currentExam = null;

        if (examId) {

            currentExam =
                await examRepository.findById(
                    examId
                );

        } else {

            const progress =
                await userExamProgressRepository.findCurrentExam(
                    userId
                );

            currentExam = progress
                ? progress.exam
                : null;

            examId = currentExam?._id || null;

        }

        /*
        ======================================
        Performance
        ======================================
        */

        const performance = examId
            ? await performanceRepository.findByExam(
                  userId,
                  examId
              )
            : await performanceRepository.findByUser(
                  userId
              );

        /*
        ======================================
        Recent Practice
        ======================================
        */

        const recentPractice =
            await practiceAttemptRepository.findRecentByUser(
                userId,
                5
            );

        /*
        ======================================
        Recent Mock Tests
        ======================================
        */

        const recentMockTests =
            await mockTestAttemptRepository.findRecentByUser(
                userId,
                5
            );

        /*
        ======================================
        Dashboard Summary
        ======================================
        */

        const summary = {

            questionsSolved:
                performance.reduce(
                    (sum, item) =>
                        sum +
                        item.questionsSolved,
                    0
                ),

            correctAnswers:
                performance.reduce(
                    (sum, item) =>
                        sum +
                        item.correctAnswers,
                    0
                ),

            wrongAnswers:
                performance.reduce(
                    (sum, item) =>
                        sum +
                        item.wrongAnswers,
                    0
                ),

            skippedQuestions:
                performance.reduce(
                    (sum, item) =>
                        sum +
                        item.skippedQuestions,
                    0
                ),

            averageAccuracy:
                performance.length
                    ? Number(
                          (
                              performance.reduce(
                                  (sum, item) =>
                                      sum +
                                      item.accuracy,
                                  0
                              ) /
                              performance.length
                          ).toFixed(2)
                      )
                    : 0,

            totalSubjects:
                performance.length,

        };

        /*
        ======================================
        Return Dashboard
        ======================================
        */

        return {

            user,

            currentExam,

            availableExams,

            summary,

            performance,

            recentPractice,

            recentMockTests,

        };

    }

}

module.exports = new DashboardService();