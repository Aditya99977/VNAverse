import api from "./api";

/*
==================================================
Student Dashboard
==================================================
*/

/**
 * Get dashboard data
 *
 * If examId is provided, the backend can use it
 * to customize the dashboard response.
 */
export const getDashboard = async (examId = null) => {
    const config = {};

    if (examId) {
        config.params = {
            examId,
        };
    }

    const { data } = await api.get(
        "/dashboard",
        config
    );

    return data;
};