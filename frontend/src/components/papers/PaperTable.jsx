import {
    Pencil,
    Trash2,
    Eye,
    EyeOff,
    CheckCircle,
    XCircle,
    Crown,
} from "lucide-react";

const PaperTable = ({

    papers,

    onEdit,

    onDelete,

    onPublishToggle,

    onStatusToggle,

}) => {

    if (!papers || papers.length === 0) {

        return (

            <div className="alert alert-info">

                No previous year papers found.

            </div>

        );

    }

    return (

        <div
            className="rounded-4 overflow-hidden"
            style={{
                background: "#131D31",
                border: "1px solid rgba(255,255,255,.08)",
            }}
        >

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

                            <th width="270">

                                Actions

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {papers.map((paper, index) => (

                            <tr key={paper._id}>

                                <td>

                                    {index + 1}

                                </td>

                                <td>

                                    <div className="fw-semibold">

                                        {paper.title}

                                    </div>

                                </td>

                                <td>

                                    {paper.exam?.name || "-"}

                                </td>

                                <td>

                                    {paper.subject?.name || "-"}

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

                                    {

                                        paper.isPublished ? (

                                            <span className="badge bg-success">

                                                Published

                                            </span>

                                        ) : (

                                            <span className="badge bg-secondary">

                                                Draft

                                            </span>

                                        )

                                    }

                                </td>

                                <td>

                                    {

                                        paper.isActive ? (

                                            <span className="badge bg-primary">

                                                Active

                                            </span>

                                        ) : (

                                            <span className="badge bg-danger">

                                                Inactive

                                            </span>

                                        )

                                    }

                                </td>

                                <td>

                                    {paper.views ?? 0}

                                </td>

                                <td>

                                    {paper.downloads ?? 0}

                                </td>

                                <td>

                                    <div className="d-flex flex-wrap gap-2">

                                        <button

                                            className="btn btn-warning btn-sm"

                                            onClick={() =>

                                                onEdit(paper)

                                            }

                                        >

                                            <Pencil
                                                size={15}
                                            />

                                        </button>

                                        <button

                                            className="btn btn-danger btn-sm"

                                            onClick={() =>

                                                onDelete(paper)

                                            }

                                        >

                                            <Trash2
                                                size={15}
                                            />

                                        </button>

                                        <button

                                            className={`btn btn-sm ${
                                                paper.isPublished
                                                    ? "btn-outline-secondary"
                                                    : "btn-outline-success"
                                            }`}

                                            onClick={() =>

                                                onPublishToggle(paper)

                                            }

                                            title={
                                                paper.isPublished
                                                    ? "Unpublish"
                                                    : "Publish"
                                            }

                                        >

                                            {

                                                paper.isPublished ? (

                                                    <EyeOff
                                                        size={15}
                                                    />

                                                ) : (

                                                    <Eye
                                                        size={15}
                                                    />

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

                                                onStatusToggle(paper)

                                            }

                                            title={
                                                paper.isActive
                                                    ? "Deactivate"
                                                    : "Activate"
                                            }

                                        >

                                            {

                                                paper.isActive ? (

                                                    <XCircle
                                                        size={15}
                                                    />

                                                ) : (

                                                    <CheckCircle
                                                        size={15}
                                                    />

                                                )

                                            }

                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

};

export default PaperTable;