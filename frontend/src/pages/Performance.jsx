import { useEffect, useState } from "react";

import DashboardLayout from "../components/DashboardLayout";

import PerformanceStats from "../components/performance/PerformanceStats";
import SubjectProgress from "../components/performance/SubjectProgress";
import RecentTests from "../components/performance/RecentTests";
import PerformanceChart from "../components/performance/PerformanceChart";

import {
    getUserPerformance,
} from "../services/performanceService";

function Performance() {

    /*
    =====================================
    State
    =====================================
    */

    const [performanceData, setPerformanceData] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    /*
    =====================================
    Load Performance
    =====================================
    */

    useEffect(() => {

        const fetchPerformance = async () => {

            try {

                setLoading(true);

                setError("");

                const response =
                    await getUserPerformance();

                if (!response.success) {

                    throw new Error(
                        response.message ||
                        "Failed to load performance."
                    );

                }

                setPerformanceData(
                    response.data || []
                );

            }

            catch (err) {

                console.error(err);

                setError(
                    err?.response?.data?.message ||

                    err?.message ||

                    "Unable to load performance."
                );

            }

            finally {

                setLoading(false);

            }

        };

        fetchPerformance();

    }, []);

    /*
    =====================================
    Loading
    =====================================
    */

    if (loading) {

        return (

            <DashboardLayout>

                <div className="container-fluid">

                    <div className="alert alert-info">

                        Loading Performance Dashboard...

                    </div>

                </div>

            </DashboardLayout>

        );

    }

    /*
    =====================================
    Error
    =====================================
    */

    if (error) {

        return (

            <DashboardLayout>

                <div className="container-fluid">

                    <div className="alert alert-danger">

                        {error}

                    </div>

                </div>

            </DashboardLayout>

        );

    }

    /*
    =====================================
    Safe Defaults
    =====================================
    */

    const stats =
        performanceData?.stats || {};

    const subjectProgress =
        performanceData?.subjectProgress || [];

    const weeklyPerformance =
        performanceData?.weeklyPerformance || [];

    const recentTests =
        performanceData?.recentTests || [];

    /*
    =====================================
    UI
    =====================================
    */

    return (

        <DashboardLayout>

            <div className="container-fluid">

                <h2 className="fw-bold mb-4">

                    📈 Performance Dashboard

                </h2>

                <PerformanceStats
                    stats={stats}
                />

                <div className="row">

                    <div className="col-lg-6">

                        <SubjectProgress
                            subjects={subjectProgress}
                        />

                    </div>

                    <div className="col-lg-6">

                        <PerformanceChart
                            performance={weeklyPerformance}
                        />

                    </div>

                </div>

                <RecentTests
                    tests={recentTests}
                />

            </div>

        </DashboardLayout>

    );

}

export default Performance;