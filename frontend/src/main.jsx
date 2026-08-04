import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import { AuthProvider } from "./context/AuthContext";
import { ExamProvider } from "./context/ExamContext";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";
import "./styles/landing.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <ExamProvider>
                    <App />
                </ExamProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);