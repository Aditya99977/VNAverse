import DashboardLayout from "../components/DashboardLayout";
import WelcomeCard from "../components/WelcomeCard";
import StatCard from "../components/StatCard";
import SubjectProgress from "../components/SubjectProgress";
import PerformanceChart from "../components/PerformanceChart";
import RecentTests from "../components/RecentTests";
import QuickActions from "../components/QuickActions";

import useDashboard from "../hooks/useDashboard";

import {
    FaBook,
    FaClipboardList,
    FaChartLine,
    FaTrophy,
} from "react-icons/fa";

function StudentDashboard() {
    const {
        dashboard,
        loading,
        error,
    } = useDashboard();

    if (loading) {
        return (
            <DashboardLayout>
                <div
                    className="d-flex flex-column justify-content-center align-items-center"
                    style={{
                        minHeight: "70vh",
                    }}
                >
                    <div
                        className="spinner-border text-primary"
                        style={{
                            width: "3rem",
                            height: "3rem",
                        }}
                    />

                    <p
                        className="mt-4 mb-0"
                        style={{
                            color: "#94A3B8",
                            fontSize: "1.05rem",
                        }}
                    >
                        Loading your dashboard...
                    </p>
                </div>
            </DashboardLayout>
        );
    }

    if (error) {
        return (
            <DashboardLayout>
                <div
                    className="d-flex justify-content-center align-items-center"
                    style={{
                        minHeight: "70vh",
                    }}
                >
                    <div
                        className="alert alert-danger"
                        style={{
                            maxWidth: "500px",
                            width: "100%",
                        }}
                    >
                        {error}
                    </div>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="container-fluid px-0">

                <WelcomeCard user={dashboard?.user} />

                <div className="row g-4 mt-1">
                    <StatCard
                        title="Practice Questions"
                        value={dashboard?.stats?.practiceQuestions ?? 0}
                        subtitle="Questions Attempted"
                        icon={<FaBook />}
                        color="#22C55E"
                    />

                    <StatCard
                        title="Mock Tests"
                        value={dashboard?.stats?.mockTestsCompleted ?? 0}
                        subtitle="Completed"
                        icon={<FaClipboardList />}
                        color="#22C55E"
                    />

                    <StatCard
                        title="Accuracy"
                        value={`${dashboard?.stats?.accuracy ?? 0}%`}
                        subtitle="Average Accuracy"
                        icon={<FaChartLine />}
                        color="#3B82F6"
                    />

                    <StatCard
                        title="Highest Score"
                        value={dashboard?.stats?.highestScore ?? 0}
                        subtitle="Best Performance"
                        icon={<FaTrophy />}
                        color="#3B82F6"
                    />
                </div>

                <div className="row g-4 mt-1">
                    <div className="col-lg-5">
                        <SubjectProgress
                            data={dashboard?.subjectProgress || []}
                        />
                    </div>

                    <div className="col-lg-7">
                        <PerformanceChart
                            data={dashboard?.weeklyPerformance || []}
                        />
                    </div>
                </div>

                <div className="row g-4 mt-1 mb-4">
                    <div className="col-lg-8">
                        <RecentTests
                            tests={dashboard?.recentTests || []}
                        />
                    </div>

                    <div className="col-lg-4">
                        <QuickActions />
                    </div>
                </div>

            </div>
        </DashboardLayout>
    );
}

export default StudentDashboard;