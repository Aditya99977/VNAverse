import { useEffect, useState } from "react";

import {

    getAllExams,

} from "../services/examService";

import {

    getSubjectsByExam,

} from "../services/subjectService";

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

        paper?.isPremium ||

        false,

});

function PaperForm({

    editingPaper,

    onSubmit,

    onCancel,

}) {

    const [

        exams,

        setExams,

    ] = useState([]);

    const [

        subjects,

        setSubjects,

    ] = useState([]);

    const [

        formData,

        setFormData,

    ] = useState(

        createFormData(

            editingPaper

        )

    );

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

        if (

            formData.exam

        ) {

            loadSubjects(

                formData.exam

            );

        }

    }, [

        formData.exam,

    ]);

    const loadExams = async () => {

        try {

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

        }

    };

    const loadSubjects = async (

        examId

    ) => {

        try {

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

        }

    };

    /*
    =====================================
    Handle Change
    =====================================
    */

    const handleChange = (

        event

    ) => {

        const {

            name,

            value,

            type,

            checked,

        } = event.target;

        setFormData({

            ...formData,

            [

                name

            ]:

                type ===

                "checkbox"

                    ? checked

                    : value,

        });

    };

    /*
    =====================================
    Submit
    =====================================
    */

    const handleSubmit = (

        event

    ) => {

        event.preventDefault();

        onSubmit(

            formData

        );

    };

    return (

        <div>

            <form onSubmit={handleSubmit}>

                <div className="row">

    {/* =====================================
        Title
    ===================================== */}

    <div className="col-md-12 mb-3">

        <label className="form-label">

            Paper Title

        </label>

        <input

            type="text"

            className="form-control"

            name="title"

            value={formData.title}

            onChange={handleChange}

            required

        />

    </div>

    {/* =====================================
        Description
    ===================================== */}

    <div className="col-md-12 mb-3">

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

    {/* =====================================
        Exam
    ===================================== */}

    <div className="col-md-6 mb-3">

        <label className="form-label">

            Exam

        </label>

        <select

            className="form-select"

            name="exam"

            value={formData.exam}

            onChange={handleChange}

            required

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

    {/* =====================================
        Subject
    ===================================== */}

    <div className="col-md-6 mb-3">

        <label className="form-label">

            Subject

        </label>

        <select

            className="form-select"

            name="subject"

            value={formData.subject}

            onChange={handleChange}

            required

        >

            <option value="">

                Select Subject

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

    {/* =====================================
        Year
    ===================================== */}

    <div className="col-md-4 mb-3">

        <label className="form-label">

            Year

        </label>

        <input

            type="number"

            className="form-control"

            name="year"

            value={formData.year}

            onChange={handleChange}

            required

        />

    </div>

    {/* =====================================
        Shift
    ===================================== */}

    <div className="col-md-4 mb-3">

        <label className="form-label">

            Shift

        </label>

        <input

            type="text"

            className="form-control"

            name="shift"

            value={formData.shift}

            onChange={handleChange}

        />

    </div>

    {/* =====================================
        Language
    ===================================== */}

    <div className="col-md-4 mb-3">

        <label className="form-label">

            Language

        </label>

        <select

            className="form-select"

            name="language"

            value={formData.language}

            onChange={handleChange}

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

    {/* =====================================
        Total Questions
    ===================================== */}

    <div className="col-md-6 mb-3">

        <label className="form-label">

            Total Questions

        </label>

        <input

            type="number"

            className="form-control"

            name="totalQuestions"

            value={formData.totalQuestions}

            onChange={handleChange}

        />

    </div>

    {/* =====================================
        Duration
    ===================================== */}

    <div className="col-md-6 mb-3">

        <label className="form-label">

            Duration (Minutes)

        </label>

        <input

            type="number"

            className="form-control"

            name="duration"

            value={formData.duration}

            onChange={handleChange}

        />

    </div>    {/* =====================================
        PDF URL
    ===================================== */}

    <div className="col-md-6 mb-3">

        <label className="form-label">

            PDF URL

        </label>

        <input

            type="text"

            className="form-control"

            name="pdfUrl"

            value={formData.pdfUrl}

            onChange={handleChange}

            placeholder="https://..."

            required

        />

    </div>

    {/* =====================================
        Answer Key URL
    ===================================== */}

    <div className="col-md-6 mb-3">

        <label className="form-label">

            Answer Key URL

        </label>

        <input

            type="text"

            className="form-control"

            name="answerKeyUrl"

            value={formData.answerKeyUrl}

            onChange={handleChange}

            placeholder="https://..."

        />

    </div>

    {/* =====================================
        Premium
    ===================================== */}

    <div className="col-md-12 mb-4">

        <div className="form-check form-switch">

            <input

                className="form-check-input"

                type="checkbox"

                id="isPremium"

                name="isPremium"

                checked={formData.isPremium}

                onChange={handleChange}

            />

            <label

                className="form-check-label"

                htmlFor="isPremium"

            >

                Premium Paper

            </label>

        </div>

    </div>

</div>

<hr />

<div className="d-flex justify-content-end gap-3">

    <button

        type="button"

        className="btn btn-outline-secondary"

        onClick={onCancel}

    >

        Cancel

    </button>

    <button

        type="submit"

        className="btn btn-primary"

    >

        {

            editingPaper

                ? "Update Paper"

                : "Create Paper"

        }

    </button>

</div>

</form>

</div>

);

}

export default PaperForm;