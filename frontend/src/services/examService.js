import api from "./api";

/*
==================================================
Student APIs
==================================================
*/

/**
 * Get all active exams
 * GET /api/exams
 */
export const getAllExams = async () => {
    const { data } = await api.get("/exams");
    return data;
};

/**
 * Get exam details by ID
 * GET /api/exams/:id
 */
export const getExamById = async (examId) => {
    const { data } = await api.get(`/exams/${examId}`);
    return data;
};

/**
 * Select / Switch Current Exam
 * PUT /api/exams/select
 */
export const selectPreferredExam = async (examId) => {
    const { data } = await api.put("/exams/select", {
        examId,
    });

    return data;
};

/**
 * Get Current Selected Exam
 * GET /api/exams/current
 */
export const getCurrentExam = async () => {
    const { data } = await api.get("/exams/current");
    return data;
};

/**
 * Get All User Exams
 * GET /api/exams/my-exams
 */
export const getUserExams = async () => {
    const { data } = await api.get("/exams/my-exams");
    return data;
};

/*
==================================================
Admin APIs
==================================================
*/

/**
 * Get all exams (Active + Inactive)
 * GET /api/exams/all
 */
export const getAllExamsForAdmin = async () => {
    const { data } = await api.get("/exams/all");
    return data;
};

/**
 * Create Exam
 * POST /api/exams
 */
export const createExam = async (examData) => {
    const { data } = await api.post(
        "/exams",
        examData
    );

    return data;
};

/**
 * Update Exam
 * PUT /api/exams/:id
 */
export const updateExam = async (
    examId,
    examData
) => {
    const { data } = await api.put(
        `/exams/${examId}`,
        examData
    );

    return data;
};

/**
 * Deactivate Exam
 * PATCH /api/exams/:id/status
 */
export const deactivateExam = async (examId) => {
    const { data } = await api.patch(
        `/exams/${examId}/status`
    );

    return data;
};

/**
 * Delete Exam
 * DELETE /api/exams/:id
 */
export const deleteExam = async (examId) => {
    const { data } = await api.delete(
        `/exams/${examId}`
    );

    return data;
};