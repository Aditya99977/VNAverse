function PracticeFilters({
    subjects = [],
    subject,
    difficulty,
    setSubject,
    setDifficulty,
    loading,
    startPractice,
}) {

    const difficulties = [
        {
            value: "",
            label: "All Difficulty Levels",
        },
        {
            value: "Easy",
            label: "Easy",
        },
        {
            value: "Medium",
            label: "Medium",
        },
        {
            value: "Hard",
            label: "Hard",
        },
    ];

    return (

        <div
            className="rounded-4 p-4 mb-5"
            style={{
                background: "#131D31",
                border: "1px solid rgba(255,255,255,.08)",
            }}
        >

            <div className="mb-4">

                <h3 className="text-white fw-bold mb-2">

                    Practice Configuration

                </h3>

                <p className="text-secondary mb-0">

                    Select a subject and difficulty before starting your practice session.

                </p>

            </div>

            <div className="row g-4">

                {/* Subject */}

                <div className="col-lg-5">

                    <label className="form-label text-light fw-semibold">

                        Subject

                    </label>

                    <select
                        className="form-select py-3"
                        value={subject}
                        onChange={(e) =>
                            setSubject(e.target.value)
                        }
                        style={{
                            background: "#0F172A",
                            color: "#fff",
                            border: "1px solid rgba(255,255,255,.08)",
                        }}
                    >

                        <option value="">

                            Select Subject

                        </option>

                        {subjects.map((item) => (

                            <option
                                key={item._id}
                                value={item._id}
                            >

                                {item.name}

                            </option>

                        ))}

                    </select>

                </div>

                {/* Difficulty */}

                <div className="col-lg-5">

                    <label className="form-label text-light fw-semibold">

                        Difficulty

                    </label>

                    <select
                        className="form-select py-3"
                        value={difficulty}
                        onChange={(e) =>
                            setDifficulty(e.target.value)
                        }
                        style={{
                            background: "#0F172A",
                            color: "#fff",
                            border: "1px solid rgba(255,255,255,.08)",
                        }}
                    >

                        {difficulties.map((item) => (

                            <option
                                key={item.value}
                                value={item.value}
                            >

                                {item.label}

                            </option>

                        ))}

                    </select>

                </div>

                {/* Button */}

                <div className="col-lg-2 d-grid">

                    <label className="form-label opacity-0">

                        Action

                    </label>

                    <button
                        className="btn btn-primary py-3 fw-semibold rounded-3"
                        disabled={loading || !subject}
                        onClick={startPractice}
                        style={{
                            background:
                                "linear-gradient(135deg,#2563EB,#1D4ED8)",
                            border: "none",
                        }}
                    >

                        {loading ? (

                            <>
                                <span className="spinner-border spinner-border-sm me-2" />
                                Starting...
                            </>

                        ) : (

                            "Start Practice"

                        )}

                    </button>

                </div>

            </div>

        </div>

    );

}

export default PracticeFilters;