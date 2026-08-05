import { useMemo } from "react";
import {
    Search,
    Filter,
    RotateCcw,
} from "lucide-react";

function PaperFilters({

    filters,

    setFilters,

    papers,

}) {

    /*
    =====================================
    Handle Change
    =====================================
    */

    const handleChange = (event) => {

        setFilters({

            ...filters,

            [event.target.name]: event.target.value,

        });

    };

    /*
    =====================================
    Dynamic Filter Options
    =====================================
    */

    const subjects = useMemo(() => {

        return [

            ...new Set(

                papers
                    .map((paper) => paper.subject?.name)
                    .filter(Boolean)

            ),

        ];

    }, [papers]);

    const years = useMemo(() => {

        return [

            ...new Set(

                papers
                    .map((paper) => paper.year)
                    .filter(Boolean)

            ),

        ].sort((a, b) => b - a);

    }, [papers]);

    const languages = useMemo(() => {

        return [

            ...new Set(

                papers
                    .map((paper) => paper.language)
                    .filter(Boolean)

            ),

        ];

    }, [papers]);

    /*
    =====================================
    Clear Filters
    =====================================
    */

    const clearFilters = () => {

        setFilters({

            search: "",

            subject: "",

            year: "",

            language: "",

        });

    };

    return (

        <div
            className="rounded-4 mb-4"
            style={{
                background: "#131D31",
                border:
                    "1px solid rgba(255,255,255,.08)",
            }}
        >

            {/* =====================================
                Header
            ===================================== */}

            <div className="p-4 border-bottom border-secondary">

                <div className="d-flex align-items-center gap-3">

                    <div
                        className="rounded-circle d-flex align-items-center justify-content-center"
                        style={{
                            width: 52,
                            height: 52,
                            background:
                                "rgba(37,99,235,.15)",
                        }}
                    >

                        <Filter
                            size={24}
                            color="#2563EB"
                        />

                    </div>

                    <div>

                        <h5 className="text-white fw-bold mb-1">

                            Filter Papers

                        </h5>

                        <p className="text-secondary mb-0">

                            Search and narrow down previous year papers.

                        </p>

                    </div>

                </div>

            </div>

            {/* =====================================
                Filters
            ===================================== */}

            <div className="p-4">

                <div className="row g-4">

                    {/* Search */}

                    <div className="col-xl-3 col-md-6">

                        <label className="form-label text-light">

                            Search

                        </label>

                        <div className="position-relative">

                            <Search
                                size={18}
                                className="position-absolute"
                                style={{
                                    left: 15,
                                    top: "50%",
                                    transform:
                                        "translateY(-50%)",
                                    color: "#94A3B8",
                                }}
                            />

                            <input
                                type="text"
                                name="search"
                                value={filters.search}
                                onChange={handleChange}
                                placeholder="Search papers..."
                                className="form-control ps-5"
                                style={{
                                    background: "#0F172A",
                                    color: "#fff",
                                    border:
                                        "1px solid rgba(255,255,255,.08)",
                                }}
                            />

                        </div>

                    </div>

                    {/* Subject */}

                    <div className="col-xl-3 col-md-6">

                        <label className="form-label text-light">

                            Subject

                        </label>

                        <select
                            className="form-select"
                            name="subject"
                            value={filters.subject}
                            onChange={handleChange}
                            style={{
                                background: "#0F172A",
                                color: "#fff",
                                border:
                                    "1px solid rgba(255,255,255,.08)",
                            }}
                        >

                            <option value="">

                                All Subjects

                            </option>

                            {

                                subjects.map((subject) => (

                                    <option
                                        key={subject}
                                        value={subject}
                                    >

                                        {subject}

                                    </option>

                                ))

                            }

                        </select>

                    </div>

                    {/* Year */}

                    <div className="col-xl-3 col-md-6">

                        <label className="form-label text-light">

                            Year

                        </label>

                        <select
                            className="form-select"
                            name="year"
                            value={filters.year}
                            onChange={handleChange}
                            style={{
                                background: "#0F172A",
                                color: "#fff",
                                border:
                                    "1px solid rgba(255,255,255,.08)",
                            }}
                        >

                            <option value="">

                                All Years

                            </option>

                            {

                                years.map((year) => (

                                    <option
                                        key={year}
                                        value={year}
                                    >

                                        {year}

                                    </option>

                                ))

                            }

                        </select>

                    </div>

                    {/* Language */}

                    <div className="col-xl-3 col-md-6">

                        <label className="form-label text-light">

                            Language

                        </label>

                        <select
                            className="form-select"
                            name="language"
                            value={filters.language}
                            onChange={handleChange}
                            style={{
                                background: "#0F172A",
                                color: "#fff",
                                border:
                                    "1px solid rgba(255,255,255,.08)",
                            }}
                        >

                            <option value="">

                                All Languages

                            </option>

                            {

                                languages.map((language) => (

                                    <option
                                        key={language}
                                        value={language}
                                    >

                                        {language}

                                    </option>

                                ))

                            }

                        </select>

                    </div>

                </div>

                {/* Footer */}

                <div className="d-flex justify-content-end mt-4">

                    <button
                        className="btn btn-outline-light px-4"
                        onClick={clearFilters}
                    >

                        <RotateCcw
                            size={16}
                            className="me-2"
                        />

                        Reset Filters

                    </button>

                </div>

            </div>

        </div>

    );

}

export default PaperFilters;