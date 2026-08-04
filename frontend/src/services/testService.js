import api from "./api";

/*
==================================================
Start Mock Test
POST /api/test/start
==================================================
*/

export const startTest = async (payload) => {
    const { data } = await api.post(
        "/test/start",
        payload
    );

    return data;
};

/*
==================================================
Submit Mock Test
POST /api/test/submit/:testId
==================================================
*/

export const submitTest = async (
    testId,
    payload
) => {
    const { data } = await api.post(
        `/test/submit/${testId}`,
        payload
    );

    return data;
};

/*
==================================================
Test History
GET /api/test/history
==================================================
*/

export const getHistory = async () => {
    const { data } = await api.get(
        "/test/history"
    );

    return data;
};

/*
==================================================
Performance Summary
GET /api/test/performance
==================================================
*/

export const getPerformance = async () => {
    const { data } = await api.get(
        "/test/performance"
    );

    return data;
};

/*
==================================================
Test Details
GET /api/test/:id
==================================================
*/

export const getTestDetails = async (
    testId
) => {
    const { data } = await api.get(
        `/test/${testId}`
    );

    return data;
};