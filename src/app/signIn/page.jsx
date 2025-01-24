"use client";
import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import "tailwindcss/tailwind.css";
import { AiOutlineArrowRight } from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/navigation";

function SignIn() {
    const router = useRouter();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            // Send POST request to the backend
            const response = await fetch("/api/auth/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                Swal.fire({
                    title: "Welcome Back!",
                    text: "You have successfully signed in!",
                    icon: "success",
                    confirmButtonColor: "#4F46E5",
                });
                reset();
                router.push("/homePage"); // Redirect to home page
            } else {
                Swal.fire({
                    title: "Sign In Failed",
                    text: result.message || "Something went wrong",
                    icon: "error",
                    confirmButtonColor: "#EF4444",
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Something went wrong. Please try again later.",
                icon: "error",
                confirmButtonColor: "#EF4444",
            });
        }
    };

    return (
        <section className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-64 h-64 bg-blue-500 rounded-full top-10 left-10 opacity-30 blur-3xl animate-pulse"></div>
                <div className="absolute w-80 h-80 bg-purple-500 rounded-full bottom-20 right-20 opacity-30 blur-3xl animate-pulse"></div>
            </div>

            <div className="relative z-10 w-full max-w-md px-8 py-10 bg-gray-800 rounded-lg shadow-xl">
                <h2 className="text-3xl font-extrabold text-center text-white">Sign In</h2>
                <p className="text-sm text-center text-gray-400">
                    Welcome back! Please sign in to your account.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm text-gray-300">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            {...register("email", { required: "Email is required" })}
                            className="w-full px-4 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your email"
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm text-gray-300">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            {...register("password", { required: "Password is required" })}
                            className="w-full px-4 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your password"
                        />
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700"
                    >
                        Sign In
                    </button>
                </form>

                {/* Link to Sign Up */}
                <p className="mt-4 text-sm text-center text-gray-300">
                    Don’t have an account?{" "}
                    <Link href="/signUp">
                        <span className="flex items-center justify-center gap-1 text-blue-500 hover:text-blue-700">
                            Sign Up <AiOutlineArrowRight />
                        </span>
                    </Link>
                </p>
            </div>
        </section>
    );
}

export default SignIn;
