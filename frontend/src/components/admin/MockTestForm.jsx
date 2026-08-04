import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
    FileText,
    GraduationCap,
    BookOpen,
    Clock3,
    Award,
    Target,
    ShieldCheck,
} from "lucide-react";

import {
    getAllExams,
} from "../../services/examService";

import {
    getSubjectsByExam,
} from "../../services/subjectService";

const createFormData = (selectedTest) => ({

    title:
        selectedTest?.title || "",

    description:
        selectedTest?.description || "",

    exam:
        selectedTest?.exam?._id ||
        selectedTest?.exam ||
        "",

    subject:
        selectedTest?.subject?._id ||
        selectedTest?.subject ||
        "",

    duration:
        selectedTest?.duration ?? "",

    totalMarks:
        selectedTest?.totalMarks ?? "",

    passingMarks:
        selectedTest?.passingMarks ?? "",

    negativeMarking:
        selectedTest?.negativeMarking ?? 0,

    status:
        selectedTest?.status || "Draft",

});

function MockTestForm({

    onSubmit,

    selectedTest,

    onCancel,

}) {

    /*
    =====================================
    States
    =====================================
    */

    const [formData, setFormData] = useState(
        createFormData(selectedTest)
    );

    const [exams, setExams] = useState([]);

    const [subjects, setSubjects] = useState([]);

    const [loadingExams, setLoadingExams] =
        useState(true);

    const [loadingSubjects, setLoadingSubjects] =
        useState(false);

    /*
    =====================================
    Initial Load
    =====================================
    */

    useEffect(() => {

        loadExams();

    }, []);

    /*
    =====================================
    Load Subjects
    =====================================
    */

    useEffect(() => {

        if (formData.exam) {

            loadSubjects(formData.exam);

        }

    }, [formData.exam]);

    /*
    =====================================
    Reset Form
    =====================================
    */

    useEffect(() => {

        setFormData(
            createFormData(selectedTest)
        );

    }, [selectedTest]);

    /*
    =====================================
    Load Exams
    =====================================
    */

    async function loadExams() {

        try {

            setLoadingExams(true);

            const response =
                await getAllExams();

            setExams(
                response.exams || []
            );

        }

        catch (error) {

            console.error(error);

            toast.error(
                "Unable to load exams."
            );

        }

        finally {

            setLoadingExams(false);

        }

    }

    /*
    =====================================
    Load Subjects
    =====================================
    */

    async function loadSubjects(examId) {

        try {

            setLoadingSubjects(true);

            const response =
                await getSubjectsByExam(examId);

            setSubjects(
                response.subjects || []
            );

        }

        catch (error) {

            console.error(error);

            toast.error(
                "Unable to load subjects."
            );

        }

        finally {

            setLoadingSubjects(false);

        }

    }

    /*
    =====================================
    Handle Change
    =====================================
    */

    const handleChange = async (e) => {

        const {

            name,

            value,

        } = e.target;        /*
        =====================================
        Exam Changed
        =====================================
        */

        if (name === "exam") {

            setFormData((prev) => ({

                ...prev,

                exam: value,

                subject: "",

            }));

            if (value) {

                await loadSubjects(value);

            } else {

                setSubjects([]);

            }

            return;

        }

        /*
        =====================================
        Other Fields
        =====================================
        */

        setFormData((prev) => ({

            ...prev,

            [name]: value,

        }));

    };

    /*
    =====================================
    Submit
    =====================================
    */

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!formData.title.trim()) {

            return toast.error(
                "Mock test title is required."
            );

        }

        if (!formData.exam) {

            return toast.error(
                "Please select an exam."
            );

        }

        if (!formData.subject) {

            return toast.error(
                "Please select a subject."
            );

        }

        if (!formData.duration) {

            return toast.error(
                "Please enter the duration."
            );

        }

        if (!formData.totalMarks) {

            return toast.error(
                "Please enter total marks."
            );

        }

        if (!formData.passingMarks) {

            return toast.error(
                "Please enter passing marks."
            );

        }

        await onSubmit({

            ...formData,

            duration: Number(formData.duration),

            totalMarks: Number(formData.totalMarks),

            passingMarks: Number(formData.passingMarks),

            negativeMarking: Number(formData.negativeMarking),

        });

        if (!selectedTest) {

            setFormData(
                createFormData()
            );

            setSubjects([]);

        }

    };

    /*
    =====================================
    Loading
    =====================================
    */

    if (loadingExams) {

        return (

            <div className="text-center py-5">

                <div
                    className="spinner-border text-primary mb-3"
                    role="status"
                />

                <h6 className="text-white fw-semibold">

                    Loading Exams...

                </h6>

                <p className="text-secondary mb-0">

                    Please wait while we fetch the latest exams.

                </p>

            </div>

        );

    }

    return (

        <div
            className="rounded-4"
            style={{
                background: "#131D31",
                border: "1px solid rgba(255,255,255,.08)",
            }}
        >

            {/* =====================================
                Header
            ===================================== */}

            <div
                className="p-4"
                style={{
                    borderBottom:
                        "1px solid rgba(255,255,255,.08)",
                }}
            >

                <div className="d-flex justify-content-between align-items-start">

                    <div>

                        <h4 className="text-white fw-bold mb-2">

                            {
                                selectedTest
                                    ? "Edit Mock Test"
                                    : "Create Mock Test"
                            }

                        </h4>

                        <p className="text-secondary mb-0">

                            Configure the details below before publishing
                            the mock test.

                        </p>

                    </div>

                    <div
                        className="rounded-4 d-flex align-items-center justify-content-center"
                        style={{
                            width: 64,
                            height: 64,
                            background: "rgba(37,99,235,.12)",
                            border:
                                "1px solid rgba(37,99,235,.20)",
                        }}
                    >

                        <FileText
                            size={30}
                            color="#2563EB"
                        />

                    </div>

                </div>

            </div>

            {/* =====================================
                Form
            ===================================== */}

            <div className="p-4">

                <form onSubmit={handleSubmit}>                    {/* =====================================
                        Basic Information
                    ===================================== */}

                    <div className="mb-5">

                        <div className="d-flex align-items-center mb-3">

                            <FileText
                                size={18}
                                className="me-2 text-primary"
                            />

                            <h6 className="text-white fw-bold mb-0">

                                Basic Information

                            </h6>

                        </div>

                        <div className="row">

                            <div className="col-lg-8 mb-4">

                                <label className="form-label text-light">

                                    Mock Test Title

                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    placeholder="e.g. SSC CGL Tier-I Full Length Test"
                                    value={formData.title}
                                    onChange={handleChange}
                                    style={{
                                        background: "#0F172A",
                                        color: "#fff",
                                        border:
                                            "1px solid rgba(255,255,255,.08)",
                                        minHeight: "48px",
                                    }}
                                />

                            </div>

                            <div className="col-lg-4 mb-4">

                                <label className="form-label text-light">

                                    Status

                                </label>

                                <select
                                    className="form-select"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    style={{
                                        background: "#0F172A",
                                        color: "#fff",
                                        border:
                                            "1px solid rgba(255,255,255,.08)",
                                        minHeight: "48px",
                                    }}
                                >

                                    <option value="Draft">

                                        Draft

                                    </option>

                                    <option value="Published">

                                        Published

                                    </option>

                                </select>

                            </div>

                        </div>

                        <div>

                            <label className="form-label text-light">

                                Description

                            </label>

                            <textarea
                                rows="4"
                                className="form-control"
                                name="description"
                                placeholder="Briefly describe what this mock test covers..."
                                value={formData.description}
                                onChange={handleChange}
                                style={{
                                    background: "#0F172A",
                                    color: "#fff",
                                    border:
                                        "1px solid rgba(255,255,255,.08)",
                                }}
                            />

                        </div>

                    </div>

                    {/* =====================================
                        Exam Information
                    ===================================== */}

                    <div className="mb-5">

                        <div className="d-flex align-items-center mb-3">

                            <GraduationCap
                                size={18}
                                className="me-2 text-primary"
                            />

                            <h6 className="text-white fw-bold mb-0">

                                Exam Information

                            </h6>

                        </div>

                        <div className="row">

                            <div className="col-md-6 mb-4">

                                <label className="form-label text-light">

                                    Exam

                                </label>

                                <select
                                    className="form-select"
                                    name="exam"
                                    value={formData.exam}
                                    onChange={handleChange}
                                    style={{
                                        background: "#0F172A",
                                        color: "#fff",
                                        border:
                                            "1px solid rgba(255,255,255,.08)",
                                        minHeight: "48px",
                                    }}
                                >

                                    <option value="">

                                        Select Exam

                                    </option>

                                    {exams.map((exam) => (

                                        <option
                                            key={exam._id}
                                            value={exam._id}
                                        >

                                            {exam.name}

                                        </option>

                                    ))}

                                </select>

                            </div>

                            <div className="col-md-6 mb-4">

                                <label className="form-label text-light">

                                    Subject

                                </label>

                                <select
                                    className="form-select"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    disabled={
                                        loadingSubjects ||
                                        !formData.exam
                                    }
                                    style={{
                                        background: "#0F172A",
                                        color: "#fff",
                                        border:
                                            "1px solid rgba(255,255,255,.08)",
                                        minHeight: "48px",
                                    }}
                                >

                                    <option value="">

                                        {
                                            loadingSubjects
                                                ? "Loading Subjects..."
                                                : "Select Subject"
                                        }

                                    </option>

                                    {subjects.map((subject) => (

                                        <option
                                            key={subject._id}
                                            value={subject._id}
                                        >

                                            {subject.name}

                                        </option>

                                    ))}

                                </select>

                            </div>

                        </div>

                    </div>

                    {/* =====================================
                        Test Configuration
                    ===================================== */}

                    <div className="mb-4">

                        <div className="d-flex align-items-center mb-3">

                            <ShieldCheck
                                size={18}
                                className="me-2 text-primary"
                            />

                            <h6 className="text-white fw-bold mb-0">

                                Test Configuration

                            </h6>

                        </div>

                        <div className="row">                            <div className="col-lg-3 col-md-6 mb-4">

                                <label className="form-label text-light">

                                    <Clock3
                                        size={16}
                                        className="me-2"
                                    />

                                    Duration (Minutes)

                                </label>

                                <input
                                    type="number"
                                    className="form-control"
                                    name="duration"
                                    value={formData.duration}
                                    onChange={handleChange}
                                    placeholder="60"
                                    style={{
                                        background: "#0F172A",
                                        color: "#fff",
                                        border:
                                            "1px solid rgba(255,255,255,.08)",
                                        minHeight: "48px",
                                    }}
                                />

                            </div>

                            <div className="col-lg-3 col-md-6 mb-4">

                                <label className="form-label text-light">

                                    <Award
                                        size={16}
                                        className="me-2"
                                    />

                                    Total Marks

                                </label>

                                <input
                                    type="number"
                                    className="form-control"
                                    name="totalMarks"
                                    value={formData.totalMarks}
                                    onChange={handleChange}
                                    placeholder="100"
                                    style={{
                                        background: "#0F172A",
                                        color: "#fff",
                                        border:
                                            "1px solid rgba(255,255,255,.08)",
                                        minHeight: "48px",
                                    }}
                                />

                            </div>

                            <div className="col-lg-3 col-md-6 mb-4">

                                <label className="form-label text-light">

                                    <Target
                                        size={16}
                                        className="me-2"
                                    />

                                    Passing Marks

                                </label>

                                <input
                                    type="number"
                                    className="form-control"
                                    name="passingMarks"
                                    value={formData.passingMarks}
                                    onChange={handleChange}
                                    placeholder="35"
                                    style={{
                                        background: "#0F172A",
                                        color: "#fff",
                                        border:
                                            "1px solid rgba(255,255,255,.08)",
                                        minHeight: "48px",
                                    }}
                                />

                            </div>

                            <div className="col-lg-3 col-md-6 mb-4">

                                <label className="form-label text-light">

                                    Negative Marking

                                </label>

                                <input
                                    type="number"
                                    step="0.25"
                                    className="form-control"
                                    name="negativeMarking"
                                    value={formData.negativeMarking}
                                    onChange={handleChange}
                                    placeholder="0.25"
                                    style={{
                                        background: "#0F172A",
                                        color: "#fff",
                                        border:
                                            "1px solid rgba(255,255,255,.08)",
                                        minHeight: "48px",
                                    }}
                                />

                            </div>

                        </div>

                    </div>

                    {/* =====================================
                        Footer
                    ===================================== */}

                    <div
                        className="d-flex justify-content-end gap-3 pt-4"
                        style={{
                            borderTop:
                                "1px solid rgba(255,255,255,.08)",
                        }}
                    >

                        <button
                            type="button"
                            className="btn btn-outline-light px-4"
                            onClick={onCancel}
                        >

                            Cancel

                        </button>

                        <button
                            type="submit"
                            className="btn btn-primary px-5"
                        >

                            {
                                selectedTest
                                    ? "Update Mock Test"
                                    : "Create Mock Test"
                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default MockTestForm;