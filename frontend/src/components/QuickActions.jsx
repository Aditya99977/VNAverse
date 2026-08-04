import { useNavigate } from "react-router-dom";

import {
    FaBook,
    FaClipboardList,
    FaChartLine,
    FaMedal,
} from "react-icons/fa";

function QuickActions() {

    const navigate = useNavigate();

    const actions = [

        {
            id: "practice",
            title: "Practice",
            icon: <FaBook />,
            path: "/practice",
            disabled: false,
        },

        {
            id: "mock-tests",
            title: "Mock Tests",
            icon: <FaClipboardList />,
            path: "/mock-tests",
            disabled: false,
        },

        {
            id: "analytics",
            title: "Analytics",
            icon: <FaChartLine />,
            path: "/performance",
            disabled: false,
        },

        {
            id: "leaderboard",
            title: "Leaderboard",
            icon: <FaMedal />,
            path: null,
            disabled: true,
        },

    ];

    return (

        <div
            className="rounded-4 h-100"
            style={{
                background: "#111827",
                border: "1px solid rgba(255,255,255,.08)",
                boxShadow: "0 10px 30px rgba(0,0,0,.18)",
            }}
        >

            <div className="p-4">

                <div className="mb-4">

                    <h4 className="fw-bold text-white mb-1">

                        ⚡ Quick Actions

                    </h4>

                    <p
                        className="mb-0"
                        style={{
                            color: "#94A3B8",
                            fontSize: ".95rem",
                        }}
                    >

                        Jump directly to your most-used learning tools.

                    </p>

                </div>

                <div className="row g-3">

                    {

                        actions.map((action) => (

                            <div
                                key={action.id}
                                className="col-6"
                            >

                                <button

                                    type="button"

                                    onClick={() => {

                                        if (

                                            !action.disabled &&

                                            action.path

                                        ) {

                                            navigate(action.path);

                                        }

                                    }}

                                    disabled={action.disabled}

                                    className="w-100 border-0 rounded-4 position-relative"

                                    style={{
                                        background: action.disabled
                                            ? "#151E31"
                                            : "#182338",

                                        color: "#F8FAFC",

                                        padding: "20px 12px",

                                        border: "1px solid rgba(255,255,255,.06)",

                                        cursor: action.disabled
                                            ? "not-allowed"
                                            : "pointer",

                                        opacity: action.disabled
                                            ? 0.75
                                            : 1,

                                        transition: ".25s",
                                    }}

                                >

                                    {

                                        action.disabled && (

                                            <span
                                                className="position-absolute top-0 end-0 translate-middle badge rounded-pill"
                                                style={{
                                                    background: "#F59E0B",
                                                    color: "#fff",
                                                    fontSize: ".65rem",
                                                }}
                                            >

                                                Soon

                                            </span>

                                        )

                                    }

                                    <div
                                        className="mx-auto mb-3"
                                        style={{
                                            width: "52px",
                                            height: "52px",
                                            borderRadius: "16px",
                                            background:
                                                "linear-gradient(135deg,#2563EB,#3B82F6)",

                                            display: "flex",

                                            alignItems: "center",

                                            justifyContent: "center",

                                            color: "#fff",

                                            fontSize: "20px",
                                        }}
                                    >

                                        {action.icon}

                                    </div>

                                    <div
                                        className="fw-semibold"
                                        style={{
                                            fontSize: ".95rem",
                                        }}
                                    >

                                        {action.title}

                                    </div>

                                </button>

                            </div>

                        ))

                    }

                </div>

            </div>

        </div>

    );

}

export default QuickActions;