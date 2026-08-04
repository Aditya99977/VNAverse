import {
    Pencil,
    Trash2,
    BookOpen,
} from "lucide-react";

function SubjectTable({
    subjects,
    loading,
    onEdit,
    onDelete,
}) {

    if (loading) {

        return (

            <div
                className="rounded-4 p-5 text-center"
                style={{
                    background: "#131D31",
                    border:
                        "1px solid rgba(255,255,255,.08)",
                }}
            >

                <div
                    className="spinner-border text-primary mb-4"
                    role="status"
                />

                <h4 className="text-white fw-bold">

                    Loading Subjects...

                </h4>

                <p className="text-secondary mb-0">

                    Please wait while we fetch all subjects.

                </p>

            </div>

        );

    }

    if (!subjects.length) {

        return (

            <div
                className="rounded-4 p-5 text-center"
                style={{
                    background: "#131D31",
                    border:
                        "1px solid rgba(255,255,255,.08)",
                }}
            >

                <BookOpen
                    size={60}
                    className="text-primary mb-4"
                />

                <h3 className="text-white fw-bold">

                    No Subjects Found

                </h3>

                <p
                    className="text-secondary mb-0 mx-auto"
                    style={{
                        maxWidth: 500,
                    }}
                >

                    No subjects match your current filters.
                    Create a new subject or adjust the filters.

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

            {/* Header */}

            <div
                className="d-flex justify-content-between align-items-center p-4"
                style={{
                    borderBottom:
                        "1px solid rgba(255,255,255,.08)",
                }}
            >

                <div>

                    <h4 className="text-white fw-bold mb-1">

                        Subject Bank

                    </h4>

                    <p className="text-secondary mb-0">

                        Manage all subjects across exams.

                    </p>

                </div>

                <span className="badge bg-primary rounded-pill px-3 py-2">

                    {subjects.length} Subjects

                </span>

            </div>

            {/* Table */}

            <div className="table-responsive">

                <table className="table table-dark table-hover align-middle mb-0">

                    <thead>

                        <tr>

                            <th>#</th>

                            <th>Name</th>

                            <th>Exam</th>

                            <th>Category</th>

                            <th>Order</th>

                            <th>Status</th>

                            <th className="text-end">

                                Actions

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {subjects.map((subject, index) => (

                            <tr key={subject._id}>

                                <td>

                                    {index + 1}

                                </td>

                                <td>

                                    <div>

                                        <div className="fw-semibold">

                                            {subject.name}

                                        </div>

                                        <small className="text-secondary">

                                            {subject.slug}

                                        </small>

                                    </div>

                                </td>

                                <td>

                                    {subject.exam?.name || "-"}

                                </td>

                                <td>

                                    <span className="badge bg-info text-dark rounded-pill">

                                        {subject.exam?.category || "-"}

                                    </span>

                                </td>

                                <td>

                                    {subject.order}

                                </td>

                                <td>

                                    <span
                                        className={`badge rounded-pill ${

                                            subject.isActive

                                                ? "bg-success"

                                                : "bg-secondary"

                                        }`}
                                    >

                                        {

                                            subject.isActive

                                                ? "Active"

                                                : "Inactive"

                                        }

                                    </span>

                                </td>

                                <td className="text-end">

                                    <button
                                        className="btn btn-outline-primary btn-sm me-2"
                                        onClick={() =>
                                            onEdit(subject)
                                        }
                                    >

                                        <Pencil size={16} />

                                    </button>

                                    <button
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={() =>
                                            onDelete(subject)
                                        }
                                    >

                                        <Trash2 size={16} />

                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default SubjectTable;