// Header.js
"use client";

import React, { useState } from "react";
import { Menu, Sun, Moon, Search } from "lucide-react";

const Header = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    return (
        <header className="flex items-center justify-between px-4 py-3 bg-white shadow dark:bg-gray-800 md:px-8">
            <div className="flex items-center gap-4">
                <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700" aria-label="Toggle Sidebar">
                    <Menu className="h-6 w-6 text-gray-700 dark:text-white" />
                </button>
                <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Demand Recruitment
                </h1>
            </div>
            <div className="relative hidden sm:block w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full rounded-md bg-gray-100 pl-10 pr-4 py-2 text-gray-700 placeholder-gray-500 focus:outline-none dark:bg-gray-700 dark:text-white"
                />
            </div>
            <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Toggle Theme"
            >
                {isDarkMode ? (
                    <Sun className="h-6 w-6 text-gray-700 dark:text-white" />
                ) : (
                    <Moon className="h-6 w-6 text-gray-700 dark:text-white" />
                )}
            </button>
        </header>
    );
};

export default Header;
