import {
    ClipboardList,
    CheckCircle,
    FileText,
    HelpCircle,
} from "lucide-react";

const StatCard = ({
    title,
    value,
    description,
    icon,
    color,
}) => {
    return (
        <div className="col-xl-3 col-md-6">
            <div
                className="h-100 rounded-4 p-4"
                style={{
                    background: "#131D31",
                    border: "1px solid rgba(255,255,255,.08)",
                    transition: "all .25s ease",
                }}
            >
                <div className="d-flex justify-content-between align-items-start mb-4">
                    <div
                        className="d-flex align-items-center justify-content-center rounded-4"
                        style={{
                            width: 64,
                            height: 64,
                            background: `${color}18`,
                            border: `1px solid ${color}25`,
                        }}
                    >
                        {icon}
                    </div>

                    <span
                        className="badge rounded-pill"
                        style={{
                            background: `${color}15`,
                            color,
                            border: `1px solid ${color}30`,
                            fontWeight: 500,
                        }}
                    >
                        Live
                    </span>
                </div>

                <h3
                    className="fw-bold text-white mb-1"
                    style={{
                        fontSize: "2rem",
                    }}
                >
                    {value}
                </h3>

                <h6
                    className="text-white fw-semibold mb-1"
                    style={{
                        fontSize: ".95rem",
                    }}
                >
                    {title}
                </h6>

                <small
                    className="text-secondary"
                    style={{
                        lineHeight: 1.5,
                    }}
                >
                    {description}
                </small>
            </div>
        </div>
    );
};

function MockTestStats({ statistics }) {
    if (!statistics) return null;

    return (
        <div className="row g-4 mb-4">

            <StatCard
                title="Total Mock Tests"
                value={statistics.total ?? 0}
                description="All mock tests available in the platform."
                color="#2563EB"
                icon={
                    <ClipboardList
                        size={30}
                        color="#2563EB"
                    />
                }
            />

            <StatCard
                title="Published"
                value={statistics.published ?? 0}
                description="Currently visible to students."
                color="#22C55E"
                icon={
                    <CheckCircle
                        size={30}
                        color="#22C55E"
                    />
                }
            />

            <StatCard
                title="Draft Tests"
                value={statistics.draft ?? 0}
                description="Still being prepared by administrators."
                color="#F59E0B"
                icon={
                    <FileText
                        size={30}
                        color="#F59E0B"
                    />
                }
            />

            <StatCard
                title="Average Questions"
                value={statistics.averageQuestions ?? 0}
                description="Average number of questions per mock test."
                color="#8B5CF6"
                icon={
                    <HelpCircle
                        size={30}
                        color="#8B5CF6"
                    />
                }
            />

        </div>
    );
}

export default MockTestStats;