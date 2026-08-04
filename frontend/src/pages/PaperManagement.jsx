import { useEffect, useMemo, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import PaperTable from "../components/papers/PaperTable";
import PaperForm from "../components/papers/PaperForm";
import DeletePaperModal from "../components/papers/DeletePaperModal";
import PaperFilters from "../components/papers/PaperFilters";

import {

    createPaper,

    getAllPapersAdmin,

    getPaperDetails,

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

    const [papers, setPapers] = useState([]);

    const [statistics, setStatistics] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [selectedPaper, setSelectedPaper] = useState(null);

    const [editingPaper, setEditingPaper] = useState(null);

    const [showForm, setShowForm] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false);

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

    const loadPapers = async () => {

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

            setError(

                error.response?.data?.message ||

                "Unable to load previous year papers."

            );

        }

        finally {

            setLoading(false);

        }

    };/*
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

            alert("Paper updated successfully.");

        }

        else {

            await createPaper(formData);

            alert("Paper created successfully.");

        }

        setShowForm(false);

        setEditingPaper(null);

        await loadPapers();

    }

    catch (error) {

        console.error(error);

        alert(

            error.response?.data?.message ||

            "Unable to save paper."

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

        const response = await getPaperDetails(

            paper._id

        );

        setEditingPaper(

            response.data ||

            response.paper

        );

        setShowForm(true);

    }

    catch (error) {

        console.error(error);

        alert("Unable to load paper.");

    }

};

/*
=====================================
Delete
=====================================
*/

const handleDelete = (paper) => {

    setSelectedPaper(paper);

    setShowDeleteModal(true);

};

const confirmDelete = async (id) => {

    try {

        await deletePaper(id);

        alert("Paper deleted successfully.");

        setShowDeleteModal(false);

        setSelectedPaper(null);

        await loadPapers();

    }

    catch (error) {

        console.error(error);

        alert("Unable to delete paper.");

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

        }

        else {

            await publishPaper(

                paper._id

            );

        }

        await loadPapers();

    }

    catch (error) {

        console.error(error);

        alert("Unable to update paper.");

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

        }

        else {

            await activatePaper(

                paper._id

            );

        }

        await loadPapers();

    }

    catch (error) {

        console.error(error);

        alert("Unable to update status.");

    }

};

/*
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

]);/*
=====================================
Loading
=====================================
*/

if (loading) {

    return (

        <MainLayout>

            <div className="container py-5">

                <div
                    className="rounded-4 p-5 text-center"
                    style={{
                        background: "#131D31",
                        border:
                            "1px solid rgba(255,255,255,.08)",
                    }}
                >

                    <div className="spinner-border text-primary mb-4" />

                    <h3 className="text-white">

                        Loading Previous Year Papers...

                    </h3>

                    <p className="text-secondary mb-0">

                        Please wait while we load the papers.

                    </p>

                </div>

            </div>

        </MainLayout>

    );

}

/*
=====================================
Error
=====================================
*/

if (error) {

    return (

        <MainLayout>

            <div className="container py-5">

                <div className="alert alert-danger">

                    {error}

                </div>

            </div>

        </MainLayout>

    );

}

/*
=====================================
UI
=====================================
*/

return (

    <MainLayout>

        <div className="container-fluid py-4">

            {/* ===============================
                Header
            =============================== */}

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h2 className="fw-bold mb-1">

                        Previous Year Papers

                    </h2>

                    <p className="text-secondary mb-0">

                        Manage all previous year papers from one place.

                    </p>

                </div>

                <button

                    className="btn btn-primary px-4"

                    onClick={() => {

                        setEditingPaper(null);

                        setShowForm(true);

                    }}

                >

                    + Add Paper

                </button>

            </div>

            {/* ===============================
                Statistics
            =============================== */}

            {

                statistics && (

                    <div className="row g-4 mb-4">

                        <div className="col-md-3">

                            <div
                                className="rounded-4 p-4 h-100"
                                style={{
                                    background:"#131D31",
                                    border:"1px solid rgba(255,255,255,.08)",
                                }}
                            >

                                <h6 className="text-secondary">

                                    Total Papers

                                </h6>

                                <h2 className="text-white">

                                    {statistics.total ?? 0}

                                </h2>

                            </div>

                        </div>

                        <div className="col-md-3">

                            <div
                                className="rounded-4 p-4 h-100"
                                style={{
                                    background:"#131D31",
                                    border:"1px solid rgba(255,255,255,.08)",
                                }}
                            >

                                <h6 className="text-secondary">

                                    Published

                                </h6>

                                <h2 className="text-success">

                                    {statistics.published ?? 0}

                                </h2>

                            </div>

                        </div>

                        <div className="col-md-3">

                            <div
                                className="rounded-4 p-4 h-100"
                                style={{
                                    background:"#131D31",
                                    border:"1px solid rgba(255,255,255,.08)",
                                }}
                            >

                                <h6 className="text-secondary">

                                    Active

                                </h6>

                                <h2 className="text-primary">

                                    {statistics.active ?? 0}

                                </h2>

                            </div>

                        </div>

                        <div className="col-md-3">

                            <div
                                className="rounded-4 p-4 h-100"
                                style={{
                                    background:"#131D31",
                                    border:"1px solid rgba(255,255,255,.08)",
                                }}
                            >

                                <h6 className="text-secondary">

                                    Inactive

                                </h6>

                                <h2 className="text-danger">

                                    {statistics.inactive ?? 0}

                                </h2>

                            </div>

                        </div>

                    </div>

                )

            }

            {/* ===============================
                Filters
            =============================== */}

            <PaperFilters

                filters={filters}

                setFilters={setFilters}

                papers={papers}

            />

            {/* ===============================
                Paper Table
            =============================== */}

            <PaperTable

                papers={filteredPapers}

                onEdit={handleEdit}

                onDelete={handleDelete}

                onPublishToggle={handlePublishToggle}

                onStatusToggle={handleStatusToggle}

            />            {/* ===============================
                Create / Edit Paper
            =============================== */}

            {

                showForm && (

                    <div
                        className="modal fade show"
                        style={{
                            display: "block",
                            background:
                                "rgba(0,0,0,.55)",
                        }}
                    >

                        <div className="modal-dialog modal-xl">

                            <div
                                className="modal-content"
                                style={{
                                    background: "#131D31",
                                    border:
                                        "1px solid rgba(255,255,255,.08)",
                                }}
                            >

                                <div
                                    className="modal-header border-secondary"
                                >

                                    <h5 className="text-white mb-0">

                                        {

                                            editingPaper

                                                ? "Edit Previous Year Paper"

                                                : "Create Previous Year Paper"

                                        }

                                    </h5>

                                    <button

                                        type="button"

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

                                        editingPaper={

                                            editingPaper

                                        }

                                        onSubmit={

                                            handleSavePaper

                                        }

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

            {/* ===============================
                Delete Modal
            =============================== */}

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