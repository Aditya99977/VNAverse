import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";

import SubjectTable from "../components/subjects/SubjectTable";
import SubjectForm from "../components/subjects/SubjectForm";
import DeleteSubjectModal from "../components/subjects/DeleteSubjectModal";
import SubjectFilters from "../components/subjects/SubjectFilters";

import {
  getAllSubjects,
  getSubjectById,
  createSubject,
  updateSubject,
  deleteSubject,
} from "../services/subjectService";

function SubjectManagement() {

  /*
  =====================================
  States
  =====================================
  */

  const [subjects, setSubjects] = useState([]);

  const [filteredSubjects, setFilteredSubjects] = useState([]);

  const [loading, setLoading] = useState(true);

  const [editingSubject, setEditingSubject] = useState(null);

  const [selectedSubject, setSelectedSubject] = useState(null);

  const [showForm, setShowForm] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    exam: "",
    status: "",
  });

  /*
  =====================================
  Initial Load
  =====================================
  */

  useEffect(() => {
    loadSubjects();
  }, []);

  /*
  =====================================
  Apply Filters
  =====================================
  */

  useEffect(() => {

    let data = [...subjects];

    if (filters.search) {
      data = data.filter((subject) =>
        subject.name
          .toLowerCase()
          .includes(filters.search.toLowerCase())
      );
    }

    if (filters.exam) {
      data = data.filter((subject) =>
        subject.exam?.name
          ?.toLowerCase()
          .includes(filters.exam.toLowerCase())
      );
    }

    if (filters.status) {

      const active = filters.status === "active";

      data = data.filter(
        (subject) => subject.isActive === active
      );

    }

    setFilteredSubjects(data);

  }, [subjects, filters]);

  /*
  =====================================
  Load Subjects
  =====================================
  */

  async function loadSubjects() {

    try {

      setLoading(true);

      const response = await getAllSubjects();

      setSubjects(response.subjects || []);

    }

    catch (error) {

      console.log(error);

      alert("Unable to load subjects.");

    }

    finally {

      setLoading(false);

    }

  }

  /*
  =====================================
  Save Subject
  =====================================
  */

  const handleSaveSubject = async (data) => {

    try {

      if (editingSubject) {

        await updateSubject(
          editingSubject._id,
          data
        );

        alert("Subject updated successfully.");

      }

      else {

        await createSubject(data);

        alert("Subject created successfully.");

      }

      setShowForm(false);

      setEditingSubject(null);

      await loadSubjects();

    }

    catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Unable to save subject."
      );

    }

  };

  /*
  =====================================
  Edit Subject
  =====================================
  */

  const handleEdit = async (subject) => {

    try {

      const response = await getSubjectById(
        subject._id
      );

      setEditingSubject(response.subject);

      setShowForm(true);

    }

    catch (error) {

      console.log(error);

      alert("Unable to load subject.");

    }

  };

  /*
  =====================================
  Delete Subject
  =====================================
  */

  const handleDelete = (subject) => {

    setSelectedSubject(subject);

    setShowDeleteModal(true);

  };

  /*
  =====================================
  Confirm Delete
  =====================================
  */

  const confirmDelete = async (id) => {

    try {

      await deleteSubject(id);

      alert("Subject deleted successfully.");

      setShowDeleteModal(false);

      setSelectedSubject(null);

      await loadSubjects();

    }

    catch (error) {

      console.log(error);

      alert("Unable to delete subject.");

    }

  };

  /*
  =====================================
  Loading
  =====================================
  */

  if (loading) {

    return (

      <MainLayout>

        <div className="container py-5 text-center">

          <h3>

            Loading Subjects...

          </h3>

        </div>

      </MainLayout>

    );

  }

  return (

    <MainLayout>

      <div className="container-fluid py-4">

        {/* Header */}

        <div className="d-flex justify-content-between align-items-center mb-4">

          <h2 className="fw-bold">

            📚 Subject Management

          </h2>

          <button
            className="btn btn-success"
            onClick={() => {

              setEditingSubject(null);

              setShowForm(true);

            }}
          >

            ➕ Create Subject

          </button>

        </div>

        {/* Statistics */}

        <div className="row mb-4">

          <div className="col-md-4">

            <div className="card shadow-sm">

              <div className="card-body text-center">

                <h6>Total Subjects</h6>

                <h3>

                  {subjects.length}

                </h3>

              </div>

            </div>

          </div>

          <div className="col-md-4">

            <div className="card shadow-sm">

              <div className="card-body text-center">

                <h6>Active</h6>

                <h3 className="text-success">

                  {
                    subjects.filter(
                      s => s.isActive
                    ).length
                  }

                </h3>

              </div>

            </div>

          </div>

          <div className="col-md-4">

            <div className="card shadow-sm">

              <div className="card-body text-center">

                <h6>Inactive</h6>

                <h3 className="text-danger">

                  {
                    subjects.filter(
                      s => !s.isActive
                    ).length
                  }

                </h3>

              </div>

            </div>

          </div>

        </div>

        {/* Filters */}

        <SubjectFilters
          filters={filters}
          setFilters={setFilters}
        />

        {/* Table */}

        <SubjectTable
          subjects={filteredSubjects}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* Form Modal */}

        {

          showForm && (

            <div
              className="modal fade show"
              style={{
                display: "block",
                backgroundColor:
                  "rgba(0,0,0,.5)",
              }}
            >

              <div className="modal-dialog modal-xl">

                <div className="modal-content">

                  <div className="modal-header">

                    <h5>

                      {
                        editingSubject
                          ? "✏️ Edit Subject"
                          : "📚 Create Subject"
                      }

                    </h5>

                    <button
                      className="btn-close"
                      onClick={() => {

                        setShowForm(false);

                        setEditingSubject(null);

                      }}
                    />

                  </div>

                  <div className="modal-body">

                    <SubjectForm
                      editingSubject={editingSubject}
                      onSubmit={handleSaveSubject}
                      onCancel={() => {

                        setShowForm(false);

                        setEditingSubject(null);

                      }}
                    />

                  </div>

                </div>

              </div>

            </div>

          )

        }

        {/* Delete Modal */}

        <DeleteSubjectModal
          show={showDeleteModal}
          subject={selectedSubject}
          onClose={() => {

            setShowDeleteModal(false);

            setSelectedSubject(null);

          }}
          onConfirm={confirmDelete}
        />

      </div>

    </MainLayout>

  );

}

export default SubjectManagement;