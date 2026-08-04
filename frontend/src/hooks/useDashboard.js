import { useCallback, useEffect, useState } from "react";

import { getDashboard } from "../services/dashboardService";

export default function useDashboard(examId = null) {

    const [dashboard, setDashboard] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    /*
    ==========================================
    Fetch Dashboard
    ==========================================
    */

    const fetchDashboard = useCallback(async () => {

        try {

            setLoading(true);

            setError("");

            const response = await getDashboard(examId);

            if (!response.success) {

                throw new Error(
                    response.message ||
                    "Failed to load dashboard."
                );

            }

            setDashboard(response.data);

        }

        catch (error) {

            setError(

                error?.response?.data?.message ||

                error?.message ||

                "Failed to load dashboard."

            );

        }

        finally {

            setLoading(false);

        }

    }, [examId]);

    /*
    ==========================================
    Initial Load
    ==========================================
    */

    useEffect(() => {

        fetchDashboard();

    }, [fetchDashboard]);

    /*
    ==========================================
    Refresh Dashboard
    ==========================================
    */

    const refreshDashboard = useCallback(() => {

        fetchDashboard();

    }, [fetchDashboard]);

    return {

        dashboard,

        loading,

        error,

        refreshDashboard,

    };

}