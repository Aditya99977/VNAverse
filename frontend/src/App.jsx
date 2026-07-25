import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import AdminRoute from "./components/AdminRoute";
import Loader from "./components/Loader";
import ProtectedRoute from "./components/ProtectedRoute";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const VerifyEmail = lazy(() => import("./pages/VerifyEmail"));

// Student Pages
const SelectExam = lazy(() => import("./pages/student/SelectExam"));
const StudentDashboard = lazy(() => import("./pages/StudentDashboard"));
const PreviousYearPapers = lazy(() => import("./pages/PreviousYearPapers"));
const Profile = lazy(() => import("./pages/Profile"));
const EditProfile = lazy(() => import("./pages/EditProfile"));
const Practice = lazy(() => import("./pages/Practice"));
const MockTest = lazy(() => import("./pages/MockTest"));
const Performance = lazy(() => import("./pages/Performance"));

// Admin Pages
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const MockTestManagement = lazy(() => import("./pages/MockTestManagement"));
const PaperManagement = lazy(() => import("./pages/PaperManagement"));
const SubjectManagement = lazy(() => import("./pages/SubjectManagement"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));

const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
    return (
        <Suspense fallback={<Loader />}>
            <Routes>

                {/* ===============================
                    Public Routes
                =============================== */}

                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin/login" element={<AdminLogin />} />

                <Route
                    path="/verify-email/:token"
                    element={<VerifyEmail />}
                />

                {/* ===============================
                    Student Onboarding
                =============================== */}

                <Route
                    path="/select-exam"
                    element={
                        <ProtectedRoute>
                            <SelectExam />
                        </ProtectedRoute>
                    }
                />

                {/* ===============================
                    Student Routes
                =============================== */}

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <StudentDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/practice"
                    element={
                        <ProtectedRoute>
                            <Practice />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/mock-tests"
                    element={
                        <ProtectedRoute>
                            <MockTest />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/previous-year-papers"
                    element={
                        <ProtectedRoute>
                            <PreviousYearPapers />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/performance"
                    element={
                        <ProtectedRoute>
                            <Performance />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/edit-profile"
                    element={
                        <ProtectedRoute>
                            <EditProfile />
                        </ProtectedRoute>
                    }
                />

                {/* ===============================
                    Admin Routes
                =============================== */}

                <Route
                    path="/admin"
                    element={
                        <AdminRoute>
                            <AdminDashboard />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/admin/mock-tests"
                    element={
                        <AdminRoute>
                            <MockTestManagement />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/admin/papers"
                    element={
                        <AdminRoute>
                            <PaperManagement />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/admin/subjects"
                    element={
                        <AdminRoute>
                            <SubjectManagement />
                        </AdminRoute>
                    }
                />

                {/* ===============================
                    404 Page
                =============================== */}

                <Route
                    path="*"
                    element={<NotFound />}
                />

            </Routes>
        </Suspense>
    );
}

export default App;