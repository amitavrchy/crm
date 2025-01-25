"use client";
import Sidebar from "../Sidebar/Index";

export default function DashboardLayout({ children }) {
    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <main className="flex-1 overflow-auto bg-gray-100 pl-20 pt-6">{children}</main>
            </div>
        </div>
    );
}