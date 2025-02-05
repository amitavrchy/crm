import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

function ReportsAnalytics() {
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {/* Page Header */}
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700">
                    New Project
                </button>
            </header>

            {/* Main Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Overview Cards */}
                {[
                    { title: "Sales", value: "2,382", change: "+8.2%", color: "text-green-500" },
                    { title: "Earnings", value: "$21,300", change: "+6.3%", color: "text-green-500" },
                    { title: "Visitors", value: "14,212", change: "-3.2%", color: "text-red-500" },
                    { title: "Orders", value: "64", change: "-2.3%", color: "text-red-500" },
                ].map((card, idx) => (
                    <div
                        key={idx}
                        className="p-4 bg-white rounded-lg shadow-md flex flex-col items-start"
                    >
                        <h2 className="text-sm text-gray-600 font-medium mb-1">
                            {card.title}
                        </h2>
                        <p className="text-2xl font-bold text-gray-800">{card.value}</p>
                        <p className={`text-sm ${card.color}`}>{card.change} Since last week</p>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                {/* Recent Movement Chart */}
                <div className="p-4 bg-white rounded-lg shadow-md col-span-2">
                    <h2 className="text-lg font-medium text-gray-700 mb-4">Recent Movement</h2>
                    <div className="h-60">
                        <Line
                            data={{
                                labels: [
                                    "Jan",
                                    "Feb",
                                    "Mar",
                                    "Apr",
                                    "May",
                                    "Jun",
                                    "Jul",
                                    "Aug",
                                    "Sep",
                                    "Oct",
                                    "Nov",
                                    "Dec",
                                ],
                                datasets: [
                                    {
                                        label: "Movement",
                                        data: [
                                            1000, 2000, 3000, 4000, 3500, 4500, 3000, 4000, 5000,
                                            6000, 5000, 7000,
                                        ],
                                        borderColor: "#4F46E5",
                                        fill: true,
                                        backgroundColor: "rgba(79, 70, 229, 0.1)",
                                    },
                                ],
                            }}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                            }}
                        />
                    </div>
                </div>

                {/* Browser Usage Chart */}
                <div className="p-4 bg-white rounded-lg shadow-md">
                    <h2 className="text-lg font-medium text-gray-700 mb-4">Browser Usage</h2>
                    <div className="h-60">
                        <Doughnut
                            data={{
                                labels: ["Chrome", "Firefox", "Edge", "Other"],
                                datasets: [
                                    {
                                        data: [4306, 3801, 1689, 3251],
                                        backgroundColor: [
                                            "#FF6384",
                                            "#36A2EB",
                                            "#FFCE56",
                                            "#4BC0C0",
                                        ],
                                        hoverBackgroundColor: [
                                            "#FF6384",
                                            "#36A2EB",
                                            "#FFCE56",
                                            "#4BC0C0",
                                        ],
                                    },
                                ],
                            }}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Lower Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {/* Calendar */}
                <div className="p-4 bg-white rounded-lg shadow-md">
                    <h2 className="text-lg font-medium text-gray-700 mb-4">Calendar</h2>
                    <div className="text-center">
                        <p className="text-sm text-gray-500">May 2021</p>
                        <div className="grid grid-cols-7 gap-2 mt-2 text-sm">
                            {[...Array(31)].map((_, day) => (
                                <div
                                    key={day}
                                    className={`p-2 rounded-md ${
                                        day === 4
                                            ? "bg-blue-600 text-white"
                                            : "text-gray-700 hover:bg-gray-100"
                                    }`}
                                >
                                    {day + 1}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Map Section */}
                <div className="p-4 bg-white rounded-lg shadow-md col-span-2">
                    <h2 className="text-lg font-medium text-gray-700 mb-4">Map</h2>
                    <div className="h-64">
                        <MapContainer
                            center={[51.505, -0.09]}
                            zoom={13}
                            scrollWheelZoom={false}
                            className="h-full rounded-lg"
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={[51.505, -0.09]}>
                                <Popup>
                                    A sample location on the map!
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReportsAnalytics;
