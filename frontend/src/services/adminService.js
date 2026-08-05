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
Dashboard
==================================================
*/

export const getAdminDashboard = async () => {

    const { data } = await api.get(
        "/admin/dashboard"
    );

    return unwrapResponse(data);

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

    return unwrapResponse(data);

};

export const getUserDetails = async (
    userId
) => {

    const { data } = await api.get(
        `/admin/users/${userId}`
    );

    return unwrapResponse(data);

};

export const deleteUser = async (
    userId
) => {

    const { data } = await api.delete(
        `/admin/users/${userId}`
    );

    return unwrapResponse(data);

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

    return unwrapResponse(data);

};

export const addQuestion = async (
    questionData
) => {

    const { data } = await api.post(
        "/questions",
        questionData
    );

    return unwrapResponse(data);

};

export const updateQuestion = async (
    questionId,
    questionData
) => {

    const { data } = await api.put(
        `/questions/${questionId}`,
        questionData
    );

    return unwrapResponse(data);

};

export const deleteQuestion = async (
    questionId
) => {

    const { data } = await api.delete(
        `/questions/${questionId}`
    );

    return unwrapResponse(data);

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

    if (examId) {

        formData.append("examId", examId);

    }

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

    return unwrapResponse(data);

};