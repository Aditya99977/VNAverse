import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowRight,
    BookOpen,
    CheckCircle2,
    ChevronDown,
    ClipboardList,
    Eye,
    FileQuestion,
    FileText,
    GraduationCap,
    LoaderCircle,
    Pencil,
    Plus,
    RefreshCw,
    Trash2,
    Users,
} from "lucide-react";

import MainLayout from "../layouts/MainLayout";

import QuestionTable from "../components/admin/QuestionTable";
import QuestionForm from "../components/admin/QuestionForm";
import DeleteConfirmation from "../components/admin/DeleteConfirmation";
import UserTable from "../components/admin/UserTable";
import UserDetailsModal from "../components/admin/UserDetailsModal";

import {
    addQuestion,
    deleteQuestion,
    deleteUser,
    getAdminDashboard,
    getAllQuestions,
    getAllUsers,
    getUserDetails,
    updateQuestion,
} from "../services/adminService";
import { getAllExams } from "../services/examService";
import { getAllSubjects } from "../services/subjectService";

const ADMIN_MANAGEMENT_ROUTES = {
    mockTests: "/admin/mock-tests",
    papers: "/admin/papers",
    subjects: "/admin/subjects",
    exams: "/admin/exams",
};

const dashboardStyles = `
    .vna-admin-dashboard {
        --vna-bg: #0b1120;
        --vna-panel: #111827;
        --vna-panel-muted: #0f172a;
        --vna-border: rgba(148, 163, 184, 0.16);
        --vna-text: #f8fafc;
        --vna-text-muted: #94a3b8;
        --vna-primary: #6366f1;
        --vna-primary-hover: #818cf8;
        color: var(--vna-text);
    }

    .vna-admin-dashboard .vna-panel {
        background: linear-gradient(145deg, rgba(17, 24, 39, 0.98), rgba(15, 23, 42, 0.96));
        border: 1px solid var(--vna-border);
        border-radius: 20px;
    }

    .vna-admin-dashboard .vna-hero {
        position: relative;
        overflow: hidden;
        padding: clamp(1.5rem, 3vw, 2.5rem);
        background:
            radial-gradient(circle at 88% 5%, rgba(99, 102, 241, 0.30), transparent 31%),
            linear-gradient(135deg, #111827 0%, #172554 100%);
    }

    .vna-admin-dashboard .vna-hero::after {
        position: absolute;
        inset: auto -4rem -7rem auto;
        width: 16rem;
        height: 16rem;
        border: 1px solid rgba(165, 180, 252, 0.18);
        border-radius: 50%;
        content: "";
    }

    .vna-admin-dashboard .vna-stat-card {
        min-height: 148px;
        padding: 1.25rem;
        transition: border-color 180ms ease, transform 180ms ease;
    }

    .vna-admin-dashboard .vna-stat-card:hover {
        border-color: rgba(129, 140, 248, 0.48);
        transform: translateY(-2px);
    }

    .vna-admin-dashboard .vna-icon-shell {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 44px;
        height: 44px;
        border: 1px solid rgba(129, 140, 248, 0.3);
        border-radius: 14px;
        background: rgba(99, 102, 241, 0.14);
        color: #c7d2fe;
    }

    .vna-admin-dashboard .vna-action-button,
    .vna-admin-dashboard .vna-row-action {
        width: 100%;
        border: 1px solid var(--vna-border);
        border-radius: 14px;
        background: rgba(15, 23, 42, 0.72);
        color: var(--vna-text);
        text-align: left;
        transition: border-color 180ms ease, background 180ms ease, transform 180ms ease;
    }

    .vna-admin-dashboard .vna-action-button:hover,
    .vna-admin-dashboard .vna-row-action:hover {
        border-color: rgba(129, 140, 248, 0.6);
        background: rgba(49, 46, 129, 0.25);
        color: var(--vna-text);
        transform: translateY(-1px);
    }

    .vna-admin-dashboard .vna-action-button:focus-visible,
    .vna-admin-dashboard .vna-row-action:focus-visible,
    .vna-admin-dashboard .vna-link-button:focus-visible {
        outline: 3px solid rgba(129, 140, 248, 0.55);
        outline-offset: 2px;
    }

    .vna-admin-dashboard .vna-link-button {
        border: 0;
        background: transparent;
        color: #a5b4fc;
        font-weight: 600;
    }

    .vna-admin-dashboard .vna-question-row + .vna-question-row,
    .vna-admin-dashboard .vna-user-row + .vna-user-row {
        border-top: 1px solid rgba(148, 163, 184, 0.12);
    }

    .vna-admin-dashboard .vna-question-row,
    .vna-admin-dashboard .vna-user-row {
        padding: 1rem 0;
    }

    .vna-admin-dashboard .vna-avatar {
        display: inline-flex;
        flex: 0 0 auto;
        align-items: center;
        justify-content: center;
        width: 38px;
        height: 38px;
        border-radius: 50%;
        background: linear-gradient(135deg, #4f46e5, #7c3aed);
        color: white;
        font-size: 0.82rem;
        font-weight: 700;
    }

    .vna-admin-dashboard .vna-badge {
        display: inline-flex;
        align-items: center;
        border-radius: 999px;
        padding: 0.25rem 0.55rem;
        background: rgba(51, 65, 85, 0.62);
        color: #cbd5e1;
        font-size: 0.75rem;
        font-weight: 600;
    }

    .vna-admin-dashboard .vna-empty {
        padding: 2.5rem 1rem;
        color: var(--vna-text-muted);
        text-align: center;
    }

    .vna-admin-dashboard .vna-management-panel {
        scroll-margin-top: 1rem;
    }

    .vna-admin-dashboard .vna-spin {
        animation: vna-spin 900ms linear infinite;
    }

    .vna-admin-dashboard .vna-rotated {
        transform: rotate(180deg);
    }

    .vna-admin-dashboard .vna-min-width-0 {
        min-width: 0;
    }

    @keyframes vna-spin {
        to {
            transform: rotate(360deg);
        }
    }

    @media (max-width: 575.98px) {
        .vna-admin-dashboard .vna-hero-actions {
            width: 100%;
        }

        .vna-admin-dashboard .vna-hero-actions > button {
            flex: 1;
        }
    }
`;

