import {
    Download,
    Eye,
    Calendar,
    BookOpen,
    GraduationCap,
    FileText,
    Globe,
    Crown,
} from "lucide-react";

function PaperCard({

    paper,

    onView,

    onDownload,

}) {

    const examName =
        paper.exam?.name || "N/A";

    const subjectName =
        paper.subject?.name || "General";

    return (

        <div className="col-lg-4 col-md-6">

            <div
                className="rounded-4 h-100 d-flex flex-column"
                style={{
                    background: "#131D31",
                    border:
                        "1px solid rgba(255,255,255,.08)",
                    transition: "all .25s ease",
                }}
            >

                {/* =====================================
                    Header
                ===================================== */}

                <div className="p-4">

                    <div className="d-flex justify-content-between align-items-start mb-4">

                        <div
                            className="rounded-circle d-flex align-items-center justify-content-center"
                            style={{
                                width: 60,
                                height: 60,
                                background:
                                    "rgba(37,99,235,.15)",
                            }}
                        >

                            <FileText
                                size={28}
                                color="#2563EB"
                            />

                        </div>

                        {

                            paper.isPremium ? (

                                <span className="badge bg-warning text-dark rounded-pill">

                                    <Crown
                                        size={14}
                                        className="me-1"
                                    />

                                    Premium

                                </span>

                            ) : (

                                <span className="badge bg-success rounded-pill">

                                    Free

                                </span>

                            )

                        }

                    </div>

                    <h4
                        className="text-white fw-bold mb-3"
                        style={{
                            minHeight: 60,
                        }}
                    >

                        {paper.title}

                    </h4>

                    <p
                        className="text-secondary mb-0"
                        style={{
                            minHeight: 72,
                        }}
                    >

                        {

                            paper.description ||

                            "No description available."

                        }

                    </p>

                </div>

                {/* =====================================
                    Details
                ===================================== */}

                <div className="px-4 pb-4">

                    <div className="row g-3">

                        <div className="col-12">

                            <div
                                className="rounded-3 p-3"
                                style={{
                                    background: "#0F172A",
                                }}
                            >

                                <div className="d-flex align-items-center">

                                    <GraduationCap
                                        size={18}
                                        className="text-primary me-2"
                                    />

                                    <div>

                                        <small className="text-secondary">

                                            Exam

                                        </small>

                                        <div className="text-white">

                                            {examName}

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                        <div className="col-6">

                            <div
                                className="rounded-3 p-3"
                                style={{
                                    background: "#0F172A",
                                }}
                            >

                                <BookOpen
                                    size={18}
                                    className="text-primary mb-2"
                                />

                                <small className="text-secondary d-block">

                                    Subject

                                </small>

                                <div className="text-white">

                                    {subjectName}

                                </div>

                            </div>

                        </div>

                        <div className="col-6">

                            <div
                                className="rounded-3 p-3"
                                style={{
                                    background: "#0F172A",
                                }}
                            >

                                <Calendar
                                    size={18}
                                    className="text-primary mb-2"
                                />

                                <small className="text-secondary d-block">

                                    Year

                                </small>

                                <div className="text-white">

                                    {paper.year}

                                </div>

                            </div>

                        </div>                        <div className="col-6">

                            <div
                                className="rounded-3 p-3"
                                style={{
                                    background: "#0F172A",
                                }}
                            >

                                <Globe
                                    size={18}
                                    className="text-primary mb-2"
                                />

                                <small className="text-secondary d-block">

                                    Language

                                </small>

                                <div className="text-white">

                                    {paper.language}

                                </div>

                            </div>

                        </div>

                        <div className="col-6">

                            <div
                                className="rounded-3 p-3"
                                style={{
                                    background: "#0F172A",
                                }}
                            >

                                <Eye
                                    size={18}
                                    className="text-primary mb-2"
                                />

                                <small className="text-secondary d-block">

                                    Views

                                </small>

                                <div className="text-white">

                                    {paper.views ?? 0}

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                {/* =====================================
                    Footer
                ===================================== */}

                <div className="mt-auto p-4">

                    <div className="d-grid gap-2">

                        <button

                            className="btn btn-outline-light"

                            onClick={() =>

                                onView()

                            }

                        >

                            <Eye
                                size={18}
                                className="me-2"
                            />

                            View Paper

                        </button>

                        <button

                            className="btn btn-primary"

                            onClick={() =>

                                onDownload()

                            }

                        >

                            <Download
                                size={18}
                                className="me-2"
                            />

                            Download PDF

                        </button>

                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-3">

                        <small className="text-secondary">

                            Downloads

                        </small>

                        <span className="text-white fw-semibold">

                            {paper.downloads ?? 0}

                        </span>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default PaperCard;