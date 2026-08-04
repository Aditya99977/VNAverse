import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    getCurrentExam,
    getUserExams,
    selectPreferredExam,
} from "../services/examService";

const ExamContext = createContext(null);

/*
==================================================
Exam Provider
==================================================
*/

export function ExamProvider({ children }) {
    const [currentExam, setCurrentExam] = useState(null);
    const [userExams, setUserExams] = useState([]);
    const [loading, setLoading] = useState(true);

    /*
    ==============================================
    Load Current Exam
    ==============================================
    */

    const refreshCurrentExam = useCallback(async () => {
        try {
            const response = await getCurrentExam();

            if (!response.success) {
                throw new Error(
                    response.message ||
                        "Failed to load current exam."
                );
            }

            /*
            Backend returns UserExamProgress
            {
                ...
                exam: { ... }
            }

            Expose only the Exam object to
            the frontend.
            */

            const progress = response.data;

            setCurrentExam(
                progress?.exam || null
            );
        } catch (error) {
            console.error(
                "Failed to load current exam:",
                error
            );

            setCurrentExam(null);
        }
    }, []);

    /*
    ==============================================
    Load User Exams
    ==============================================
    */

    const refreshUserExams = useCallback(async () => {
        try {
            const response =
                await getUserExams();

            if (!response.success) {
                throw new Error(
                    response.message ||
                        "Failed to load user exams."
                );
            }

            setUserExams(
                response.data || []
            );
        } catch (error) {
            console.error(
                "Failed to load user exams:",
                error
            );

            setUserExams([]);
        }
    }, []);

    /*
    ==============================================
    Select / Switch Exam
    ==============================================
    */

    const selectExam = useCallback(
        async (examId) => {
            const response =
                await selectPreferredExam(
                    examId
                );

            if (!response.success) {
                throw new Error(
                    response.message ||
                        "Unable to select exam."
                );
            }

            /*
            Refresh shared state after switching.
            */

            await Promise.all([
                refreshCurrentExam(),
                refreshUserExams(),
            ]);

            return response;
        },
        [
            refreshCurrentExam,
            refreshUserExams,
        ]
    );

    /*
    ==============================================
    Initial Load
    ==============================================
    */

    useEffect(() => {
        const initialize = async () => {
            try {
                setLoading(true);

                await Promise.all([
                    refreshCurrentExam(),
                    refreshUserExams(),
                ]);
            } finally {
                setLoading(false);
            }
        };

        initialize();
    }, [
        refreshCurrentExam,
        refreshUserExams,
    ]);

    /*
    ==============================================
    Context Value
    ==============================================
    */

    const value = useMemo(
        () => ({
            currentExam,
            userExams,
            loading,

            refreshCurrentExam,
            refreshUserExams,

            selectExam,
        }),
        [
            currentExam,
            userExams,
            loading,
            refreshCurrentExam,
            refreshUserExams,
            selectExam,
        ]
    );

    return (
        <ExamContext.Provider value={value}>
            {children}
        </ExamContext.Provider>
    );
}

/*
==================================================
Hook
==================================================
*/

export function useExam() {
    const context =
        useContext(ExamContext);

    if (!context) {
        throw new Error(
            "useExam must be used within ExamProvider."
        );
    }

    return context;
}