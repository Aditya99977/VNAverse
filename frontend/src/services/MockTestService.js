import api from "./api";

/*
==================================================
Student APIs
==================================================
*/

/**
 * Start Mock Test
 * POST /api/mocktests/start
 */
export const startMockTest = async (mockTestId) => {
    const { data } = await api.post(
        "/mocktests/start",
        {
            mockTestId,
        }
    );

    return data;
};

/**
 * Submit Mock Test
 * POST /api/mocktests/submit
 */
export const submitMockTest = async ({
    mockTestId,
    answers,
    totalTime,
}) => {
    const { data } = await api.post(
        "/mocktests/submit",
        {
            mockTestId,
            answers,
            totalTime,
        }
    );

    return data;
};

/**
 * Get Student Mock Test History
 * GET /api/mocktests/history
 */
export const getMockTestHistory = async () => {
    const { data } = await api.get(
        "/mocktests/history"
    );

    return data;
};

/**
 * Get Mock Test Attempt By ID
 * GET /api/mocktests/history/:id
 */
export const getMockTestAttemptById = async (
    attemptId
) => {
    const { data } = await api.get(
        `/mocktests/history/${attemptId}`
    );

    return data;
};

/**
 * Delete Mock Test Attempt
 * DELETE /api/mocktests/history/:id
 */
export const deleteMockTestAttempt = async (
    attemptId
) => {
    const { data } = await api.delete(
        `/mocktests/history/${attemptId}`
    );

    return data;
};

/*
==================================================
Admin APIs
==================================================
*/

/**
 * Get All Mock Tests
 * GET /api/mocktests
 */
export const getMockTests = async () => {
    const { data } = await api.get(
        "/mocktests"
    );

    return data;
};

/**
 * Get Mock Test By ID
 * GET /api/mocktests/:id
 */
export const getMockTestById = async (id) => {
    const { data } = await api.get(
        `/mocktests/${id}`
    );

    return data;
};

/**
 * Create Mock Test
 * POST /api/mocktests
 */
export const createMockTest = async (
    mockTestData
) => {
    const { data } = await api.post(
        "/mocktests",
        mockTestData
    );

    return data;
};

/**
 * Update Mock Test
 * PUT /api/mocktests/:id
 */
export const updateMockTest = async (
    id,
    mockTestData
) => {
    const { data } = await api.put(
        `/mocktests/${id}`,
        mockTestData
    );

    return data;
};

/**
 * Activate / Deactivate Mock Test
 * PATCH /api/mocktests/:id/status
 */
export const toggleMockTestStatus = async (
    id
) => {
    const { data } = await api.patch(
        `/mocktests/${id}/status`
    );

    return data;
};

/**
 * Delete Mock Test
 * DELETE /api/mocktests/:id
 */
export const deleteMockTest = async (id) => {
    const { data } = await api.delete(
        `/mocktests/${id}`
    );

    return data;
};

export const getMockTestStatistics = async () => {
    const { data } = await api.get(
        "/mocktests/statistics"
    );

    return data;
};
