const subjectRepository = require("../repositories/subjectRepository");
const examRepository = require("../repositories/examRepository");
const AppError = require("../utils/AppError");

class SubjectService {
    /*
    ==========================================
    Get All Active Subjects
    ==========================================
    */

    async getActiveSubjects(filters = {}) {
        return subjectRepository.findActive(filters);
    }

    /*
    ==========================================
    Get Subjects By Exam
    ==========================================
    */

    async getSubjectsByExam(examId) {

        const exam = await examRepository.findById(examId);

        if (!exam) {
            throw new AppError(
                "Exam not found.",
                404
            );
        }

        return subjectRepository.findByExam(
            examId
        );

    }

    /*
    ==========================================
    Get Subject By ID
    ==========================================
    */

    async getSubjectById(subjectId) {

        const subject =
            await subjectRepository.findById(
                subjectId
            );

        if (!subject) {
            throw new AppError(
                "Subject not found.",
                404
            );
        }

        return subject;

    }

    /*
    ==========================================
    Create Subject
    ==========================================
    */

    async createSubject(subjectData) {

        const exam =
            await examRepository.findById(
                subjectData.exam
            );

        if (!exam) {
            throw new AppError(
                "Exam not found.",
                404
            );
        }

        const existingSubject =
            await subjectRepository.findBySlug(
                subjectData.exam,
                subjectData.slug
            );

        if (existingSubject) {
            throw new AppError(
                "Subject already exists for this exam.",
                409
            );
        }

        return subjectRepository.create(
            subjectData
        );

    }

    /*
    ==========================================
    Update Subject
    ==========================================
    */

    async updateSubject(
        subjectId,
        subjectData
    ) {

        await this.getSubjectById(subjectId);

        if (
            subjectData.exam &&
            subjectData.slug
        ) {

            const duplicate =
                await subjectRepository.findBySlug(
                    subjectData.exam,
                    subjectData.slug
                );

            if (
                duplicate &&
                duplicate._id.toString() !==
                    subjectId
            ) {
                throw new AppError(
                    "Subject slug already exists.",
                    409
                );
            }
        }

        return subjectRepository.update(
            subjectId,
            subjectData
        );

    }

    /*
    ==========================================
    Update Question Count
    ==========================================
    */

    async updateQuestionCount(
        subjectId,
        totalQuestions
    ) {

        await this.getSubjectById(subjectId);

        return subjectRepository.updateQuestionCount(
            subjectId,
            totalQuestions
        );

    }

    /*
    ==========================================
    Deactivate Subject
    ==========================================
    */

    async deactivateSubject(subjectId) {

        await this.getSubjectById(subjectId);

        return subjectRepository.deactivate(
            subjectId
        );

    }

    /*
    ==========================================
    Delete Subject
    ==========================================
    */

    async deleteSubject(subjectId) {

        await this.getSubjectById(subjectId);

        return subjectRepository.delete(
            subjectId
        );

    }

    /*
    ==========================================
    Count Subjects
    ==========================================
    */

    async getSubjectCount(filters = {}) {
        return subjectRepository.count(filters);
    }
}

module.exports = new SubjectService();