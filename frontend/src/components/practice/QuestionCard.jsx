function QuestionCard({ session, actions }) {

    const {

        currentQuestion,

        currentIndex,

        questions,

        selectedAnswer,

        saving,

    } = session;

    const {

        selectAnswer,

        nextQuestion,

        previousQuestion,

        submitPractice,

    } = actions;

    if (!currentQuestion) {

        return null;

    }

    const progress =
        questions.length > 0
            ? ((currentIndex + 1) /
                  questions.length) *
              100
            : 0;

    return (

        <div
            className="rounded-4"
            style={{
                background: "#131D31",
                border:
                    "1px solid rgba(255,255,255,.08)",
            }}
        >

            {/* Header */}

            <div className="p-4 border-bottom border-secondary">

                <div className="d-flex justify-content-between align-items-center">

                    <div>

                        <small className="text-secondary">
                            Question
                        </small>

                        <h4 className="text-white fw-bold mb-0">

                            {currentIndex + 1} / {questions.length}

                        </h4>

                    </div>

                    <div className="text-end">

                        <small className="text-secondary">
                            Status
                        </small>

                        <h5 className="text-info fw-bold mb-0">

                            Practice

                        </h5>

                    </div>

                </div>

                <div
                    className="progress mt-4"
                    style={{
                        height: "8px",
                        background: "#0F172A",
                    }}
                >

                    <div
                        className="progress-bar"
                        style={{
                            width: `${progress}%`,
                        }}
                    />

                </div>

            </div>

            {/* Question */}

            <div className="p-4">

                <h4
                    className="text-white mb-4"
                    style={{
                        lineHeight: 1.8,
                    }}
                >

                    {currentQuestion.question}

                </h4>

                <div className="d-grid gap-3">

                    {currentQuestion.options.map(
                        (option, index) => {

                            const isSelected =
                                selectedAnswer === option;

                            return (

                                <button
                                    key={index}
                                    type="button"
                                    onClick={() =>
                                        selectAnswer(option)
                                    }
                                    className="text-start rounded-4 p-4"
                                    style={{
                                        background:
                                            isSelected
                                                ? "rgba(37,99,235,.18)"
                                                : "#182338",

                                        border:
                                            isSelected
                                                ? "1px solid #2563EB"
                                                : "1px solid rgba(255,255,255,.08)",

                                        color: "#fff",

                                        transition:
                                            ".2s ease",
                                    }}
                                >

                                    <div className="d-flex align-items-center">

                                        <div
                                            className="rounded-circle d-flex align-items-center justify-content-center me-3"
                                            style={{
                                                width: 42,

                                                height: 42,

                                                background:
                                                    isSelected
                                                        ? "#2563EB"
                                                        : "#0F172A",
                                            }}
                                        >

                                            {String.fromCharCode(
                                                65 + index
                                            )}

                                        </div>

                                        <div>

                                            {option}

                                        </div>

                                    </div>

                                </button>

                            );

                        }

                    )}

                </div>                {/* Navigation */}

                <div className="d-flex justify-content-between align-items-center mt-5">

                    <button
                        type="button"
                        className="btn btn-outline-light px-4"
                        onClick={previousQuestion}
                        disabled={currentIndex === 0 || saving}
                    >
                        Previous
                    </button>

                    {currentIndex ===
                    questions.length - 1 ? (

                        <button
                            type="button"
                            className="btn btn-success px-5"
                            onClick={submitPractice}
                            disabled={saving}
                        >

                            {saving
                                ? "Submitting..."
                                : "Submit Practice"}

                        </button>

                    ) : (

                        <button
                            type="button"
                            className="btn btn-primary px-5"
                            onClick={nextQuestion}
                        >
                            Next Question
                        </button>

                    )}

                </div>

                {/* Progress Text */}

                <div className="text-center mt-4">

                    <small className="text-secondary">

                        {Object.keys(session.answers).length} of{" "}
                        {questions.length} question(s) answered

                    </small>

                </div>

            </div>

        </div>

    );

}

export default QuestionCard;