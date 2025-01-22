"use client";
import { useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaBars, FaTimes } from "react-icons/fa";
import logo from "../../../public/dr white logo.png"
import Image from "next/image";

const Navbar = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div>
      {/* Top Navbar */}
      <div className="bg-gray-800 text-white text-sm py-3 px-6 flex flex-col md:flex-row items-center justify-between">
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

        <div className="flex space-x-6">
          <a href="#" className="hover:text-yellow-400 transition">
            Become a vendor
          </a>
          <a href="/signIn" className="hover:text-yellow-400 transition">
            Login
          </a>
          <a href="/signUp" className="hover:text-yellow-400 transition">
            Register
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-black text-white py-4 px-6 flex items-center justify-between">
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
        <div className="hidden lg:flex space-x-8">
          <a href="/services" className="hover:text-gray-400 transition">
            Services
          </a>
          <a href="#" className="hover:text-gray-400 transition">
            Post a job
          </a>
          <a
            href="/aboutUs"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition"
          >
            About us
          </a>
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

        {/* Mobile Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-black text-white transform transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
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
          <div className="flex flex-col space-y-6 mt-6 px-4">
            <a href="#" className="text-lg hover:text-gray-400 transition">
              Services
            </a>
            <a href="#" className="text-lg hover:text-gray-400 transition">
              Post a job
            </a>
            <a
              href="#"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition text-center"
            >
              About us
            </a>
          </div>
        </div>

        {/* Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-10"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </nav>
    </div>
  );
};

export default Navbar;
