import { useEffect, useMemo, useState } from "react";

import {
    BookOpen,
    Download,
    Search,
} from "lucide-react";

import MainLayout from "../layouts/MainLayout";

import PaperCard from "../components/papers/PaperCard";
import PaperFilters from "../components/papers/PaperFilters";

import {
    getAllPapers,
    recordPaperView,
    recordPaperDownload,
} from "../services/paperService";

import { useExam } from "../context/ExamContext";

function PreviousYearPapers() {

    /*
    =====================================
    Exam Context
    =====================================
    */

    const {
        currentExam,
    } = useExam();

    /*
    =====================================
    States
    =====================================
    */

    const [papers, setPapers] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [filters, setFilters] = useState({

        search: "",

        subject: "",

        year: "",

        language: "",

    });

    /*
    =====================================
    Load Papers
    =====================================
    */

    useEffect(() => {

        const loadPapers = async () => {

            if (!currentExam?._id) {

                setPapers([]);

                setLoading(false);

                return;

            }

            try {

                setLoading(true);

                setError("");

                const response =
                    await getAllPapers({

                        exam: currentExam._id,

                    });

                setPapers(

                    response.data || []

                );

            }

            catch (error) {

                console.error(

                    "Load Papers Error:",

                    error

                );

                setError(

                    error?.response?.data?.message ||

                    "Unable to load previous year papers."

                );

            }

            finally {

                setLoading(false);

            }

        };

        loadPapers();

    }, [currentExam]);

        /*
    =====================================
    Record View
    =====================================
    */

    const handleView = async (paperId) => {

        try {

            await recordPaperView(paperId);

        }

        catch (error) {

            console.error(
                "Record View Error:",
                error
            );

        }

    };

    /*
    =====================================
    Download Paper
    =====================================
    */

    const handleDownload = async (paper) => {

        try {

            await recordPaperDownload(
                paper._id
            );

            window.open(
                paper.pdfUrl,
                "_blank"
            );

        }

        catch (error) {

            console.error(
                "Download Error:",
                error
            );

            alert(
                "Unable to download paper."
            );

        }

    };

    /*
    =====================================
    Filter Papers
    =====================================
    */

    const filteredPapers = useMemo(() => {

        return papers.filter((paper) => {

            const matchesSearch =

                !filters.search ||

                paper.title
                    ?.toLowerCase()
                    .includes(
                        filters.search.toLowerCase()
                    );

            const matchesSubject =

                !filters.subject ||

                paper.subject?.name ===
                    filters.subject ||

                paper.subject ===
                    filters.subject;

            const matchesYear =

                !filters.year ||

                String(paper.year) ===
                    String(filters.year);

            const matchesLanguage =

                !filters.language ||

                paper.language ===
                    filters.language;

            return (

                matchesSearch &&

                matchesSubject &&

                matchesYear &&

                matchesLanguage

            );

        });

    }, [

        papers,

        filters,

    ]);

    /*
    =====================================
    Loading State
    =====================================
    */

    if (loading) {

        return (

            <MainLayout>

                <div className="container py-5">

                    <div
                        className="rounded-4 p-5 text-center"
                        style={{
                            background: "#131D31",
                            border:
                                "1px solid rgba(255,255,255,.08)",
                        }}
                    >

                        <div className="spinner-border text-primary mb-4" />

                        <h3 className="text-white">

                            Loading Previous Year Papers...

                        </h3>

                        <p className="text-secondary mb-0">

                            Please wait while we fetch the latest papers.

                        </p>

                    </div>

                </div>

            </MainLayout>

        );

    }

    /*
    =====================================
    Error State
    =====================================
    */

    if (error) {

        return (

            <MainLayout>

                <div className="container py-5">

                    <div className="alert alert-danger">

                        {error}

                    </div>

                </div>

            </MainLayout>

        );

    }

    /*
    =====================================
    UI
    =====================================
    */

    return (

        <MainLayout>

            <div className="container py-4">            {/* =====================================
                Hero Section
            ===================================== */}

            <div
                className="rounded-4 overflow-hidden position-relative mb-5"
                style={{
                    background:
                        "linear-gradient(135deg,#2563EB 0%,#1D4ED8 45%,#0F172A 100%)",
                }}
            >

                <div
                    className="position-absolute"
                    style={{
                        width: 260,
                        height: 260,
                        right: -80,
                        top: -80,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,.08)",
                    }}
                />

                <div className="position-relative p-5">

                    <span className="badge bg-light text-primary rounded-pill px-3 py-2 mb-3">

                        Previous Year Papers

                    </span>

                    <h1
                        className="text-white fw-bold mb-3"
                        style={{
                            fontSize:
                                "clamp(2rem,4vw,3.2rem)",
                        }}
                    >

                        {currentExam?.name || "Previous Year Papers"}

                    </h1>

                    <p
                        className="text-white-50 mb-0"
                        style={{
                            maxWidth: "720px",
                        }}
                    >

                        Browse official previous year papers,
                        filter by subject, year and language,
                        then download PDFs to strengthen your
                        preparation.

                    </p>

                </div>

            </div>

            {/* =====================================
                Statistics
            ===================================== */}

            <div className="row g-4 mb-5">

                <div className="col-md-4">

                    <div
                        className="rounded-4 p-4 h-100"
                        style={{
                            background: "#131D31",
                            border:
                                "1px solid rgba(255,255,255,.08)",
                        }}
                    >

                        <BookOpen
                            size={30}
                            className="text-primary mb-3"
                        />

                        <h2 className="text-white fw-bold">

                            {papers.length}

                        </h2>

                        <p className="text-secondary mb-0">

                            Total Papers

                        </p>

                    </div>

                </div>

                <div className="col-md-4">

                    <div
                        className="rounded-4 p-4 h-100"
                        style={{
                            background: "#131D31",
                            border:
                                "1px solid rgba(255,255,255,.08)",
                        }}
                    >

                        <Search
                            size={30}
                            className="text-primary mb-3"
                        />

                        <h2 className="text-white fw-bold">

                            {filteredPapers.length}

                        </h2>

                        <p className="text-secondary mb-0">

                            Matching Results

                        </p>

                    </div>

                </div>

                <div className="col-md-4">

                    <div
                        className="rounded-4 p-4 h-100"
                        style={{
                            background: "#131D31",
                            border:
                                "1px solid rgba(255,255,255,.08)",
                        }}
                    >

                        <Download
                            size={30}
                            className="text-primary mb-3"
                        />

                        <h2 className="text-white fw-bold">

                            PDF

                        </h2>

                        <p className="text-secondary mb-0">

                            Download Format

                        </p>

                    </div>

                </div>

            </div>

            {/* =====================================
                Filters
            ===================================== */}

            <PaperFilters

                filters={filters}

                setFilters={setFilters}

                papers={papers}

            />            {/* =====================================
                Papers
            ===================================== */}

            {

                filteredPapers.length > 0 ? (

                    <div className="row g-4">

                        {

                            filteredPapers.map((paper) => (

                                <PaperCard

                                    key={paper._id}

                                    paper={paper}

                                    onView={() =>

                                        handleView(
                                            paper._id
                                        )

                                    }

                                    onDownload={() =>

                                        handleDownload(
                                            paper
                                        )

                                    }

                                />

                            ))

                        }

                    </div>

                ) : (

                    <div
                        className="rounded-4 p-5 text-center"
                        style={{
                            background: "#131D31",
                            border:
                                "1px solid rgba(255,255,255,.08)",
                        }}
                    >

                        <BookOpen
                            size={72}
                            className="text-primary mb-4"
                        />

                        <h3 className="text-white fw-bold">

                            No Previous Year Papers Found

                        </h3>

                        <p
                            className="text-secondary mx-auto mb-0"
                            style={{
                                maxWidth: "600px",
                            }}
                        >

                            No papers match your current
                            filters. Try changing the search,
                            subject, year or language filters.

                        </p>

                    </div>

                )

            }

        </div>

    </MainLayout>

);

}

export default PreviousYearPapers;