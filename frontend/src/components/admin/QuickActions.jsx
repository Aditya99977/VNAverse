import {
    FaPlus,
    FaQuestionCircle,
    FaClipboardList,
    FaUsers,
    FaFilePdf,
    FaBook,
    FaGraduationCap
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function QuickActions({

    onAddQuestion,
    onManageQuestions,
    onViewUsers

}) {

    const navigate = useNavigate();

    return (

        <div className="card shadow border-0 rounded-4 mt-4">

            <div className="card-body">

                <h4 className="fw-bold mb-4">

                    ⚡ Quick Actions

                </h4>

                <div className="row g-3">

                    {/* Add Question */}

                    <div className="col-md-6 col-lg-3">

                        <button
                            className="btn btn-primary w-100 py-4"
                            onClick={onAddQuestion}
                        >

                            <FaPlus
                                size={28}
                                className="mb-2"
                            />

                            <br />

                            <strong>

                                Add Question

                            </strong>

                        </button>

                    </div>

                    {/* Manage Questions */}

                    <div className="col-md-6 col-lg-3">

                        <button
                            className="btn btn-success w-100 py-4"
                            onClick={onManageQuestions}
                        >

                            <FaQuestionCircle
                                size={28}
                                className="mb-2"
                            />

                            <br />

                            <strong>

                                Manage Questions

                            </strong>

                        </button>

                    </div>

                    {/* Manage Mock Tests */}

                    <div className="col-md-6 col-lg-3">

                        <button
                            className="btn btn-warning w-100 py-4"
                            onClick={() => navigate("/admin/mock-tests")}
                        >

                            <FaClipboardList
                                size={28}
                                className="mb-2"
                            />

                            <br />

                            <strong>

                                Manage Mock Tests

                            </strong>

                        </button>

                    </div>

                    {/* Manage Papers */}

                    <div className="col-md-6 col-lg-3">

                        <button
                            className="btn btn-info w-100 py-4 text-white"
                            onClick={() => navigate("/admin/papers")}
                        >

                            <FaFilePdf
                                size={28}
                                className="mb-2"
                            />

                            <br />

                            <strong>

                                Manage Papers

                            </strong>

                        </button>

                    </div>

                    {/* Manage Subjects */}

                    <div className="col-md-6 col-lg-4">

                        <button
                            className="btn btn-secondary w-100 py-4"
                            onClick={() => navigate("/admin/subjects")}
                        >

                            <FaBook
                                size={28}
                                className="mb-2"
                            />

                            <br />

                            <strong>

                                Manage Subjects

                            </strong>

                        </button>

                    </div>

                    {/* Manage Exams */}

                    <div className="col-md-6 col-lg-4">

                        <button
                            className="btn btn-dark w-100 py-4"
                            onClick={() => navigate("/admin/exams")}
                        >

                            <FaGraduationCap
                                size={28}
                                className="mb-2"
                            />

                            <br />

                            <strong>

                                Manage Exams

                            </strong>

                        </button>

                    </div>

                    {/* View Users */}

                    <div className="col-md-6 col-lg-4">

                        <button
                            className="btn btn-danger w-100 py-4"
                            onClick={onViewUsers}
                        >

                            <FaUsers
                                size={28}
                                className="mb-2"
                            />

                            <br />

                            <strong>

                                View Users

                            </strong>

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default QuickActions;