import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

function ResultScreen({ result, retryPractice }) {

    const navigate = useNavigate();

    /*
    ==========================================
    No Result
    ==========================================
    */

    if (!result) {

        return null;

    }

    /*
    ==========================================
    Backend Result
    ==========================================
    */

    const {

        score = 0,

        correctAnswers = 0,

        wrongAnswers = 0,

        skippedAnswers = 0,

        totalQuestions = 0,

        accuracy = 0,

        totalTime = 0,

    } = result;

    /*
    ==========================================
    Performance
    ==========================================
    */

    const performance = useMemo(() => {

        if (accuracy >= 90) {

            return {

                title: "Excellent",

                color: "#22C55E",

            };

        }

        if (accuracy >= 75) {

            return {

                title: "Very Good",

                color: "#3B82F6",

            };

        }

        if (accuracy >= 60) {

            return {

                title: "Good",

                color: "#F59E0B",

            };

        }

        return {

            title: "Needs Improvement",

            color: "#EF4444",

        };

    }, [accuracy]);

    /*
    ==========================================
    Time
    ==========================================
    */

    const formattedTime = useMemo(() => {

        const minutes = Math.floor(totalTime / 60);

        const seconds = totalTime % 60;

        return `${minutes}m ${seconds}s`;

    }, [totalTime]);

    return (

        <div
            className="rounded-4 overflow-hidden"
            style={{
                background: "#131D31",
                border: "1px solid rgba(255,255,255,.08)",
            }}
        >

            {/* Header */}

            <div
                className="text-center py-5 px-4"
                style={{
                    background:
                        "linear-gradient(135deg,#2563EB,#1D4ED8,#0F172A)",
                }}
            >

                <div
                    className="mx-auto rounded-circle d-flex align-items-center justify-content-center mb-4"
                    style={{
                        width: 150,
                        height: 150,
                        border: `8px solid ${performance.color}`,
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: "2rem",
                    }}
                >

                    {accuracy}%

                </div>

                <h2 className="text-white fw-bold">

                    Practice Completed

                </h2>

                <p className="text-white-50 mb-0">

                    Your practice has been evaluated successfully.

                </p>

            </div>

            {/* Statistics */}

            <div className="p-5">

                <div className="row g-4">

                    <div className="col-md-3">

                        <div
                            className="rounded-4 p-4 text-center h-100"
                            style={{
                                background: "#0F172A",
                            }}
                        >

                            <h2
                                className="fw-bold"
                                style={{
                                    color: "#22C55E",
                                }}
                            >

                                {correctAnswers}

                            </h2>

                            <p className="text-secondary mb-0">

                                Correct

                            </p>

                        </div>

                    </div>

                    <div className="col-md-3">

                        <div
                            className="rounded-4 p-4 text-center h-100"
                            style={{
                                background: "#0F172A",
                            }}
                        >

                            <h2
                                className="fw-bold"
                                style={{
                                    color: "#EF4444",
                                }}
                            >

                                {wrongAnswers}

                            </h2>

                            <p className="text-secondary mb-0">

                                Wrong

                            </p>

                        </div>

                    </div>

                    <div className="col-md-3">

                        <div
                            className="rounded-4 p-4 text-center h-100"
                            style={{
                                background: "#0F172A",
                            }}
                        >

                            <h2
                                className="fw-bold"
                                style={{
                                    color: "#F59E0B",
                                }}
                            >

                                {skippedAnswers}

                            </h2>

                            <p className="text-secondary mb-0">

                                Skipped

                            </p>

                        </div>

                    </div>

                    <div className="col-md-3">

                        <div
                            className="rounded-4 p-4 text-center h-100"
                            style={{
                                background: "#0F172A",
                            }}
                        >

                            <h2 className="text-white fw-bold">

                                {score}

                            </h2>

                            <p className="text-secondary mb-0">

                                Score

                            </p>

                        </div>

                    </div>

                </div>                {/* Performance Summary */}

                <div
                    className="rounded-4 p-4 mt-5"
                    style={{
                        background: "#0F172A",
                    }}
                >

                    <div className="d-flex justify-content-between align-items-center mb-3">

                        <span className="text-white">

                            Accuracy

                        </span>

                        <strong
                            style={{
                                color: performance.color,
                            }}
                        >

                            {accuracy}%

                        </strong>

                    </div>

                    <div
                        className="progress"
                        style={{
                            height: "12px",
                            background: "#1E293B",
                        }}
                    >

                        <div
                            className="progress-bar"
                            role="progressbar"
                            style={{
                                width: `${accuracy}%`,
                                background: performance.color,
                            }}
                        />

                    </div>

                    <div className="row mt-4 g-4">

                        <div className="col-md-6">

                            <div
                                className="rounded-4 p-4 h-100"
                                style={{
                                    background: "#131D31",
                                }}
                            >

                                <small className="text-secondary d-block mb-2">

                                    Performance

                                </small>

                                <h4
                                    className="fw-bold mb-0"
                                    style={{
                                        color: performance.color,
                                    }}
                                >

                                    {performance.title}

                                </h4>

                            </div>

                        </div>

                        <div className="col-md-6">

                            <div
                                className="rounded-4 p-4 h-100"
                                style={{
                                    background: "#131D31",
                                }}
                            >

                                <small className="text-secondary d-block mb-2">

                                    Time Taken

                                </small>

                                <h4 className="text-white fw-bold mb-0">

                                    {formattedTime}

                                </h4>

                            </div>

                        </div>

                    </div>

                    <div className="row mt-4 g-4">

                        <div className="col-md-6">

                            <div
                                className="rounded-4 p-4 h-100"
                                style={{
                                    background: "#131D31",
                                }}
                            >

                                <small className="text-secondary d-block mb-2">

                                    Total Questions

                                </small>

                                <h4 className="text-white fw-bold mb-0">

                                    {totalQuestions}

                                </h4>

                            </div>

                        </div>

                        <div className="col-md-6">

                            <div
                                className="rounded-4 p-4 h-100"
                                style={{
                                    background: "#131D31",
                                }}
                            >

                                <small className="text-secondary d-block mb-2">

                                    Final Score

                                </small>

                                <h4
                                    className="fw-bold mb-0"
                                    style={{
                                        color: performance.color,
                                    }}
                                >

                                    {score}

                                </h4>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Actions */}

                <div className="d-flex justify-content-center gap-3 mt-5 flex-wrap">

                    <button
                        type="button"
                        className="btn btn-primary btn-lg px-5"
                        onClick={retryPractice}
                    >

                        Retry Practice

                    </button>

                    <button
                        type="button"
                        className="btn btn-outline-light btn-lg px-5"
                        onClick={() => navigate("/dashboard")}
                    >

                        Back to Dashboard

                    </button>

                </div>

            </div>

        </div>

    );

}

export default ResultScreen;