import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import MainLayout from "../layouts/MainLayout";

import SubjectTable from "../components/subjects/SubjectTable";
import SubjectForm from "../components/subjects/SubjectForm";
import DeleteSubjectModal from "../components/subjects/DeleteSubjectModal";
import SubjectFilters from "../components/subjects/SubjectFilters";
import SubjectStats from "../components/subjects/SubjectStats";

import {
    getAllSubjects,
    getSubjectById,
    createSubject,
    updateSubject,
    deleteSubject,
} from "../services/subjectService";

function SubjectManagement() {

    /*
    =====================================
    States
    =====================================
    */

    const [subjects, setSubjects] = useState([]);

    const [loading, setLoading] = useState(true);

    const [editingSubject, setEditingSubject] =
        useState(null);

    const [selectedSubject, setSelectedSubject] =
        useState(null);

    const [showForm, setShowForm] =
        useState(false);

    const [showDeleteModal, setShowDeleteModal] =
        useState(false);

    const [filters, setFilters] = useState({

        search: "",

        exam: "",

        status: "",

    });

    /*
    =====================================
    Initial Load
    =====================================
    */

    useEffect(() => {

        loadSubjects();

    }, []);

    /*
    =====================================
    Filtered Subjects
    =====================================
    */

    const filteredSubjects = useMemo(() => {

        let data = [...subjects];

        if (filters.search) {

            const keyword =
                filters.search.toLowerCase();

            data = data.filter((subject) =>

                subject.name
                    ?.toLowerCase()
                    .includes(keyword)

            );

        }

        if (filters.exam) {

            const keyword =
                filters.exam.toLowerCase();

            data = data.filter((subject) =>

                subject.exam?.name
                    ?.toLowerCase()
                    .includes(keyword)

            );

        }

        if (filters.status) {

            const active =
                filters.status === "active";

            data = data.filter(

                (subject) =>

                    subject.isActive === active

            );

        }

        return data;

    }, [subjects, filters]);

    /*
    =====================================
    Statistics
    =====================================
    */

    const statistics = useMemo(() => ({

        total: subjects.length,

        active: subjects.filter(

            (subject) => subject.isActive

        ).length,

        inactive: subjects.filter(

            (subject) => !subject.isActive

        ).length,

    }), [subjects]);

    /*
    =====================================
    Load Subjects
    =====================================
    */

    async function loadSubjects() {

        try {

            setLoading(true);

            const response =
                await getAllSubjects();

            setSubjects(

                response.subjects || []

            );

        }

        catch (error) {

            console.error(error);

            toast.error(

                error?.response?.data?.message ||

                "Unable to load subjects."

            );

        }

        finally {

            setLoading(false);

        }

    }

    /*
    =====================================
    Save Subject
    =====================================
    */

    const handleSaveSubject = async (data) => {

        try {

            if (editingSubject) {

                await updateSubject(

                    editingSubject._id,

                    data

                );

                toast.success(

                    "Subject updated successfully."

                );

            }

            else {

                await createSubject(data);

                toast.success(

                    "Subject created successfully."

                );

            }

            setShowForm(false);

            setEditingSubject(null);

            await loadSubjects();

        }

        catch (error) {

            console.error(error);

            toast.error(

                error?.response?.data?.message ||

                "Unable to save subject."

            );

        }

    };

    /*
    =====================================
    Edit Subject
    =====================================
    */

    const handleEdit = async (subject) => {

        try {

            const response =
                await getSubjectById(subject._id);

            setEditingSubject(

                response.subject

            );

            setShowForm(true);

        }

        catch (error) {

            console.error(error);

            toast.error(

                "Unable to load subject."

            );

        }

    };

    /*
    =====================================
    Delete Subject
    =====================================
    */

    const handleDelete = (subject) => {

        setSelectedSubject(subject);

        setShowDeleteModal(true);

    };

    /*
    =====================================
    Confirm Delete
    =====================================
    */

    const confirmDelete = async (id) => {

        try {

            await deleteSubject(id);

            toast.success(

                "Subject deleted successfully."

            );

            setShowDeleteModal(false);

            setSelectedSubject(null);

            await loadSubjects();

        }

        catch (error) {

            console.error(error);

            toast.error(

                error?.response?.data?.message ||

                "Unable to delete subject."

            );

        }

    };    /*
    =====================================
    Loading
    =====================================
    */

    if (loading) {

        return (

            <MainLayout>

                <div className="container-fluid py-4">

                    <div
                        className="rounded-4 p-5 text-center"
                        style={{
                            background: "#131D31",
                            border:
                                "1px solid rgba(255,255,255,.08)",
                        }}
                    >

                        <div
                            className="spinner-border text-primary mb-4"
                            role="status"
                        />

                        <h3 className="text-white fw-bold">

                            Loading Subjects...

                        </h3>

                        <p className="text-secondary mb-0">

                            Please wait while we load all available subjects.

                        </p>

                    </div>

                </div>

            </MainLayout>

        );

    }

    return (

        <MainLayout>

            <div className="container-fluid py-4">

                {/* ======================================
                    Header
                ====================================== */}

                <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center mb-4 gap-3">

                    <div>

                        <h2 className="fw-bold text-white mb-2">

                            📚 Subject Management

                        </h2>

                        <p className="text-secondary mb-0">

                            Create, update and organize all subjects
                            available across your exams.

                        </p>

                    </div>

                    <button
                        className="btn btn-primary px-4 py-2"
                        onClick={() => {

                            setEditingSubject(null);

                            setShowForm(true);

                        }}
                    >

                        ➕ Create Subject

                    </button>

                </div>

                {/* ======================================
                    Statistics
                ====================================== */}

                <SubjectStats
                    statistics={statistics}
                />

                {/* ======================================
                    Filters
                ====================================== */}

                <SubjectFilters
                    filters={filters}
                    setFilters={setFilters}
                />

                {/* ======================================
                    Subject Table
                ====================================== */}

                <SubjectTable
                    subjects={filteredSubjects}
                    loading={loading}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />                {/* ======================================
                    Create / Edit Subject Modal
                ====================================== */}

                {

                    showForm && (

                        <div
                            className="modal fade show"
                            style={{
                                display: "block",
                                backgroundColor:
                                    "rgba(0,0,0,.60)",
                            }}
                        >

                            <div className="modal-dialog modal-xl modal-dialog-centered">

                                <div
                                    className="modal-content border-0 rounded-4"
                                    style={{
                                        background: "#131D31",
                                    }}
                                >

                                    <div
                                        className="modal-header border-bottom"
                                        style={{
                                            borderColor:
                                                "rgba(255,255,255,.08)",
                                        }}
                                    >

                                        <h4 className="fw-bold text-white mb-0">

                                            {

                                                editingSubject

                                                    ? "✏️ Edit Subject"

                                                    : "📚 Create Subject"

                                            }

                                        </h4>

                                        <button
                                            className="btn-close btn-close-white"
                                            onClick={() => {

                                                setShowForm(false);

                                                setEditingSubject(null);

                                            }}
                                        />

                                    </div>

                                    <div className="modal-body">

                                        <SubjectForm

                                            key={
                                                editingSubject?._id ||
                                                "new-subject"
                                            }

                                            editingSubject={
                                                editingSubject
                                            }

                                            onSubmit={
                                                handleSaveSubject
                                            }

                                            onCancel={() => {

                                                setShowForm(false);

                                                setEditingSubject(null);

                                            }}

                                        />

                                    </div>

                                </div>

                            </div>

                        </div>

                    )

                }

                {/* ======================================
                    Delete Modal
                ====================================== */}

                <DeleteSubjectModal

                    show={showDeleteModal}

                    subject={selectedSubject}

                    onClose={() => {

                        setShowDeleteModal(false);

                        setSelectedSubject(null);

                    }}

                    onConfirm={confirmDelete}

                />

            </div>

        </MainLayout>

    );

}

export default SubjectManagement;