const getCollection = (payload, key) => {
    const candidates = [
        payload,
        payload?.data,
        payload?.data?.data,
        payload?.[key],
        payload?.data?.[key],
        payload?.data?.data?.[key],
        payload?.results,
        payload?.data?.results,
    ];

    return candidates.find(Array.isArray) || [];
};

const getRecord = (payload) => {
    const candidates = [payload?.data?.data, payload?.data, payload];

    return candidates.find(
        (candidate) =>
            candidate &&
            typeof candidate === "object" &&
            !Array.isArray(candidate)
    ) || {};
};

const getDisplayName = (value) => {
    if (!value) {
        return "Not assigned";
    }

    if (typeof value === "string") {
        return value;
    }

    return value.name || value.title || "Not assigned";
};

const getRecordId = (value) => {
    if (!value) {
        return "";
    }

    return typeof value === "object" ? value._id || value.id || "" : value;
};

const createRecordLookup = (records) =>
    new Map(
        records
            .filter(Boolean)
            .map((record) => [String(getRecordId(record)), record])
            .filter(([id]) => Boolean(id))
    );

const resolveRelatedRecord = (value, lookup) => {
    if (value && typeof value === "object" && getDisplayName(value) !== "Not assigned") {
        return value;
    }

    return lookup.get(String(getRecordId(value))) || null;
};

const enrichQuestionRelationships = (questionList, subjectList, examList) => {
    const subjectsById = createRecordLookup(subjectList);
    const examsById = createRecordLookup(examList);

    return questionList.map((question) => {
        const subject = resolveRelatedRecord(question.subject, subjectsById);
        const questionExam = resolveRelatedRecord(question.exam, examsById);
        const subjectExam = subject?.exam;
        const exam =
            questionExam ||
            resolveRelatedRecord(subjectExam, examsById) ||
            (subjectExam && typeof subjectExam === "object" ? subjectExam : null);

        return {
            ...question,
            subject: subject || question.subject,
            exam: exam || question.exam,
        };
    });
};

