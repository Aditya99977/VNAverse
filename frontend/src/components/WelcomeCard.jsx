import { FaFire, FaArrowRight, FaTrophy } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function WelcomeCard({ user }) {

    const navigate = useNavigate();

    /*
    ==========================================
    Greeting
    ==========================================
    */

    const greeting = () => {

        const hour = new Date().getHours();

        if (hour < 12) return "Good Morning";

        if (hour < 17) return "Good Afternoon";

        return "Good Evening";

    };

    /*
    ==========================================
    Study Streak Message
    ==========================================
    */

    const getStreakMessage = () => {

        const streak = user?.studyStreak || 0;

        if (streak === 0) return "Start your learning streak today 🚀";

        if (streak <= 3) return "Great start! Keep learning 🔥";

        if (streak <= 7) return "Consistency is your superpower 💪";

        if (streak <= 29) return "Amazing dedication! Keep it up 🚀";

        return "You're unstoppable 👑";

    };

    return (

        <div
            className="position-relative overflow-hidden rounded-4 mb-4"
            style={{
                background:
                    "linear-gradient(135deg,#1D4ED8 0%, #2563EB 45%, #3B82F6 100%)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 20px 45px rgba(37,99,235,.28)",
            }}
        >

            {/* Decorative Blur */}

            <div
                style={{
                    position: "absolute",
                    width: "260px",
                    height: "240px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,.08)",
                    top: "-120px",
                    right: "-80px",
                    filter: "blur(8px)",
                }}
            />

            <div
                style={{
                    position: "absolute",
                    width: "170px",
                    height: "170px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,.05)",
                    bottom: "-70px",
                    left: "-40px",
                }}
            />

            <div className="p-5 position-relative">

                <div className="row align-items-center">

                    <div className="col-lg-8">

                        <span
                            className="d-inline-block mb-3 px-3 py-2 rounded-pill"
                            style={{
                                background: "rgba(255,255,255,.15)",
                                color: "white",
                                fontSize: "14px",
                                fontWeight: 600,
                                backdropFilter: "blur(12px)",
                            }}
                        >
                            VNAverse Student Dashboard
                        </span>

                        <h2
                            className="fw-bold text-white mb-3"
                            style={{
                                fontSize: "2.4rem",
                                lineHeight: 1.2,
                            }}
                        >
                            {greeting()}, {user?.name} 👋
                        </h2>

                        <p
                            className="mb-4"
                            style={{
                                color: "rgba(255,255,255,.85)",
                                fontSize: "1.08rem",
                                maxWidth: "620px",
                            }}
                        >
                            Continue your learning journey

                            {user?.preferredExam?.name && (
                                <>
                                    {" "}towards{" "}
                                    <strong>{user.preferredExam.name}</strong>
                                </>
                            )}

                            . Every learning session helps you build stronger
                            skills and move closer to your goals.
                        </p>

                        <div className="d-flex flex-wrap gap-3">

                            <div
                                className="px-4 py-3 rounded-4"
                                style={{
                                    background: "rgba(255,255,255,.12)",
                                    backdropFilter: "blur(14px)",
                                    minWidth: "280px",
                                }}
                            >

                                <div
                                    className="d-flex align-items-center gap-2 mb-2"
                                    style={{
                                        color: "#FACC15",
                                    }}
                                >

                                    <FaFire />

                                    <span className="fw-semibold">
                                        Learning Streak
                                    </span>

                                </div>

                                <h3 className="text-white fw-bold mb-1">
                                    🔥 {user?.studyStreak || 0} Day{(user?.studyStreak || 0) !== 1 ? "s" : ""}
                                </h3>

                                <div
                                    style={{
                                        color: "rgba(255,255,255,.85)",
                                        fontSize: "15px",
                                    }}
                                >
                                    {getStreakMessage()}
                                </div>

                                <hr
                                    style={{
                                        borderColor: "rgba(255,255,255,.15)",
                                    }}
                                />

                                <div
                                    className="d-flex align-items-center gap-2"
                                    style={{
                                        color: "#FFD166",
                                        fontSize: "14px",
                                    }}
                                >

                                    <FaTrophy />

                                    Longest Streak:

                                    <strong className="text-white">
                                        {user?.longestStudyStreak || 0} Days
                                    </strong>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="col-lg-4 text-lg-end mt-5 mt-lg-0">

                        <button
                            className="btn btn-light rounded-pill px-5 py-3 fw-semibold shadow-sm"
                            style={{
                                fontSize: "1rem",
                            }}
                            onClick={() => navigate("/practice")}
                        >
                            Continue Learning

                            <FaArrowRight className="ms-2" />

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default WelcomeCard;