import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
    getAllExams,
    createExam,
    updateExam,
    deleteExam,
} from "../services/examService";

import ExamStats from "../components/admin/ExamStats";
import ExamTable from "../components/admin/ExamTable";
import ExamModal from "../components/admin/ExamModal";
import DeleteExamModal from "../components/admin/DeleteExamModal";

const ManageExams = () => {
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);

    const [exams, setExams] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [selectedExam, setSelectedExam] = useState(null);

    const loadExams = async () => {
        try {
            setLoading(true);

            const response = await getAllExams();

            console.log("Exam API Response:", response);

            let examsData = [];

            if (Array.isArray(response)) {
                examsData = response;
            } else if (Array.isArray(response?.exams)) {
                examsData = response.exams;
            } else if (Array.isArray(response?.data)) {
                examsData = response.data;
            } else if (Array.isArray(response?.data?.exams)) {
                examsData = response.data.exams;
            } else if (Array.isArray(response?.result)) {
                examsData = response.result;
            }

            setExams(examsData);
        } catch (error) {
            console.error(error);

            toast.error(
                error?.response?.data?.message ||
                    "Failed to load exams."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadExams();
    }, []);

    const handleCreate = () => {
        setSelectedExam(null);
        setShowModal(true);
    };

    const handleEdit = (exam) => {
        setSelectedExam(exam);
        setShowModal(true);
    };

    const handleDelete = (exam) => {
        setSelectedExam(exam);
        setShowDeleteModal(true);
    };

    const closeExamModal = () => {
        setShowModal(false);
        setSelectedExam(null);
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setSelectedExam(null);
    };

    const handleSave = async (formData) => {
        try {
            if (selectedExam) {
                await updateExam(selectedExam._id, formData);
                toast.success("Exam updated successfully.");
            } else {
                await createExam(formData);
                toast.success("Exam created successfully.");
            }

            closeExamModal();
            await loadExams();
        } catch (error) {
            console.error(error);

            toast.error(
                error?.response?.data?.message ||
                    "Something went wrong."
            );
        }
    };

    const confirmDelete = async () => {
        if (!selectedExam) return;

        try {
            setDeleting(true);

            await deleteExam(selectedExam._id);

            toast.success("Exam deleted successfully.");

            closeDeleteModal();

            await loadExams();
        } catch (error) {
            console.error(error);

            toast.error(
                error?.response?.data?.message ||
                    "Failed to delete exam."
            );
        } finally {
            setDeleting(false);
        }
    };

    return (
        <div className="container-fluid py-4">
            <ExamStats exams={exams} />

            <ExamTable
                exams={exams}
                loading={loading}
                onCreate={handleCreate}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <ExamModal
                show={showModal}
                exam={selectedExam}
                onClose={closeExamModal}
                onSave={handleSave}
            />

            <DeleteExamModal
                show={showDeleteModal}
                exam={selectedExam}
                deleting={deleting}
                onClose={closeDeleteModal}
                onConfirm={confirmDelete}
            />
        </div>
    );
};

export default ManageExams;