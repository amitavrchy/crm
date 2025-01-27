"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaCalendarAlt,
} from "react-icons/fa";

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
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column: Job Details */}
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold mb-4 text-gray-800">{job.title}</h1>

            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
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
                <p className="text-gray-700 text-sm leading-relaxed">{job.description}</p>
              </div>

              <div className="border-t border-gray-200 pt-4 mt-4">
                <h2 className="text-2xl font-semibold mb-3 text-gray-800">Responsibilities</h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Respond to all enquiries professionally and promptly.</li>
                  <li>Collect payments and manage financial transactions.</li>
                  <li>Assess borrowers' circumstances and provide solutions.</li>
                  <li>Handle telephone queries and maintain detailed records.</li>
                  <li>Collaborate with team members to improve processes.</li>
                </ul>
              </div>

              <div className="border-t border-gray-200 pt-4 mt-4">
                <h2 className="text-2xl font-semibold mb-3 text-gray-800">Requirements</h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Previous experience in collections or financial services.</li>
                  <li>Excellent communication and problem-solving skills.</li>
                  <li>Ability to manage multiple tasks efficiently.</li>
                  <li>Strong attention to detail and organizational skills.</li>
                  <li>Proficiency with financial software and tools.</li>
                </ul>
              </div>
            </div>

            <div className="flex justify-center">
              <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 shadow-md">
                Apply Now
              </button>
            </div>
          </div>

          {/* Right Column: Sticky Contact Card */}
          <div className="md:col-span-1">
            <div className="sticky top-20 bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Details</h2>
              <p className="text-gray-700 mb-2">
                <span className="font-bold">Name:</span> Mark Kirby
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-bold">Email:</span> mark.kirby@huntress.co.uk
              </p>
              <p className="text-gray-700">
                <span className="font-bold">Phone:</span> 01622 679 779
              </p>
              <button className="mt-6 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 w-full">
                Contact Now
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



{/* <div className="border-t border-gray-200 pt-4 mt-4">
                            <h2 className="text-2xl font-semibold mb-3 text-gray-800">Responsibilities</h2>
                            <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                {/* {job.responsibilities?.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))} */}
{/* </ul>
                </div>

                <div className="border-t border-gray-200 pt-4 mt-4">
                    <h2 className="text-2xl font-semibold mb-3 text-gray-800">Requirements</h2>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        {/* {job.requirements?.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))} */}
{/* </ul>
                </div> */}