import api from "./api";

/*
==================================================
Student APIs
==================================================
*/

/*
==================================================
Get All Previous Papers
GET /api/papers
==================================================
*/

export const getAllPapers = async (params = {}) => {

    const { data } = await api.get(
        "/papers",
        { params }
    );

    return data;

};

/*
==================================================
Get Papers By Exam
GET /api/papers/exam/:examId
==================================================
*/

export const getPapersByExam = async (examId) => {

    const { data } = await api.get(
        `/papers/exam/${examId}`
    );

    return data;

};

/*
==================================================
Get Papers By Exam & Year
GET /api/papers/exam/:examId/year/:year
==================================================
*/

export const getPapersByYear = async (

    examId,

    year

) => {

    const { data } = await api.get(
        `/papers/exam/${examId}/year/${year}`
    );

    return data;

};

/*
==================================================
Get Paper By ID
GET /api/papers/:id
==================================================
*/

export const getPaperById = async (id) => {

    const { data } = await api.get(
        `/papers/${id}`
    );

    return data;

};

/*
==================================================
Record Paper View
PATCH /api/papers/:id/view
==================================================
*/

export const recordPaperView = async (id) => {

    const { data } = await api.patch(
        `/papers/${id}/view`
    );

    return data;

};

/*
==================================================
Record Paper Download
PATCH /api/papers/:id/download
==================================================
*/

export const recordPaperDownload = async (id) => {

    const { data } = await api.patch(
        `/papers/${id}/download`
    );

    return data;

};

/*
==================================================
Admin APIs
==================================================
*/

/*
==================================================
Get All Papers (Admin)
GET /api/papers/admin/all
==================================================
*/

export const getAllPapersAdmin = async (

    params = {}

) => {

    const { data } = await api.get(
        "/papers/admin/all",
        { params }
    );

    return data;

};

/*
==================================================
Get Paper By ID (Admin)
GET /api/papers/admin/:id
==================================================
*/

export const getPaperByIdAdmin = async (id) => {

    const { data } = await api.get(
        `/papers/admin/${id}`
    );

    return data;

};

/*
==================================================
Create Previous Paper
POST /api/papers
==================================================
*/

export const createPaper = async (

    paperData

) => {

    const { data } = await api.post(
        "/papers",
        paperData
    );

    return data;

};

/*
==================================================
Update Previous Paper
PUT /api/papers/:id
==================================================
*/

export const updatePaper = async (

    id,

    paperData

) => {

    const { data } = await api.put(
        `/papers/${id}`,
        paperData
    );

    return data;

};

/*
==================================================
Publish Previous Paper
PATCH /api/papers/:id/publish
==================================================
*/

export const publishPaper = async (id) => {

    const { data } = await api.patch(
        `/papers/${id}/publish`
    );

    return data;

};

/*
==================================================
Unpublish Previous Paper
PATCH /api/papers/:id/unpublish
==================================================
*/

export const unpublishPaper = async (id) => {

    const { data } = await api.patch(
        `/papers/${id}/unpublish`
    );

    return data;

};

/*
==================================================
Activate Previous Paper
PATCH /api/papers/:id/activate
==================================================
*/

export const activatePaper = async (id) => {

    const { data } = await api.patch(
        `/papers/${id}/activate`
    );

    return data;

};

/*
==================================================
Deactivate Previous Paper
PATCH /api/papers/:id/deactivate
==================================================
*/

export const deactivatePaper = async (id) => {

    const { data } = await api.patch(
        `/papers/${id}/deactivate`
    );

    return data;

};

/*
==================================================
Delete Previous Paper
DELETE /api/papers/:id
==================================================
*/

export const deletePaper = async (id) => {

    const { data } = await api.delete(
        `/papers/${id}`
    );

    return data;

};

/*
==================================================
Get Paper Statistics
GET /api/papers/admin/statistics
==================================================
*/

export const getPaperStatistics = async () => {

    const { data } = await api.get(
        "/papers/admin/statistics"
    );

    return data;

};