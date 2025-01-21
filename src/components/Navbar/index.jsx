import React from "react";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";

const Navbar = () => {
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
          <a href="#" className="hover:text-yellow-400 transition">
            Login / Register
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-black text-white py-4 px-6 flex items-center justify-between">
        <div className="flex space-x-8">
          <a href="#" className="hover:text-gray-400 transition">
            Services
          </a>
          <a href="#" className="hover:text-gray-400 transition">
            Post a job
          </a>
        </div>

        <div>
          <a
            href="#"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition"
          >
            About us
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
