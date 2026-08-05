import {
    Pencil,
    Trash2,
    Eye,
    EyeOff,
    CheckCircle,
    XCircle,
    Crown,
    FileText,
} from "lucide-react";

function PaperTable({

    papers = [],

    onEdit,

    onDelete,

    onPublishToggle,

    onStatusToggle,

}) {

    /*
    =====================================
    Empty State
    =====================================
    */

    if (!papers.length) {

        return (

            <div
                className="rounded-4 p-5 text-center"
                style={{
                    background: "#131D31",
                    border:
                        "1px solid rgba(255,255,255,.08)",
                }}
            >

                <FileText
                    size={60}
                    color="#64748B"
                    className="mb-3"
                />

                <h4 className="text-white fw-bold">

                    No Previous Year Papers

                </h4>

                <p className="text-secondary mb-0">

                    Create your first paper to start building
                    the library.

                </p>

            </div>

        );

    }

    return (

        <div
            className="rounded-4 overflow-hidden"
            style={{
                background: "#131D31",
                border:
                    "1px solid rgba(255,255,255,.08)",
            }}
        >

            {/* =====================================
                Header
            ===================================== */}

            <div className="p-4 border-bottom border-secondary">

                <div className="d-flex justify-content-between align-items-center">

                    <div>

                        <h5 className="text-white fw-bold mb-1">

                            Previous Year Papers

                        </h5>

                        <p className="text-secondary mb-0">

                            Manage all papers from one place.

                        </p>

                    </div>

                    <span className="badge bg-primary px-3 py-2">

                        {papers.length} Papers

                    </span>

                </div>

            </div>

            {/* =====================================
                Table
            ===================================== */}

            <div className="table-responsive">

                <table className="table table-dark table-hover align-middle mb-0">

                    <thead>

                        <tr>

                            <th>#</th>

                            <th>Title</th>

                            <th>Exam</th>

                            <th>Subject</th>

                            <th>Year</th>

                            <th>Language</th>

                            <th>Premium</th>

                            <th>Published</th>

                            <th>Status</th>

                            <th>Views</th>

                            <th>Downloads</th>

                            <th className="text-end">

                                Actions

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            papers.map((paper, index) => (

                                <tr key={paper._id}>

                                    <td>

                                        {index + 1}

                                    </td>

                                    <td>

                                        <div className="fw-semibold text-white">

                                            {paper.title}

                                        </div>

                                    </td>

                                    <td>

                                        {

                                            paper.exam?.name ||

                                            "-"

                                        }

                                    </td>

                                    <td>

                                        {

                                            paper.subject?.name ||

                                            "-"

                                        }

                                    </td>

                                    <td>

                                        {paper.year}

                                    </td>

                                    <td>

                                        {paper.language}

                                    </td>

                                    <td>

                                        {

                                            paper.isPremium ? (

                                                <span className="badge bg-warning text-dark">

                                                    <Crown
                                                        size={12}
                                                        className="me-1"
                                                    />

                                                    Premium

                                                </span>

                                            ) : (

                                                <span className="badge bg-success">

                                                    Free

                                                </span>

                                            )

                                        }

                                    </td>

                                    <td>

                                        <span
                                            className={`badge ${
                                                paper.isPublished
                                                    ? "bg-success"
                                                    : "bg-secondary"
                                            }`}
                                        >

                                            {

                                                paper.isPublished

                                                    ? "Published"

                                                    : "Draft"

                                            }

                                        </span>

                                    </td>

                                    <td>

                                        <span
                                            className={`badge ${
                                                paper.isActive
                                                    ? "bg-primary"
                                                    : "bg-danger"
                                            }`}
                                        >

                                            {

                                                paper.isActive

                                                    ? "Active"

                                                    : "Inactive"

                                            }

                                        </span>

                                    </td>

                                    <td>

                                        {paper.views ?? 0}

                                    </td>

                                    <td>

                                        {paper.downloads ?? 0}

                                    </td>

                                    <td className="text-end">

                                        <button
                                            className="btn btn-sm btn-outline-primary me-2"
                                            onClick={() =>
                                                onEdit(paper)
                                            }
                                        >

                                            <Pencil size={16} />

                                        </button>

                                        <button
                                            className="btn btn-sm btn-outline-danger me-2"
                                            onClick={() =>
                                                onDelete(paper)
                                            }
                                        >

                                            <Trash2 size={16} />

                                        </button>

                                        <button
                                            className={`btn btn-sm me-2 ${
                                                paper.isPublished

                                                    ? "btn-outline-warning"

                                                    : "btn-outline-success"
                                            }`}
                                            onClick={() =>
                                                onPublishToggle(
                                                    paper
                                                )
                                            }
                                        >

                                            {

                                                paper.isPublished

                                                    ? (

                                                        <EyeOff size={16} />

                                                    )

                                                    : (

                                                        <Eye size={16} />

                                                    )

                                            }

                                        </button>

                                        <button
                                            className={`btn btn-sm ${
                                                paper.isActive

                                                    ? "btn-outline-danger"

                                                    : "btn-outline-primary"
                                            }`}
                                            onClick={() =>
                                                onStatusToggle(
                                                    paper
                                                )
                                            }
                                        >

                                            {

                                                paper.isActive

                                                    ? (

                                                        <XCircle size={16} />

                                                    )

                                                    : (

                                                        <CheckCircle size={16} />

                                                    )

                                            }

                                        </button>

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default PaperTable;