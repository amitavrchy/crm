"use client";

import { useEffect, useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaBars, FaTimes, FaTachometerAlt } from "react-icons/fa";
import { useSession, signOut } from "next-auth/react";
import logo from "../../../public/dr white logo.png";
import Image from "next/image";

const Navbar = () => {
  const { data: session, status } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  console.log("Session in Navbar:", session);

  if (status === "loading") {
    return (
      <div className="bg-gray-800 text-white text-center py-4">
        <p>Loading...</p>
      </div>
    );
  }

  const authLinks = session ? (
    <>
      <a
        href="/dashboard"
        className="flex items-center space-x-2 hover:text-yellow-400 transition"
      >
        <FaTachometerAlt />
        <span>Dashboard</span>
      </a>
      <button
        onClick={() => signOut()}
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
  );

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
            <span>+8801716059625</span>
          </div>
        </div>
        <div className="flex space-x-6">{authLinks}</div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center">
            <a href="/homePage">
              <Image
                src={logo}
                alt="LOGO"
                width={80}
                height={60}
                className="opacity-70"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <a href="/services" className="hover:text-gray-400 transition">
              Services
            </a>
            <a href="/postJob" className="hover:text-gray-400 transition">
              Post a job
            </a>
            <a href="/allJobs" className="hover:text-gray-400 transition">
              All Jobs
            </a>
            <a href="/contactUs" className="hover:text-gray-400 transition">
              Contact Us
            </a>
            <a href="/blogs" className="hover:text-gray-400 transition">
              Blogs
            </a>
            <a
              href="/aboutUs"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition"
            >
              About us
            </a>
            {session && (
              <a
                href="/dashboard"
                className="hover:text-gray-400 flex items-center space-x-2 transition"
              >
                <FaTachometerAlt />
                <span>Dashboard</span>
              </a>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            <button
              type="button"
              onClick={() => setIsSidebarOpen(true)}
              className="text-2xl focus:outline-none"
            >
              <FaBars />
            </button>
          </div>
        </div>

        {/* Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Mobile Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-black text-white transform transition-transform duration-300 z-40 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          {/* Close Button */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
            <h2 className="text-xl font-bold">Menu</h2>
            <button
              type="button"
              onClick={() => setIsSidebarOpen(false)}
              className="text-2xl focus:outline-none"
            >
              <FaTimes />
            </button>
          </div>

          {/* Sidebar Links */}
          <div className="flex flex-col space-y-6 my-6 px-4">
            <a
              href="/services"
              className="text-lg hover:text-gray-400 transition"
              onClick={() => setIsSidebarOpen(false)}
            >
              Services
            </a>
            <a
              href="/postJob"
              className="text-lg hover:text-gray-400 transition"
              onClick={() => setIsSidebarOpen(false)}
            >
              Post a job
            </a>
            <a
              href="/allJobs"
              className="text-lg hover:text-gray-400 transition"
              onClick={() => setIsSidebarOpen(false)}
            >
              All Jobs
            </a>
            <a
              href="/contactUs"
              className="text-lg hover:text-gray-400 transition"
              onClick={() => setIsSidebarOpen(false)}
            >
              Contact Us
            </a>
            <a
              href="/blogs"
              className="text-lg hover:text-gray-400 transition"
              onClick={() => setIsSidebarOpen(false)}
            >
              Blogs
            </a>
            <a
              href="/aboutUs"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition text-center"
              onClick={() => setIsSidebarOpen(false)}
            >
              About us
            </a>
            {session && (
              <a
                href="/dashboard"
                className="flex items-center space-x-2 text-lg hover:text-gray-400 transition"
                onClick={() => setIsSidebarOpen(false)}
              >
                <FaTachometerAlt />
                <span>Dashboard</span>
              </a>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
