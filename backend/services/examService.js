const examRepository = require("../repositories/examRepository");
const userExamProgressService = require("./userExamProgressService");

class ExamService {
    /*
    ==========================================
    Get Active Exams
    ==========================================
    */

    async getActiveExams() {
        return examRepository.findActive();
    }

    /*
    ==========================================
    Get All Exams
    ==========================================
    */

    async getAllExams(filters = {}) {
        return examRepository.findAll(filters);
    }

    /*
    ==========================================
    Get Exam By ID
    ==========================================
    */

    async getExamById(examId) {
        const exam = await examRepository.findById(examId);

        if (!exam) {
            throw new Error("Exam not found.");
        }

        return exam;
    }

    /*
    ==========================================
    Create Exam
    ==========================================
    */

    async createExam(examData) {
        const existingExam =
            await examRepository.findBySlug(
                examData.slug
            );

        if (existingExam) {
            throw new Error(
                "An exam with this slug already exists."
            );
        }

        return examRepository.create(examData);
    }

    /*
    ==========================================
    Update Exam
    ==========================================
    */

    async updateExam(examId, examData) {
        await this.getExamById(examId);

        return examRepository.update(
            examId,
            examData
        );
    }

    /*
    ==========================================
    Deactivate Exam
    ==========================================
    */

    async deactivateExam(examId) {
        await this.getExamById(examId);

        return examRepository.deactivate(
            examId
        );
    }

    /*
    ==========================================
    Delete Exam
    ==========================================
    */

    async deleteExam(examId) {
        await this.getExamById(examId);

        return examRepository.delete(
            examId
        );
    }

    /*
    ==========================================
    Count Exams
    ==========================================
    */

    async getExamCount(filters = {}) {
        return examRepository.count(filters);
    }

    /*
    ==========================================
    Select / Switch Exam
    ==========================================
    */

    async selectExam(userId, examId) {
        // Validate exam exists
        await this.getExamById(examId);

        return userExamProgressService.selectExam(
            userId,
            examId
        );
    }

    /*
    ==========================================
    Get Current Exam
    ==========================================
    */

    async getCurrentExam(userId) {
        return userExamProgressService.getCurrentExam(
            userId
        );
    }

    /*
    ==========================================
    Get User Exams
    ==========================================
    */

    async getUserExams(userId) {
        return userExamProgressService.getUserExams(
            userId
        );
    }
}

module.exports = new ExamService();