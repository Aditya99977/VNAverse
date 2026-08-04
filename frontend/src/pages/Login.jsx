import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AuthLayout from "../layouts/AuthLayout";
import AuthCard from "../components/AuthCard";
import FormInput from "../components/FormInput";
import PasswordInput from "../components/PasswordInput";
import AuthButton from "../components/AuthButton";

import { useAuth } from "../hooks/useAuth";

const loginSchema = z.object({
    email: z
        .string()
        .email("Please enter a valid email"),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters"),
});

function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [loading, setLoading] = useState(false);

    const {

        register,

        handleSubmit,

        formState: { errors },

    } = useForm({

        resolver: zodResolver(loginSchema),

    });

    /*
    ==========================================
    Login
    ==========================================
    */

    const onSubmit = async (formData) => {

        if (loading) return;

        try {

            setLoading(true);

            const response = await login(formData);

            if (!response.success) {

                toast.error(response.message);

                return;

            }

            const user = response.data.user;

            toast.success(response.message);

            setTimeout(() => {

                /*
                ==========================================
                Admin
                ==========================================
                */

                if (user.role === "admin") {

                    navigate("/admin");

                    return;

                }

                /*
                ==========================================
                First Time Student
                ==========================================
                */

                if (!user.preferredExam) {

                    navigate("/select-exam");

                    return;

                }

                /*
                ==========================================
                Existing Student
                ==========================================
                */

                navigate("/dashboard");

            }, 1200);

        }

        catch (error) {

            toast.error(

                error?.response?.data?.message ||

                error?.message ||

                "Login failed. Please try again."

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <AuthLayout>

            <ToastContainer position="top-right" />

            <AuthCard

                title="Welcome Back 👋"

                subtitle="Sign in to continue your VNAverse learning journey."

            >

                <form onSubmit={handleSubmit(onSubmit)}>

                    <FormInput

                        label="Email Address"

                        type="email"

                        placeholder="Enter your email address"

                        error={errors.email?.message}

                        {...register("email")}

                    />

                    <PasswordInput

                        label="Password"

                        placeholder="Enter your password"

                        error={errors.password?.message}

                        {...register("password")}

                    />

                    <div className="text-end mb-3">

                        <Link

                            to="/forgot-password"

                            className="text-decoration-none"

                        >

                            Forgot Password?

                        </Link>

                    </div>

                    <AuthButton

                        text="Sign In"

                        loading={loading}

                    />

                </form>

                <hr />

                <p className="text-center mb-0">

                    New to VNAverse?

                    <Link

                        to="/register"

                        className="ms-2"

                    >

                        Create Account

                    </Link>

                </p>

            </AuthCard>

        </AuthLayout>

    );

}

export default Login;