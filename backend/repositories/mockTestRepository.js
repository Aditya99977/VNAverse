const MockTest = require("../models/MockTest");

class MockTestRepository {

    /*
    ==========================================
    Create Mock Test
    ==========================================
    */

    async create(mockTestData) {

        return await MockTest.create(
            mockTestData
        );

    }

    /*
    ==========================================
    Find By ID
    ==========================================
    */

    async findById(mockTestId) {

        return await MockTest.findById(
            mockTestId
        )
            .populate("exam")
            .populate("subjects")
            .populate({
                path: "questions",
                populate: {
                    path: "subject",
                    populate: {
                        path: "exam",
                    },
                },
            });

    }

    /*
    ==========================================
    Get Active Mock Tests
    ==========================================
    */

    async findActive(filters = {}) {

        return await MockTest.find({

            ...filters,

            isActive: true,

            isPublished: true,

        })
            .populate("exam")
            .populate("subjects")
            .sort({
                createdAt: -1,
            });

    }

    /*
    ==========================================
    Get Mock Tests By Exam
    ==========================================
    */

    async findByExam(examId) {

        return await MockTest.find({

            exam: examId,

            isActive: true,

            isPublished: true,

        }).sort({

            createdAt: -1,

        });

    }

    /*
    ==========================================
    Get All Mock Tests
    ==========================================
    */

    async findAll(filters = {}) {

        return await MockTest.find(filters)

            .populate("exam")

            .populate("subjects")

            .sort({

                createdAt: -1,

            });

    }

    /*
    ==========================================
    Update Mock Test
    ==========================================
    */

    async update(mockTestId, data) {

        return await MockTest.findByIdAndUpdate(

            mockTestId,

            data,

            {

                new: true,

                runValidators: true,

            }

        );

    }

    /*
    ==========================================
    Publish Mock Test
    ==========================================
    */

    async publish(mockTestId) {

        return await MockTest.findByIdAndUpdate(

            mockTestId,

            {

                isPublished: true,

            },

            {

                new: true,

            }

        );

    }

    /*
    ==========================================
    Unpublish Mock Test
    ==========================================
    */

    async unpublish(mockTestId) {

        return await MockTest.findByIdAndUpdate(

            mockTestId,

            {

                isPublished: false,

            },

            {

                new: true,

            }

        );

    }

    /*
    ==========================================
    Activate Mock Test
    ==========================================
    */

    async activate(mockTestId) {

        return await MockTest.findByIdAndUpdate(

            mockTestId,

            {

                isActive: true,

            },

            {

                new: true,

            }

        );

    }

    /*
    ==========================================
    Deactivate Mock Test
    ==========================================
    */

    async deactivate(mockTestId) {

        return await MockTest.findByIdAndUpdate(

            mockTestId,

            {

                isActive: false,

            },

            {

                new: true,

            }

        );

    }

    /*
    ==========================================
    Delete Mock Test
    ==========================================
    */

    async delete(mockTestId) {

        return await MockTest.findByIdAndDelete(
            mockTestId
        );

    }

    /*
    ==========================================
    Count Mock Tests
    ==========================================
    */

    async count(filters = {}) {

        return await MockTest.countDocuments(
            filters
        );

    }

    /*
    ==========================================
    Mock Test Statistics
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

            MockTest.countDocuments(),

            MockTest.countDocuments({
                isActive: true,
            }),

            MockTest.countDocuments({
                isActive: false,
            }),

            MockTest.countDocuments({
                isPublished: true,
            }),

            MockTest.countDocuments({
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

module.exports = new MockTestRepository();