const prepareQuestionPayload = (formData) => {
    const options = (formData.options || []).map((option) => option.trim());
    const selectedOptionIndex = Number(formData.correctAnswer);
    const hasSelectedOptionIndex =
        Number.isInteger(selectedOptionIndex) &&
        selectedOptionIndex >= 0 &&
        selectedOptionIndex < options.length;

    return {
        ...formData,
        options,
        // QuestionForm stores the selected option index for its radio controls,
        // while the current Question schema stores the option text.
        correctAnswer: hasSelectedOptionIndex
            ? options[selectedOptionIndex]
            : formData.correctAnswer,
    };
};

const createQuestionFormInitialData = (question) => {
    if (!question || typeof question.correctAnswer !== "string") {
        return question || {};
    }

    const correctAnswerIndex = question.options?.indexOf(question.correctAnswer);

    return {
        ...question,
        correctAnswer: correctAnswerIndex >= 0 ? correctAnswerIndex : 0,
    };
};

const getInitials = (name = "User") =>
    name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join("") || "U";

const sortByNewest = (items) =>
    [...items].sort(
        (first, second) =>
            new Date(second.createdAt || 0).getTime() -
            new Date(first.createdAt || 0).getTime()
    );

function AdminDashboard() {
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const [savingQuestion, setSavingQuestion] = useState(false);
    const [deletingQuestion, setDeletingQuestion] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState(null);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [showQuestionModal, setShowQuestionModal] = useState(false);
    const [showQuestionDeleteModal, setShowQuestionDeleteModal] = useState(false);

    const [selectedUser, setSelectedUser] = useState(null);
    const [userTests, setUserTests] = useState([]);
    const [showUserModal, setShowUserModal] = useState(false);
    const [viewingUser, setViewingUser] = useState(false);
    const [deletingUser, setDeletingUser] = useState(false);
    const [selectedDeleteUser, setSelectedDeleteUser] = useState(null);
    const [showUserDeleteModal, setShowUserDeleteModal] = useState(false);

    const [showAllQuestions, setShowAllQuestions] = useState(false);
    const [showAllUsers, setShowAllUsers] = useState(false);

    const questionSectionRef = useRef(null);
    const userSectionRef = useRef(null);

    const recentQuestions = useMemo(
        () => sortByNewest(questions).slice(0, 5),
        [questions]
    );

    const recentUsers = useMemo(
        () => sortByNewest(users).slice(0, 5),
        [users]
    );

    const questionFormInitialData = useMemo(
        () => createQuestionFormInitialData(editingQuestion),
        [editingQuestion]
    );

    const displayStats = useMemo(
        () => ({
            users: stats?.users ?? users.length,
            questions: stats?.questions ?? questions.length,
            mockTests: stats?.mockTests ?? 0,
            attempts: stats?.attempts ?? 0,
        }),
        [questions.length, stats, users.length]
    );

    useEffect(() => {
        loadDashboard();
    }, []);

    async function loadDashboard({ showRefreshState = false } = {}) {
        try {
            if (showRefreshState) {
                setRefreshing(true);
            } else {
                setLoading(true);
            }

            const [dashboardData, referenceData] = await Promise.all([
                Promise.all([getAdminDashboard(), getAllUsers(), getAllQuestions()]),
                Promise.allSettled([getAllExams(), getAllSubjects()]),
            ]);

            const [dashboardPayload, usersPayload, questionsPayload] = dashboardData;
            const [examsResult, subjectsResult] = referenceData;

            const dashboard = getRecord(dashboardPayload);
            const nextUsers = getCollection(usersPayload, "users");
            const nextQuestions = getCollection(questionsPayload, "questions");
            const exams =
                examsResult.status === "fulfilled"
                    ? getCollection(examsResult.value, "exams")
                    : [];
            const subjects =
                subjectsResult.status === "fulfilled"
                    ? getCollection(subjectsResult.value, "subjects")
                    : [];

            setStats({
                users: dashboard.totalUsers ?? dashboard.users ?? nextUsers.length,
                questions:
                    dashboard.totalQuestions ??
                    dashboard.questions ??
                    nextQuestions.length,
                mockTests:
                    dashboard.totalTests ??
                    dashboard.totalMockTests ??
                    dashboard.mockTests ??
                    0,
                attempts:
                    dashboard.totalAttempts ??
                    dashboard.totalTestAttempts ??
                    dashboard.attempts ??
                    dashboard.totalTests ??
                    0,
            });
            setUsers(nextUsers);
            setQuestions(
                enrichQuestionRelationships(nextQuestions, subjects, exams)
            );
        } catch (error) {
            console.error("Unable to load the admin dashboard.", error);
            alert(
                error.response?.data?.message ||
                    "Unable to load the admin dashboard. Please try again."
            );
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }

    const scrollToSection = (ref) => {
        requestAnimationFrame(() => {
            ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    };

    const handleManageQuestions = () => {
        setShowAllQuestions(true);
        scrollToSection(questionSectionRef);
    };

    const handleManageUsers = () => {
        setShowAllUsers(true);
        scrollToSection(userSectionRef);
    };

    const closeQuestionModal = () => {
        if (!savingQuestion) {
            setShowQuestionModal(false);
            setEditingQuestion(null);
        }
    };

    const openCreateQuestion = () => {
        setEditingQuestion(null);
        setShowQuestionModal(true);
    };

    const handleSaveQuestion = async (formData) => {
        try {
            setSavingQuestion(true);
            const questionPayload = prepareQuestionPayload(formData);

            if (editingQuestion?._id) {
                await updateQuestion(editingQuestion._id, questionPayload);
                alert("Question updated successfully.");
            } else {
                await addQuestion(questionPayload);
                alert("Question added successfully.");
            }

            setShowQuestionModal(false);
            setEditingQuestion(null);
            await loadDashboard({ showRefreshState: true });
        } catch (error) {
            console.error("Unable to save the question.", error);
            alert(error.response?.data?.message || "Unable to save the question.");
        } finally {
            setSavingQuestion(false);
        }
    };

    const handleEditQuestion = (question) => {
        setEditingQuestion(question);
        setShowQuestionModal(true);
    };

    const handleDeleteQuestion = (question) => {
        setSelectedQuestion(question);
        setShowQuestionDeleteModal(true);
    };

    const confirmDeleteQuestion = async () => {
        if (!selectedQuestion?._id) {
            return;
        }

        try {
            setDeletingQuestion(true);
            await deleteQuestion(selectedQuestion._id);
            setShowQuestionDeleteModal(false);
            setSelectedQuestion(null);
            alert("Question deleted successfully.");
            await loadDashboard({ showRefreshState: true });
        } catch (error) {
            console.error("Unable to delete the question.", error);
            alert(error.response?.data?.message || "Unable to delete the question.");
        } finally {
            setDeletingQuestion(false);
        }
    };

    const handleViewUser = async (user) => {
        if (!user?._id) {
            return;
        }

        try {
            setViewingUser(true);
            const payload = await getUserDetails(user._id);
            const candidates = [payload, payload?.data, payload?.data?.data];
            const details =
                candidates.find(
                    (candidate) =>
                        candidate &&
                        typeof candidate === "object" &&
                        (candidate.user || candidate.tests || candidate.userTests)
                ) || {};

            setSelectedUser(details.user || user);
            setUserTests(
                getCollection(details, "tests").length
                    ? getCollection(details, "tests")
                    : getCollection(details, "userTests")
            );
            setShowUserModal(true);
        } catch (error) {
            console.error("Unable to load user details.", error);
            alert(error.response?.data?.message || "Unable to load user details.");
        } finally {
            setViewingUser(false);
        }
    };

    const closeUserModal = () => {
        setShowUserModal(false);
        setSelectedUser(null);
        setUserTests([]);
    };

    const handleDeleteUser = (user) => {
        setSelectedDeleteUser(user);
        setShowUserDeleteModal(true);
    };

    const confirmDeleteUser = async () => {
        if (!selectedDeleteUser?._id) {
            return;
        }

        try {
            setDeletingUser(true);
            await deleteUser(selectedDeleteUser._id);
            setShowUserDeleteModal(false);
            setSelectedDeleteUser(null);
            alert("User deleted successfully.");
            await loadDashboard({ showRefreshState: true });
        } catch (error) {
            console.error("Unable to delete the user.", error);
            alert(error.response?.data?.message || "Unable to delete the user.");
        } finally {
            setDeletingUser(false);
        }
    };

    if (loading) {
        return (
            <MainLayout>
                <div className="container-fluid py-5 text-center text-white">
                    <LoaderCircle className="vna-spin mb-3" size={32} />
                    <p className="mb-0 text-secondary">Loading your admin workspace…</p>
                </div>
            </MainLayout>
        );
    }

    const statCards = [
        { label: "Total users", value: displayStats.users, icon: Users },
        { label: "Question bank", value: displayStats.questions, icon: FileQuestion },
        { label: "Mock tests", value: displayStats.mockTests, icon: ClipboardList },
        { label: "Test attempts", value: displayStats.attempts, icon: CheckCircle2 },
    ];

    return (
        <MainLayout>
            <style>{dashboardStyles}</style>

            <main className="vna-admin-dashboard container-fluid py-4 py-lg-5">
                <section className="vna-panel vna-hero mb-4">
                    <div className="position-relative d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-4">
                        <div>
                            <span className="text-uppercase small fw-semibold text-primary-emphasis">
                                VNAverse control centre
                            </span>
                            <h1 className="display-6 fw-bold mt-2 mb-2">Good to see you back.</h1>
                            <p className="mb-0" style={{ color: "#cbd5e1" }}>
                                A focused view of the people and learning content powering VNAverse.
                            </p>
                        </div>

                        <div className="vna-hero-actions d-flex flex-wrap gap-2">
                            <button
                                type="button"
                                className="btn btn-primary d-inline-flex align-items-center gap-2 px-3"
                                onClick={openCreateQuestion}
                            >
                                <Plus size={18} />
                                Add question
                            </button>
                            <button
                                type="button"
                                className="btn btn-outline-light d-inline-flex align-items-center gap-2 px-3"
                                onClick={() => loadDashboard({ showRefreshState: true })}
                                disabled={refreshing}
                            >
                                <RefreshCw className={refreshing ? "vna-spin" : ""} size={17} />
                                Refresh
                            </button>
                        </div>
                    </div>
                </section>

                <section className="row g-3 mb-4" aria-label="Dashboard statistics">
                    {statCards.map(({ label, value, icon: Icon }) => (
                        <div className="col-12 col-sm-6 col-xl-3" key={label}>
                            <article className="vna-panel vna-stat-card d-flex flex-column justify-content-between">
                                <div className="d-flex align-items-start justify-content-between gap-3">
                                    <span className="text-secondary fw-medium">{label}</span>
                                    <span className="vna-icon-shell" aria-hidden="true">
                                        <Icon size={20} />
                                    </span>
                                </div>
                                <strong className="display-6 fw-bold lh-1">
                                    {Number(value || 0).toLocaleString()}
                                </strong>
                            </article>
                        </div>
                    ))}
                </section>

                <section className="row g-4 mb-4">
                    <div className="col-12 col-xl-5">
                        <article className="vna-panel h-100 p-4">
                            <div className="d-flex align-items-start justify-content-between gap-3 mb-4">
                                <div>
                                    <h2 className="h5 fw-bold mb-1">Quick actions</h2>
                                    <p className="small mb-0 text-secondary">
                                        Keep routine administration one click away.
                                    </p>
                                </div>
                                <span className="vna-icon-shell" aria-hidden="true">
                                    <Plus size={20} />
                                </span>
                            </div>

                            <div className="row g-3">
                                <div className="col-sm-6">
                                    <button
                                        type="button"
                                        className="vna-action-button d-flex align-items-center gap-3 p-3"
                                        onClick={openCreateQuestion}
                                    >
                                        <span className="vna-icon-shell" aria-hidden="true">
                                            <Plus size={18} />
                                        </span>
                                        <span>
                                            <span className="d-block fw-semibold">New question</span>
                                            <span className="small text-secondary">Grow the bank</span>
                                        </span>
                                    </button>
                                </div>
                                <div className="col-sm-6">
                                    <button
                                        type="button"
                                        className="vna-action-button d-flex align-items-center gap-3 p-3"
                                        onClick={handleManageQuestions}
                                    >
                                        <span className="vna-icon-shell" aria-hidden="true">
                                            <BookOpen size={18} />
                                        </span>
                                        <span>
                                            <span className="d-block fw-semibold">Question bank</span>
                                            <span className="small text-secondary">Edit all content</span>
                                        </span>
                                    </button>
                                </div>
                                <div className="col-sm-6">
                                    <button
                                        type="button"
                                        className="vna-action-button d-flex align-items-center gap-3 p-3"
                                        onClick={handleManageUsers}
                                    >
                                        <span className="vna-icon-shell" aria-hidden="true">
                                            <Users size={18} />
                                        </span>
                                        <span>
                                            <span className="d-block fw-semibold">User management</span>
                                            <span className="small text-secondary">View your learners</span>
                                        </span>
                                    </button>
                                </div>
                                <div className="col-sm-6">
                                    <button
                                        type="button"
                                        className="vna-action-button d-flex align-items-center gap-3 p-3"
                                        onClick={() => loadDashboard({ showRefreshState: true })}
                                        disabled={refreshing}
                                    >
                                        <span className="vna-icon-shell" aria-hidden="true">
                                            <RefreshCw className={refreshing ? "vna-spin" : ""} size={18} />
                                        </span>
                                        <span>
                                            <span className="d-block fw-semibold">Refresh data</span>
                                            <span className="small text-secondary">Sync latest changes</span>
                                        </span>
                                    </button>
                                </div>
                                <div className="col-sm-6">
                                    <button
                                        type="button"
                                        className="vna-action-button d-flex align-items-center gap-3 p-3"
                                        onClick={() => navigate(ADMIN_MANAGEMENT_ROUTES.mockTests)}
                                    >
                                        <span className="vna-icon-shell" aria-hidden="true">
                                            <ClipboardList size={18} />
                                        </span>
                                        <span>
                                            <span className="d-block fw-semibold">Manage mock tests</span>
                                            <span className="small text-secondary">Create assessments</span>
                                        </span>
                                    </button>
                                </div>
                                <div className="col-sm-6">
                                    <button
                                        type="button"
                                        className="vna-action-button d-flex align-items-center gap-3 p-3"
                                        onClick={() => navigate(ADMIN_MANAGEMENT_ROUTES.papers)}
                                    >
                                        <span className="vna-icon-shell" aria-hidden="true">
                                            <FileText size={18} />
                                        </span>
                                        <span>
                                            <span className="d-block fw-semibold">Manage papers</span>
                                            <span className="small text-secondary">Previous-year library</span>
                                        </span>
                                    </button>
                                </div>
                                <div className="col-sm-6">
                                    <button
                                        type="button"
                                        className="vna-action-button d-flex align-items-center gap-3 p-3"
                                        onClick={() => navigate(ADMIN_MANAGEMENT_ROUTES.subjects)}
                                    >
                                        <span className="vna-icon-shell" aria-hidden="true">
                                            <BookOpen size={18} />
                                        </span>
                                        <span>
                                            <span className="d-block fw-semibold">Manage subjects</span>
                                            <span className="small text-secondary">Organize learning topics</span>
                                        </span>
                                    </button>
                                </div>
                                <div className="col-sm-6">
                                    <button
                                        type="button"
                                        className="vna-action-button d-flex align-items-center gap-3 p-3"
                                        onClick={() => navigate(ADMIN_MANAGEMENT_ROUTES.exams)}
                                    >
                                        <span className="vna-icon-shell" aria-hidden="true">
                                            <GraduationCap size={18} />
                                        </span>
                                        <span>
                                            <span className="d-block fw-semibold">Manage exams</span>
                                            <span className="small text-secondary">Configure exam catalog</span>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </article>
                    </div>

                    <div className="col-12 col-xl-7">
                        <article className="vna-panel h-100 p-4">
                            <div className="d-flex align-items-start justify-content-between gap-3 mb-2">
                                <div>
                                    <h2 className="h5 fw-bold mb-1">Newest learners</h2>
                                    <p className="small mb-0 text-secondary">
                                        The five most recently registered users.
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    className="vna-link-button d-inline-flex align-items-center gap-1 p-0"
                                    onClick={handleManageUsers}
                                >
                                    View all <ArrowRight size={16} />
                                </button>
                            </div>

                            {recentUsers.length ? (
                                <div>
                                    {recentUsers.map((user) => {
                                        const name = user.name || user.fullName || "Unnamed user";

                                        return (
                                            <div
                                                className="vna-user-row d-flex align-items-center justify-content-between gap-3"
                                                key={user._id || user.email}
                                            >
                                                <div className="vna-min-width-0 d-flex align-items-center gap-3">
                                                    <span className="vna-avatar">{getInitials(name)}</span>
                                                    <div className="text-truncate">
                                                        <p className="mb-0 fw-semibold text-truncate">{name}</p>
                                                        <p className="mb-0 small text-secondary text-truncate">
                                                            {user.email || "Email unavailable"}
                                                        </p>
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline-light d-inline-flex align-items-center gap-1"
                                                    onClick={() => handleViewUser(user)}
                                                    disabled={viewingUser}
                                                >
                                                    <Eye size={15} />
                                                    View
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="vna-empty">No users have joined yet.</div>
                            )}
                        </article>
                    </div>
                </section>

                <section className="vna-panel p-4 mb-4" aria-labelledby="latest-questions-heading">
                    <div className="d-flex flex-column flex-sm-row align-items-sm-start justify-content-between gap-3 mb-2">
                        <div>
                            <h2 className="h5 fw-bold mb-1" id="latest-questions-heading">
                                Latest questions
                            </h2>
                            <p className="small mb-0 text-secondary">
                                A concise preview of recently added learning content.
                            </p>
                        </div>
                        <button
                            type="button"
                            className="vna-link-button d-inline-flex align-items-center gap-1 p-0"
                            onClick={handleManageQuestions}
                        >
                            Manage question bank <ArrowRight size={16} />
                        </button>
                    </div>

                    {recentQuestions.length ? (
                        <div>
                            {recentQuestions.map((question) => (
                                <div
                                    className="vna-question-row d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-3"
                                    key={question._id || question.question}
                                >
                                    <div className="pe-lg-4">
                                        <p className="mb-2 fw-semibold">
                                            {question.question || question.title || "Untitled question"}
                                        </p>
                                        <div className="d-flex flex-wrap gap-2">
                                            <span className="vna-badge">{getDisplayName(question.exam)}</span>
                                            <span className="vna-badge">{getDisplayName(question.subject)}</span>
                                            <span className="vna-badge">{question.difficulty || "Unspecified"}</span>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center gap-2 flex-shrink-0">
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-outline-light d-inline-flex align-items-center gap-1"
                                            onClick={() => handleEditQuestion(question)}
                                        >
                                            <Pencil size={15} />
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-outline-danger d-inline-flex align-items-center gap-1"
                                            onClick={() => handleDeleteQuestion(question)}
                                        >
                                            <Trash2 size={15} />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="vna-empty">
                            <p className="mb-3">Your question bank is ready for its first question.</p>
                            <button type="button" className="btn btn-primary" onClick={openCreateQuestion}>
                                Add the first question
                            </button>
                        </div>
                    )}
                </section>

                <section
                    className="vna-panel vna-management-panel mb-4"
                    ref={questionSectionRef}
                    aria-labelledby="question-management-heading"
                >
                    <button
                        type="button"
                        className="w-100 border-0 bg-transparent p-4 text-start text-white d-flex align-items-center justify-content-between gap-3"
                        onClick={() => setShowAllQuestions((visible) => !visible)}
                        aria-expanded={showAllQuestions}
                    >
                        <span>
                            <span className="d-block h5 fw-bold mb-1" id="question-management-heading">
                                Full question management
                            </span>
                            <span className="small text-secondary">
                                Search, filter, edit, and delete every question without leaving the dashboard.
                            </span>
                        </span>
                        <ChevronDown
                            aria-hidden="true"
                            className={showAllQuestions ? "vna-rotated" : ""}
                            size={20}
                        />
                    </button>

                    {showAllQuestions && (
                        <div className="px-4 pb-4">
                            <QuestionTable
                                questions={questions}
                                onEdit={handleEditQuestion}
                                onDelete={handleDeleteQuestion}
                            />
                        </div>
                    )}
                </section>

                <section
                    className="vna-panel vna-management-panel"
                    ref={userSectionRef}
                    aria-labelledby="user-management-heading"
                >
                    <button
                        type="button"
                        className="w-100 border-0 bg-transparent p-4 text-start text-white d-flex align-items-center justify-content-between gap-3"
                        onClick={() => setShowAllUsers((visible) => !visible)}
                        aria-expanded={showAllUsers}
                    >
                        <span>
                            <span className="d-block h5 fw-bold mb-1" id="user-management-heading">
                                Full user management
                            </span>
                            <span className="small text-secondary">
                                Open detailed learner records or remove users when necessary.
                            </span>
                        </span>
                        <ChevronDown
                            aria-hidden="true"
                            className={showAllUsers ? "vna-rotated" : ""}
                            size={20}
                        />
                    </button>

                    {showAllUsers && (
                        <div className="px-4 pb-4">
                            <UserTable
                                users={users}
                                onView={handleViewUser}
                                onDelete={handleDeleteUser}
                            />
                        </div>
                    )}
                </section>
            </main>

            {showQuestionModal && (
                <div
                    className="modal fade show d-block"
                    role="dialog"
                    aria-modal="true"
                    aria-label={editingQuestion ? "Edit question" : "Add question"}
                    style={{ backgroundColor: "rgba(2, 6, 23, 0.78)" }}
                >
                    <div className="modal-dialog modal-xl modal-dialog-scrollable">
                        <div className="modal-content border-0" style={{ background: "#111827" }}>
                            <div className="modal-body p-3 p-md-4">
                                <QuestionForm
                                    onSubmit={handleSaveQuestion}
                                    initialData={questionFormInitialData}
                                    loading={savingQuestion}
                                    onCancel={closeQuestionModal}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showQuestionDeleteModal && (
                <DeleteConfirmation
                    show={showQuestionDeleteModal}
                    isOpen={showQuestionDeleteModal}
                    title="Delete question"
                    message="This question will be permanently removed from the question bank."
                    itemName={selectedQuestion?.question}
                    loading={deletingQuestion}
                    onConfirm={confirmDeleteQuestion}
                    onCancel={() => !deletingQuestion && setShowQuestionDeleteModal(false)}
                    onClose={() => !deletingQuestion && setShowQuestionDeleteModal(false)}
                />
            )}

            {showUserDeleteModal && (
                <DeleteConfirmation
                    show={showUserDeleteModal}
                    isOpen={showUserDeleteModal}
                    title="Delete user"
                    message="This user and the data associated with their account will be permanently removed."
                    itemName={selectedDeleteUser?.name || selectedDeleteUser?.email}
                    loading={deletingUser}
                    onConfirm={confirmDeleteUser}
                    onCancel={() => !deletingUser && setShowUserDeleteModal(false)}
                    onClose={() => !deletingUser && setShowUserDeleteModal(false)}
                />
            )}

            <UserDetailsModal
                show={showUserModal}
                isOpen={showUserModal}
                user={selectedUser}
                tests={userTests}
                userTests={userTests}
                onClose={closeUserModal}
                onHide={closeUserModal}
            />
        </MainLayout>
    );
}

export default AdminDashboard;
