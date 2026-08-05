import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import {
    FileText,
    Plus,
} from "lucide-react";

import MainLayout from "../layouts/MainLayout";

import PaperTable from "../components/papers/PaperTable";
import PaperForm from "../components/papers/PaperForm";
import DeletePaperModal from "../components/papers/DeletePaperModal";
import PaperFilters from "../components/papers/PaperFilters";

import {
    createPaper,
    getAllPapersAdmin,
    getPaperByIdAdmin,
    updatePaper,
    deletePaper,
    publishPaper,
    unpublishPaper,
    activatePaper,
    deactivatePaper,
    getPaperStatistics,
} from "../services/paperService";

function PaperManagement() {

    /*
    =====================================
    States
    =====================================
    */

    const [loading, setLoading] = useState(true);

    const [papers, setPapers] = useState([]);

    const [statistics, setStatistics] = useState(null);

    const [error, setError] = useState("");

    const [selectedPaper, setSelectedPaper] =
        useState(null);

    const [editingPaper, setEditingPaper] =
        useState(null);

    const [showForm, setShowForm] =
        useState(false);

    const [showDeleteModal, setShowDeleteModal] =
        useState(false);

    const [filters, setFilters] = useState({

        search: "",

        subject: "",

        year: "",

        language: "",

    });

    /*
    =====================================
    Initial Load
    =====================================
    */

    useEffect(() => {

        loadPapers();

    }, []);

    /*
    =====================================
    Load Papers
    =====================================
    */

    async function loadPapers() {

        try {

            setLoading(true);

            setError("");

            const [

                papersResponse,

                statisticsResponse,

            ] = await Promise.all([

                getAllPapersAdmin(),

                getPaperStatistics(),

            ]);

            setPapers(

                papersResponse.data ||

                papersResponse.papers ||

                []

            );

            setStatistics(

                statisticsResponse.data ||

                statisticsResponse.statistics ||

                null

            );

        }

        catch (error) {

            console.error(error);

            const message =

                error?.response?.data?.message ||

                "Unable to load previous year papers.";

            setError(message);

            toast.error(message);

        }

        finally {

            setLoading(false);

        }

    }

    /*
=====================================
Create / Update Paper
=====================================
*/

const handleSavePaper = async (formData) => {

    try {

        if (editingPaper) {

            await updatePaper(
                editingPaper._id,
                formData
            );

            toast.success(
                "Previous year paper updated successfully."
            );

        } else {

            await createPaper(formData);

            toast.success(
                "Previous year paper created successfully."
            );

        }

        setShowForm(false);

        setEditingPaper(null);

        await loadPapers();

    } catch (error) {

        console.error(error);

        toast.error(

            error?.response?.data?.message ||

            "Unable to save previous year paper."

        );

    }

};

/*
=====================================
Edit Paper
=====================================
*/

const handleEdit = async (paper) => {

    try {

        const response = await getPaperByIdAdmin(
            paper._id
        );

        setEditingPaper(

            response.paper ||

            response.data ||

            null

        );

        setShowForm(true);

    } catch (error) {

        console.error(error);

        toast.error(

            error?.response?.data?.message ||

            "Unable to load paper details."

        );

    }

};

/*
=====================================
Delete Paper
=====================================
*/

const handleDelete = (paper) => {

    setSelectedPaper(paper);

    setShowDeleteModal(true);

};

const confirmDelete = async (id) => {

    try {

        await deletePaper(id);

        toast.success(
            "Previous year paper deleted successfully."
        );

        setShowDeleteModal(false);

        setSelectedPaper(null);

        await loadPapers();

    } catch (error) {

        console.error(error);

        toast.error(

            error?.response?.data?.message ||

            "Unable to delete paper."

        );

    }

};

/*
=====================================
Publish / Unpublish
=====================================
*/

const handlePublishToggle = async (paper) => {

    try {

        if (paper.isPublished) {

            await unpublishPaper(
                paper._id
            );

            toast.success(
                "Paper unpublished successfully."
            );

        } else {

            await publishPaper(
                paper._id
            );

            toast.success(
                "Paper published successfully."
            );

        }

        await loadPapers();

    } catch (error) {

        console.error(error);

        toast.error(

            error?.response?.data?.message ||

            "Unable to update publish status."

        );

    }

};

/*
=====================================
Activate / Deactivate
=====================================
*/

const handleStatusToggle = async (paper) => {

    try {

        if (paper.isActive) {

            await deactivatePaper(
                paper._id
            );

            toast.success(
                "Paper deactivated successfully."
            );

        } else {

            await activatePaper(
                paper._id
            );

            toast.success(
                "Paper activated successfully."
            );

        }

        await loadPapers();

    } catch (error) {

        console.error(error);

        toast.error(

            error?.response?.data?.message ||

            "Unable to update paper status."

        );

    }

};/*
=====================================
Filters
=====================================
*/

const filteredPapers = useMemo(() => {

    return papers.filter((paper) => {

        const matchesSearch =

            !filters.search ||

            paper.title
                ?.toLowerCase()
                .includes(
                    filters.search.toLowerCase()
                );

        const matchesSubject =

            !filters.subject ||

            paper.subject?.name ===
                filters.subject;

        const matchesYear =

            !filters.year ||

            String(paper.year) ===
                String(filters.year);

        const matchesLanguage =

            !filters.language ||

            paper.language ===
                filters.language;

        return (

            matchesSearch &&

            matchesSubject &&

            matchesYear &&

            matchesLanguage

        );

    });

}, [

    papers,

    filters,

]);

/*
=====================================
Loading Screen
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

                        Loading Previous Year Papers...

                    </h3>

                    <p className="text-secondary mb-0">

                        Please wait while we fetch all previous year papers.

                    </p>

                </div>

            </div>

        </MainLayout>

    );

}

/*
=====================================
Error Screen
=====================================
*/

if (error) {

    return (

        <MainLayout>

            <div className="container-fluid py-4">

                <div
                    className="rounded-4 p-5 text-center"
                    style={{
                        background: "#131D31",
                        border:
                            "1px solid rgba(239,68,68,.25)",
                    }}
                >

                    <div
                        className="mb-4"
                        style={{
                            fontSize: 54,
                        }}
                    >

                        📄

                    </div>

                    <h3 className="text-white fw-bold mb-3">

                        Unable to Load Papers

                    </h3>

                    <p className="text-secondary mb-4">

                        {error}

                    </p>

                    <button
                        className="btn btn-primary px-4"
                        onClick={loadPapers}
                    >

                        Try Again

                    </button>

                </div>

            </div>

        </MainLayout>

    );

}/*
=====================================
UI
=====================================
*/

return (

    <MainLayout>

        <div className="container-fluid py-4">

            {/* ======================================
                Header
            ====================================== */}

            <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4">

                <div>

                    <div className="d-flex align-items-center gap-3 mb-2">

                        <div
                            className="rounded-circle d-flex align-items-center justify-content-center"
                            style={{
                                width: 56,
                                height: 56,
                                background: "rgba(37,99,235,.15)",
                            }}
                        >

                            <FileText
                                size={28}
                                color="#2563EB"
                            />

                        </div>

                        <div>

                            <h2 className="fw-bold text-white mb-1">

                                Previous Year Paper Management

                            </h2>

                            <p className="text-secondary mb-0">

                                Create, organize and publish previous year papers for students.

                            </p>

                        </div>

                    </div>

                </div>

                <button
                    className="btn btn-primary px-4 d-flex align-items-center gap-2"
                    onClick={() => {

                        setEditingPaper(null);

                        setShowForm(true);

                    }}
                >

                    <Plus size={18} />

                    Add New Paper

                </button>

            </div>

            {/* ======================================
                Statistics
            ====================================== */}

            {

                statistics && (

                    <div className="row g-4 mb-4">

                        <div className="col-lg-3 col-md-6">

                            <div
                                className="rounded-4 p-4 h-100"
                                style={{
                                    background: "#131D31",
                                    border: "1px solid rgba(255,255,255,.08)",
                                }}
                            >

                                <p className="text-secondary mb-2">

                                    Total Papers

                                </p>

                                <h2 className="text-white fw-bold mb-0">

                                    {statistics.total ?? 0}

                                </h2>

                            </div>

                        </div>

                        <div className="col-lg-3 col-md-6">

                            <div
                                className="rounded-4 p-4 h-100"
                                style={{
                                    background: "#131D31",
                                    border: "1px solid rgba(255,255,255,.08)",
                                }}
                            >

                                <p className="text-secondary mb-2">

                                    Published

                                </p>

                                <h2 className="text-success fw-bold mb-0">

                                    {statistics.published ?? 0}

                                </h2>

                            </div>

                        </div>

                        <div className="col-lg-3 col-md-6">

                            <div
                                className="rounded-4 p-4 h-100"
                                style={{
                                    background: "#131D31",
                                    border: "1px solid rgba(255,255,255,.08)",
                                }}
                            >

                                <p className="text-secondary mb-2">

                                    Active

                                </p>

                                <h2 className="text-primary fw-bold mb-0">

                                    {statistics.active ?? 0}

                                </h2>

                            </div>

                        </div>

                        <div className="col-lg-3 col-md-6">

                            <div
                                className="rounded-4 p-4 h-100"
                                style={{
                                    background: "#131D31",
                                    border: "1px solid rgba(255,255,255,.08)",
                                }}
                            >

                                <p className="text-secondary mb-2">

                                    Inactive

                                </p>

                                <h2 className="text-danger fw-bold mb-0">

                                    {statistics.inactive ?? 0}

                                </h2>

                            </div>

                        </div>

                    </div>

                )

            }

            {/* ======================================
                Filters
            ====================================== */}

            <PaperFilters

                filters={filters}

                setFilters={setFilters}

                papers={papers}

            />

            {/* ======================================
                Paper Table
            ====================================== */}

            <PaperTable

                papers={filteredPapers}

                onEdit={handleEdit}

                onDelete={handleDelete}

                onPublishToggle={handlePublishToggle}

                onStatusToggle={handleStatusToggle}

            />

            {/* ======================================
                Create / Edit Modal
            ====================================== */}

            {

                showForm && (

                    <div
                        className="modal fade show"
                        style={{
                            display: "block",
                            background: "rgba(0,0,0,.60)",
                        }}
                    >

                        <div className="modal-dialog modal-xl modal-dialog-centered">

                            <div
                                className="modal-content border-0"
                                style={{
                                    background: "#131D31",
                                    border: "1px solid rgba(255,255,255,.08)",
                                }}
                            >

                                <div className="modal-header border-secondary">

                                    <h5 className="text-white fw-bold mb-0">

                                        {

                                            editingPaper

                                                ? "✏️ Edit Previous Year Paper"

                                                : "📄 Create Previous Year Paper"

                                        }

                                    </h5>

                                    <button

                                        className="btn-close btn-close-white"

                                        onClick={() => {

                                            setShowForm(false);

                                            setEditingPaper(null);

                                        }}

                                    />

                                </div>

                                <div className="modal-body">

                                    <PaperForm

                                        key={

                                            editingPaper?._id ||

                                            "new-paper"

                                        }

                                        editingPaper={editingPaper}

                                        onSubmit={handleSavePaper}

                                        onCancel={() => {

                                            setShowForm(false);

                                            setEditingPaper(null);

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

            <DeletePaperModal

                show={showDeleteModal}

                paper={selectedPaper}

                onClose={() => {

                    setShowDeleteModal(false);

                    setSelectedPaper(null);

                }}

                onConfirm={confirmDelete}

            />

        </div>

    </MainLayout>

);

}

export default PaperManagement;