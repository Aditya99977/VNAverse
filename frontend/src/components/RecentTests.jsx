function RecentTests({ tests = [] }) {

    const formatDate = (date) => {

        if (!date) {

            return "Unknown Date";

        }

        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) {

            return "Unknown Date";

        }

        return parsedDate.toLocaleDateString();

    };

    const formatScore = (score) => {

        const value = Number(score ?? 0);

        return `${Math.min(Math.max(value, 0), 100)}%`;

    };

    return (

        <div
            className="rounded-4 h-100"
            style={{
                background: "#111827",
                border: "1px solid rgba(255,255,255,.08)",
                boxShadow: "0 10px 30px rgba(0,0,0,.18)",
            }}
        >

            <div className="p-4">

                <div className="mb-4">

                    <h4
                        className="fw-bold text-white mb-1"
                    >
                        📋 Recent Assessments
                    </h4>

                    <p
                        className="mb-0"
                        style={{
                            color: "#94A3B8",
                            fontSize: ".95rem",
                        }}
                    >
                        Review your latest assessments and track your learning progress.
                    </p>

                </div>

                {

                    tests.length === 0 ? (

                        <div
                            className="text-center py-5"
                        >

                            <div
                                style={{
                                    fontSize: "42px",
                                }}
                            >
                                📝
                            </div>

                            <h6
                                className="text-white mt-3"
                            >
                                No assessments completed yet
                            </h6>

                            <p
                                className="mb-0"
                                style={{
                                    color: "#94A3B8",
                                }}
                            >
                                Complete your first practice session or mock test to see your learning history here.
                            </p>

                        </div>

                    ) : (

                        tests.map((test, index) => (

                            <div
                                key={
                                    test?._id ||
                                    test?.id ||
                                    `${test?.exam}-${index}`
                                }
                                className={`d-flex justify-content-between align-items-center py-3 ${
                                    index !== tests.length - 1
                                        ? "border-bottom"
                                        : ""
                                }`}
                                style={{
                                    borderColor: "rgba(255,255,255,.08)",
                                }}
                            >

                                <div
                                    className="d-flex align-items-center"
                                    style={{
                                        gap: "14px",
                                    }}
                                >

                                    <div
                                        style={{
                                            width: "46px",
                                            height: "46px",
                                            borderRadius: "14px",
                                            background:
                                                "linear-gradient(135deg,#2563EB,#3B82F6)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            color: "#fff",
                                            fontSize: "18px",
                                            flexShrink: 0,
                                        }}
                                    >
                                        📄
                                    </div>

                                    <div>

                                        <div
                                            className="fw-semibold"
                                            style={{
                                                color: "#F8FAFC",
                                            }}
                                        >
                                            {test?.exam || "Practice Session"}
                                        </div>

                                        <small
                                            style={{
                                                color: "#94A3B8",
                                            }}
                                        >
                                            {formatDate(test?.submittedAt)}
                                        </small>

                                    </div>

                                </div>

                                <span
                                    className="px-3 py-2 rounded-pill"
                                    style={{
                                        background:
                                            "rgba(34,197,94,.15)",
                                        color: "#22C55E",
                                        fontWeight: 700,
                                        minWidth: "70px",
                                        textAlign: "center",
                                        border:
                                            "1px solid rgba(34,197,94,.25)",
                                    }}
                                >
                                    {formatScore(test?.score)}
                                </span>

                            </div>

                        ))

                    )

                }

            </div>

        </div>

    );

}

export default RecentTests;