import { Navigate, useLocation } from "react-router-dom";

import Loader from "./Loader";
import { useAuth } from "../hooks/useAuth";

function ProtectedRoute({
    children,
    requiredRole = null,
}) {

    const {

        user,

        loading,

        isAuthenticated,

    } = useAuth();

    const location = useLocation();

    /*
    ==========================================
    Wait for Session Restoration
    ==========================================
    */

    if (loading) {

        return <Loader />;

    }

    /*
    ==========================================
    Not Authenticated
    ==========================================
    */

    if (!isAuthenticated) {

        return (

            <Navigate
                to="/login"
                replace
                state={{ from: location }}
            />

        );

    }

    /*
    ==========================================
    Role Protection
    ==========================================
    */

    if (

        requiredRole &&

        user.role !== requiredRole

    ) {

        return (

            <Navigate
                to="/dashboard"
                replace
            />

        );

    }

    /*
    ==========================================
    Student Exam Selection
    ==========================================
    */

    if (

        user.role === "student" &&

        !user.preferredExam &&

        location.pathname !== "/select-exam"

    ) {

        return (

            <Navigate
                to="/select-exam"
                replace
            />

        );

    }

    /*
    ==========================================
    Allow Access
    ==========================================
    */

    return children;

}

export default ProtectedRoute;