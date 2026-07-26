import { useState } from "react";

const createFormData = (initialData = {}) => ({
    question: initialData.question || "",
    options: initialData.options || ["", "", "", ""],
    correctAnswer: initialData.correctAnswer || "",
    subject: initialData.subject || "",
    difficulty: initialData.difficulty || "Easy",
});

function QuestionForm({

    onSubmit,

    initialData = {},

    loading

}) {

    const [formData, setFormData] = useState(() => createFormData(initialData));

    /*
    =====================================
    Handle Input Change
    =====================================
    */

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    /*
    =====================================
    Handle Option Change
    =====================================
    */

    const handleOptionChange = (

        index,

        value

    ) => {

        const updatedOptions = [

            ...formData.options

        ];

        updatedOptions[index] = value;

        setFormData({

            ...formData,

            options: updatedOptions

        });

    };

    /*
    =====================================
    Submit
    =====================================
    */

    const handleSubmit = (e) => {

        e.preventDefault();

        onSubmit(formData);

    };

    return (

        <form onSubmit={handleSubmit}>

            <div className="mb-3">

                <label className="form-label">

                    Question

                </label>

                <textarea

                    className="form-control"

                    rows="3"

                    name="question"

                    value={formData.question}

                    onChange={handleChange}

                    required

                />

            </div>

            {

                formData.options.map((option, index) => (

                    <div

                        className="mb-3"

                        key={index}

                    >

                        <label className="form-label">

                            Option {String.fromCharCode(65 + index)}

                        </label>

                        <input

                            className="form-control"

                            value={option}

                            onChange={(e) =>

                                handleOptionChange(

                                    index,

                                    e.target.value

                                )

                            }

                            required

                        />

                    </div>

                ))

            }

            <div className="row">

                <div className="col-md-4">

                    <label>

                        Correct Answer

                    </label>

                    <select

                        className="form-select"

                        name="correctAnswer"

                        value={formData.correctAnswer}

                        onChange={handleChange}

                    >

                        <option value="">

                            Select

                        </option>

                        {

                            formData.options.map(

                                (option, index) => (

                                    <option

                                        key={index}

                                        value={option}

                                    >

                                        {

                                            option ||

                                            `Option ${String.fromCharCode(

                                                65 + index

                                            )}`

                                        }

                                    </option>

                                )

                            )

                        }

                    </select>

                </div>

                <div className="col-md-4">

                    <label>

                        Subject

                    </label>

                    <select

                        className="form-select"

                        name="subject"

                        value={formData.subject}

                        onChange={handleChange}

                    >

                        <option value="">

                            Select

                        </option>

                        <option>

                            Reasoning

                        </option>

                        <option>

                            English

                        </option>

                        <option>

                            Quantitative Aptitude

                        </option>

                        <option>

                            General Awareness

                        </option>

                    </select>

                </div>

                <div className="col-md-4">

                    <label>

                        Difficulty

                    </label>

                    <select

                        className="form-select"

                        name="difficulty"

                        value={formData.difficulty}

                        onChange={handleChange}

                    >

                        <option>

                            Easy

                        </option>

                        <option>

                            Medium

                        </option>

                        <option>

                            Hard

                        </option>

                    </select>

                </div>

            </div>

            <div className="text-end mt-4">

                <button

                    className="btn btn-primary"

                    disabled={loading}

                >

                    {

                        loading

                            ? "Saving..."

                            : "Save Question"

                    }

                </button>

            </div>

        </form>

    );

}

export default QuestionForm;