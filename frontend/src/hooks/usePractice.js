import {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

import { useExam } from "../context/ExamContext";

import {
    getSubjectsByExam,
} from "../services/subjectService";

import {
    startPractice,
    submitPractice,
} from "../services/practiceService";

/*
==================================================
Constants
==================================================
*/

const DEFAULT_QUESTION_COUNT = 10;

/*
==================================================
Practice Hook
==================================================
*/

export default function usePractice() {

    /*
    ==================================================
    Auth
    ==================================================
    */

   

    /*
    ==================================================
    Current Exam
    ==================================================
    */

    const { currentExam } = useExam();

const examId = currentExam?._id || "";

    /*
    ==================================================
    Filters
    ==================================================
    */

    const [subjects, setSubjects] = useState([]);

    const [subject, setSubject] = useState("");

    const [difficulty, setDifficulty] = useState("");

    /*
    ==================================================
    Loading States
    ==================================================
    */

    const [loadingSubjects, setLoadingSubjects] =
        useState(false);

    const [startingPractice, setStartingPractice] =
        useState(false);

    const [saving, setSaving] =
        useState(false);

    const [error, setError] =
        useState("");

    /*
    ==================================================
    Practice Session
    ==================================================
    */

    const [questions, setQuestions] =
        useState([]);

    const [currentIndex, setCurrentIndex] =
        useState(0);

    /*
    ==================================================
    Answers

    {
        questionId: selectedOption
    }
    ==================================================
    */

    const [answers, setAnswers] =
        useState({});

    /*
    ==================================================
    Timing
    ==================================================
    */

    const [startTime, setStartTime] =
        useState(null);

    /*
    ==================================================
    Result
    ==================================================
    */

    const [result, setResult] =
        useState(null);

    const [completed, setCompleted] =
        useState(false);

    /*
    ==================================================
    Load Subjects
    ==================================================
    */

    useEffect(() => {

        const loadSubjects = async () => {

            if (!examId) {

    setSubjects([]);
    setSubject("");
    setLoadingSubjects(false);

    return;

}

            try {

                setLoadingSubjects(true);

                const response =
                    await getSubjectsByExam(examId);

                if (!response.success) {

                    throw new Error(
                        response.message ||
                        "Unable to load subjects."
                    );

                }

                const subjectList =
                    response.data?.subjects || [];

                setSubjects(subjectList);

                // Reset selected subject whenever exam changes
                setSubject("");

            }

            catch (error) {

                console.error(
                    "Load Subjects Error:",
                    error
                );

                setSubjects([]);
                setSubject("");

            }

            finally {

                setLoadingSubjects(false);

            }

        };

        loadSubjects();

    }, [examId]);

    /*
    ==================================================
    Reset Session
    ==================================================
    */

    const resetSession = useCallback(() => {

        setQuestions([]);

        setCurrentIndex(0);

        setAnswers({});

        setResult(null);

        setCompleted(false);

        setStartTime(null);

        setError("");

    }, []);

    /*
    ==================================================
    Start Practice
    ==================================================
    */

    const handleStartPractice =
        useCallback(async () => {

            if (startingPractice) {
                return;
            }

            if (!examId) {

                setError(
                    "Please select your exam first."
                );

                return;

            }

            if (!subject) {

                setError(
                    "Please select a subject."
                );

                return;

            }

            try {

                setStartingPractice(true);

                setError("");

                resetSession();

                const response =
                    await startPractice({

                        examId,

                        subjectId: subject,

                        difficulty,

                        questionCount:
                            DEFAULT_QUESTION_COUNT,

                    });

                if (!response.success) {

                    throw new Error(
                        response.message ||
                        "Unable to start practice."
                    );

                }

                const session =
                    response.data;

                const practiceQuestions =
                    session.questions || [];

                if (
                    practiceQuestions.length === 0
                ) {

                    setError(
                        "No questions are available for the selected filters."
                    );

                    return;

                }

                setQuestions(
                    practiceQuestions
                );

                setStartTime(Date.now());

            }

            catch (error) {

                console.error(
                    "Start Practice Error:",
                    error
                );

                setError(

                    error?.response?.data?.message ||

                    error?.message ||

                    "Unable to start practice."

                );

            }

            finally {

                setStartingPractice(false);

            }

        }, [

            examId,

            subject,

            difficulty,

            startingPractice,

            resetSession,

        ]);

    /*
    ==================================================
    Current Question
    ==================================================
    */

    const currentQuestion = useMemo(() => {

        if (!questions.length) {

            return null;

        }

        return questions[currentIndex];

    }, [
        questions,
        currentIndex,
    ]);

    /*
    ==================================================
    Selected Answer
    ==================================================
    */

    const selectedAnswer = useMemo(() => {

        if (!currentQuestion) {

            return "";

        }

        return (
            answers[currentQuestion._id] || ""
        );

    }, [
        answers,
        currentQuestion,
    ]);

    /*
    ==================================================
    Select Answer
    ==================================================
    */

    const selectAnswer = useCallback(

        (option) => {

            if (!currentQuestion) {

                return;

            }

            setAnswers((previous) => ({

                ...previous,

                [currentQuestion._id]: option,

            }));

        },

        [currentQuestion]

    );    /*
    ==================================================
    Next Question
    ==================================================
    */

    const nextQuestion = useCallback(() => {

        setCurrentIndex((previous) => {

            if (
                previous >=
                questions.length - 1
            ) {
                return previous;
            }

            return previous + 1;

        });

    }, [questions.length]);

    /*
    ==================================================
    Previous Question
    ==================================================
    */

    const previousQuestion =
        useCallback(() => {

            setCurrentIndex((previous) => {

                if (previous <= 0) {
                    return 0;
                }

                return previous - 1;

            });

        }, []);

    /*
    ==================================================
    Submit Practice
    ==================================================
    */

    const handleSubmitPractice =
        useCallback(async () => {

            if (saving) {
                return;
            }

            if (!questions.length) {
                return;
            }

            try {

                setSaving(true);

                setError("");

                const totalTime = startTime
                    ? Math.floor(
                          (Date.now() - startTime) /
                              1000
                      )
                    : 0;

                /*
                ==========================================
                Convert Answers
                ==========================================
                */

                const formattedAnswers =
                    questions.map((question) => ({

                        questionId:
                            question._id,

                        selectedAnswer:
                            answers[
                                question._id
                            ] || null,

                    }));

                const response =
                    await submitPractice({

                        examId,

                        subjectId: subject,

                        answers:
                            formattedAnswers,

                        totalTime,

                    });

                if (!response.success) {

                    throw new Error(

                        response.message ||

                            "Unable to submit practice."

                    );

                }

                setResult(
                    response.data.result
                );

                setCompleted(true);

            }

            catch (error) {

                console.error(
                    "Submit Practice Error:",
                    error
                );

                setError(

                    error?.response?.data
                        ?.message ||

                        error?.message ||

                        "Unable to submit practice."

                );

            }

            finally {

                setSaving(false);

            }

        }, [

            saving,

            examId,

            subject,

            questions,

            answers,

            startTime,

        ]);

    /*
    ==================================================
    Filters
    ==================================================
    */

    const filters = useMemo(() => ({

        subjects,

        subject,

        setSubject,

        difficulty,

        setDifficulty,

    }), [

        subjects,

        subject,

        difficulty,

    ]);

    /*
    ==================================================
    Session
    ==================================================
    */

    const session = useMemo(() => ({

        questions,

        currentQuestion,

        currentIndex,

        selectedAnswer,

        answers,

        completed,

        result,

        loading:
            loadingSubjects ||
            startingPractice,

        saving,

        error,

    }), [

        questions,

        currentQuestion,

        currentIndex,

        selectedAnswer,

        answers,

        completed,

        result,

        loadingSubjects,

        startingPractice,

        saving,

        error,

    ]);

    /*
    ==================================================
    Actions
    ==================================================
    */

    const actions = useMemo(() => ({

        startPractice:
            handleStartPractice,

        submitPractice:
            handleSubmitPractice,

        selectAnswer,

        nextQuestion,

        previousQuestion,

        retryPractice:
            handleStartPractice,

        resetSession,

    }), [

        handleStartPractice,

        handleSubmitPractice,

        selectAnswer,

        nextQuestion,

        previousQuestion,

        resetSession,

    ]);

    /*
    ==================================================
    Return
    ==================================================
    */

    return {

        /*
        ----------------------------------
        Filters
        ----------------------------------
        */

        filters,

        /*
        ----------------------------------
        Session
        ----------------------------------
        */

        session,

        /*
        ----------------------------------
        Actions
        ----------------------------------
        */

        actions,

    };

}