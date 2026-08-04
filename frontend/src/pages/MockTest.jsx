import DashboardLayout from "../components/DashboardLayout";

import MockTestHeader from "../components/mocktest/MockTestHeader";
import Timer from "../components/mocktest/Timer";
import QuestionCard from "../components/mocktest/QuestionCard";
import QuestionPalette from "../components/mocktest/QuestionPalette";
import ResultCard from "../components/mocktest/ResultCard";
import ReviewScreen from "../components/mocktest/ReviewScreen";

import useMockTest from "../hooks/useMockTest";

function MockTest() {

    const {

        session,

        actions,

    } = useMockTest();

    const {

        started,

        loading,

        submitting,

        autoSubmitted,

        reviewMode,

        exam,

        duration,

        questions,

        currentQuestion,

        currentQuestionData,

        selectedAnswer,

        answers,

        result,

    } = session;

    const {

        startTest,

        submitTest,

        selectAnswer,

        previousQuestion,

        nextQuestion,

        jumpToQuestion,

        openReview,

        closeReview,

        retryTest,

        handleTimeUp,

    } = actions;

    return (

        <DashboardLayout>

            <div className="container-fluid">

                <MockTestHeader

                    exam={exam}

                    totalQuestions={questions.length || 10}

                    duration={duration}

                    started={started}

                    onStart={startTest}

                />

                {

                    loading && (

                        <div className="alert alert-info">

                            Starting Mock Test...

                        </div>

                    )

                }

                {

                    submitting && (

                        <div className="alert alert-secondary">

                            Submitting your test...

                        </div>

                    )

                }

                {

                    autoSubmitted && result && (

                        <div className="alert alert-warning">

                            ⏰ Time expired. Your mock test has been submitted automatically.

                        </div>

                    )

                }

                {

                    result && (

                        <ResultCard

                            result={result}

                            onRetry={retryTest}

                        />

                    )

                }                {

                    started &&

                    !result &&

                    !reviewMode && (

                        <div className="row">

                            <div className="col-lg-9">

                                <Timer

                                    duration={duration}

                                    onTimeUp={handleTimeUp}

                                />

                                <QuestionCard

                                    question={currentQuestionData}

                                    currentQuestion={

                                        currentQuestion + 1

                                    }

                                    totalQuestions={

                                        questions.length

                                    }

                                    selectedAnswer={

                                        selectedAnswer

                                    }

                                    onAnswerSelect={

                                        selectAnswer

                                    }

                                    onPrevious={

                                        previousQuestion

                                    }

                                    onNext={

                                        nextQuestion

                                    }

                                    isFirst={

                                        currentQuestion === 0

                                    }

                                    isLast={

                                        currentQuestion ===

                                        questions.length - 1

                                    }

                                />

                            </div>

                            <div className="col-lg-3">

                                <QuestionPalette

                                    totalQuestions={

                                        questions.length

                                    }

                                    currentQuestion={

                                        currentQuestion

                                    }

                                    answers={

                                        answers

                                    }

                                    onQuestionSelect={

                                        jumpToQuestion

                                    }

                                />

                                <button

                                    className="btn btn-danger w-100 mt-4"

                                    onClick={openReview}

                                >

                                    Review Test

                                </button>

                            </div>

                        </div>

                    )

                }

                {

                    started &&

                    reviewMode &&

                    !result && (

                        <ReviewScreen

                            exam={exam}

                            totalQuestions={

                                questions.length

                            }

                            answers={answers}                            onBack={closeReview}

                            onSubmit={submitTest}

                            onQuestionSelect={(index) => {

                                jumpToQuestion(index);

                                closeReview();

                            }}

                        />

                    )

                }

            </div>

        </DashboardLayout>

    );

}

export default MockTest;