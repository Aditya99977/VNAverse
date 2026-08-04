import {
    BookOpen,
    CheckCircle,
    XCircle,
} from "lucide-react";

function StatCard({
    title,
    value,
    icon,
    color,
}) {
    return (
        <div className="col-lg-4 col-md-6">

            <div
                className="rounded-4 p-4 h-100"
                style={{
                    background: "#131D31",
                    border:
                        "1px solid rgba(255,255,255,.08)",
                }}
            >

                <div className="d-flex justify-content-between align-items-start">

                    <div>

                        <p className="text-secondary mb-2">

                            {title}

                        </p>

                        <h2 className="text-white fw-bold mb-0">

                            {value}

                        </h2>

                    </div>

                    <div
                        className="rounded-circle d-flex align-items-center justify-content-center"
                        style={{
                            width: 56,
                            height: 56,
                            background: `${color}20`,
                        }}
                    >

                        {icon}

                    </div>

                </div>

            </div>

        </div>
    );
}

function SubjectStats({
    statistics,
}) {

    if (!statistics) return null;

    return (

        <div className="row g-4 mb-4">

            <StatCard
                title="Total Subjects"
                value={statistics.total}
                color="#2563EB"
                icon={
                    <BookOpen
                        size={28}
                        color="#2563EB"
                    />
                }
            />

            <StatCard
                title="Active Subjects"
                value={statistics.active}
                color="#22C55E"
                icon={
                    <CheckCircle
                        size={28}
                        color="#22C55E"
                    />
                }
            />

            <StatCard
                title="Inactive Subjects"
                value={statistics.inactive}
                color="#EF4444"
                icon={
                    <XCircle
                        size={28}
                        color="#EF4444"
                    />
                }
            />

        </div>

    );
}

export default SubjectStats;