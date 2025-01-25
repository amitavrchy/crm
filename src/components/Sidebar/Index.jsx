"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function Sidebar() {
    return (
        <div className="w-64 bg-gray-900 text-white p-4">
            <h2 className="text-xl font-bold mb-4">Dashboard</h2>
            <ul>
                <li className="mb-2">
                    <Link href="/dashboard/client" className="hover:text-purple-400">
                        Client Dashboard
                    </Link>
                </li>
                <li className="mb-2">
                    <Link href="/dashboard/vendor" className="hover:text-purple-400">
                        Vendor Dashboard
                    </Link>
                </li>
                <li className="mb-2">
                    <Link href="/dashboard/admin" className="hover:text-purple-400">
                        Admin Dashboard
                    </Link>
                </li>
                <li className="mt-4">
                    <button onClick={() => signOut()} className="text-red-400">
                        Sign Out
                    </button>
                </li>
            </ul>
        </div>
    );
}
