const AppError = require("../utils/AppError");

const examRepository = require("../repositories/examRepository");
const subjectRepository = require("../repositories/subjectRepository");
const questionRepository = require("../repositories/questionRepository");

const {
    evaluateAnswers,
} = require("./evaluationService");

class PracticeService {

    /*
    ==================================================
    Start Practice
    ==================================================
    */

    async startPractice({
        examId,
        subjectId,
        difficulty,
        questionCount,
    }) {

        /*
        ==========================================
        Validate Exam
        ==========================================
        */

        const exam =
            await examRepository.findById(examId);

        if (!exam) {

            throw new AppError(
                "Exam not found.",
                404
            );

        }

        /*
        ==========================================
        Validate Subject
        ==========================================
        */

        const subject =
            await subjectRepository.findById(subjectId);

        if (!subject) {

            throw new AppError(
                "Subject not found.",
                404
            );

        }

        /*
        ==========================================
        Ensure Subject Belongs To Exam
        ==========================================
        */

        const subjectExamId =
            subject.exam?._id || subject.exam;

        if (String(subjectExamId) !== String(examId)) {

            throw new AppError(
                "Selected subject does not belong to the selected exam.",
                400
            );

        }

        /*
        ==========================================
        Validate Question Count
        ==========================================
        */

        if (!questionCount || questionCount <= 0) {

            throw new AppError(
                "Question count must be greater than zero.",
                400
            );

        }

        /*
        ==========================================
        Build Query
        ==========================================
        */

        const filters = {

            subject: subjectId,

            isActive: true,

        };

        if (difficulty && difficulty.trim() !== "") {

            filters.difficulty = difficulty;

        }

        /*
        ==========================================
        Fetch Questions
        ==========================================
        */

        const questions =
            await questionRepository.getRandomQuestions(
                filters,
                questionCount
            );

        if (!questions.length) {

            throw new AppError(
                "No questions available for the selected criteria.",
                404
            );

        }

        /*
        ==========================================
        Hide Correct Answers
        ==========================================
        */

        const sanitizedQuestions =
            questions.map((question) => ({

                _id: question._id,

                question: question.question,

                options: question.options,

                difficulty: question.difficulty,

                marks: question.marks,

            }));

        return {

            exam,

            subject,

            totalQuestions: sanitizedQuestions.length,

            questions: sanitizedQuestions,

        };

    }

    /*
    ==================================================
    Submit Practice
    ==================================================
    */

    async submitPractice({

        answers,

        totalTime,

    }) {

        /*
        ==========================================
        Fetch Questions
        ==========================================
        */

        const questionIds =
            answers.map(
                (answer) => answer.questionId
            );

        const questions =
            await questionRepository.findByIds(
                questionIds
            );

        if (!questions.length) {

            throw new AppError(
                "No valid questions found.",
                404
            );

        }

        /*
        ==========================================
        Evaluate Answers
        ==========================================
        */

        const evaluation =
            evaluateAnswers(
                questions,
                answers
            );

        /*
        ==========================================
        Return Result
        ==========================================
        */

        return {

            result: {

                ...evaluation,

                totalTime,

            },

        };

    }

}

module.exports = new PracticeService();