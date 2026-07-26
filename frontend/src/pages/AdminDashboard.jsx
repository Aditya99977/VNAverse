import { useEffect, useRef, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import AdminStats from "../components/admin/AdminStats";
import QuickActions from "../components/admin/QuickActions";
import QuestionTable from "../components/admin/QuestionTable";
import RecentUsers from "../components/admin/RecentUsers";
import QuestionForm from "../components/admin/QuestionForm";
import DeleteConfirmation from "../components/admin/DeleteConfirmation";
import UserTable from "../components/admin/UserTable";
import UserDetailsModal from "../components/admin/UserDetailsModal";

import {

    getAdminDashboard,

    getAllUsers,

    getUserDetails,

    deleteUser,

    getAllQuestions,

    addQuestion,

    updateQuestion,

    deleteQuestion

} from "../services/adminService";

function AdminDashboard() {

    /*
    =====================================
    Dashboard States
    =====================================
    */

    const [stats, setStats] = useState(null);

    const [questions, setQuestions] = useState([]);

    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true);

    /*
    =====================================
    Question States
    =====================================
    */

    const [savingQuestion, setSavingQuestion] = useState(false);

    const [deletingQuestion, setDeletingQuestion] = useState(false);

    const [editingQuestion, setEditingQuestion] = useState(null);

    const [selectedQuestion, setSelectedQuestion] = useState(null);

    /*
    =====================================
    User States
    =====================================
    */

    const [selectedUser, setSelectedUser] = useState(null);

    const [userTests, setUserTests] = useState([]);

    const [showUserModal, setShowUserModal] = useState(false);

    const [deletingUser, setDeletingUser] = useState(false);

    const [selectedDeleteUser, setSelectedDeleteUser] = useState(null);

    const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);

    /*
    =====================================
    Modal States
    =====================================
    */

    const [showQuestionModal, setShowQuestionModal] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    /*
    =====================================
    Section Refs
    =====================================
    */

    const questionSectionRef = useRef(null);

    const userSectionRef = useRef(null);

    /*
    =====================================
    Initial Load
    =====================================
    */

    useEffect(() => {

        loadDashboard();

    }, []);

    /*
    =====================================
    Load Dashboard
    =====================================
    */

    async function loadDashboard() {

        try {

            setLoading(true);

            const [

                dashboard,

                allUsers,

                allQuestions

            ] = await Promise.all([

                getAdminDashboard(),

                getAllUsers(),

                getAllQuestions()

            ]);

            setStats({

                users: dashboard.totalUsers,

                questions: dashboard.totalQuestions,

                mockTests: dashboard.totalTests,

                attempts: dashboard.totalTests

            });

            setUsers(allUsers);

            setQuestions(allQuestions);

        }

        catch (err) {

            console.log(err);

        }

        finally {

            setLoading(false);

        }

    }

    /*
    =====================================
    Scroll To Questions
    =====================================
    */

    const handleManageQuestions = () => {

        questionSectionRef.current?.scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

    };

    /*
    =====================================
    Scroll To Users
    =====================================
    */

    const handleViewUsers = () => {

        userSectionRef.current?.scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

    };
        /*
    =====================================
    Save Question
    =====================================
    */

    const handleSaveQuestion = async (formData) => {

        try {

            setSavingQuestion(true);

            if (editingQuestion) {

                await updateQuestion(
                    editingQuestion._id,
                    formData
                );

                alert(
                    "Question updated successfully."
                );

            }

            else {

                await addQuestion(formData);

                alert(
                    "Question added successfully."
                );

            }

            setShowQuestionModal(false);

            setEditingQuestion(null);

            await loadDashboard();

        }

        catch (err) {

            console.log(err);

            alert(

                err.response?.data?.message ||

                "Operation failed."

            );

        }

        finally {

            setSavingQuestion(false);

        }

    };

    /*
    =====================================
    Edit Question
    =====================================
    */

    const handleEditQuestion = (question) => {

        setEditingQuestion(question);

        setShowQuestionModal(true);

    };

    /*
    =====================================
    Delete Question
    =====================================
    */

    const handleDeleteClick = (question) => {

        setSelectedQuestion(question);

        setShowDeleteModal(true);

    };

    /*
    =====================================
    Confirm Delete Question
    =====================================
    */

    const confirmDelete = async () => {

        try {

            setDeletingQuestion(true);

            await deleteQuestion(
                selectedQuestion._id
            );

            alert(
                "Question deleted successfully."
            );

            setShowDeleteModal(false);

            setSelectedQuestion(null);

            await loadDashboard();

        }

        catch (err) {

            console.log(err);

            alert(
                "Unable to delete question."
            );

        }

        finally {

            setDeletingQuestion(false);

        }

    };

    /*
    =====================================
    View User Details
    =====================================
    */

    const handleViewUser = async (user) => {

        try {

            const data = await getUserDetails(
                user._id
            );

            setSelectedUser(
                data.user
            );

            setUserTests(
                data.tests
            );

            setShowUserModal(true);

        }

        catch (err) {

            console.log(err);

            alert(
                "Unable to load user details."
            );

        }

    };

    /*
    =====================================
    Delete User Click
    =====================================
    */

    const handleDeleteUser = (user) => {

        setSelectedDeleteUser(user);

        setShowDeleteUserModal(true);

    };

    /*
    =====================================
    Confirm Delete User
    =====================================
    */

    const confirmDeleteUser = async () => {

        try {

            setDeletingUser(true);

            await deleteUser(
                selectedDeleteUser._id
            );

            alert(
                "User deleted successfully."
            );

            setShowDeleteUserModal(false);

            setSelectedDeleteUser(null);

            await loadDashboard();

        }

        catch (err) {

            console.log(err);

            alert(

                err.response?.data?.message ||

                "Unable to delete user."

            );

        }

        finally {

            setDeletingUser(false);

        }

    };

    /*
    =====================================
    Loading Screen
    =====================================
    */

    if (loading) {

        return (

            <MainLayout>

                <div className="container-fluid py-5 text-center">

                    <h4>

                        Loading Admin Dashboard...

                    </h4>

                </div>

            </MainLayout>

        );

    }
        return (

        <MainLayout>

            <div className="container-fluid py-4">

                {/* ===============================
                    Page Title
                =============================== */}

                <h1 className="fw-bold mb-4">

                    🛠 Admin Dashboard

                </h1>

                {/* ===============================
                    Dashboard Statistics
                =============================== */}

                <AdminStats

                    stats={stats}

                />

                {/* ===============================
                    Quick Actions
                =============================== */}

                <QuickActions

                    onAddQuestion={() => {

                        setEditingQuestion(null);

                        setShowQuestionModal(true);

                    }}

                    onManageQuestions={

                        handleManageQuestions

                    }

                    onViewUsers={

                        handleViewUsers

                    }

                />

                {/* ===============================
                    Question Management
                =============================== */}

                <div

                    ref={questionSectionRef}

                    className="mt-5"

                >

                    <QuestionTable

                        questions={questions}

                        onEdit={handleEditQuestion}

                        onDelete={handleDeleteClick}

                    />

                </div>

                {/* ===============================
                    User Management
                =============================== */}

                <div

                    ref={userSectionRef}

                    className="mt-5"

                >

                    <UserTable

                        users={users}

                        onView={handleViewUser}

                        onDelete={handleDeleteUser}

                    />

                </div>

                {/* ===============================
                    Recent Users
                =============================== */}

                <div className="mt-5">

                    <RecentUsers

                        users={users.slice(0, 5)}

                    />

                </div>

            </div>
                        {/* ===============================
                Add / Edit Question Modal
            =============================== */}

            {

                showQuestionModal && (

                    <div
                        className="modal fade show"
                        style={{
                            display: "block",
                            backgroundColor: "rgba(0,0,0,0.5)"
                        }}
                    >

                        <div className="modal-dialog modal-lg">

                            <div className="modal-content">

                                <div className="modal-header">

                                    <h5 className="modal-title">

                                        {

                                            editingQuestion

                                                ? "✏️ Edit Question"

                                                : "➕ Add Question"

                                        }

                                    </h5>

                                    <button
                                        className="btn-close"
                                        onClick={() => {

                                            setShowQuestionModal(false);

                                            setEditingQuestion(null);

                                        }}
                                    ></button>

                                </div>

                                <div className="modal-body">

                                    <QuestionForm

                                        key={editingQuestion?._id || "new-question"}

                                        initialData={

                                            editingQuestion || {}

                                        }

                                        onSubmit={

                                            handleSaveQuestion

                                        }

                                        loading={

                                            savingQuestion

                                        }

                                    />

                                </div>

                            </div>

                        </div>

                    </div>

                )

            }

            {/* ===============================
                Delete Question Modal
            =============================== */}

            {

                showDeleteModal && (

                    <DeleteConfirmation

                        title="Delete Question"

                        message={`Are you sure you want to delete "${selectedQuestion?.question}"?`}

                        loading={

                            deletingQuestion

                        }

                        onCancel={() => {

                            setShowDeleteModal(false);

                            setSelectedQuestion(null);

                        }}

                        onConfirm={

                            confirmDelete

                        }

                    />

                )

            }

            {/* ===============================
                Delete User Modal
            =============================== */}

            {

                showDeleteUserModal && (

                    <DeleteConfirmation

                        title="Delete User"

                        message={`Are you sure you want to delete "${selectedDeleteUser?.name}"? This action cannot be undone.`}

                        loading={

                            deletingUser

                        }

                        onCancel={() => {

                            setShowDeleteUserModal(false);

                            setSelectedDeleteUser(null);

                        }}

                        onConfirm={

                            confirmDeleteUser

                        }

                    />

                )

            }

            {/* ===============================
                User Details Modal
            =============================== */}

            {

                showUserModal && (

                    <UserDetailsModal

                        show={

                            showUserModal

                        }

                        user={

                            selectedUser

                        }

                        tests={

                            userTests

                        }

                        onClose={() => {

                            setShowUserModal(false);

                            setSelectedUser(null);

                            setUserTests([]);

                        }}

                    />

                )

            }

        </MainLayout>

    );

}

export default AdminDashboard;