import api from "./api";

/*
==================================================
Helper
==================================================
*/

const unwrapResponse = (response) => {

    if (response?.data !== undefined) {

        return response.data;

    }

    return response;

};

/*
==================================================
Student APIs
==================================================
*/

/**
 * Get recommended subjects for the logged-in student
 * GET /api/subjects/recommended/me
 */
export const getRecommendedSubjects = async () => {

    const { data } = await api.get(
        "/subjects/recommended/me"
    );

    return unwrapResponse(data);

};

/**
 * Get subjects by exam
 * GET /api/subjects/exam/:examId
 */
export const getSubjectsByExam = async (examId) => {

    const { data } = await api.get(
        `/subjects/exam/${examId}`
    );

    return unwrapResponse(data);

};

/*
==================================================
Admin APIs
==================================================
*/

/**
 * Get all subjects
 * GET /api/subjects
 */
export const getAllSubjects = async () => {

    const { data } = await api.get(
        "/subjects"
    );

    return unwrapResponse(data);

};

/**
 * Get subject by ID
 * GET /api/subjects/:id
 */
export const getSubjectById = async (subjectId) => {

    const { data } = await api.get(
        `/subjects/${subjectId}`
    );

    return unwrapResponse(data);

};

/**
 * Create subject
 * POST /api/subjects
 */
export const createSubject = async (subjectData) => {

    const { data } = await api.post(
        "/subjects",
        subjectData
    );

    return unwrapResponse(data);

};

/**
 * Update subject
 * PUT /api/subjects/:id
 */
export const updateSubject = async (
    subjectId,
    subjectData
) => {

    const { data } = await api.put(
        `/subjects/${subjectId}`,
        subjectData
    );

    return unwrapResponse(data);

};

/**
 * Delete subject
 * DELETE /api/subjects/:id
 */
export const deleteSubject = async (subjectId) => {

    const { data } = await api.delete(
        `/subjects/${subjectId}`
    );

    return unwrapResponse(data);

};