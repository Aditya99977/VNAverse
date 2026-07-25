function DeleteSubjectModal({
  show,
  subject,
  onClose,
  onConfirm,
}) {
  if (!show || !subject) {
    return null;
  }

  return (
    <div
      className="modal fade show"
      style={{
        display: "block",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <div className="modal-dialog modal-dialog-centered">

        <div className="modal-content">

          <div className="modal-header bg-danger text-white">

            <h5 className="modal-title">

              Delete Subject

            </h5>

            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
            />

          </div>

          <div className="modal-body">

            <p className="mb-3">

              Are you sure you want to delete the following subject?

            </p>

            <div className="card border-danger">

              <div className="card-body">

                <h5 className="mb-1">

                  {subject.name}

                </h5>

                <p className="text-muted mb-1">

                  Slug: {subject.slug}

                </p>

                <p className="mb-0">

                  Exam:

                  <strong>

                    {" "}
                    {subject.exam?.name || "-"}

                  </strong>

                </p>

              </div>

            </div>

            <div className="alert alert-warning mt-3 mb-0">

              <strong>Note:</strong>

              {" "}This action performs a <strong>soft delete</strong>.

              The subject will become inactive and will no longer appear
              for students, but it can still be restored later.

            </div>

          </div>

          <div className="modal-footer">

            <button
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              className="btn btn-danger"
              onClick={() => onConfirm(subject._id)}
            >
              Delete Subject
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default DeleteSubjectModal;