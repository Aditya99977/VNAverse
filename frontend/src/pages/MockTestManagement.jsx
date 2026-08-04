import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import MainLayout from "../layouts/MainLayout";

import MockTestTable from "../components/admin/MockTestTable";
import MockTestForm from "../components/admin/MockTestForm";
import DeleteMockTestModal from "../components/admin/DeleteMockTestModal";
import CsvUploadModal from "../components/admin/CsvUploadModal";
import MockTestStats from "../components/admin/MockTestStats";

import {
    getMockTests,
    createMockTest,
    updateMockTest,
    deleteMockTest,
    toggleMockTestStatus,
    getMockTestStatistics,
} from "../services/mockTestService";

import { uploadCSV } from "../services/adminService";

function MockTestManagement() {

    /*
    =====================================
    States
    =====================================
    */

    const [loading, setLoading] = useState(true);

    const [uploadingCSV, setUploadingCSV] = useState(false);

    const [mockTests, setMockTests] = useState([]);

    const [statistics, setStatistics] = useState(null);

    const [selectedTest, setSelectedTest] = useState(null);

    const [editingTest, setEditingTest] = useState(null);

    const [showForm, setShowForm] = useState(false);

    const [showDeleteModal, setShowDeleteModal] =
        useState(false);

    const [showCsvModal, setShowCsvModal] =
        useState(false);

    /*
    =====================================
    Initial Load
    =====================================
    */

    useEffect(() => {

        loadMockTests();

    }, []);

    /*
    =====================================
    Load Mock Tests
    =====================================
    */

    async function loadMockTests() {

        try {

            setLoading(true);

            const [

                testsResponse,

                statisticsResponse,

            ] = await Promise.all([

                getMockTests(),

                getMockTestStatistics(),

            ]);

            setMockTests(

                testsResponse.data || []

            );

            setStatistics(

                statisticsResponse.data || null

            );

        }

        catch (error) {

            console.error(error);

            toast.error(

                error?.response?.data?.message ||

                "Unable to load mock tests."

            );

        }

        finally {

            setLoading(false);

        }

    }

    /*
    =====================================
    Save Mock Test
    =====================================
    */

    const handleSaveMockTest = async (

        formData

    ) => {

        try {

            if (editingTest) {

                await updateMockTest(

                    editingTest._id,

                    formData

                );

                toast.success(

                    "Mock Test updated successfully."

                );

            }

            else {

                await createMockTest(

                    formData

                );

                toast.success(

                    "Mock Test created successfully."

                );

            }

            setShowForm(false);

            setEditingTest(null);

            await loadMockTests();

        }

        catch (error) {

            console.error(error);

            toast.error(

                error?.response?.data?.message ||

                "Unable to save mock test."

            );

        }

    };    /*
    =====================================
    Edit Mock Test
    =====================================
    */

    const handleEdit = (mockTest) => {

        setEditingTest(mockTest);

        setShowForm(true);

    };

    /*
    =====================================
    Delete Mock Test
    =====================================
    */

    const handleDelete = (mockTest) => {

        setSelectedTest(mockTest);

        setShowDeleteModal(true);

    };

    /*
    =====================================
    Confirm Delete
    =====================================
    */

    const confirmDelete = async (id) => {

        try {

            await deleteMockTest(id);

            toast.success(

                "Mock Test deleted successfully."

            );

            setShowDeleteModal(false);

            setSelectedTest(null);

            await loadMockTests();

        }

        catch (error) {

            console.error(error);

            toast.error(

                error?.response?.data?.message ||

                "Unable to delete mock test."

            );

        }

    };

    /*
    =====================================
    Publish / Unpublish
    =====================================
    */

    const handleToggleStatus = async (id) => {

        try {

            await toggleMockTestStatus(id);

            toast.success(

                "Mock Test status updated."

            );

            await loadMockTests();

        }

        catch (error) {

            console.error(error);

            toast.error(

                error?.response?.data?.message ||

                "Unable to update status."

            );

        }

    };

    /*
    =====================================
    Upload CSV
    =====================================
    */

    const handleUploadCSV = async (file) => {

        try {

            setUploadingCSV(true);

            const response = await uploadCSV(file);

            toast.success(

                response.message ||

                "CSV uploaded successfully."

            );

            setShowCsvModal(false);

            await loadMockTests();

        }

        catch (error) {

            console.error(error);

            toast.error(

                error?.response?.data?.message ||

                "CSV upload failed."

            );

        }

        finally {

            setUploadingCSV(false);

        }

    };    /*
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

                            Loading Mock Tests...

                        </h3>

                        <p className="text-secondary mb-0">

                            Please wait while we fetch all mock tests.

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

                <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4">

                    <div>

                        <h2 className="fw-bold text-white mb-2">

                            📝 Mock Test Management

                        </h2>

                        <p className="text-secondary mb-0">

                            Create, manage and publish mock tests
                            available for students.

                        </p>

                    </div>

                    <div className="d-flex gap-2">

                        <button
                            className="btn btn-primary px-4"
                            onClick={() => {

                                setEditingTest(null);

                                setShowForm(true);

                            }}
                        >

                            ➕ Create Mock Test

                        </button>

                        <button
                            className="btn btn-outline-primary px-4"
                            onClick={() =>
                                setShowCsvModal(true)
                            }
                        >

                            📤 Bulk CSV Upload

                        </button>

                    </div>

                </div>

                {/* ======================================
                    Statistics
                ====================================== */}

                {

                    statistics && (

                        <MockTestStats
                            statistics={statistics}
                        />

                    )

                }

                {/* ======================================
                    Table
                ====================================== */}

                <MockTestTable

                    mockTests={mockTests}

                    loading={loading}

                    onEdit={handleEdit}

                    onDelete={handleDelete}

                    onToggleStatus={
                        handleToggleStatus
                    }

                />                {/* ======================================
                    Create / Edit Mock Test
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
                                    className="modal-content border-0"
                                    style={{
                                        background: "#131D31",
                                        border:
                                            "1px solid rgba(255,255,255,.08)",
                                    }}
                                >

                                    <div
                                        className="modal-header border-secondary"
                                    >

                                        <h5 className="text-white fw-bold mb-0">

                                            {

                                                editingTest

                                                    ? "✏️ Edit Mock Test"

                                                    : "➕ Create Mock Test"

                                            }

                                        </h5>

                                        <button
                                            className="btn-close btn-close-white"
                                            onClick={() => {

                                                setShowForm(false);

                                                setEditingTest(null);

                                            }}
                                        />

                                    </div>

                                    <div className="modal-body">

                                        <MockTestForm

                                            key={
                                                editingTest?._id ||
                                                "new-mock-test"
                                            }

                                            selectedTest={
                                                editingTest
                                            }

                                            onSubmit={
                                                handleSaveMockTest
                                            }

                                            onCancel={() => {

                                                setShowForm(false);

                                                setEditingTest(null);

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

                <DeleteMockTestModal

                    show={showDeleteModal}

                    mockTest={selectedTest}

                    onClose={() => {

                        setShowDeleteModal(false);

                        setSelectedTest(null);

                    }}

                    onConfirm={confirmDelete}

                />

                {/* ======================================
                    CSV Upload Modal
                ====================================== */}

                {

                    showCsvModal && (

                        <CsvUploadModal

                            loading={uploadingCSV}

                            onUpload={handleUploadCSV}

                            onClose={() =>

                                setShowCsvModal(false)

                            }

                        />

                    )

                }

            </div>

        </MainLayout>

    );

}

export default MockTestManagement;