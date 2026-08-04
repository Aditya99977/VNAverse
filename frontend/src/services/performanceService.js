import api from "./api";

/*
==================================================
Get User Performance
GET /api/performance
==================================================
*/

export const getUserPerformance = async () => {

    const { data } =
        await api.get("/performance");

    return data;

};

/*
==================================================
Get Exam Performance
GET /api/performance/exam/:examId
==================================================
*/

export const getExamPerformance = async (
    examId
) => {

    const { data } =
        await api.get(
            `/performance/exam/${examId}`
        );

    return data;

};

/*
==================================================
Get Subject Performance
GET /api/performance/exam/:examId/subject/:subjectId
==================================================
*/

export const getSubjectPerformance = async (
    examId,
    subjectId
) => {

    const { data } =
        await api.get(

            `/performance/exam/${examId}/subject/${subjectId}`

        );

    return data;

};