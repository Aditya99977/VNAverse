import { useEffect, useState } from "react";

const CATEGORIES = [
    "Banking",
    "SSC",
    "Railway",
    "Defence",
    "UPSC",
    "State PSC",
    "Teaching",
    "Insurance",
    "Other",
];

const initialState = {
    name: "",
    slug: "",
    category: "",
    description: "",
    subjects: [],
};

const ExamModal = ({
    show,
    exam,
    onClose,
    onSave,
}) => {
    const [formData, setFormData] = useState(initialState);
    const [subjectInput, setSubjectInput] = useState("");
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (show) {
            if (exam) {
                setFormData({
                    name: exam.name || "",
                    slug: exam.slug || "",
                    category: exam.category || "",
                    description: exam.description || "",
                    subjects: exam.subjects || [],
                });
            } else {
                setFormData(initialState);
            }

            setSubjectInput("");
        }
    }, [show, exam]);

    const generateSlug = (value) => {
        return value
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleNameChange = (e) => {
        const value = e.target.value;

        setFormData((prev) => ({
            ...prev,
            name: value,
            slug: prev.slug ? prev.slug : generateSlug(value),
        }));
    };

    const addSubject = () => {
        const subject = subjectInput.trim();

        if (!subject) return;

        if (formData.subjects.includes(subject)) return;

        setFormData((prev) => ({
            ...prev,
            subjects: [...prev.subjects, subject],
        }));

        setSubjectInput("");
    };

    const removeSubject = (index) => {
        setFormData((prev) => ({
            ...prev,
            subjects: prev.subjects.filter((_, i) => i !== index),
        }));
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addSubject();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !formData.name ||
            !formData.slug ||
            !formData.category
        ) {
            return;
        }

        setSaving(true);

        try {
            await onSave(formData);
        } finally {
            setSaving(false);
        }
    };

    if (!show) return null;

    return (
        <>
            {/* Backdrop */}

            <div
                className="modal-backdrop fade show"
                onClick={onClose}
            />

            {/* Modal */}

            <div
                className="modal fade show d-block"
                tabIndex="-1"
            >
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content border-0 shadow">

                        {/* Header */}

                        <div className="modal-header">

                            <h5 className="modal-title fw-bold">
                                {exam
                                    ? "Edit Exam"
                                    : "Create New Exam"}
                            </h5>

                            <button
                                type="button"
                                className="btn-close"
                                onClick={onClose}
                            />

                        </div>

                        {/* Form */}

                        <form onSubmit={handleSubmit}>

                            <div className="modal-body">

                                {/* Name */}

                                <div className="mb-3">

                                    <label className="form-label">
                                        Exam Name
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleNameChange}
                                        required
                                    />

                                </div>

                                {/* Slug */}

                                <div className="mb-3">

                                    <label className="form-label">
                                        Slug
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="slug"
                                        value={formData.slug}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                {/* Category */}

                                <div className="mb-3">

                                    <label className="form-label">
                                        Category
                                    </label>

                                    <select
                                        className="form-select"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">
                                            Select Category
                                        </option>

                                        {CATEGORIES.map((category) => (
                                            <option
                                                key={category}
                                                value={category}
                                            >
                                                {category}
                                            </option>
                                        ))}

                                    </select>

                                </div>

                                {/* Description */}

                                <div className="mb-4">

                                    <label className="form-label">
                                        Description
                                    </label>

                                    <textarea
                                        rows="3"
                                        className="form-control"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                    />

                                </div>

                                {/* Subjects */}

                                <div>

                                    <label className="form-label">
                                        Subjects
                                    </label>

                                    <div className="d-flex gap-2 mb-3">

                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter subject"
                                            value={subjectInput}
                                            onChange={(e) =>
                                                setSubjectInput(
                                                    e.target.value
                                                )
                                            }
                                            onKeyDown={handleKeyDown}
                                        />

                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={addSubject}
                                        >
                                            Add
                                        </button>

                                    </div>

                                    <div className="d-flex flex-wrap gap-2">

                                        {formData.subjects.map(
                                            (subject, index) => (
                                                <span
                                                    key={index}
                                                    className="badge bg-primary px-3 py-2"
                                                    style={{
                                                        cursor: "pointer",
                                                    }}
                                                    onClick={() =>
                                                        removeSubject(index)
                                                    }
                                                >
                                                    {subject} ✕
                                                </span>
                                            )
                                        )}

                                    </div>

                                </div>

                            </div>

                            {/* Footer */}

                            <div className="modal-footer">

                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={onClose}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={saving}
                                >
                                    {saving
                                        ? "Saving..."
                                        : exam
                                            ? "Update Exam"
                                            : "Create Exam"}
                                </button>

                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </>
    );
};

export default ExamModal;