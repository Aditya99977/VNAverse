import api from "./api";

/*
==================================================
Dashboard
==================================================
*/

export const getAdminDashboard = async () => {
    const { data } = await api.get(
        "/admin/dashboard"
    );

    return data;
};

/*
==================================================
Users
==================================================
*/

export const getAllUsers = async () => {
    const { data } = await api.get(
        "/admin/users"
    );

    return data;
};

export const getUserDetails = async (
    userId
) => {
    const { data } = await api.get(
        `/admin/users/${userId}`
    );

    return data;
};

export const deleteUser = async (
    userId
) => {
    const { data } = await api.delete(
        `/admin/users/${userId}`
    );

    return data;
};

/*
==================================================
Questions
==================================================
*/

export const getAllQuestions = async () => {
    const { data } = await api.get(
        "/admin/questions"
    );

    return data;
};

export const addQuestion = async (
    questionData
) => {
    const { data } = await api.post(
        "/questions",
        questionData
    );

    return data;
};

export const updateQuestion = async (
    questionId,
    questionData
) => {
    const { data } = await api.put(
        `/questions/${questionId}`,
        questionData
    );

    return data;
};

export const deleteQuestion = async (
    questionId
) => {
    const { data } = await api.delete(
        `/questions/${questionId}`
    );

    return data;
};

/*
==================================================
CSV Upload
==================================================
*/

export const uploadCSV = async (
    file,
    examId
) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("examId", examId);

    const { data } = await api.post(
        "/admin/upload/csv",
        formData,
        {
            headers: {
                "Content-Type":
                    "multipart/form-data",
            },
        }
    );

    return data;
};