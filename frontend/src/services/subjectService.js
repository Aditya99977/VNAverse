import api from "./api";

/*
=========================================
Student APIs
=========================================
*/

// Get recommended subjects
export const getRecommendedSubjects = async () => {
  const response = await api.get("/subjects/recommended");
  return response.data;
};

// Get subjects by exam
export const getSubjectsByExam = async (examId) => {
  const response = await api.get(`/subjects/exam/${examId}`);
  return response.data;
};

/*
=========================================
Admin APIs
=========================================
*/

// Get all subjects
export const getAllSubjects = async () => {
  const response = await api.get("/subjects");
  return response.data;
};

// Get subject by id
export const getSubjectById = async (subjectId) => {
  const response = await api.get(`/subjects/${subjectId}`);
  return response.data;
};

// Create subject
export const createSubject = async (subjectData) => {
  const response = await api.post("/subjects", subjectData);
  return response.data;
};

// Update subject
export const updateSubject = async (subjectId, subjectData) => {
  const response = await api.put(
    `/subjects/${subjectId}`,
    subjectData
  );

  return response.data;
};

// Delete subject (Soft Delete)
export const deleteSubject = async (subjectId) => {
  const response = await api.delete(`/subjects/${subjectId}`);
  return response.data;
};