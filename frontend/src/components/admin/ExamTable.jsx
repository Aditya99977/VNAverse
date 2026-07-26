import { useMemo, useState } from "react";
import {
    FaPlus,
    FaSearch,
    FaEdit,
    FaTrash,
} from "react-icons/fa";

const ExamTable = ({
    exams,
    loading,
    onCreate,
    onEdit,
    onDelete,
}) => {
    const [search, setSearch] = useState("");

    const filteredExams = useMemo(() => {
        const keyword = search.toLowerCase().trim();

        if (!keyword) return exams;

        return exams.filter(
            (exam) =>
                exam.name.toLowerCase().includes(keyword) ||
                exam.category.toLowerCase().includes(keyword) ||
                exam.slug.toLowerCase().includes(keyword)
        );
    }, [search, exams]);

    return (
        <div className="card border-0 shadow-sm">

            {/* Header */}

            <div className="card-header bg-white border-0 py-3">

                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">

                    <h5 className="fw-bold mb-0">
                        Exams
                    </h5>

                    <div className="d-flex gap-2">

                        <div className="input-group">

                            <span className="input-group-text bg-white">
                                <FaSearch />
                            </span>

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search exams..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                            />

                        </div>

                        <button
                            className="btn btn-primary"
                            onClick={onCreate}
                        >
                            <FaPlus className="me-2" />
                            Add Exam
                        </button>

                    </div>

                </div>

            </div>

            {/* Table */}

            <div className="table-responsive">

                <table className="table table-hover align-middle mb-0">

                    <thead className="table-light">

                        <tr>
                            <th>Name</th>
                            <th>Slug</th>
                            <th>Category</th>
                            <th>Subjects</th>
                            <th>Status</th>
                            <th className="text-end">
                                Actions
                            </th>
                        </tr>

                    </thead>

                    <tbody>

                        {loading ? (

                            <tr>

                                <td
                                    colSpan={6}
                                    className="text-center py-5"
                                >
                                    Loading exams...
                                </td>

                            </tr>

                        ) : filteredExams.length === 0 ? (

                            <tr>

                                <td
                                    colSpan={6}
                                    className="text-center py-5 text-muted"
                                >
                                    No exams found.
                                </td>

                            </tr>

                        ) : (

                            filteredExams.map((exam) => (

                                <tr key={exam._id}>

                                    <td className="fw-semibold">
                                        {exam.name}
                                    </td>

                                    <td>
                                        <code>{exam.slug}</code>
                                    </td>

                                    <td>
                                        {exam.category}
                                    </td>

                                    <td>
                                        {exam.subjects?.length || 0}
                                    </td>

                                    <td>

                                        <span
                                            className={`badge ${
                                                exam.isActive
                                                    ? "bg-success"
                                                    : "bg-secondary"
                                            }`}
                                        >
                                            {exam.isActive
                                                ? "Active"
                                                : "Archived"}
                                        </span>

                                    </td>

                                    <td className="text-end">

                                        <button
                                            className="btn btn-sm btn-outline-primary me-2"
                                            onClick={() =>
                                                onEdit(exam)
                                            }
                                        >
                                            <FaEdit />
                                        </button>

                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() =>
                                                onDelete(exam)
                                            }
                                        >
                                            <FaTrash />
                                        </button>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
};

export default ExamTable;