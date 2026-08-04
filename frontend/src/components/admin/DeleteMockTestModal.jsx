import {
    AlertTriangle,
    BookOpen,
    GraduationCap,
    Clock3,
    Trash2,
} from "lucide-react";

function DeleteMockTestModal({
    show,
    mockTest,
    onClose,
    onConfirm,
}) {

    if (!show || !mockTest) {

        return null;

    }

    return (

        <>

            {/* ===============================
                Backdrop
            =============================== */}

            <div
                className="modal-backdrop fade show"
                onClick={onClose}
            />

            {/* ===============================
                Modal
            =============================== */}

            <div
                className="modal fade show d-block"
                tabIndex="-1"
            >

                <div className="modal-dialog modal-dialog-centered">

                    <div
                        className="modal-content border-0 rounded-4"
                        style={{
                            background: "#131D31",
                            border: "1px solid rgba(255,255,255,.08)",
                        }}
                    >

                        {/* ===============================
                            Header
                        =============================== */}

                        <div
                            className="modal-header border-0 pb-0"
                        >

                            <button
                                className="btn-close btn-close-white ms-auto"
                                onClick={onClose}
                            />

                        </div>

                        {/* ===============================
                            Body
                        =============================== */}

                        <div className="modal-body px-4 pb-4">

                            <div className="text-center">

                                <div
                                    className="mx-auto rounded-circle d-flex align-items-center justify-content-center mb-4"
                                    style={{
                                        width: 82,
                                        height: 82,
                                        background: "rgba(239,68,68,.12)",
                                        border: "1px solid rgba(239,68,68,.25)",
                                    }}
                                >

                                    <AlertTriangle
                                        size={40}
                                        color="#EF4444"
                                    />

                                </div>

                                <h3 className="text-white fw-bold mb-2">

                                    Delete Mock Test

                                </h3>

                                <p
                                    className="text-secondary mx-auto mb-4"
                                    style={{
                                        maxWidth: 380,
                                    }}
                                >

                                    This action will permanently remove the mock
                                    test from the platform and cannot be undone.

                                </p>

                            </div>

                            {/* ===============================
                                Mock Test Details
                            =============================== */}

                            <div
                                className="rounded-4 p-4"
                                style={{
                                    background: "#0F172A",
                                    border: "1px solid rgba(255,255,255,.08)",
                                }}
                            >

                                <h5 className="text-primary fw-bold mb-4">

                                    {mockTest.title}

                                </h5>

                                <div className="row g-3">

                                    <div className="col-md-6">

                                        <div className="d-flex align-items-center">

                                            <GraduationCap
                                                size={18}
                                                className="me-2 text-primary"
                                            />

                                            <div>

                                                <small className="text-secondary d-block">

                                                    Exam

                                                </small>

                                                <span className="text-white">

                                                    {
                                                        mockTest.exam?.name ||
                                                        mockTest.exam ||
                                                        "-"
                                                    }

                                                </span>

                                            </div>

                                        </div>

                                    </div>

                                    <div className="col-md-6">

                                        <div className="d-flex align-items-center">

                                            <BookOpen
                                                size={18}
                                                className="me-2 text-primary"
                                            />

                                            <div>

                                                <small className="text-secondary d-block">

                                                    Subject

                                                </small>

                                                <span className="text-white">

                                                    {
                                                        mockTest.subject?.name ||
                                                        mockTest.subject ||
                                                        "-"
                                                    }

                                                </span>

                                            </div>

                                        </div>

                                    </div>

                                    <div className="col-md-6">

                                        <div className="d-flex align-items-center">

                                            <Clock3
                                                size={18}
                                                className="me-2 text-primary"
                                            />

                                            <div>

                                                <small className="text-secondary d-block">

                                                    Duration

                                                </small>

                                                <span className="text-white">

                                                    {mockTest.duration} Minutes

                                                </span>

                                            </div>

                                        </div>

                                    </div>

                                    <div className="col-md-6">

                                        <div className="d-flex align-items-center">

                                            <Trash2
                                                size={18}
                                                className="me-2 text-danger"
                                            />

                                            <div>

                                                <small className="text-secondary d-block">

                                                    Action

                                                </small>

                                                <span className="text-danger fw-semibold">

                                                    Permanent Delete

                                                </span>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                            {/* ===============================
                                Warning
                            =============================== */}

                            <div
                                className="rounded-4 p-3 mt-4"
                                style={{
                                    background: "rgba(245,158,11,.10)",
                                    border: "1px solid rgba(245,158,11,.20)",
                                }}
                            >

                                <small
                                    className="text-warning"
                                    style={{
                                        lineHeight: 1.7,
                                    }}
                                >

                                    <strong>Warning:</strong> Once deleted, this
                                    mock test and all of its associated data
                                    cannot be recovered.

                                </small>

                            </div>

                        </div>

                        {/* ===============================
                            Footer
                        =============================== */}

                        <div
                            className="modal-footer border-0 pt-0 px-4 pb-4"
                        >

                            <button
                                className="btn btn-outline-light px-4"
                                onClick={onClose}
                            >

                                Cancel

                            </button>

                            <button
                                className="btn btn-danger px-4"
                                onClick={() =>
                                    onConfirm(mockTest._id)
                                }
                            >

                                Delete Mock Test

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

}

export default DeleteMockTestModal;