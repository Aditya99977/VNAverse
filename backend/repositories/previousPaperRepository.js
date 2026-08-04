const PreviousPaper = require("../models/PreviousPaper");

class PreviousPaperRepository {

    /*
    ==========================================
    Create Previous Paper
    ==========================================
    */

    async create(paperData) {

        return PreviousPaper.create(paperData);

    }

    /*
    ==========================================
    Find By ID
    ==========================================
    */

    async findById(paperId) {

        return PreviousPaper.findById(paperId)

            .populate("exam")

            .populate("subject");

    }

    /*
    ==========================================
    Get Papers By Exam
    ==========================================
    */

    async findByExam(examId) {

        return PreviousPaper.find({

            exam: examId,

            isActive: true,

            isPublished: true,

        })

            .populate("exam")

            .populate("subject")

            .sort({

                year: -1,

                createdAt: -1,

            });

    }

    /*
    ==========================================
    Get Papers By Year
    ==========================================
    */

    async findByYear(examId, year) {

        return PreviousPaper.find({

            exam: examId,

            year,

            isActive: true,

            isPublished: true,

        })

            .populate("exam")

            .populate("subject")

            .sort({

                year: -1,

                createdAt: -1,

            });

    }

    /*
    ==========================================
    Get All Papers
    ==========================================
    */

    async findAll(filters = {}) {

        return PreviousPaper.find(filters)

            .populate("exam")

            .populate("subject")

            .sort({

                year: -1,

                createdAt: -1,

            });

    }

    /*
    ==========================================
    Find With Filters
    ==========================================
    */

    async findWithFilters({

        exam,

        subject,

        year,

        language,

        isPremium,

        isPublished,

        isActive,

    }) {

        const query = {};

        if (exam) query.exam = exam;

        if (subject) query.subject = subject;

        if (year) query.year = year;

        if (language) query.language = language;

        if (typeof isPremium === "boolean") {

            query.isPremium = isPremium;

        }

        if (typeof isPublished === "boolean") {

            query.isPublished = isPublished;

        }

        if (typeof isActive === "boolean") {

            query.isActive = isActive;

        }

        return PreviousPaper.find(query)

            .populate("exam")

            .populate("subject")

            .sort({

                year: -1,

                createdAt: -1,

            });

    }

    /*
    ==========================================
    Update
    ==========================================
    */

    async update(paperId, data) {

        return PreviousPaper.findByIdAndUpdate(

            paperId,

            data,

            {

                new: true,

                runValidators: true,

            }

        );

    }

    /*
    ==========================================
    Increment Views
    ==========================================
    */

    async incrementViews(paperId) {

        return PreviousPaper.findByIdAndUpdate(

            paperId,

            {

                $inc: {

                    views: 1,

                },

            },

            {

                new: true,

            }

        );

    }

    /*
    ==========================================
    Increment Downloads
    ==========================================
    */

    async incrementDownloads(paperId) {

        return PreviousPaper.findByIdAndUpdate(

            paperId,

            {

                $inc: {

                    downloads: 1,

                },

            },

            {

                new: true,

            }

        );

    }

    /*
    ==========================================
    Publish
    ==========================================
    */

    async publish(paperId) {

        return this.update(

            paperId,

            {

                isPublished: true,

            }

        );

    }

    /*
    ==========================================
    Unpublish
    ==========================================
    */

    async unpublish(paperId) {

        return this.update(

            paperId,

            {

                isPublished: false,

            }

        );

    }

    /*
    ==========================================
    Activate
    ==========================================
    */

    async activate(paperId) {

        return this.update(

            paperId,

            {

                isActive: true,

            }

        );

    }

    /*
    ==========================================
    Deactivate
    ==========================================
    */

    async deactivate(paperId) {

        return this.update(

            paperId,

            {

                isActive: false,

            }

        );

    }

    /*
    ==========================================
    Delete
    ==========================================
    */

    async delete(paperId) {

        return PreviousPaper.findByIdAndDelete(

            paperId

        );

    }

    /*
    ==========================================
    Count
    ==========================================
    */

    async count(filters = {}) {

        return PreviousPaper.countDocuments(

            filters

        );

    }

    /*
    ==========================================
    Statistics
    ==========================================
    */

    async getStatistics() {

        const [

            total,

            active,

            inactive,

            published,

            unpublished,

        ] = await Promise.all([

            PreviousPaper.countDocuments(),

            PreviousPaper.countDocuments({

                isActive: true,

            }),

            PreviousPaper.countDocuments({

                isActive: false,

            }),

            PreviousPaper.countDocuments({

                isPublished: true,

            }),

            PreviousPaper.countDocuments({

                isPublished: false,

            }),

        ]);

        return {

            total,

            active,

            inactive,

            published,

            unpublished,

        };

    }

}

module.exports = new PreviousPaperRepository();