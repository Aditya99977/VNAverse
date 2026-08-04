const examService = require("../services/examService");

class ExamController {
    /*
    ==========================================
    Get Active Exams
    GET /api/exams
    ==========================================
    */

    async getActiveExams(req, res, next) {
        try {
            const exams =
                await examService.getActiveExams();

            return res.status(200).json({
                success: true,
                count: exams.length,
                data: exams,
            });
        } catch (error) {
            next(error);
        }
    }

    /*
    ==========================================
    Get All Exams
    GET /api/exams/all
    ==========================================
    */

    async getAllExams(req, res, next) {
        try {
            const exams =
                await examService.getAllExams();

            return res.status(200).json({
                success: true,
                count: exams.length,
                data: exams,
            });
        } catch (error) {
            next(error);
        }
    }

    /*
    ==========================================
    Get Exam By ID
    GET /api/exams/:id
    ==========================================
    */

    async getExamById(req, res, next) {
        try {
            const exam =
                await examService.getExamById(
                    req.params.id
                );

            return res.status(200).json({
                success: true,
                data: exam,
            });
        } catch (error) {
            next(error);
        }
    }

    /*
    ==========================================
    Create Exam
    POST /api/exams
    ==========================================
    */

    async createExam(req, res, next) {
        try {
            const exam =
                await examService.createExam(
                    req.body
                );

            return res.status(201).json({
                success: true,
                message:
                    "Exam created successfully.",
                data: exam,
            });
        } catch (error) {
            next(error);
        }
    }

    /*
    ==========================================
    Update Exam
    PUT /api/exams/:id
    ==========================================
    */

    async updateExam(req, res, next) {
        try {
            const exam =
                await examService.updateExam(
                    req.params.id,
                    req.body
                );

            return res.status(200).json({
                success: true,
                message:
                    "Exam updated successfully.",
                data: exam,
            });
        } catch (error) {
            next(error);
        }
    }

    /*
    ==========================================
    Deactivate Exam
    PATCH /api/exams/:id/status
    ==========================================
    */

    async deactivateExam(req, res, next) {
        try {
            const exam =
                await examService.deactivateExam(
                    req.params.id
                );

            return res.status(200).json({
                success: true,
                message:
                    "Exam deactivated successfully.",
                data: exam,
            });
        } catch (error) {
            next(error);
        }
    }

    /*
    ==========================================
    Delete Exam
    DELETE /api/exams/:id
    ==========================================
    */

    async deleteExam(req, res, next) {
        try {
            await examService.deleteExam(
                req.params.id
            );

            return res.status(200).json({
                success: true,
                message:
                    "Exam deleted successfully.",
            });
        } catch (error) {
            next(error);
        }
    }

    /*
    ==========================================
    Select / Switch Exam
    PUT /api/exams/select
    ==========================================
    */

    async selectExam(req, res, next) {
        try {
            const { examId } = req.body;

            const progress =
                await examService.selectExam(
                    req.user.id,
                    examId
                );

            return res.status(200).json({
                success: true,
                message:
                    "Exam selected successfully.",
                data: progress,
            });
        } catch (error) {
            next(error);
        }
    }

    /*
    ==========================================
    Get Current Exam
    GET /api/exams/current
    ==========================================
    */

    async getCurrentExam(req, res, next) {
        try {
            const currentExam =
                await examService.getCurrentExam(
                    req.user.id
                );

            return res.status(200).json({
                success: true,
                data: currentExam,
            });
        } catch (error) {
            next(error);
        }
    }

    /*
    ==========================================
    Get User Exams
    GET /api/exams/my-exams
    ==========================================
    */

    async getUserExams(req, res, next) {
        try {
            const exams =
                await examService.getUserExams(
                    req.user.id
                );

            return res.status(200).json({
                success: true,
                count: exams.length,
                data: exams,
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ExamController();