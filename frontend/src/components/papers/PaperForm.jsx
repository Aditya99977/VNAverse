import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
    getAllExams,
} from "../../services/examService";

import {
    getSubjectsByExam,
} from "../../services/subjectService";

/*
=====================================
Create Default Form
=====================================
*/

const createFormData = (paper) => ({

    title:
        paper?.title || "",

    description:
        paper?.description || "",

    exam:
        paper?.exam?._id ||
        paper?.exam ||
        "",

    subject:
        paper?.subject?._id ||
        paper?.subject ||
        "",

    year:
        paper?.year || "",

    shift:
        paper?.shift || "",

    language:
        paper?.language ||
        "English",

    totalQuestions:
        paper?.totalQuestions || "",

    duration:
        paper?.duration || "",

    pdfUrl:
        paper?.pdfUrl || "",

    answerKeyUrl:
        paper?.answerKeyUrl || "",

    isPremium:
        paper?.isPremium || false,

});

function PaperForm({

    editingPaper,

    onSubmit,

    onCancel,

}) {

    /*
    =====================================
    States
    =====================================
    */

    const [formData, setFormData] = useState(
        createFormData(editingPaper)
    );

    const [exams, setExams] = useState([]);

    const [subjects, setSubjects] = useState([]);

    const [loadingExams, setLoadingExams] =
        useState(true);

    const [loadingSubjects, setLoadingSubjects] =
        useState(false);

    /*
    =====================================
    Load Exams
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

            createFormData(editingPaper)

        );

    }, [editingPaper]);

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

                response.data ||

                response.exams ||

                []

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
                await getSubjectsByExam(
                    examId
                );

            setSubjects(

                response.data ||

                response.subjects ||

                []

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

const handleChange = async (event) => {

    const {

        name,

        value,

        type,

        checked,

    } = event.target;

    /*
    ==============================
    Exam Changed
    ==============================
    */

    if (name === "exam") {

        setFormData((previous) => ({

            ...previous,

            exam: value,

            subject: "",

        }));

        if (value) {

            await loadSubjects(value);

        }

        else {

            setSubjects([]);

        }

        return;

    }

    /*
    ==============================
    Other Fields
    ==============================
    */

    setFormData((previous) => ({

        ...previous,

        [name]:

            type === "checkbox"

                ? checked

                : value,

    }));

};

/*
=====================================
Submit
=====================================
*/

