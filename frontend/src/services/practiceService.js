import api from "./api";

/*
==================================================
Practice APIs
==================================================
*/

/**
 * Start Practice Session
 * POST /practice/start
 */
export const startPractice = async ({
    examId,
    subjectId,
    difficulty,
    questionCount = 10,
}) => {

    const { data } = await api.post("/practice/start", {
        examId,
        subjectId,
        difficulty,
        questionCount,
    });

    return data;
};

/**
 * Submit Practice Session
 * POST /practice/submit
 */
export const submitPractice = async ({
    examId,
    subjectId,
    answers,
    totalTime,
}) => {

    const { data } = await api.post("/practice/submit", {
        examId,
        subjectId,
        answers,
        totalTime,
    });

    return data;
};

/**
 * Get Practice History
 * GET /practice/history
 */
export const getPracticeHistory = async () => {

    const { data } = await api.get("/practice/history");

    return data;
};

/**
 * Get Practice Attempt Details
 * GET /practice/:id
 */
export const getPracticeById = async (id) => {

    const { data } = await api.get(`/practice/${id}`);

    return data;
};

/**
 * Delete Practice Attempt
 * DELETE /practice/:id
 */
export const deletePractice = async (id) => {

    const { data } = await api.delete(`/practice/${id}`);

    return data;
};