import {
    FaBookOpen,
    FaCheckCircle,
    FaArchive,
    FaLayerGroup,
} from "react-icons/fa";

const StatCard = ({ title, value, icon, color }) => (
    <div className="col-lg-3 col-md-6 mb-4">
        <div className="card border-0 shadow-sm h-100">
            <div className="card-body d-flex justify-content-between align-items-center">

                <div>
                    <p className="text-muted mb-2 small">
                        {title}
                    </p>

                    <h3 className="fw-bold mb-0">
                        {value}
                    </h3>
                </div>

                <div
                    className={`rounded-circle d-flex align-items-center justify-content-center bg-${color}-subtle`}
                    style={{
                        width: "60px",
                        height: "60px",
                    }}
                >
                    <span
                        className={`text-${color}`}
                        style={{
                            fontSize: "22px",
                        }}
                    >
                        {icon}
                    </span>
                </div>

            </div>
        </div>
    </div>
);

const ExamStats = ({ exams }) => {

    const totalExams = exams.length;

    const activeExams = exams.filter(
        (exam) => exam.isActive
    ).length;

    const archivedExams = exams.filter(
        (exam) => !exam.isActive
    ).length;

    const totalSubjects = exams.reduce(
        (count, exam) =>
            count + (exam.subjects?.length || 0),
        0
    );

    return (
        <div className="row mb-4">

            <StatCard
                title="Total Exams"
                value={totalExams}
                icon={<FaBookOpen />}
                color="primary"
            />

            <StatCard
                title="Active Exams"
                value={activeExams}
                icon={<FaCheckCircle />}
                color="success"
            />

            <StatCard
                title="Archived Exams"
                value={archivedExams}
                icon={<FaArchive />}
                color="secondary"
            />

            <StatCard
                title="Total Subjects"
                value={totalSubjects}
                icon={<FaLayerGroup />}
                color="warning"
            />

        </div>
    );
};

export default ExamStats;