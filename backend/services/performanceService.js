const AppError = require("../utils/AppError");

const performanceRepository = require("../repositories/performanceRepository");

class PerformanceService {

    /*
    ==========================================
    Get User Performance
    ==========================================
    */

    async getUserPerformance(userId) {

        return performanceRepository.findByUser(userId);

    }

    /*
    ==========================================
    Get Exam Performance
    ==========================================
    */

    async getExamPerformance(userId, examId) {

        return performanceRepository.findByExam(
            userId,
            examId
        );

    }

    /*
    ==========================================
    Get Subject Performance
    ==========================================
    */

    async getSubjectPerformance(
        userId,
        examId,
        subjectId
    ) {

        const performance =
            await performanceRepository.findBySubject(
                userId,
                examId,
                subjectId
            );

        if (!performance) {

            throw new AppError(
                "Performance record not found.",
                404
            );

        }

        return performance;

    }

    /*
    ==========================================
    Get Or Create Performance
    ==========================================
    */

    async getOrCreatePerformance(
        userId,
        examId,
        subjectId
    ) {

        let performance =
            await performanceRepository.findByUserExamSubject(
                userId,
                examId,
                subjectId
            );

        if (performance) {

            return performance;

        }

        return performanceRepository.create({

            user: userId,

            exam: examId,

            subject: subjectId,

            questionsSolved: 0,

            correctAnswers: 0,

            wrongAnswers: 0,

            skippedQuestions: 0,

            practiceSessions: 0,

            mockTestsTaken: 0,

            totalMarks: 0,

            obtainedMarks: 0,

            accuracy: 0,

            averageTimePerQuestion: 0,

            totalStudyTime: 0,

        });

    }

    /*
    ==========================================
    Update Performance Statistics
    ==========================================
    */

    updatePerformanceStatistics(
        performance,
        evaluation,
        totalTime
    ) {

        performance.questionsSolved +=
            evaluation.attemptedQuestions;

        performance.correctAnswers +=
            evaluation.correctAnswers;

        performance.wrongAnswers +=
            evaluation.wrongAnswers;

        performance.skippedQuestions +=
            evaluation.skippedQuestions;

        performance.totalMarks +=
            evaluation.totalMarks;

        performance.obtainedMarks +=
            evaluation.score;

        performance.totalStudyTime +=
            totalTime;

        performance.accuracy =
            performance.questionsSolved
                ? Number(
                      (
                          performance.correctAnswers /
                          performance.questionsSolved
                      ) * 100
                  ).toFixed(2)
                : 0;

        performance.averageTimePerQuestion =
            performance.questionsSolved
                ? Number(
                      (
                          performance.totalStudyTime /
                          performance.questionsSolved
                      ).toFixed(2)
                  )
                : 0;

        performance.lastActivity =
            new Date();

    }

    /*
    ==========================================
    Record Practice Attempt
    ==========================================
    */

    async recordPracticeAttempt({

        userId,

        examId,

        subjectId,

        evaluation,

        totalTime,

    }) {

        const performance =
            await this.getOrCreatePerformance(

                userId,

                examId,

                subjectId

            );

        this.updatePerformanceStatistics(

            performance,

            evaluation,

            totalTime

        );

        performance.practiceSessions += 1;

        return performance.save();

    }    /*
    ==========================================
    Record Mock Test Attempt
    ==========================================
    */

    async recordMockTestAttempt({

        userId,

        examId,

        subjectId,

        evaluation,

        totalTime,

    }) {

        const performance =
            await this.getOrCreatePerformance(

                userId,

                examId,

                subjectId

            );

        this.updatePerformanceStatistics(

            performance,

            evaluation,

            totalTime

        );

        performance.mockTestsTaken += 1;

        return performance.save();

    }

    /*
    ==========================================
    Delete Performance
    ==========================================
    */

    async deletePerformance(id) {

        const performance =
            await performanceRepository.findById(
                id
            );

        if (!performance) {

            throw new AppError(
                "Performance not found.",
                404
            );

        }

        return performanceRepository.delete(
            id
        );

    }

}

module.exports = new PerformanceService();