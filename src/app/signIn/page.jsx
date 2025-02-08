"use client";
import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import "tailwindcss/tailwind.css";
import { AiOutlineArrowRight } from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

function SignIn() {
    const router = useRouter();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await fetch("/api/auth/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            console.log("API Response:", result);

            if (response.ok) {
                Swal.fire({
                    title: "Welcome Back!",
                    text: "You have successfully signed in!",
                    icon: "success",
                    confirmButtonColor: "#4F46E5",
                });

                const { userType } = result.user;
                console.log("User Type:", userType);

                // Redirect based on user type
                switch (userType) {
                    case "Admin":
                        router.push("/dashboard/admin");
                        break;
                    case "Client":
                        router.push("/dashboard/client");
                        break;
                    case "Vendor":
                        router.push("/dashboard/vendor");
                        break;
                    case "Employee":
                        router.push("/dashboard/employee");
                        break;
                    default:
                        router.push("/dashboard");
                }

                reset();
            } else {
                Swal.fire({
                    title: "Sign In Failed",
                    text: result.message || "Invalid credentials. Please try again.",
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
            console.error("Error:", error);
        }
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
                    <h2 className="text-3xl font-extrabold text-center text-gray-900">Sign In</h2>
                    <p className="text-sm text-center text-gray-600">
                        Welcome back! Please sign in to your account.
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm text-gray-700">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                {...register("email", { required: "Email is required" })}
                                className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-200 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                                placeholder="Enter your email"
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm text-gray-700">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                {...register("password", { required: "Password is required" })}
                                className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-200 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                                placeholder="Enter your password"
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 text-white bg-orange-500 rounded-md shadow-md hover:bg-orange-600"
                        >
                            Sign In
                        </button>
                    </form>

                    <p className="mt-4 text-sm text-center text-gray-700">
                        Don’t have an account?{" "}
                        <Link href="/signUp">
                            <span className="flex items-center justify-center gap-1 text-orange-500 hover:text-orange-700">
                                Sign Up <AiOutlineArrowRight />
                            </span>
                        </Link>
                    </p>
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default SignIn;
