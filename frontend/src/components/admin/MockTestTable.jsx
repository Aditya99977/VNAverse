import { useState } from "react";

const MockTestTable = ({
  mockTests,
  onEdit,
  onDelete,
  onToggleStatus,
}) => {
  const [search, setSearch] = useState("");

  const filteredTests = mockTests.filter((test) =>
    test.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="card shadow-sm mt-4">
      <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Mock Test Management</h5>

        <input
          type="text"
          className="form-control w-25"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="table-responsive">
        <table className="table table-hover table-bordered mb-0">
          <thead className="table-light">
            <tr>
              <th>Title</th>
              <th>Exam</th>
              <th>Subject</th>
              <th>Duration</th>
              <th>Questions</th>
              <th>Status</th>
              <th width="260">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredTests.length > 0 ? (
              filteredTests.map((test) => (
                <tr key={test._id}>
                  <td>{test.title}</td>

                  <td>{test.exam}</td>

                  <td>{test.subject}</td>

                  <td>{test.duration} min</td>

                  <td>{test.questions.length}</td>

                  <td>
                    <span
                      className={`badge ${
                        test.status === "Published"
                          ? "bg-success"
                          : "bg-secondary"
                      }`}
                    >
                      {test.status}
                    </span>
                  </td>

                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => onEdit(test)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm me-2"
                      onClick={() => onDelete(test)}
                    >
                      Delete
                    </button>

                    <button
                      className={`btn btn-sm ${
                        test.status === "Published"
                          ? "btn-secondary"
                          : "btn-success"
                      }`}
                      onClick={() => onToggleStatus(test._id)}
                    >
                      {test.status === "Published"
                        ? "Unpublish"
                        : "Publish"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No Mock Tests Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MockTestTable;