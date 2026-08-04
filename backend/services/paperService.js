const AppError = require("../utils/AppError");

const previousPaperRepository = require("../repositories/previousPaperRepository");

class PaperService {

    /*
    ==================================================
    Validate Previous Paper
    ==================================================
    */

    async validatePaper(id) {

        const paper =
            await previousPaperRepository.findById(
                id
            );

        if (!paper) {

            throw new AppError(
                "Previous paper not found.",
                404
            );

        }

        return paper;

    }

    /*
    ==================================================
    Get All Previous Papers
    ==================================================
    */

    async getAllPapers(filters = {}) {

        return previousPaperRepository.findAll(
            filters
        );

    }

    /*
    ==================================================
    Get Previous Paper By ID
    ==================================================
    */

    async getPaperById(id) {

        const paper =
            await this.validatePaper(id);

        if (!paper.isActive) {

            throw new AppError(
                "This previous paper is not available.",
                400
            );

        }

        if (!paper.isPublished) {

            throw new AppError(
                "This previous paper has not been published yet.",
                400
            );

        }

        return paper;

    }

    /*
    ==================================================
    Get Previous Papers By Exam
    ==================================================
    */

    async getPapersByExam(examId) {

        return previousPaperRepository.findByExam(
            examId
        );

    }

    /*
    ==================================================
    Get Previous Papers By Year
    ==================================================
    */

    async getPapersByYear(
        examId,
        year
    ) {

        return previousPaperRepository.findByYear(
            examId,
            year
        );

    }

    /*
    ==================================================
    Create Previous Paper (Admin)
    ==================================================
    */

    async createPaper({

        title,

        description,

        exam,

        subject,

        year,

        shift,

        language,

        pdfUrl,

        answerKeyUrl,

        totalQuestions,

        duration,

        isPremium,

    }) {

        if (!title) {

            throw new AppError(
                "Paper title is required.",
                400
            );

        }

        if (!exam) {

            throw new AppError(
                "Exam is required.",
                400
            );

        }

        if (!year) {

            throw new AppError(
                "Year is required.",
                400
            );

        }

        if (!pdfUrl) {

            throw new AppError(
                "PDF URL is required.",
                400
            );

        }

        return previousPaperRepository.create({

            title,

            description,

            exam,

            subject,

            year,

            shift,

            language,

            pdfUrl,

            answerKeyUrl,

            totalQuestions,

            duration,

            isPremium,

        });

    }    /*
    ==================================================
    Update Previous Paper
    ==================================================
    */

    async updatePaper(id, data) {

        await this.validatePaper(id);

        return previousPaperRepository.update(
            id,
            data
        );

    }

    /*
    ==================================================
    Get All Previous Papers (Admin)
    ==================================================
    */

    async getAllPapersAdmin(filters = {}) {

        return previousPaperRepository.findAll(
            filters
        );

    }

    /*
    ==================================================
    Get Previous Paper Details (Admin)
    ==================================================
    */

    async getPaperDetails(id) {

        return this.validatePaper(id);

    }

    /*
    ==================================================
    Publish Previous Paper
    ==================================================
    */

    async publishPaper(id) {

        const paper =
            await this.validatePaper(id);

        if (paper.isPublished) {

            throw new AppError(
                "Previous paper is already published.",
                400
            );

        }

        return previousPaperRepository.publish(
            id
        );

    }

    /*
    ==================================================
    Unpublish Previous Paper
    ==================================================
    */

    async unpublishPaper(id) {

        const paper =
            await this.validatePaper(id);

        if (!paper.isPublished) {

            throw new AppError(
                "Previous paper is already unpublished.",
                400
            );

        }

        return previousPaperRepository.unpublish(
            id
        );

    }

    /*
    ==================================================
    Activate Previous Paper
    ==================================================
    */

    async activatePaper(id) {

        const paper =
            await this.validatePaper(id);

        if (paper.isActive) {

            throw new AppError(
                "Previous paper is already active.",
                400
            );

        }

        return previousPaperRepository.activate(
            id
        );

    }

    /*
    ==================================================
    Deactivate Previous Paper
    ==================================================
    */

    async deactivatePaper(id) {

        const paper =
            await this.validatePaper(id);

        if (!paper.isActive) {

            throw new AppError(
                "Previous paper is already inactive.",
                400
            );

        }

        return previousPaperRepository.deactivate(
            id
        );

    }    /*
    ==================================================
    Delete Previous Paper
    ==================================================
    */

    async deletePaper(id) {

        await this.validatePaper(id);

        return previousPaperRepository.delete(
            id
        );

    }

    /*
    ==================================================
    Record Paper View
    ==================================================
    */

    async recordView(id) {

        await this.validatePaper(id);

        return previousPaperRepository.incrementViews(
            id
        );

    }

    /*
    ==================================================
    Record Paper Download
    ==================================================
    */

    async recordDownload(id) {

        await this.validatePaper(id);

        return previousPaperRepository.incrementDownloads(
            id
        );

    }

    /*
    ==================================================
    Previous Paper Statistics
    ==================================================
    */

    async getStatistics() {

        return previousPaperRepository.getStatistics();

    }

}

module.exports = new PaperService();