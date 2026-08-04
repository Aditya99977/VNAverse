const { z } = require("zod");

/*
=========================================
Start Practice
=========================================
*/

const startPracticeSchema = z.object({
    examId: z.string().min(1),

    subjectId: z.string().min(1),

    difficulty: z.enum([
        "Easy",
        "Medium",
        "Hard",
    ]),

    questionCount: z
        .number()
        .min(5)
        .max(100),
});

/*
=========================================
Submit Practice
=========================================
*/

const submitPracticeSchema = z.object({
    practiceId: z.string(),

    totalTime: z.number(),

    answers: z.array(
        z.object({
            questionId: z.string(),

            selectedAnswer:
                z.string().nullable(),
        })
    ),
});

module.exports = {
    startPracticeSchema,
    submitPracticeSchema,
};