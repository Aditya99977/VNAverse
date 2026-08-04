import {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    useLocation,
    useNavigate,
} from "react-router-dom";

import { getAllExams } from "../services/examService";

import { useExam } from "../context/ExamContext";

export default function useExamSelection() {
    const navigate = useNavigate();
    const location = useLocation();

    const {
        currentExam,
        selectExam,
    } = useExam();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const [exams, setExams] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedExam, setSelectedExam] = useState(null);

    /*
    ==========================================
    Redirect Destination
    ==========================================
    */

    const redirectTo =
        location.state?.from || "/dashboard";

    /*
    ==========================================
    Load Exams
    ==========================================
    */

    useEffect(() => {
        const fetchExams = async () => {
            try {
                setLoading(true);
                setError("");

                const response =
                    await getAllExams();

                if (!response.success) {
                    throw new Error(
                        response.message ||
                            "Failed to load exams."
                    );
                }

                const examList =
                    response.data || [];

                setExams(examList);

                /*
                ==========================================
                Pre-select Current Exam
                ==========================================
                */

                if (currentExam?._id) {
                    const existingExam =
                        examList.find(
                            (exam) =>
                                exam._id ===
                                currentExam._id
                        );

                    if (existingExam) {
                        setSelectedExam(
                            existingExam
                        );
                    }
                }
            } catch (error) {
                setError(
                    error?.response?.data
                        ?.message ||
                        error?.message ||
                        "Failed to load exams."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchExams();
    }, [currentExam]);

    /*
    ==========================================
    Filter Exams
    ==========================================
    */

    const filteredExams = useMemo(() => {
        const query = searchQuery
            .trim()
            .toLowerCase();

        if (!query) {
            return exams;
        }

        return exams.filter((exam) =>
            exam.name
                ?.toLowerCase()
                .includes(query)
        );
    }, [exams, searchQuery]);

    /*
    ==========================================
    Group Exams
    ==========================================
    */

    const groupedExams = useMemo(() => {
        return filteredExams.reduce(
            (groups, exam) => {
                const category =
                    exam.category || "Other";

                if (!groups[category]) {
                    groups[category] = [];
                }

                groups[category].push(exam);

                return groups;
            },
            {}
        );
    }, [filteredExams]);

    /*
    ==========================================
    Select Exam
    ==========================================
    */

    const handleSelectExam = useCallback(
        (exam) => {
            setSelectedExam(exam);
            setError("");
        },
        []
    );

    /*
    ==========================================
    Continue
    ==========================================
    */

    const continueToDashboard =
        useCallback(async () => {
            if (!selectedExam || saving) {
                return;
            }

            try {
                setSaving(true);
                setError("");

                await selectExam(
                    selectedExam._id
                );

                navigate(redirectTo, {
                    replace: true,
                });
            } catch (error) {
                setError(
                    error?.response?.data
                        ?.message ||
                        error?.message ||
                        "Unable to save selected exam."
                );
            } finally {
                setSaving(false);
            }
        }, [
            selectedExam,
            saving,
            selectExam,
            navigate,
            redirectTo,
        ]);

    return {
        loading,
        saving,
        error,

        searchQuery,
        setSearchQuery,

        groupedExams,

        selectedExam,
        handleSelectExam,

        continueToDashboard,
    };
}