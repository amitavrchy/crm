"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaBuilding, FaMapMarkerAlt, FaMoneyBillWave } from "react-icons/fa";

function AllJobsHomePage() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        async function fetchJobs() {
            try {
                const res = await fetch("/jobs.json");
                if (res.ok) {
                    const data = await res.json();
                    setJobs(data.slice(0, 6)); // Fetch only the first 6 jobs
                } else {
                    setError("Failed to fetch jobs. Please try again later.");
                }
            } catch (error) {
                setError("An error occurred while fetching jobs.");
            } finally {
                setLoading(false);
            }
        }

        fetchJobs();
    }, []);

    const handleViewAllJobs = () => {
        router.push("/allJobs");
    };

    const handleJobClick = (jobId) => {
        router.push(`/singleJob/${jobId}`);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-800">
                <p className="text-lg font-semibold">Loading jobs...</p>
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
        <div className="bg-gray-50 text-gray-800 py-12">
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-3xl font-bold text-center mb-8">Featured Job Opportunities</h1>

                {/* Job Listings */}
                {jobs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {jobs.map((job) => (
                            <div
                                key={job._id}
                                onClick={() => handleJobClick(job._id)}
                                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all cursor-pointer"
                            >
                                <h2 className="text-xl font-bold text-gray-700 mb-2">{job.title}</h2>
                                <p className="flex items-center text-sm text-gray-600 mb-2">
                                    <FaBuilding className="mr-2" /> {job.company}
                                </p>
                                <p className="flex items-center text-sm text-gray-600 mb-2">
                                    <FaMapMarkerAlt className="mr-2" /> {job.location}
                                </p>
                                <p className="text-sm text-gray-700 mb-4">{job.description}</p>
                                {job.salary && (
                                    <p className="flex items-center text-sm text-green-600 font-semibold">
                                        <FaMoneyBillWave className="mr-2" /> Salary: ${job.salary}
                                    </p>
                                )}
                                <p className="text-xs text-gray-500 mt-4">
                                    Posted on: {new Date(job.postedAt).toLocaleDateString()}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-600">No jobs available at the moment.</p>
                )}

                {/* View All Jobs Button */}
                <div className="flex justify-center mt-8">
                    <button
                        onClick={handleViewAllJobs}
                        className="px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-all"
                    >
                        View All Jobs
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AllJobsHomePage;
