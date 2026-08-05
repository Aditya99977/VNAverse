function DeletePaperModal({

    show,

    paper,

    onClose,

    onConfirm,

}) {

    if (!show || !paper) {

        return null;

    }

    return (

        <>

            {/* ======================================
                Backdrop
            ====================================== */}

            <div
                className="modal-backdrop fade show"
                onClick={onClose}
            />

            {/* ======================================
                Modal
            ====================================== */}

            <div
                className="modal fade show d-block"
                tabIndex="-1"
            >

                <div className="modal-dialog modal-dialog-centered">

                    <div
                        className="modal-content border-0"
                        style={{
                            background: "#131D31",
                            border:
                                "1px solid rgba(255,255,255,.08)",
                        }}
                    >

                        {/* ======================================
                            Header
                        ====================================== */}

                        <div className="modal-header border-secondary">

                            <h5 className="modal-title text-danger fw-bold">

                                Delete Previous Year Paper

                            </h5>

                            <button
                                type="button"
                                className="btn-close btn-close-white"
                                onClick={onClose}
                            />

                        </div>

                        {/* ======================================
                            Body
                        ====================================== */}

                        <div className="modal-body">

                            <div className="text-center">

                                <div
                                    className="mx-auto mb-4 rounded-circle d-flex align-items-center justify-content-center"
                                    style={{
                                        width: 72,
                                        height: 72,
                                        background:
                                            "rgba(239,68,68,.15)",
                                    }}
                                >

                                    <span
                                        style={{
                                            fontSize: 34,
                                        }}
                                    >

                                        ⚠️

                                    </span>

                                </div>

                                <h4 className="text-white fw-bold mb-3">

                                    Delete Previous Year Paper?

                                </h4>

                                <p className="text-secondary mb-2">

                                    You are about to permanently delete the following paper:

                                </p>

                                <div
                                    className="rounded-4 p-3 mt-3"
                                    style={{
                                        background: "#0F172A",
                                        border:
                                            "1px solid rgba(255,255,255,.08)",
                                    }}
                                >

                                    <h5 className="text-primary mb-2">

                                        {paper.title}

                                    </h5>

                                    <p className="text-secondary mb-1">

                                        <strong>Exam:</strong>{" "}

                                        {paper.exam?.name || "-"}

                                    </p>

                                    <p className="text-secondary mb-1">

                                        <strong>Subject:</strong>{" "}

                                        {paper.subject?.name || "-"}

                                    </p>

                                    <p className="text-secondary mb-1">

                                        <strong>Year:</strong>{" "}

                                        {paper.year}

                                    </p>

                                    <p className="text-secondary mb-0">

                                        <strong>Language:</strong>{" "}

                                        {paper.language}

                                    </p>

                                </div>

                                <div
                                    className="rounded-4 p-3 mt-4"
                                    style={{
                                        background:
                                            "rgba(245,158,11,.12)",
                                        border:
                                            "1px solid rgba(245,158,11,.25)",
                                    }}
                                >

                                    <p className="text-warning mb-0">

                                        <strong>Warning:</strong>{" "}

                                        This action cannot be undone.

                                    </p>

                                </div>

                            </div>

                        </div>

                        {/* ======================================
                            Footer
                        ====================================== */}

                        <div className="modal-footer border-secondary">

                            <button
                                className="btn btn-outline-light px-4"
                                onClick={onClose}
                            >

                                Cancel

                            </button>

                            <button
                                className="btn btn-danger px-4"
                                onClick={() =>
                                    onConfirm(paper._id)
                                }
                            >

                                Delete Paper

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

}

export default DeletePaperModal;