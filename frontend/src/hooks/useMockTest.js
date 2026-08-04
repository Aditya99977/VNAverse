import {
    useCallback,
    useMemo,
    useState,
} from "react";

import { useExam } from "../context/ExamContext";

import {
    startTest,
    submitTest,
} from "../services/testService";

/*
==================================================
Constants
==================================================
*/

const DEFAULT_DURATION = 20;

const DEFAULT_QUESTION_COUNT = 20;

/*
==================================================
Mock Test Hook
==================================================
*/

export default function useMockTest() {

    /*
    ==============================================
    Current Exam
    ==============================================
    */

    const { currentExam } = useExam();

    const examId = currentExam?._id || "";

    /*
    ==============================================
    Session States
    ==============================================
    */

    const [started, setStarted] = useState(false);

    const [loading, setLoading] = useState(false);

    const [submitting, setSubmitting] = useState(false);

    const [reviewMode, setReviewMode] = useState(false);

    const [autoSubmitted, setAutoSubmitted] =
        useState(false);

    const [error, setError] = useState("");

    /*
    ==============================================
    Test Data
    ==============================================
    */

    const [testId, setTestId] = useState("");

    const [questions, setQuestions] =
        useState([]);

    const [currentQuestion, setCurrentQuestion] =
        useState(0);

    const [answers, setAnswers] =
        useState({});

    const [result, setResult] =
        useState(null);

    /*
    ==============================================
    Timer
    ==============================================
    */

    const [startTime, setStartTime] =
        useState(null);    /*
    ==============================================
    Reset Session
    ==============================================
    */

    const resetSession = useCallback(() => {

        setStarted(false);

        setSubmitting(false);

        setReviewMode(false);

        setAutoSubmitted(false);

        setError("");

        setTestId("");

        setQuestions([]);

        setCurrentQuestion(0);

        setAnswers({});

        setResult(null);

        setStartTime(null);

    }, []);

    /*
    ==============================================
    Start Mock Test
    ==============================================
    */

    const handleStartTest = useCallback(async () => {

        if (loading) return;

        if (!examId) {

            setError(
                "Please select your exam first."
            );

            return;

        }

        try {

            setLoading(true);

            setError("");

            resetSession();

            const response =
                await startTest({

                    examId,

                    questionCount:
                        DEFAULT_QUESTION_COUNT,

                    duration:
                        DEFAULT_DURATION,

                });

            if (!response.success) {

                throw new Error(

                    response.message ||

                    "Unable to start mock test."

                );

            }

            const session =
                response.data;

            const questionList =
                session.questions || [];

            if (questionList.length === 0) {

                setError(
                    "No questions found for this mock test."
                );

                return;

            }

            setStarted(true);

            setQuestions(questionList);

            setTestId(session.testId);

            setStartTime(Date.now());

        }

        catch (error) {

            console.error(
                "Start Mock Test Error:",
                error
            );

            setError(

                error?.response?.data?.message ||

                error.message ||

                "Unable to start mock test."

            );

        }

        finally {

            setLoading(false);

        }

    }, [

        loading,

        examId,

        resetSession,

    ]);

    /*
    ==============================================
    Current Question
    ==============================================
    */

    const currentQuestionData =
        useMemo(() => {

            if (!questions.length) {

                return null;

            }

            return questions[currentQuestion];

        }, [

            questions,

            currentQuestion,

        ]);

    /*
    ==============================================
    Selected Answer
    ==============================================
    */

    const selectedAnswer =
        useMemo(() => {

            if (!currentQuestionData) {

                return "";

            }

            return (

                answers[currentQuestionData._id] ||

                ""

            );

        }, [

            answers,

            currentQuestionData,

        ]);

    /*
    ==============================================
    Select Answer
    ==============================================
    */

    const selectAnswer =
        useCallback((option) => {

            if (!currentQuestionData) {

                return;

            }

            setAnswers(previous => ({

                ...previous,

                [currentQuestionData._id]:
                    option,

            }));

        }, [

            currentQuestionData,

        ]);

    /*
    ==============================================
    Navigation
    ==============================================
    */

    const nextQuestion =
        useCallback(() => {

            setCurrentQuestion(previous => {

                if (

                    previous >=

                    questions.length - 1

                ) {

                    return previous;

                }

                return previous + 1;

            });

        }, [

            questions.length,

        ]);

    const previousQuestion =
        useCallback(() => {

            setCurrentQuestion(previous => {

                if (previous <= 0) {

                    return 0;

                }

                return previous - 1;

            });

        }, []);

    const jumpToQuestion =
        useCallback((index) => {

            setCurrentQuestion(index);

        }, []);    /*
    ==============================================
    Submit Mock Test
    ==============================================
    */

    const handleSubmitTest =
        useCallback(async () => {

            if (submitting) return;

            if (!questions.length) return;

            try {

                setSubmitting(true);

                setError("");

                const totalTime = startTime
                    ? Math.floor(
                          (Date.now() - startTime) / 1000
                      )
                    : 0;

                const formattedAnswers =
                    questions.map((question) => ({

                        questionId: question._id,

                        selectedAnswer:
                            answers[question._id] || null,

                    }));

                const response =
                    await submitTest(

                        testId,

                        {

                            examId,

                            answers:
                                formattedAnswers,

                            totalTime,

                        }

                    );

                if (!response.success) {

                    throw new Error(

                        response.message ||

                        "Unable to submit mock test."

                    );

                }

                setResult(

                    response.data?.result ||

                    response.result ||

                    null

                );

                setStarted(false);

                setReviewMode(false);

            }

            catch (error) {

                console.error(

                    "Submit Mock Test Error:",

                    error

                );

                setError(

                    error?.response?.data?.message ||

                    error.message ||

                    "Unable to submit mock test."

                );

            }

            finally {

                setSubmitting(false);

            }

        }, [

            submitting,

            questions,

            answers,

            startTime,

            testId,

            examId,

        ]);

    /*
    ==============================================
    Time Up
    ==============================================
    */

    const handleTimeUp =
        useCallback(async () => {

            setAutoSubmitted(true);

            await handleSubmitTest();

        }, [

            handleSubmitTest,

        ]);

    /*
    ==============================================
    Review
    ==============================================
    */

    const openReview =
        useCallback(() => {

            setReviewMode(true);

        }, []);

    const closeReview =
        useCallback(() => {

            setReviewMode(false);

        }, []);

    /*
    ==============================================
    Retry Test
    ==============================================
    */

    const retryTest =
        useCallback(() => {

            resetSession();

        }, [

            resetSession,

        ]);

    /*
    ==============================================
    Session
    ==============================================
    */

    const session =
        useMemo(() => ({

            started,

            loading,

            submitting,

            reviewMode,

            autoSubmitted,

            error,

            result,

            questions,

            currentQuestion,

            currentQuestionData,

            selectedAnswer,

            answers,

            duration:
                DEFAULT_DURATION,

        }), [

            started,

            loading,

            submitting,

            reviewMode,

            autoSubmitted,

            error,

            result,

            questions,

            currentQuestion,

            currentQuestionData,

            selectedAnswer,

            answers,

        ]);

    /*
    ==============================================
    Actions
    ==============================================
    */

    const actions =
        useMemo(() => ({

            startTest:
                handleStartTest,

            submitTest:
                handleSubmitTest,

            selectAnswer,

            nextQuestion,

            previousQuestion,

            jumpToQuestion,

            retryTest,

            openReview,

            closeReview,

            handleTimeUp,

        }), [

            handleStartTest,

            handleSubmitTest,

            selectAnswer,

            nextQuestion,

            previousQuestion,

            jumpToQuestion,

            retryTest,

            openReview,

            closeReview,

            handleTimeUp,

        ]);

    /*
    ==============================================
    Return
    ==============================================
    */

    return {

        session,

        actions,

    };

}