import api from "./api";

/*
==========================================
Student APIs
==========================================
*/

// Get all active exams
export const getAllExams = async () => {
    const { data } = await api.get("/exams");
    return data;
};

// Get exam by id
export const getExamById = async (examId) => {
    const { data } = await api.get(`/exams/${examId}`);
    return data;
};

// Select preferred exam
export const selectPreferredExam = async (examId) => {
    const { data } = await api.put("/exams/select", {
        examId,
    });

    return data;
};

/*
==========================================
Admin APIs
==========================================
*/

// Create Exam
export const createExam = async (examData) => {
    const { data } = await api.post(
        "/exams",
        examData
    );

    return data;
};

// Update Exam
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

// Delete Exam (Soft Delete)
export const deleteExam = async (examId) => {
    const { data } = await api.delete(
        `/exams/${examId}`
    );

    return data;
};