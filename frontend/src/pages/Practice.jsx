import DashboardLayout from "../components/DashboardLayout";

import PracticeHero from "../components/practice/PracticeHero";
import PracticeFilters from "../components/practice/PracticeFilters";
import QuestionCard from "../components/practice/QuestionCard";
import ResultScreen from "../components/practice/ResultScreen";

import usePractice from "../hooks/usePractice";

function Practice() {

    const {

        filters,

        session,

        actions,

    } = usePractice();

    const {

        subjects,

        subject,

        setSubject,

        difficulty,

        setDifficulty,

    } = filters;

    const {

        questions,

        completed,

        result,

        loading,

        error,

    } = session;

    return (

        <DashboardLayout>

            <div className="container-fluid py-3">

                {/* Hero */}

                <PracticeHero />

                {/* Filters */}

                {questions.length === 0 && (

                    <PracticeFilters

                        subjects={subjects}

                        subject={subject}

                        setSubject={setSubject}

                        difficulty={difficulty}

                        setDifficulty={setDifficulty}

                        loading={loading}

                        startPractice={actions.startPractice}

                    />

                )}

                {/* Error */}

                {error && (

                    <div
                        className="alert alert-danger rounded-4 mt-4"
                        role="alert"
                    >

                        {error}

                    </div>

                )}

                {/* Result */}

                {completed ? (

                    <ResultScreen

                        result={result}

                        retryPractice={actions.startPractice}

                    />

                ) : (

                    <>

                        {questions.length > 0 ? (

                            <QuestionCard

                                session={session}

                                actions={actions}

                            />

                        ) : (

                            <div
                                className="rounded-4 p-5 text-center"
                                style={{
                                    background: "#131D31",
                                    border: "1px solid rgba(255,255,255,.08)",
                                }}
                            >

                                <div
                                    style={{
                                        fontSize: "4rem",
                                    }}
                                >

                                    📚

                                </div>

                                <h2 className="text-white fw-bold mt-3">

                                    Ready to Practice?

                                </h2>

                                <p
                                    className="text-secondary mx-auto mt-3"
                                    style={{
                                        maxWidth: "650px",
                                    }}
                                >

                                    Select a subject and difficulty level,
                                    then start solving practice questions
                                    designed for your selected exam.

                                </p>

                            </div>

                        )}

                    </>

                )}

            </div>

        </DashboardLayout>

    );

}

export default Practice;