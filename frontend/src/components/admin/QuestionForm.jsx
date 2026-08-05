import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
    BookOpen,
    GraduationCap,
    Target,
    CheckCircle2,
    Save,
    X,
} from "lucide-react";

import { getAllExams } from "../../services/examService";
import { getSubjectsByExam } from "../../services/subjectService";

/*
==================================================
Create Initial Form Data
==================================================
*/

const createFormData = (question = {}) => ({

    question: question.question || "",

    exam:
        question.exam?._id ||
        question.exam ||
        "",

    subject:
        question.subject?._id ||
        question.subject ||
        "",

    difficulty:
        question.difficulty ||
        "Easy",

    options:
        question.options?.length === 4
            ? question.options
            : ["", "", "", ""],

    /*
    Store option index
    */

    correctAnswer:

        typeof question.correctAnswer === "number"

            ? question.correctAnswer

            : 0,

});

/*
==================================================
Component
==================================================
*/

function QuestionForm({

    initialData = {},

    onSubmit,

    onCancel,

    loading = false,

}) {

    /*
    ==================================================
    State
    ==================================================
    */

    const [formData, setFormData] = useState(

        createFormData(initialData)

    );

    const [exams, setExams] = useState([]);

    const [subjects, setSubjects] = useState([]);

    const [loadingExams, setLoadingExams] = useState(true);

    const [loadingSubjects, setLoadingSubjects] = useState(false);

    /*
    ==================================================
    Load Exams
    ==================================================
    */

    useEffect(() => {

        loadExams();

    }, []);

    /*
    ==================================================
    Load Subjects on Exam Change
    ==================================================
    */

    useEffect(() => {

        if (!formData.exam) {

            setSubjects([]);

            return;

        }

        loadSubjects(formData.exam);

    }, [formData.exam]);

    /*
    ==================================================
    Load Exams
    ==================================================
    */

    const loadExams = async () => {

        try {

            setLoadingExams(true);

            const response = await getAllExams();

            let examList = [];

            if (Array.isArray(response)) {

                examList = response;

            }

            else if (Array.isArray(response?.data)) {

                examList = response.data;

            }

            else if (Array.isArray(response?.exams)) {

                examList = response.exams;

            }

            else if (

                Array.isArray(response?.data?.exams)

            ) {

                examList = response.data.exams;

            }

            setExams(examList);

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

    };

    /*
    ==================================================
    Load Subjects
    ==================================================
    */

    const loadSubjects = async (examId) => {

        try {

            setLoadingSubjects(true);

            const response = await getSubjectsByExam(

                examId

            );

            let subjectList = [];

            if (Array.isArray(response)) {

                subjectList = response;

            }

            else if (

                Array.isArray(response?.subjects)

            ) {

                subjectList = response.subjects;

            }

            else if (

                Array.isArray(response?.data)

            ) {

                subjectList = response.data;

            }

            else if (

                Array.isArray(

                    response?.data?.subjects

                )

            ) {

                subjectList =

                    response.data.subjects;

            }

            setSubjects(subjectList);

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

    };    /*
    ==================================================
    Handle Input Change
    ==================================================
    */

    const handleChange = (event) => {

        const {

            name,

            value,

        } = event.target;

        setFormData((previous) => ({

            ...previous,

            [name]: value,

        }));

        /*
        Reset Subject when Exam changes
        */

        if (name === "exam") {

            setFormData((previous) => ({

                ...previous,

                exam: value,

                subject: "",

            }));

        }

    };

    /*
    ==================================================
    Handle Option Change
    ==================================================
    */

    const handleOptionChange = (

        index,

        value

    ) => {

        const updatedOptions = [

            ...formData.options,

        ];

        updatedOptions[index] = value;

        setFormData((previous) => ({

            ...previous,

            options: updatedOptions,

        }));

    };

    /*
    ==================================================
    Handle Correct Answer
    ==================================================
    */

    const handleCorrectAnswer = (

        index

    ) => {

        setFormData((previous) => ({

            ...previous,

            correctAnswer: index,

        }));

    };

    /*
    ==================================================
    Validation
    ==================================================
    */

    const validateForm = () => {

        if (

            !formData.question.trim()

        ) {

            toast.error(

                "Question is required."

            );

            return false;

        }

        if (

            !formData.exam

        ) {

            toast.error(

                "Please select an exam."

            );

            return false;

        }

        if (

            !formData.subject

        ) {

            toast.error(

                "Please select a subject."

            );

            return false;

        }

        const cleanedOptions =

            formData.options.map(

                (option) =>

                    option.trim()

            );

        if (

            cleanedOptions.some(

                (option) => !option

            )

        ) {

            toast.error(

                "All four options are required."

            );

            return false;

        }

        const uniqueOptions =

            new Set(cleanedOptions);

        if (

            uniqueOptions.size !== 4

        ) {

            toast.error(

                "Options must be unique."

            );

            return false;

        }

        if (

            formData.correctAnswer < 0 ||

            formData.correctAnswer > 3

        ) {

            toast.error(

                "Select the correct answer."

            );

            return false;

        }

        return true;

    };

    /*
    ==================================================
    Submit
    ==================================================
    */

    const handleSubmit = (

        event

    ) => {

        event.preventDefault();

        if (

            !validateForm()

        ) {

            return;

        }

        onSubmit({

            ...formData,

            options:

                formData.options.map(

                    (option) =>

                        option.trim()

                ),

            question:

                formData.question.trim(),

        });

    };    return (

        <form onSubmit={handleSubmit}>

            {/* =====================================
                Header
            ===================================== */}

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h4 className="text-white fw-bold mb-1">

                        {
                            initialData?._id
                                ? "Edit Question"
                                : "Create New Question"
                        }

                    </h4>

                    <p className="text-secondary mb-0">

                        Add a question by selecting the exam, subject, difficulty and answer.

                    </p>

                </div>

                <div
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                        width: 60,
                        height: 60,
                        background: "rgba(37,99,235,.15)",
                    }}
                >

                    <BookOpen
                        size={28}
                        color="#2563EB"
                    />

                </div>

            </div>

            {/* =====================================
                Question
            ===================================== */}

            <div className="mb-4">

                <label className="form-label fw-semibold text-light">

                    Question

                </label>

                <textarea

                    rows="5"

                    className="form-control"

                    name="question"

                    value={formData.question}

                    onChange={handleChange}

                    placeholder="Enter the complete question..."

                    style={{
                        background: "#0F172A",
                        color: "#fff",
                        border: "1px solid rgba(255,255,255,.08)",
                    }}

                />

            </div>

            {/* =====================================
                Exam / Subject / Difficulty
            ===================================== */}

            <div className="row g-4 mb-4">

                {/* Exam */}

                <div className="col-lg-4">

                    <label className="form-label fw-semibold text-light">

                        <GraduationCap
                            size={16}
                            className="me-2"
                        />

                        Exam

                    </label>

                    <select

                        className="form-select"

                        name="exam"

                        value={formData.exam}

                        onChange={handleChange}

                        disabled={loadingExams}

                        style={{
                            background: "#0F172A",
                            color: "#fff",
                            border: "1px solid rgba(255,255,255,.08)",
                        }}

                    >

                        <option value="">

                            {

                                loadingExams

                                    ? "Loading Exams..."

                                    : "Select Exam"

                            }

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

                {/* Subject */}

                <div className="col-lg-4">

                    <label className="form-label fw-semibold text-light">

                        <BookOpen
                            size={16}
                            className="me-2"
                        />

                        Subject

                    </label>

                    <select

                        className="form-select"

                        name="subject"

                        value={formData.subject}

                        onChange={handleChange}

                        disabled={
                            !formData.exam ||
                            loadingSubjects
                        }

                        style={{
                            background: "#0F172A",
                            color: "#fff",
                            border: "1px solid rgba(255,255,255,.08)",
                        }}

                    >

                        <option value="">

                            {

                                loadingSubjects

                                    ? "Loading Subjects..."

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

                {/* Difficulty */}

                <div className="col-lg-4">

                    <label className="form-label fw-semibold text-light">

                        <Target
                            size={16}
                            className="me-2"
                        />

                        Difficulty

                    </label>

                    <select

                        className="form-select"

                        name="difficulty"

                        value={formData.difficulty}

                        onChange={handleChange}

                        style={{
                            background: "#0F172A",
                            color: "#fff",
                            border: "1px solid rgba(255,255,255,.08)",
                        }}

                    >

                        <option value="Easy">

                            Easy

                        </option>

                        <option value="Medium">

                            Medium

                        </option>

                        <option value="Hard">

                            Hard

                        </option>

                    </select>

                </div>

            </div>            {/* =====================================
                Options
            ===================================== */}

            <div className="mb-4">

                <div className="d-flex align-items-center mb-3">

                    <CheckCircle2
                        size={20}
                        className="text-primary me-2"
                    />

                    <h5 className="text-white fw-bold mb-0">

                        Answer Options

                    </h5>

                </div>

                <div className="row g-4">

                    {

                        formData.options.map(

                            (option, index) => (

                                <div

                                    key={index}

                                    className="col-lg-6"

                                >

                                    <div

                                        className="rounded-4 p-4 h-100"

                                        style={{

                                            background:

                                                "#0F172A",

                                            border:

                                                formData.correctAnswer === index

                                                    ? "1px solid #2563EB"

                                                    : "1px solid rgba(255,255,255,.08)",

                                            transition:

                                                "all .25s ease",

                                        }}

                                    >

                                        {/* Option Header */}

                                        <div className="d-flex justify-content-between align-items-center mb-3">

                                            <h6 className="text-white fw-semibold mb-0">

                                                Option{" "}

                                                {

                                                    String.fromCharCode(

                                                        65 + index

                                                    )

                                                }

                                            </h6>

                                            <div className="form-check mb-0">

                                                <input

                                                    className="form-check-input"

                                                    type="radio"

                                                    name="correctAnswer"

                                                    checked={

                                                        formData.correctAnswer === index

                                                    }

                                                    onChange={() =>

                                                        handleCorrectAnswer(

                                                            index

                                                        )

                                                    }

                                                />

                                            </div>

                                        </div>

                                        {/* Option Input */}

                                        <input

                                            type="text"

                                            className="form-control"

                                            value={option}

                                            placeholder={`Enter Option ${String.fromCharCode(

                                                65 + index

                                            )}`}

                                            onChange={(event) =>

                                                handleOptionChange(

                                                    index,

                                                    event.target.value

                                                )

                                            }

                                            style={{

                                                background:

                                                    "#131D31",

                                                color: "#fff",

                                                border:

                                                    "1px solid rgba(255,255,255,.08)",

                                            }}

                                        />

                                        {

                                            formData.correctAnswer === index && (

                                                <small className="text-primary d-block mt-3">

                                                    ✓ Correct Answer

                                                </small>

                                            )

                                        }

                                    </div>

                                </div>

                            )

                        )

                    }

                </div>

            </div>

            {/* =====================================
                Selected Answer Preview
            ===================================== */}

            <div

                className="rounded-4 p-4 mb-4"

                style={{

                    background: "#0F172A",

                    border:

                        "1px solid rgba(255,255,255,.08)",

                }}

            >

                <h6 className="text-white fw-bold mb-2">

                    Selected Correct Answer

                </h6>

                <p className="text-secondary mb-0">

                    Option{" "}

                    {

                        String.fromCharCode(

                            65 +

                                formData.correctAnswer

                        )

                    }

                </p>

            </div>            {/* =====================================
                Footer
            ===================================== */}

            <hr
                className="my-4"
                style={{
                    borderColor: "rgba(255,255,255,.08)",
                }}
            />

            <div className="d-flex justify-content-end gap-3">

                <button
                    type="button"
                    className="btn btn-outline-light px-4 d-flex align-items-center gap-2"
                    onClick={onCancel}
                    disabled={loading}
                >

                    <X size={18} />

                    Cancel

                </button>

                <button
                    type="submit"
                    className="btn btn-primary px-4 d-flex align-items-center gap-2"
                    disabled={loading}
                >

                    <Save size={18} />

                    {

                        loading

                            ? (

                                initialData?._id

                                    ? "Updating..."

                                    : "Creating..."

                            )

                            : (

                                initialData?._id

                                    ? "Update Question"

                                    : "Create Question"

                            )

                    }

                </button>

            </div>

        </form>

    );

}

export default QuestionForm;