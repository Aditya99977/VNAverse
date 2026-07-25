import React from "react";

function SubjectTable({
  subjects,
  onEdit,
  onDelete,
}) {
  if (!subjects.length) {
    return (
      <div className="card shadow-sm">
        <div className="card-body text-center py-5">
          <h5 className="text-muted">
            No subjects found.
          </h5>
        </div>
      </div>
    );
  }

  return (
    <div className="card shadow-sm">

      <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">

        <h5 className="mb-0">

          📚 Subject Bank

        </h5>

        <span className="badge bg-primary">

          {subjects.length} Subjects

        </span>

      </div>

      <div className="table-responsive">

        <table className="table table-hover align-middle mb-0">

          <thead className="table-dark">

            <tr>

              <th>#</th>

              <th>Name</th>

              <th>Exam</th>

              <th>Category</th>

              <th>Order</th>

              <th>Status</th>

              <th width="150">

                Actions

              </th>

            </tr>

          </thead>

          <tbody>

            {subjects.map((subject, index) => (

              <tr key={subject._id}>

                <td>

                  {index + 1}

                </td>

                <td>

                  <div>

                    <strong>

                      {subject.name}

                    </strong>

                    <br />

                    <small className="text-muted">

                      {subject.slug}

                    </small>

                  </div>

                </td>

                <td>

                  {subject.exam?.name || "-"}

                </td>

                <td>

                  <span className="badge bg-info text-dark">

                    {subject.exam?.category || "-"}

                  </span>

                </td>

                <td>

                  {subject.order}

                </td>

                <td>

                  {subject.isActive ? (

                    <span className="badge bg-success">

                      Active

                    </span>

                  ) : (

                    <span className="badge bg-danger">

                      Inactive

                    </span>

                  )}

                </td>

                <td>

                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => onEdit(subject)}
                  >
                    ✏️
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => onDelete(subject)}
                  >
                    🗑️
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default SubjectTable;