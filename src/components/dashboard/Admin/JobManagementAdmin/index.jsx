'use client';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { faker } from '@faker-js/faker';
import { FaCheck, FaTimes, FaUserPlus } from 'react-icons/fa';

// Generate fake job postings
const generateFakeJobs = () => {
    return Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        title: faker.person.jobTitle(),
        description: faker.lorem.sentence(),
        status: faker.helpers.arrayElement(['Pending', 'Approved', 'Rejected']),
        vendor: null,
    }));
};

export default function JobManagementAdmin() {
    const [jobs, setJobs] = useState(generateFakeJobs());

    // Approve Job
    const handleApprove = (id) => {
        setJobs(jobs.map(job => job.id === id ? { ...job, status: 'Approved' } : job));
        Swal.fire('Approved!', 'Job has been approved.', 'success');
    };

    // Reject Job
    const handleReject = (id) => {
        setJobs(jobs.map(job => job.id === id ? { ...job, status: 'Rejected' } : job));
        Swal.fire('Rejected!', 'Job has been rejected.', 'error');
    };

    // Assign Vendor
    const handleAssignVendor = (id) => {
        Swal.fire({
            title: 'Assign Vendor',
            input: 'text',
            inputLabel: 'Enter Vendor Name',
            showCancelButton: true,
            confirmButtonText: 'Assign',
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                setJobs(jobs.map(job => job.id === id ? { ...job, vendor: result.value } : job));
                Swal.fire('Success!', 'Vendor assigned successfully.', 'success');
            }
        });
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-6 text-center">Job Management</h1>
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-6xl overflow-x-auto">
                <table className="w-full table-auto border-collapse border border-gray-300 text-sm md:text-base">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="border border-gray-300 p-3">Title</th>
                            <th className="border border-gray-300 p-3">Description</th>
                            <th className="border border-gray-300 p-3">Status</th>
                            <th className="border border-gray-300 p-3">Vendor</th>
                            <th className="border border-gray-300 p-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.map((job) => (
                            <tr key={job.id} className="bg-white border-b border-gray-200 text-center hover:bg-gray-100">
                                <td className="border border-gray-300 p-3">{job.title}</td>
                                <td className="border border-gray-300 p-3">{job.description}</td>
                                <td className={`border border-gray-300 p-3 font-semibold ${job.status === 'Approved' ? 'text-green-600' : job.status === 'Rejected' ? 'text-red-600' : 'text-yellow-600'}`}>{job.status}</td>
                                <td className="border border-gray-300 p-3">{job.vendor || 'Not Assigned'}</td>
                                <td className="border border-gray-300 p-3 flex justify-center gap-2 flex-wrap">
                                    {job.status === 'Pending' && (
                                        <>
                                            <button onClick={() => handleApprove(job.id)} className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center">
                                                <FaCheck className="mr-2" /> Approve
                                            </button>
                                            <button onClick={() => handleReject(job.id)} className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center">
                                                <FaTimes className="mr-2" /> Reject
                                            </button>
                                        </>
                                    )}
                                    <button onClick={() => handleAssignVendor(job.id)} className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
                                        <FaUserPlus className="mr-2" /> Assign Vendor
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
