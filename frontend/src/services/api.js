import axios from "axios";

export const API_BASE_URL = (
    import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/+$/, "");

export const API_ORIGIN = new URL(
    API_BASE_URL,
    window.location.origin
).origin;

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 15000,
    headers: {
        "Content-Type": "application/json",
    },
});

// =========================
// Request Interceptor
// =========================

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        config.headers = config.headers || {};

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// =========================
// Response Interceptor
// =========================

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;

        if (status === 401) {
            localStorage.removeItem("token");
        }

        return Promise.reject(error);
    }
);

export default api;