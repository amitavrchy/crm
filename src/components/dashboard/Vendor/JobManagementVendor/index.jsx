'use client';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { faker } from '@faker-js/faker';
import { FaCheck, FaUserPlus, FaTrash } from 'react-icons/fa';

// Generate fake assigned jobs
const generateFakeJobs = () => {
    return Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        title: faker.person.jobTitle(),
        description: faker.lorem.sentence(),
        vendor: faker.company.name(),
        employee: null,
        createdAt: faker.date.past().toDateString(),
        status: faker.helpers.arrayElement(['Ongoing', 'Completed', 'Pending']),
    }));
};

export default function JobManagementVendor() {
    const [jobs, setJobs] = useState(generateFakeJobs());

    // Assign Employee
    const handleAssignEmployee = async (id) => {
        const { value } = await Swal.fire({
            title: 'Assign Employee',
            input: 'text',
            inputLabel: 'Enter Employee Name',
            showCancelButton: true,
            confirmButtonText: 'Assign',
        });

        if (value) {
            setJobs(jobs.map(job => job.id === id ? { ...job, employee: value } : job));
            Swal.fire('Success!', `Employee ${value} assigned successfully.`, 'success');
        }
    };

    // Mark Job as Completed
    const handleCompleteJob = (id) => {
        setJobs(jobs.map(job => job.id === id ? { ...job, status: 'Completed' } : job));
        Swal.fire('Completed!', 'Job has been marked as completed.', 'success');
    };

    // Remove Vendor from Job
    const handleRemoveJob = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This action cannot be undone!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, remove it!',
        }).then((result) => {
            if (result.isConfirmed) {
                setJobs(jobs.filter(job => job.id !== id));
                Swal.fire('Removed!', 'Job has been removed.', 'error');
            }
        });
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-6 text-center">Vendor Job Management</h1>
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-6xl overflow-x-auto">
                <table className="w-full table-auto border-collapse border border-gray-300 text-sm md:text-base">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="border border-gray-300 p-3">Title</th>
                            <th className="border border-gray-300 p-3">Description</th>
                            <th className="border border-gray-300 p-3">Vendor</th>
                            <th className="border border-gray-300 p-3">Assigned Employee</th>
                            <th className="border border-gray-300 p-3">Created On</th>
                            <th className="border border-gray-300 p-3">Status</th>
                            <th className="border border-gray-300 p-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.map((job) => (
                            <tr key={job.id} className="bg-white border-b border-gray-200 text-center hover:bg-gray-100">
                                <td className="border border-gray-300 p-3">{job.title}</td>
                                <td className="border border-gray-300 p-3 truncate max-w-xs">{job.description}</td>
                                <td className="border border-gray-300 p-3 font-semibold">{job.vendor}</td>
                                <td className="border border-gray-300 p-3">{job.employee || 'Not Assigned'}</td>
                                <td className="border border-gray-300 p-3">{job.createdAt}</td>
                                <td className={`border border-gray-300 p-3 font-semibold ${job.status === 'Completed' ? 'text-green-600' : 'text-yellow-600'}`}>{job.status}</td>
                                <td className="border border-gray-300 p-3 flex justify-center gap-2 flex-wrap">
                                    {job.status !== 'Completed' && (
                                        <button onClick={() => handleAssignEmployee(job.id)} className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
                                            <FaUserPlus className="mr-2" /> Assign
                                        </button>
                                    )}
                                    {job.status !== 'Completed' && (
                                        <button onClick={() => handleCompleteJob(job.id)} className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center">
                                            <FaCheck className="mr-2" /> Complete
                                        </button>
                                    )}
                                    <button onClick={() => handleRemoveJob(job.id)} className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center">
                                        <FaTrash className="mr-2" /> Remove
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
