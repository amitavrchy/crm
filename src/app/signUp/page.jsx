"use client";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineArrowRight } from "react-icons/ai";
import Swal from "sweetalert2";
import "tailwindcss/tailwind.css";
import axios from "axios";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

function SignUp() {
    const [userType, setUserType] = useState("Client");
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const axiosInstance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        timeout: 30000,
    });

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            username: "",
            email: "",
        },
    });

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.post("api/auth/register", {
                username: data.username,
                email: data.email,
                userType,
            });

            if (response.status === 201) {
                Swal.fire({
                    title: "Success!",
                    text: "You have signed up successfully!",
                    icon: "success",
                    confirmButtonColor: "#4F46E5",
                }).then(() => {
                    router.push("/signIn");
                });
                reset();
            }
        } catch (error) {
            console.error("Error registering user:", error);
            Swal.fire({
                title: "Error!",
                text: error.response?.data?.message || "Something went wrong",
                icon: "error",
                confirmButtonColor: "#E53E3E",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleUserTypeChange = (type) => {
        setUserType(type);
    };

    return (
        <div>
            <Navbar />
            <section className="relative flex items-center justify-center min-h-screen bg-gray-100 py-8">
                {/* Animated Background */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute w-64 h-64 bg-orange-300 rounded-full top-10 left-10 opacity-30 blur-3xl animate-pulse"></div>
                    <div className="absolute w-80 h-80 bg-orange-400 rounded-full bottom-20 right-20 opacity-30 blur-3xl animate-pulse"></div>
                </div>

                <div className="relative z-10 w-full max-w-md px-8 py-10 bg-white rounded-lg shadow-xl">
                    <h2 className="text-3xl font-extrabold text-center text-gray-900">Sign Up</h2>
                    <p className="text-sm text-center text-gray-600">
                        Create your account and join as {userType.toLowerCase()}!
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
                        <div>
                            <label htmlFor="username" className="block text-sm text-gray-700">
                                Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                {...register("username", { required: "Username is required" })}
                                className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-200 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                                placeholder="Choose a username"
                            />
                            {errors.username && (
                                <p className="mt-1 text-sm text-red-500">{errors.username.message}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm text-gray-700">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                        message: "Enter a valid email",
                                    },
                                })}
                                className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-200 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                                placeholder="Enter your email"
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                            )}
                        </div>

                        {/* User Type Selection */}
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-700">Register as:</p>
                            <div className="flex items-center space-x-4">
                                {["Client", "Vendor", "Employee"].map((type) => (
                                    <button
                                        key={type}
                                        type="button"
                                        className={`flex flex-col items-center px-3 py-2 rounded-md ${userType === type
                                            ? "bg-orange-500 text-white"
                                            : "bg-gray-200 text-gray-700 hover:bg-orange-400 hover:text-white"
                                            }`}
                                        onClick={() => handleUserTypeChange(type)}
                                    >
                                        <span className="text-sm">{type}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="text-center text-orange-500 font-bold">
                            We will send your password through email after approval.
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-2 text-white bg-orange-500 rounded-md shadow-md hover:bg-orange-600"
                        >
                            Sign Up
                        </button>
                    </form>

                    {/* Link to Sign In */}
                    <p className="mt-4 text-sm text-center text-gray-700">
                        Already have an account?{" "}
                        <Link href="/signIn">
                            <span className="flex items-center justify-center gap-1 text-orange-500 hover:text-orange-700">
                                Sign In <AiOutlineArrowRight />
                            </span>
                        </Link>
                    </p>

                    <p className="mt-4 text-xs text-center text-gray-500">
                        By signing up, you agree to our Terms of Service and Privacy Policy.
                    </p>
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default SignUp;
