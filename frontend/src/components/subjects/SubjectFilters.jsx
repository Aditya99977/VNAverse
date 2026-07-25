function SubjectFilters({
  filters,
  setFilters,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="card shadow-sm mb-4">

      <div className="card-body">

        <div className="row">

          <div className="col-md-4">

            <label className="form-label">

              Search Subject

            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Search by subject..."
              name="search"
              value={filters.search}
              onChange={handleChange}
            />

          </div>

          <div className="col-md-4">

            <label className="form-label">

              Exam

            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Filter by exam..."
              name="exam"
              value={filters.exam}
              onChange={handleChange}
            />

          </div>

          <div className="col-md-4">

            <label className="form-label">

              Status

            </label>

            <select
              className="form-select"
              name="status"
              value={filters.status}
              onChange={handleChange}
            >
              <option value="">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

          </div>

        </div>

      </div>

    </div>
  );
}

export default SubjectFilters;