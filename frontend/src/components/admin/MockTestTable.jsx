import { useMemo, useState } from "react";
import {
    Search,
    Pencil,
    Trash2,
    Eye,
    EyeOff,
    Clock3,
    BookOpen,
    FileText,
} from "lucide-react";

function MockTestTable({
    mockTests = [],
    loading = false,
    onEdit,
    onDelete,
    onToggleStatus,
}) {

    /*
    =====================================
    States
    =====================================
    */

    const [search, setSearch] = useState("");

    /*
    =====================================
    Filter Mock Tests
    =====================================
    */

    const filteredTests = useMemo(() => {

        const keyword = search
            .toLowerCase()
            .trim();

        if (!keyword) {
            return mockTests;
        }

        return mockTests.filter((test) => {

            const title =
                test.title?.toLowerCase() || "";

            const exam =
                test.exam?.name?.toLowerCase() ||
                test.exam?.toLowerCase() ||
                "";

            const subject =
                test.subject?.name?.toLowerCase() ||
                test.subject?.toLowerCase() ||
                "";

            return (
                title.includes(keyword) ||
                exam.includes(keyword) ||
                subject.includes(keyword)
            );

        });

    }, [mockTests, search]);

    return (

        <div
            className="rounded-4 overflow-hidden"
            style={{
                background: "#131D31",
                border: "1px solid rgba(255,255,255,.08)",
            }}
        >

            {/* ======================================
                Header
            ====================================== */}

            <div
                className="p-4"
                style={{
                    borderBottom:
                        "1px solid rgba(255,255,255,.08)",
                }}
            >

                <div className="d-flex flex-column flex-xl-row justify-content-between align-items-xl-center gap-4">

                    <div>

                        <h4 className="fw-bold text-white mb-2">

                            Mock Test Library

                        </h4>

                        <p className="text-secondary mb-0">

                            Manage, publish and organize all mock tests
                            available on the VNAverse platform.

                        </p>

                    </div>

                    <div
                        className="position-relative"
                        style={{
                            width: "100%",
                            maxWidth: 380,
                        }}
                    >

                        <Search
                            size={18}
                            className="position-absolute"
                            style={{
                                left: 18,
                                top: "50%",
                                transform:
                                    "translateY(-50%)",
                                color: "#94A3B8",
                            }}
                        />

                        <input
                            type="text"
                            className="form-control ps-5 py-3 rounded-3"
                            placeholder="Search by title, exam or subject..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            style={{
                                background: "#0F172A",
                                border:
                                    "1px solid rgba(255,255,255,.08)",
                                color: "#fff",
                                boxShadow: "none",
                            }}
                        />

                    </div>

                </div>

            </div>

            {/* ======================================
                Table
            ====================================== */}

            <div className="table-responsive">

                <table
                    className="table align-middle mb-0"
                    style={{
                        color: "#fff",
                    }}
                >

                    <thead>

                        <tr
                            style={{
                                background: "#0F172A",
                                borderBottom:
                                    "1px solid rgba(255,255,255,.08)",
                            }}
                        >

                            <th
                                className="py-3 ps-4"
                                style={{
                                    color: "#94A3B8",
                                    fontSize: ".75rem",
                                    letterSpacing: "1px",
                                    fontWeight: 700,
                                }}
                            >
                                MOCK TEST
                            </th>

                            <th
                                style={{
                                    color: "#94A3B8",
                                    fontSize: ".75rem",
                                    letterSpacing: "1px",
                                    fontWeight: 700,
                                }}
                            >
                                EXAM
                            </th>

                            <th
                                style={{
                                    color: "#94A3B8",
                                    fontSize: ".75rem",
                                    letterSpacing: "1px",
                                    fontWeight: 700,
                                }}
                            >
                                SUBJECT
                            </th>

                            <th
                                style={{
                                    color: "#94A3B8",
                                    fontSize: ".75rem",
                                    letterSpacing: "1px",
                                    fontWeight: 700,
                                }}
                            >
                                DURATION
                            </th>

                            <th
                                style={{
                                    color: "#94A3B8",
                                    fontSize: ".75rem",
                                    letterSpacing: "1px",
                                    fontWeight: 700,
                                }}
                            >
                                QUESTIONS
                            </th>

                            <th
                                style={{
                                    color: "#94A3B8",
                                    fontSize: ".75rem",
                                    letterSpacing: "1px",
                                    fontWeight: 700,
                                }}
                            >
                                STATUS
                            </th>

                            <th
                                className="text-end pe-4"
                                style={{
                                    color: "#94A3B8",
                                    fontSize: ".75rem",
                                    letterSpacing: "1px",
                                    fontWeight: 700,
                                }}
                            >
                                ACTIONS
                            </th>

                        </tr>

                    </thead>

                    <tbody>                        {loading ? (

                            <tr>

                                <td
                                    colSpan={7}
                                    className="text-center py-5"
                                >

                                    <div className="d-flex flex-column align-items-center">

                                        <div
                                            className="spinner-border text-primary mb-3"
                                            role="status"
                                        />

                                        <h6 className="text-white fw-semibold mb-1">

                                            Loading Mock Tests...

                                        </h6>

                                        <small className="text-secondary">

                                            Fetching the latest mock tests from the server.

                                        </small>

                                    </div>

                                </td>

                            </tr>

                        ) : filteredTests.length === 0 ? (

                            <tr>

                                <td
                                    colSpan={7}
                                    className="py-5"
                                >

                                    <div className="text-center">

                                        <div
                                            className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4"
                                            style={{
                                                width: 90,
                                                height: 90,
                                                background: "rgba(37,99,235,.10)",
                                                border: "1px solid rgba(37,99,235,.20)",
                                            }}
                                        >

                                            <FileText
                                                size={42}
                                                color="#2563EB"
                                            />

                                        </div>

                                        <h4 className="text-white fw-bold mb-2">

                                            No Mock Tests Found

                                        </h4>

                                        <p
                                            className="text-secondary mb-0 mx-auto"
                                            style={{
                                                maxWidth: 420,
                                            }}
                                        >

                                            No mock tests match your current search.
                                            Try changing the search keyword or create
                                            your first mock test.

                                        </p>

                                    </div>

                                </td>

                            </tr>

                        ) : (

                            filteredTests.map((test) => (

                                <tr
                                    key={test._id}
                                    style={{
                                        borderBottom:
                                            "1px solid rgba(255,255,255,.05)",
                                    }}
                                >

                                    <td className="ps-4 py-4">

                                        <div className="d-flex align-items-center">

                                            <div
                                                className="rounded-3 d-flex align-items-center justify-content-center me-3"
                                                style={{
                                                    width: 48,
                                                    height: 48,
                                                    background:
                                                        "rgba(37,99,235,.12)",
                                                    border:
                                                        "1px solid rgba(37,99,235,.20)",
                                                }}
                                            >

                                                <FileText
                                                    size={22}
                                                    color="#2563EB"
                                                />

                                            </div>

                                            <div>

                                                <div className="fw-semibold text-white">

                                                    {test.title}

                                                </div>

                                                <small className="text-secondary">

                                                    Mock Test

                                                </small>

                                            </div>

                                        </div>

                                    </td>

                                    <td>

                                        <span className="text-white">

                                            {test.exam?.name ||
                                                test.exam ||
                                                "-"}

                                        </span>

                                    </td>

                                    <td>

                                        <span className="text-white">

                                            {test.subject?.name ||
                                                test.subject ||
                                                "-"}

                                        </span>

                                    </td>

                                    <td>

                                        <div className="d-flex align-items-center">

                                            <Clock3
                                                size={16}
                                                className="me-2"
                                                color="#94A3B8"
                                            />

                                            <span>

                                                {test.duration} min

                                            </span>

                                        </div>

                                    </td>

                                    <td>

                                        <div className="d-flex align-items-center">

                                            <BookOpen
                                                size={16}
                                                className="me-2"
                                                color="#94A3B8"
                                            />

                                            <span>

                                                {test.questions?.length || 0}

                                            </span>

                                        </div>

                                    </td>                                    <td>

                                        <span
                                            className="badge rounded-pill px-3 py-2"
                                            style={{
                                                background:
                                                    test.status === "Published"
                                                        ? "rgba(34,197,94,.15)"
                                                        : "rgba(245,158,11,.15)",

                                                color:
                                                    test.status === "Published"
                                                        ? "#22C55E"
                                                        : "#F59E0B",

                                                border:
                                                    test.status === "Published"
                                                        ? "1px solid rgba(34,197,94,.25)"
                                                        : "1px solid rgba(245,158,11,.25)",

                                                fontWeight: 600,
                                            }}
                                        >

                                            {test.status}

                                        </span>

                                    </td>

                                    <td className="text-end pe-4">

                                        <div className="d-flex justify-content-end gap-2">

                                            <button
                                                className="btn btn-sm"
                                                title="Edit Mock Test"
                                                onClick={() =>
                                                    onEdit(test)
                                                }
                                                style={{
                                                    width: 40,
                                                    height: 40,
                                                    background: "#0F172A",
                                                    border:
                                                        "1px solid rgba(59,130,246,.20)",
                                                    color: "#3B82F6",
                                                }}
                                            >

                                                <Pencil size={17} />

                                            </button>

                                            <button
                                                className="btn btn-sm"
                                                title="Delete Mock Test"
                                                onClick={() =>
                                                    onDelete(test)
                                                }
                                                style={{
                                                    width: 40,
                                                    height: 40,
                                                    background: "#0F172A",
                                                    border:
                                                        "1px solid rgba(239,68,68,.20)",
                                                    color: "#EF4444",
                                                }}
                                            >

                                                <Trash2 size={17} />

                                            </button>

                                            <button
                                                className="btn btn-sm"
                                                title={
                                                    test.status ===
                                                    "Published"
                                                        ? "Unpublish"
                                                        : "Publish"
                                                }
                                                onClick={() =>
                                                    onToggleStatus(
                                                        test._id
                                                    )
                                                }
                                                style={{
                                                    width: 40,
                                                    height: 40,
                                                    background: "#0F172A",
                                                    border:
                                                        test.status ===
                                                        "Published"
                                                            ? "1px solid rgba(245,158,11,.20)"
                                                            : "1px solid rgba(34,197,94,.20)",

                                                    color:
                                                        test.status ===
                                                        "Published"
                                                            ? "#F59E0B"
                                                            : "#22C55E",
                                                }}
                                            >

                                                {test.status ===
                                                "Published" ? (
                                                    <EyeOff
                                                        size={17}
                                                    />
                                                ) : (
                                                    <Eye
                                                        size={17}
                                                    />
                                                )}

                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>                </table>

            </div>

        </div>

    );

}

export default MockTestTable;