"use client";

import { useState } from "react";
import { useSession } from "@/hooks/useSession"; // Import the useSession hook
import { useRouter } from "next/navigation";
import { FaEnvelope, FaPhoneAlt, FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";
import axios from "axios";
import logo from "../../../public/dr white logo.png";

const Navbar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { user, loading } = useSession();
    const router = useRouter();

    const getDashboardLink = () => {
        if (!user) return "/dashboard";
        const dashboardRoutes = {
            admin: "/dashboard/admin",
            vendor: "/dashboard/vendor",
            client: "/dashboard/client",
            employee: "/dashboard/employee",
        };
        return dashboardRoutes[user.userType] || "/dashboard";
    };

    // Handle logout
    const handleLogout = async () => {
        try {
            await axios.post("/api/auth/logout", {}, { withCredentials: true });
            router.push("/signIn");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <div>
            {/* Top Navbar */}
            <div className="bg-gray-700 text-white text-sm py-3 px-6 flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center space-x-4 mb-2 md:mb-0">
                    <div className="flex items-center space-x-1">
                        <FaEnvelope className="text-yellow-400" />
                        <span>admin@user.com</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <FaPhoneAlt className="text-yellow-400" />
                        <span>+00000000000</span>
                    </div>
                </div>
                <div className="flex space-x-6">
                    {loading ? (
                        <span>Loading...</span>
                    ) : user ? (
                        <>
                            <a href={getDashboardLink()} className="hover:text-yellow-400 transition">
                                Dashboard
                            </a>
                            <button
                                onClick={handleLogout}
                                className="hover:text-yellow-400 transition"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <a href="/signUp" className="hover:text-yellow-400 transition">
                                Become a vendor
                            </a>
                            <a href="/signIn" className="hover:text-yellow-400 transition">
                                Login
                            </a>
                            <a href="/signUp" className="hover:text-yellow-400 transition">
                                Register
                            </a>
                        </>
                    )}
                </div>
            </div>

            {/* Main Navbar */}
            <nav className="bg-gray-800 text-white py-4">
                <div className="container mx-auto px-6 flex items-center justify-between">
                    <a href="/homePage">
                        <Image src={logo} alt="LOGO" width={80} height={60} className="opacity-70" />
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-8">
                        <a href="/services" className="hover:text-gray-400 transition">Services</a>
                        <a href="/postJob" className="hover:text-gray-400 transition">Post a job</a>
                        <a href="/allJobs" className="hover:text-gray-400 transition">All Jobs</a>
                        <a href="/contactUs" className="hover:text-gray-400 transition">Contact Us</a>
                        <a href="/blogs" className="hover:text-gray-400 transition">Blogs</a>
                        <a href="/projects" className="hover:text-gray-400 transition">Projects</a>
                        <a href="/FAQ" className="hover:text-gray-400 transition">FAQ</a>
                        <a href="/scheduleMeet" className="hover:text-gray-400 transition">Schedule A Meeting</a>
                        <a href="/aboutUs" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition">About us</a>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button type="button" onClick={() => setIsSidebarOpen(true)} className="lg:hidden text-2xl focus:outline-none">
                        <FaBars />
                    </button>
                </div>

                {/* Mobile Sidebar */}
                {isSidebarOpen && (
                    <>
                        <div className="fixed inset-0 bg-black/50 z-30" onClick={() => setIsSidebarOpen(false)} />
                        <div className="fixed top-0 left-0 h-full w-64 bg-black text-white transform transition-transform duration-300 z-40">
                            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
                                <h2 className="text-xl font-bold">Menu</h2>
                                <button type="button" onClick={() => setIsSidebarOpen(false)} className="text-2xl focus:outline-none">
                                    <FaTimes />
                                </button>
                            </div>
                            <div className="flex flex-col space-y-6 my-6 px-4">
                                <a href="/services" className="text-lg hover:text-gray-400 transition">Services</a>
                                <a href="/postJob" className="text-lg hover:text-gray-400 transition">Post a job</a>
                                <a href="/allJobs" className="text-lg hover:text-gray-400 transition">All Jobs</a>
                                <a href="/contactUs" className="text-lg hover:text-gray-400 transition">Contact Us</a>
                                <a href="/blogs" className="text-lg hover:text-gray-400 transition">Blogs</a>
                                <a href="/projects" className="text-lg hover:text-gray-400 transition">Projects</a>
                                <a href="/FAQ" className="text-lg hover:text-gray-400 transition">FAQ</a>
                                <a href="/scheduleMeet" className="text-lg hover:text-gray-400 transition">Schedule A Meeting</a>
                                <a href="/aboutUs" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition">About us</a>
                                {user && (
                                    <a href={getDashboardLink()} className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition text-center">
                                        Dashboard
                                    </a>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </nav>
        </div>
    );
};

export default Navbar;
