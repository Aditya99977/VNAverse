const { z } = require("zod");

/*
==========================================
Start Mock Test
==========================================
*/

const startMockTestSchema = z.object({
    mockTestId: z.string().min(1, "Mock Test ID is required."),
});

/*
==========================================
Submit Mock Test
==========================================
*/

const submitMockTestSchema = z.object({
    mockTestId: z.string().min(1),

    totalTime: z.number().min(0),

    answers: z.array(
        z.object({
            questionId: z.string(),
            selectedAnswer: z.string().nullable(),
        })
    ),
});

module.exports = {
    startMockTestSchema,
    submitMockTestSchema,
};