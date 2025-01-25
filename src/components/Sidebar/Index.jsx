"use client";
import { useState } from "react";
import Link from "next/link";
import { Home, Briefcase, Settings, LogOut } from "lucide-react";

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div
            className={`fixed opacity-90 top-0 left-0 h-full bg-gray-900 text-white shadow-lg transition-width duration-300 ${
                isCollapsed ? "w-16" : "w-64"
            }`}
        >
            <div className="flex items-center justify-between px-4 py-4 bg-gray-800">
                <h2 className={`text-lg font-semibold ${isCollapsed ? "hidden" : ""}`}>Dashboard</h2>
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-2 rounded-md text-gray-300 hover:text-white"
                >
                    {isCollapsed ? "➡️" : "⬅️"}
                </button>
            </div>
            <nav className="mt-4 space-y-2">
                <SidebarLink icon={Home} label="Home" href="/homePage" isCollapsed={isCollapsed} />
                <SidebarLink icon={Briefcase} label="Jobs" href="/jobs" isCollapsed={isCollapsed} />
                <SidebarLink icon={Settings} label="Settings" href="/settings" isCollapsed={isCollapsed} />
            </nav>
            <div className="mt-auto px-4 py-4">
                <button className="flex items-center gap-2 text-gray-300 hover:text-red-400">
                    <LogOut className="h-6 w-6" />
                    {!isCollapsed && <span>Sign Out</span>}
                </button>
            </div>
        </div>
    );
};

const SidebarLink = ({ icon: Icon, label, href, isCollapsed }) => (
    <Link href={href} className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-700">
            <Icon className="h-6 w-6" />
            {!isCollapsed && <span>{label}</span>}
    </Link>
);

export default Sidebar;
