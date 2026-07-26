const DeleteExamModal = ({
    show,
    exam,
    onClose,
    onConfirm,
    deleting = false,
}) => {
    if (!show || !exam) return null;

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
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content border-0 shadow">

                        {/* Header */}

                        <div className="modal-header">

                            <h5 className="modal-title text-danger fw-bold">
                                Delete Exam
                            </h5>

                            <button
                                type="button"
                                className="btn-close"
                                onClick={onClose}
                                disabled={deleting}
                            />

                        </div>

                        {/* Body */}

                        <div className="modal-body">

                            <div className="text-center">

                                <div
                                    className="mx-auto mb-3 rounded-circle bg-danger-subtle d-flex align-items-center justify-content-center"
                                    style={{
                                        width: "70px",
                                        height: "70px",
                                    }}
                                >
                                    <span
                                        style={{
                                            fontSize: "32px",
                                        }}
                                    >
                                        ⚠️
                                    </span>
                                </div>

                                <h5 className="fw-bold mb-3">
                                    Are you sure?
                                </h5>

                                <p className="text-muted mb-2">
                                    You are about to delete/archive
                                </p>

                                <h6 className="fw-bold text-primary">
                                    {exam.name}
                                </h6>

                                <p className="text-muted mt-3 mb-0">
                                    If this exam is already assigned to
                                    students, it will be archived instead
                                    of permanently deleted.
                                </p>

                            </div>

                        </div>

                        {/* Footer */}

                        <div className="modal-footer">

                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={onClose}
                                disabled={deleting}
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={onConfirm}
                                disabled={deleting}
                            >
                                {deleting
                                    ? "Processing..."
                                    : "Delete Exam"}
                            </button>

                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default DeleteExamModal;