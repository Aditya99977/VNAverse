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

            <div
                className="modal fade show"
                style={{
                    display: "block",
                    background: "rgba(0,0,0,.6)",
                }}
            >

                <div className="modal-dialog modal-dialog-centered">

                    <div
                        className="modal-content"
                        style={{
                            background: "#131D31",
                            border: "1px solid rgba(255,255,255,.08)",
                        }}
                    >

                        {/* Header */}

                        <div
                            className="modal-header"
                            style={{
                                borderBottom:
                                    "1px solid rgba(255,255,255,.08)",
                            }}
                        >

                            <h5 className="text-white mb-0">

                                Delete Previous Year Paper

                            </h5>

                            <button

                                type="button"

                                className="btn-close btn-close-white"

                                onClick={onClose}

                            />

                        </div>

                        {/* Body */}

                        <div className="modal-body">

                            <p className="text-light">

                                Are you sure you want to permanently delete this paper?

                            </p>

                            <div
                                className="rounded-4 p-4"
                                style={{
                                    background: "#0F172A",
                                    border:
                                        "1px solid rgba(255,255,255,.08)",
                                }}
                            >

                                <h5 className="text-white">

                                    {paper.title}

                                </h5>

                                <div className="text-secondary mt-3">

                                    <p className="mb-2">

                                        <strong>Exam:</strong>{" "}

                                        {paper.exam?.name || "-"}

                                    </p>

                                    <p className="mb-2">

                                        <strong>Subject:</strong>{" "}

                                        {paper.subject?.name || "-"}

                                    </p>

                                    <p className="mb-2">

                                        <strong>Year:</strong>{" "}

                                        {paper.year}

                                    </p>

                                    <p className="mb-0">

                                        <strong>Language:</strong>{" "}

                                        {paper.language}

                                    </p>

                                </div>

                            </div>

                            <div className="alert alert-warning mt-4 mb-0">

                                This action cannot be undone.

                            </div>

                        </div>

                        {/* Footer */}

                        <div
                            className="modal-footer"
                            style={{
                                borderTop:
                                    "1px solid rgba(255,255,255,.08)",
                            }}
                        >

                            <button

                                className="btn btn-outline-light"

                                onClick={onClose}

                            >

                                Cancel

                            </button>

                            <button

                                className="btn btn-danger"

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

            <div className="modal-backdrop fade show" />

        </>

    );

}

export default DeletePaperModal;