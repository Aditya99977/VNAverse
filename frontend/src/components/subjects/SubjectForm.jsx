import { useEffect, useState } from "react";
import { getAllExams } from "../../services/examService";

const createFormData = (editingSubject) => ({
  name: editingSubject?.name || "",
  slug: editingSubject?.slug || "",
  exam: editingSubject?.exam?._id || editingSubject?.exam || "",
  description: editingSubject?.description || "",
  icon: editingSubject?.icon || "book",
  color: editingSubject?.color || "#2563EB",
  order: editingSubject?.order || 1,
  isActive:
    editingSubject?.isActive !== undefined
      ? editingSubject.isActive
      : true,
});

function SubjectForm({
  editingSubject,
  onSubmit,
  onCancel,
}) {
  const [formData, setFormData] = useState(
    createFormData(editingSubject)
  );

  const [exams, setExams] = useState([]);

  const [loadingExams, setLoadingExams] = useState(true);

  /*
  =====================================
  Load Exams
  =====================================
  */

  useEffect(() => {
    loadExams();
  }, []);

  async function loadExams() {
    try {
      const response = await getAllExams();

      setExams(response.exams || []);
    } catch (error) {
      console.log(error);
      alert("Unable to load exams.");
    } finally {
      setLoadingExams(false);
    }
  }

  /*
  =====================================
  Handle Change
  =====================================
  */

  const handleChange = (e) => {
    const { name, value, type, checked } =
      e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  /*
  =====================================
  Auto Generate Slug
  =====================================
  */

  const handleNameChange = (e) => {
    const value = e.target.value;

    setFormData((prev) => ({
      ...prev,
      name: value,
      slug: value
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, ""),
    }));
  };

  /*
  =====================================
  Submit
  =====================================
  */

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...formData,
      order: Number(formData.order),
    });
  };

  if (loadingExams) {
    return (
      <div className="text-center py-4">
        Loading Exams...
      </div>
    );
  }

  return (
    <div className="card shadow-sm">

      <div className="card-header">

        <h5 className="mb-0">

          {editingSubject
            ? "✏️ Edit Subject"
            : "📚 Create Subject"}

        </h5>

      </div>

      <div className="card-body">

        <form onSubmit={handleSubmit}>

          <div className="mb-3">

            <label className="form-label">

              Subject Name

            </label>

            <input
              type="text"
              className="form-control"
              value={formData.name}
              onChange={handleNameChange}
              required
            />

          </div>

          <div className="mb-3">

            <label className="form-label">

              Slug

            </label>

            <input
              type="text"
              className="form-control"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
            />

          </div>

          <div className="mb-3">

            <label className="form-label">

              Exam

            </label>

            <select
              className="form-select"
              name="exam"
              value={formData.exam}
              onChange={handleChange}
              required
            >

              <option value="">

                Select Exam

              </option>

              {exams.map((exam) => (

                <option
                  key={exam._id}
                  value={exam._id}
                >

                  {exam.name}

                </option>

              ))}

            </select>

          </div>

          <div className="mb-3">

            <label className="form-label">

              Description

            </label>

            <textarea
              rows="3"
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />

          </div>

          <div className="row">

            <div className="col-md-4 mb-3">

              <label className="form-label">

                Icon

              </label>

              <input
                className="form-control"
                name="icon"
                value={formData.icon}
                onChange={handleChange}
              />

            </div>

            <div className="col-md-4 mb-3">

              <label className="form-label">

                Color

              </label>

              <input
                type="color"
                className="form-control form-control-color"
                name="color"
                value={formData.color}
                onChange={handleChange}
              />

            </div>

            <div className="col-md-4 mb-3">

              <label className="form-label">

                Display Order

              </label>

              <input
                type="number"
                className="form-control"
                name="order"
                value={formData.order}
                onChange={handleChange}
              />

            </div>

          </div>

          <div className="form-check mb-4">

            <input
              type="checkbox"
              className="form-check-input"
              id="isActive"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
            />

            <label
              htmlFor="isActive"
              className="form-check-label"
            >

              Active Subject

            </label>

          </div>

          <div className="d-flex gap-2">

            <button
              className="btn btn-primary"
              type="submit"
            >

              {editingSubject
                ? "Update Subject"
                : "Create Subject"}

            </button>

            {editingSubject && (

              <button
                type="button"
                className="btn btn-secondary"
                onClick={onCancel}
              >

                Cancel

              </button>

            )}

          </div>

        </form>

      </div>

    </div>
  );
}

export default SubjectForm;