const handleSubmit = async (event) => {

    event.preventDefault();

    /*
    ==============================
    Validation
    ==============================
    */

    if (!formData.title.trim()) {

        return toast.error(

            "Paper title is required."

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

    if (!formData.year) {

        return toast.error(

            "Please enter the paper year."

        );

    }

    if (!formData.totalQuestions) {

        return toast.error(

            "Total questions are required."

        );

    }

    if (!formData.duration) {

        return toast.error(

            "Duration is required."

        );

    }

    if (!formData.pdfUrl.trim()) {

        return toast.error(

            "PDF URL is required."

        );

    }

    /*
    ==============================
    Submit
    ==============================
    */

    await onSubmit({

        ...formData,

        year: Number(formData.year),

        totalQuestions: Number(

            formData.totalQuestions

        ),

        duration: Number(

            formData.duration

        ),

    });

    /*
    ==============================
    Reset Create Form
    ==============================
    */

    if (!editingPaper) {

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

            <p className="text-secondary mb-0">

                Loading exams...

            </p>

        </div>

    );

}return (

    <div
        className="rounded-4"
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

            <h5 className="text-white fw-bold mb-1">

                {

                    editingPaper

                        ? "Edit Previous Year Paper"

                        : "Create Previous Year Paper"

                }

            </h5>

            <p className="text-secondary mb-0">

                Fill in the details below to create or update a previous year paper.

            </p>

        </div>

        {/* =====================================
            Form
        ===================================== */}

        <div className="p-4">

            <form onSubmit={handleSubmit}>

                {/* =====================================
                    Title
                ===================================== */}

                <div className="mb-4">

                    <label className="form-label text-light">

                        Paper Title

                    </label>

                    <input

                        type="text"

                        className="form-control"

                        name="title"

                        value={formData.title}

                        onChange={handleChange}

                        placeholder="Enter paper title"

                        style={{
                            background: "#0F172A",
                            color: "#fff",
                            border:
                                "1px solid rgba(255,255,255,.08)",
                        }}

                    />

                </div>

                {/* =====================================
                    Description
                ===================================== */}

                <div className="mb-4">

                    <label className="form-label text-light">

                        Description

                    </label>

                    <textarea

                        rows="4"

                        className="form-control"

                        name="description"

                        value={formData.description}

                        onChange={handleChange}

                        placeholder="Write a short description..."

                        style={{
                            background: "#0F172A",
                            color: "#fff",
                            border:
                                "1px solid rgba(255,255,255,.08)",
                        }}

                    />

                </div>

                {/* =====================================
                    Exam & Subject
                ===================================== */}

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
                            }}

                        >

                            <option value="">

                                Select Exam

                            </option>

                            {

                                exams.map((exam) => (

                                    <option

                                        key={exam._id}

                                        value={exam._id}

                                    >

                                        {exam.name}

                                    </option>

                                ))

                            }

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
                            }}

                        >

                            <option value="">

                                {

                                    loadingSubjects

                                        ? "Loading..."

                                        : "Select Subject"

                                }

                            </option>

                            {

                                subjects.map((subject) => (

                                    <option

                                        key={subject._id}

                                        value={subject._id}

                                    >

                                        {subject.name}

                                    </option>

                                ))

                            }

                        </select>

                    </div>

                </div>

                {/* =====================================
                    Paper Details
                ===================================== */}

                <div className="row">

                    <div className="col-lg-4 col-md-6 mb-4">

                        <label className="form-label text-light">

                            Year

                        </label>

                        <input

                            type="number"

                            className="form-control"

                            name="year"

                            value={formData.year}

                            onChange={handleChange}

                            style={{
                                background: "#0F172A",
                                color: "#fff",
                                border:
                                    "1px solid rgba(255,255,255,.08)",
                            }}

                        />

                    </div>

                    <div className="col-lg-4 col-md-6 mb-4">

                        <label className="form-label text-light">

                            Shift

                        </label>

                        <input

                            type="text"

                            className="form-control"

                            name="shift"

                            value={formData.shift}

                            onChange={handleChange}

                            placeholder="Morning / Evening"

                            style={{
                                background: "#0F172A",
                                color: "#fff",
                                border:
                                    "1px solid rgba(255,255,255,.08)",
                            }}

                        />

                    </div>

                    <div className="col-lg-4 col-md-6 mb-4">

                        <label className="form-label text-light">

                            Language

                        </label>

                        <select

                            className="form-select"

                            name="language"

                            value={formData.language}

                            onChange={handleChange}

                            style={{
                                background: "#0F172A",
                                color: "#fff",
                                border:
                                    "1px solid rgba(255,255,255,.08)",
                            }}

                        >

                            <option value="English">

                                English

                            </option>

                            <option value="Hindi">

                                Hindi

                            </option>

                            <option value="Bilingual">

                                Bilingual

                            </option>

                        </select>

                    </div>

                </div>

                {/* =====================================
                    Questions & Duration
                ===================================== */}

                <div className="row">

                    <div className="col-md-6 mb-4">

                        <label className="form-label text-light">

                            Total Questions

                        </label>

                        <input

                            type="number"

                            className="form-control"

                            name="totalQuestions"

                            value={formData.totalQuestions}

                            onChange={handleChange}

                            style={{
                                background: "#0F172A",
                                color: "#fff",
                                border:
                                    "1px solid rgba(255,255,255,.08)",
                            }}

                        />

                    </div>

                    <div className="col-md-6 mb-4">

                        <label className="form-label text-light">

                            Duration (Minutes)

                        </label>

                        <input

                            type="number"

                            className="form-control"

                            name="duration"

                            value={formData.duration}

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
                    PDF URL
                ===================================== */}

                <div className="row">

                    <div className="col-md-6 mb-4">

                        <label className="form-label text-light">

                            PDF URL

                        </label>

                        <input

                            type="text"

                            className="form-control"

                            name="pdfUrl"

                            value={formData.pdfUrl}

                            onChange={handleChange}

                            placeholder="https://example.com/paper.pdf"

                            style={{
                                background: "#0F172A",
                                color: "#fff",
                                border:
                                    "1px solid rgba(255,255,255,.08)",
                            }}

                        />

                    </div>

                    {/* =====================================
                        Answer Key
                    ===================================== */}

                    <div className="col-md-6 mb-4">

                        <label className="form-label text-light">

                            Answer Key URL

                        </label>

                        <input

                            type="text"

                            className="form-control"

                            name="answerKeyUrl"

                            value={formData.answerKeyUrl}

                            onChange={handleChange}

                            placeholder="https://example.com/answer-key.pdf"

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
                    Premium
                ===================================== */}

                <div className="mb-4">

                    <div
                        className="rounded-4 p-4"
                        style={{
                            background: "#0F172A",
                            border:
                                "1px solid rgba(255,255,255,.08)",
                        }}
                    >

                        <div className="form-check form-switch m-0">

                            <input

                                className="form-check-input"

                                type="checkbox"

                                id="isPremium"

                                name="isPremium"

                                checked={formData.isPremium}

                                onChange={handleChange}

                            />

                            <label

                                className="form-check-label text-light fw-semibold"

                                htmlFor="isPremium"

                            >

                                Premium Paper

                            </label>

                        </div>

                        <small className="text-secondary">

                            Enable this option if this paper should only be
                            available for premium users.

                        </small>

                    </div>

                </div>

                {/* =====================================
                    Buttons
                ===================================== */}

                <div className="d-flex gap-2">

                    <button

                        type="submit"

                        className="btn btn-primary px-4"

                    >

                        {

                            editingPaper

                                ? "Update Previous Year Paper"

                                : "Create Previous Year Paper"

                        }

                    </button>

                    <button

                        type="button"

                        className="btn btn-outline-light px-4"

                        onClick={onCancel}

                    >

                        Cancel

                    </button>

                </div>

            </form>

        </div>

    </div>

);

}

export default PaperForm;