import api from "./api";

/*
========================================
Register
========================================
*/

export const registerUser = async (userData) => {
    const response = await api.post(
        "/auth/register",
        userData
    );

    return response.data;
};

/*
========================================
Login
========================================
*/

export const loginUser = async (credentials) => {
    const response = await api.post(
        "/auth/login",
        credentials
    );

    return response.data;
};

/*
========================================
Get Current User
========================================
*/

export const getCurrentUser = async () => {
    const response = await api.get("/auth/me");

    return response.data;
};

/*
========================================
Logout
========================================
*/

export const logoutUser = async () => {
    const response = await api.post("/auth/logout");

    return response.data;
};

/*
========================================
Change Password
========================================
*/

export const changePassword = async (passwordData) => {
    const response = await api.put(
        "/auth/change-password",
        passwordData
    );

    return response.data;
};