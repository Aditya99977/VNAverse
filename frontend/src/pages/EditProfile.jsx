import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AuthLayout from "../layouts/AuthLayout";
import AuthCard from "../components/AuthCard";
import FormInput from "../components/FormInput";
import AuthButton from "../components/AuthButton";

import {
    getProfile,
    updateProfile,
} from "../services/profileService";

import { getAllExams } from "../services/examService";

function EditProfile() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [exams, setExams] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        preferredExam: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [profile, examResponse] = await Promise.all([
                    getProfile(),
                    getAllExams(),
                ]);

                setFormData({
                    name: profile.name || "",
                    email: profile.email || "",
                    preferredExam: profile.preferredExam?._id || "",
                });

                setExams(examResponse.exams || []);
            } catch (err) {
                console.error(err);
                toast.error("Failed to load profile.");
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            await updateProfile(formData);

            toast.success("Profile updated successfully!");

            setTimeout(() => {
                navigate("/profile", {
                    replace: true,
                });
            }, 1200);
        } catch (err) {
            console.error(err);

            toast.error(
                err.response?.data?.message ||
                    "Failed to update profile."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout>
            <ToastContainer position="top-right" />

            <AuthCard
                title="Edit Profile"
                subtitle="Update your account information"
            >
                <form onSubmit={handleSubmit}>
                    <FormInput
                        label="Name"
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={loading}
                    />

                    <FormInput
                        label="Email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={loading}
                    />

                    <div className="mb-3">
                        <label className="form-label fw-semibold">
                            Preferred Exam
                        </label>

                        <select
                            className="form-select"
                            name="preferredExam"
                            value={formData.preferredExam}
                            onChange={handleChange}
                            disabled={loading}
                        >
                            <option value="">
                                Select Preferred Exam
                            </option>

                            {exams.map((exam) => (
                                <option
                                    key={exam._id}
                                    value={exam._id}
                                >
                                    {exam.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <AuthButton
                        text="Save Changes"
                        loading={loading}
                    />
                </form>
            </AuthCard>
        </AuthLayout>
    );
}

export default EditProfile;