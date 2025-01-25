"use client";
import Sidebar from "../Sidebar/Index";
import Header from "../Header/index";

export default function DashboardLayout({ children }) {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col bg-gray-100">
                <Header />
                <main className="p-6">{children}</main>
            </div>
        </div>
    );
}
