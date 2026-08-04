import Loader from "../../components/Loader";
import ExamCard from "../../components/student/ExamCard";
import useExamSelection from "../../hooks/useExamSelection";

import "../../assets/css/selectExam.css";

function SelectExam() {
    const {
        loading,
        saving,
        error,

        searchQuery,
        setSearchQuery,

        groupedExams,

        selectedExam,
        handleSelectExam,

        continueToDashboard,
    } = useExamSelection();

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="select-exam-page">
            <div className="select-exam-container">
                <div className="select-exam-header">
                    <h1>Welcome to VNAverse 👋</h1>

                    <p>
                        Let's personalize your learning journey.
                        Choose the exam you're preparing for.
                    </p>
                </div>

                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Search your target exam..."
                        value={searchQuery}
                        onChange={(e) =>
                            setSearchQuery(e.target.value)
                        }
                    />
                </div>

                {error && (
                    <div className="exam-error">
                        {error}
                    </div>
                )}

                {Object.entries(groupedExams).map(
                    ([category, exams]) =>
                        exams.length > 0 && (
                            <section
                                key={category}
                                className="exam-section"
                            >
                                <div className="section-title">
                                    {getCategoryIcon(category)} {category} Exams
                                </div>

                                <div className="exam-grid">
                                    {exams.map((exam) => (
                                        <ExamCard
                                            key={exam._id}
                                            exam={exam}
                                            selected={
                                                selectedExam?._id === exam._id
                                            }
                                            onSelect={handleSelectExam}
                                        />
                                    ))}
                                </div>
                            </section>
                        )
                )}

                {selectedExam && (
                    <div className="selected-exam-card">
                        <h5>Selected Exam</h5>

                        <div className="selected-exam-name">
                            {selectedExam.name}
                        </div>

                        <p>
                            {selectedExam.description}
                        </p>
                    </div>
                )}

                <div className="continue-section">
                    <button
                        className="continue-btn"
                        disabled={!selectedExam || saving}
                        onClick={continueToDashboard}
                    >
                        {saving ? "Saving..." : "Continue"}
                    </button>
                </div>
            </div>
        </div>
    );
}

/*
==========================================
Category Icons
==========================================
*/

function getCategoryIcon(category) {
    const icons = {
        Banking: "🏦",
        SSC: "🏛",
        Railway: "🚆",
        UPSC: "🏛️",
        Defence: "🪖",
        Teaching: "📚",
        Insurance: "🛡️",
        State: "🗺️",
    };

    return icons[category] || "📘";
}

export default SelectExam;