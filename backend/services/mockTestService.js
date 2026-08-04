const AppError = require("../utils/AppError");

const mockTestRepository = require("../repositories/mockTestRepository");
const mockTestAttemptRepository = require("../repositories/mockTestAttemptRepository");
const questionRepository = require("../repositories/questionRepository");

const performanceService = require("./performanceService");

const {
    evaluateAnswers,
} = require("./evaluationService");

class MockTestService {

    /*
    ==================================================
    Start Mock Test
    ==================================================
    */

    async startMockTest({

        userId,

        mockTestId,

    }) {

        const mockTest =
            await mockTestRepository.findById(
                mockTestId
            );

        if (!mockTest) {

            throw new AppError(
                "Mock test not found.",
                404
            );

        }

        if (!mockTest.isActive) {

            throw new AppError(
                "This mock test is not available.",
                400
            );

        }

        if (!mockTest.isPublished) {

            throw new AppError(
                "This mock test has not been published yet.",
                400
            );

        }

        const questions =
            await questionRepository.findByIds(
                mockTest.questions
            );

        if (!questions.length) {

            throw new AppError(
                "No questions found.",
                404
            );

        }

        const sanitizedQuestions =
            questions.map((question) => ({

                _id: question._id,

                question: question.question,

                options: question.options,

                difficulty: question.difficulty,

                marks: question.marks,

            }));

        return {

            mockTest: {

                _id: mockTest._id,

                title: mockTest.title,

                description: mockTest.description,

                duration: mockTest.duration,

                totalMarks: mockTest.totalMarks,

                totalQuestions:
                    sanitizedQuestions.length,

                negativeMarks:
                    mockTest.negativeMarks,

            },

            questions:
                sanitizedQuestions,

        };

    }

    /*
    ==================================================
    Submit Mock Test
    ==================================================
    */

    async submitMockTest({

        userId,

        mockTestId,

        answers,

        totalTime,

    }) {

        const mockTest =
            await mockTestRepository.findById(
                mockTestId
            );

        if (!mockTest) {

            throw new AppError(
                "Mock test not found.",
                404
            );

        }

        const questionIds =
            answers.map(
                (answer) => answer.questionId
            );

        const questions =
            await questionRepository.findByIds(
                questionIds
            );

        const evaluation =
            evaluateAnswers(
                questions,
                answers
            );

        const attempt =
            await mockTestAttemptRepository.create({

                user: userId,

                mockTest: mockTestId,

                exam: mockTest.exam,

                totalQuestions:
                    evaluation.totalQuestions,

                questionsSolved:
                    evaluation.attemptedQuestions,

                correctAnswers:
                    evaluation.correctAnswers,

                wrongAnswers:
                    evaluation.wrongAnswers,

                skippedQuestions:
                    evaluation.skippedQuestions,

                score:
                    evaluation.score,

                accuracy:
                    evaluation.accuracy,

                totalTime,

            });        /*
        ==========================================
        Update Performance
        ==========================================
        */

        await performanceService.updatePerformance({

            userId,

            examId: mockTest.exam,

            subjectId: null,

            score:
                evaluation.score,

            totalQuestions:
                evaluation.totalQuestions,

            correctAnswers:
                evaluation.correctAnswers,

            wrongAnswers:
                evaluation.wrongAnswers,

            skippedQuestions:
                evaluation.skippedQuestions,

            accuracy:
                evaluation.accuracy,

        });

        return {

            attempt,

            result:
                evaluation,

        };

    }

    /*
    ==================================================
    Mock Test History
    ==================================================
    */

    async getHistory(userId) {

        return await mockTestAttemptRepository.findByUser(
            userId
        );

    }

    /*
    ==================================================
    Mock Test Attempt Details
    ==================================================
    */

    async getById(id) {

        const attempt =
            await mockTestAttemptRepository.findById(
                id
            );

        if (!attempt) {

            throw new AppError(
                "Mock test attempt not found.",
                404
            );

        }

        return attempt;

    }

    /*
    ==================================================
    Delete Mock Test Attempt
    ==================================================
    */

    async delete(id) {

        await this.getById(id);

        return await mockTestAttemptRepository.delete(
            id
        );

    }

    /*
    ==================================================
    Create Mock Test (Admin)
    ==================================================
    */

    async createMockTest(mockTestData) {

        return await mockTestRepository.create(
            mockTestData
        );

    }

    /*
    ==================================================
    Get All Mock Tests (Admin)
    ==================================================
    */

    async getAllMockTests(filters = {}) {

        return await mockTestRepository.findAll(
            filters
        );

    }

    /*
    ==================================================
    Get Mock Test By ID (Admin)
    ==================================================
    */

    async getMockTestById(id) {

        const mockTest =
            await mockTestRepository.findById(
                id
            );

        if (!mockTest) {

            throw new AppError(
                "Mock test not found.",
                404
            );

        }

        return mockTest;

    }

    /*
    ==================================================
    Update Mock Test (Admin)
    ==================================================
    */

    async updateMockTest(id, data) {

        await this.getMockTestById(id);

        return await mockTestRepository.update(
            id,
            data
        );

    }    /*
    ==================================================
    Publish / Unpublish Mock Test
    ==================================================
    */

    async toggleMockTestStatus(id) {

        const mockTest =
            await this.getMockTestById(id);

        if (mockTest.isPublished) {

            return await mockTestRepository.unpublish(
                id
            );

        }

        return await mockTestRepository.publish(
            id
        );

    }

    /*
    ==================================================
    Delete Mock Test (Admin)
    ==================================================
    */

    async deleteMockTest(id) {

        const mockTest =
            await this.getMockTestById(id);

        if (!mockTest.isActive) {

            throw new AppError(
                "Mock test is already inactive.",
                400
            );

        }

        return await mockTestRepository.deactivate(
            id
        );

    }

    /*
    ==================================================
    Mock Test Statistics
    ==================================================
    */

    async getStatistics() {

        return await mockTestRepository.getStatistics();

    }

}

module.exports = new MockTestService();