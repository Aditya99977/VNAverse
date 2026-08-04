const questionRepository = require("../repositories/questionRepository");
const subjectRepository = require("../repositories/subjectRepository");
const AppError = require("../utils/AppError");

class QuestionService {
    /*
    ==========================================
    Get All Questions
    ==========================================
    */

    async getAllQuestions(filters = {}) {
        return questionRepository.findAll(filters);
    }

    /*
    ==========================================
    Get Question By ID
    ==========================================
    */

    async getQuestionById(questionId) {
        const question =
            await questionRepository.findById(questionId);

        if (!question) {
            throw new AppError(
                "Question not found.",
                404
            );
        }

        return question;
    }

    /*
    ==========================================
    Get Questions By Subject
    ==========================================
    */

    async getQuestionsBySubject(subjectId) {
        const subject =
            await subjectRepository.findById(subjectId);

        if (!subject) {
            throw new AppError(
                "Subject not found.",
                404
            );
        }

        return questionRepository.findBySubject(subjectId);
    }

    /*
    ==========================================
    Get Questions By Difficulty
    ==========================================
    */

    async getQuestionsByDifficulty(
        subjectId,
        difficulty
    ) {
        const subject =
            await subjectRepository.findById(subjectId);

        if (!subject) {
            throw new AppError(
                "Subject not found.",
                404
            );
        }

        return questionRepository.findByDifficulty(
            subjectId,
            difficulty
        );
    }

    /*
    ==========================================
    Random Questions
    ==========================================
    */

    async getRandomQuestions({
        subject,
        difficulty,
        limit = 10,
    }) {

        const filters = {
            isActive: true,
        };

        if (subject) {
            filters.subject = subject;
        }

        if (difficulty) {
            filters.difficulty = difficulty;
        }

        return questionRepository.getRandomQuestions(
            filters,
            limit
        );
    }

    /*
    ==========================================
    Search Questions
    ==========================================
    */

    async searchQuestions(keyword) {

        if (!keyword) {
            throw new AppError(
                "Search keyword is required.",
                400
            );
        }

        return questionRepository.search(keyword);

    }

    /*
    ==========================================
    Create Question
    ==========================================
    */

    async createQuestion(questionData) {

        const subject =
            await subjectRepository.findById(
                questionData.subject
            );

        if (!subject) {
            throw new AppError(
                "Subject not found.",
                404
            );
        }

        return questionRepository.create(
            questionData
        );

    }

    /*
    ==========================================
    Update Question
    ==========================================
    */

    async updateQuestion(
        questionId,
        questionData
    ) {

        await this.getQuestionById(questionId);

        return questionRepository.update(
            questionId,
            questionData
        );

    }

    /*
    ==========================================
    Deactivate Question
    ==========================================
    */

    async deactivateQuestion(questionId) {

        await this.getQuestionById(questionId);

        return questionRepository.deactivate(
            questionId
        );

    }

    /*
    ==========================================
    Activate Question
    ==========================================
    */

    async activateQuestion(questionId) {

        await this.getQuestionById(questionId);

        return questionRepository.activate(
            questionId
        );

    }

    /*
    ==========================================
    Delete Question
    ==========================================
    */

    async deleteQuestion(questionId) {

        await this.getQuestionById(questionId);

        return questionRepository.delete(
            questionId
        );

    }

    /*
    ==========================================
    Count Questions
    ==========================================
    */

    async getQuestionCount(filters = {}) {
        return questionRepository.count(filters);
    }
}

module.exports = new QuestionService();