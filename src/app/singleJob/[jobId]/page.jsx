"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaBuilding, FaMapMarkerAlt, FaMoneyBillWave, FaCalendarAlt } from "react-icons/fa";

function SingleJob() {
    const params = useParams();
    const jobId = params?.jobId;

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!jobId) return; // Ensure jobId is available before fetching

        async function fetchJob() {
            try {
                const res = await fetch(`/jobs.json`);
                if (!res.ok) {
                    throw new Error("Failed to fetch job details.");
                }
                const data = await res.json();
                const selectedJob = data.find((job) => job._id === jobId);
                if (selectedJob) {
                    setJob(selectedJob);
                } else {
                    setError("Job not found.");
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchJob();
    }, [jobId]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-800">
                <p className="text-lg font-semibold">Loading job details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-800">
                <p className="text-lg font-semibold">{error}</p>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <div className="bg-gray-50 min-h-screen text-gray-800">
                <div className="max-w-5xl mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
                        {job.title}
                    </h1>

                    <div className="bg-white shadow-md rounded-lg p-6">
                        <div className="mb-6">
                            <p className="flex items-center text-lg text-gray-600 mb-2">
                                <FaBuilding className="mr-2 text-blue-500" /> {job.company}
                            </p>
                            <p className="flex items-center text-lg text-gray-600 mb-2">
                                <FaMapMarkerAlt className="mr-2 text-green-500" /> {job.location}
                            </p>
                            {job.salary && (
                                <p className="flex items-center text-lg text-gray-600 mb-2">
                                    <FaMoneyBillWave className="mr-2 text-yellow-500" /> Salary: ${job.salary}
                                </p>
                            )}
                            <p className="flex items-center text-lg text-gray-600">
                                <FaCalendarAlt className="mr-2 text-red-500" /> Posted on: {new Date(job.postedAt).toLocaleDateString()}
                            </p>
                        </div>

                        <div className="border-t border-gray-200 pt-4">
                            <h2 className="text-2xl font-semibold mb-3 text-gray-800">Job Description</h2>
                            <p className="text-gray-700 text-sm leading-relaxed">
                                {job.description}
                            </p>
                        </div>

                        <div className="border-t border-gray-200 pt-4 mt-4">
                            <h2 className="text-2xl font-semibold mb-3 text-gray-800">Responsibilities</h2>
                            <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                {job.responsibilities?.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="border-t border-gray-200 pt-4 mt-4">
                            <h2 className="text-2xl font-semibold mb-3 text-gray-800">Requirements</h2>
                            <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                {job.requirements?.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex justify-center mt-6">
                            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 shadow-md">
                                Apply Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default SingleJob;
