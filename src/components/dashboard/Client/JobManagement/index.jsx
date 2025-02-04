'use client';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { faker } from '@faker-js/faker';
import { FaEdit, FaTrash, FaUsers, FaCheckCircle } from 'react-icons/fa';

// Generate fake job postings
const generateFakeJobs = () => {
    return Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        title: faker.person.jobTitle(),
        description: faker.lorem.sentence(),
        status: 'Open',
        applicants: faker.number.int({ min: 1, max: 10 }),
    }));
};

export default function JobManagement() {
    const [jobs, setJobs] = useState(generateFakeJobs());

    // Create a new job
    const handleCreateJob = () => {
        Swal.fire({
            title: 'Create New Job',
            input: 'text',
            inputLabel: 'Enter Job Title',
            showCancelButton: true,
            confirmButtonText: 'Create',
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                const newJob = {
                    id: jobs.length + 1,
                    title: result.value,
                    description: faker.lorem.sentence(),
                    status: 'Open',
                    applicants: 0,
                };
                setJobs([...jobs, newJob]);
                Swal.fire('Success!', 'Job created successfully.', 'success');
            }
        });
    };

    // Edit Job
    const handleEditJob = (id) => {
        Swal.fire({
            title: 'Edit Job',
            input: 'text',
            inputLabel: 'Update Job Title',
            showCancelButton: true,
            confirmButtonText: 'Update',
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                setJobs(jobs.map(job => job.id === id ? { ...job, title: result.value } : job));
                Swal.fire('Updated!', 'Job has been updated.', 'success');
            }
        });
    };

    // Delete Job
    const handleDeleteJob = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        }).then((result) => {
            if (result.isConfirmed) {
                setJobs(jobs.filter(job => job.id !== id));
                Swal.fire('Deleted!', 'Job has been deleted.', 'error');
            }
        });
    };

    // View Applicants
    const handleViewApplicants = (job) => {
        Swal.fire({
            title: `Applicants for ${job.title}`,
            text: `${job.applicants} applicants have applied.`,
            icon: 'info',
        });
    };

    // Mark Job as Completed
    const handleMarkCompleted = (id) => {
        setJobs(jobs.map(job => job.id === id ? { ...job, status: 'Completed' } : job));
        Swal.fire('Completed!', 'Job has been marked as completed.', 'success');
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-6 text-center">Client Job Management</h1>
            <button onClick={handleCreateJob} className="mb-4 bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-md">
                + Create Job
            </button>
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-6xl overflow-x-auto">
                <table className="w-full table-auto border-collapse border border-gray-300 text-sm md:text-base">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="border border-gray-300 p-3">Title</th>
                            <th className="border border-gray-300 p-3">Description</th>
                            <th className="border border-gray-300 p-3">Status</th>
                            <th className="border border-gray-300 p-3">Applicants</th>
                            <th className="border border-gray-300 p-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.map((job) => (
                            <tr key={job.id} className="bg-white border-b border-gray-200 text-center hover:bg-gray-100">
                                <td className="border border-gray-300 p-3">{job.title}</td>
                                <td className="border border-gray-300 p-3">{job.description}</td>
                                <td className={`border border-gray-300 p-3 font-semibold ${job.status === 'Completed' ? 'text-green-600' : job.status === 'In Progress' ? 'text-yellow-600' : 'text-blue-600'}`}>{job.status}</td>
                                <td className="border border-gray-300 p-3">{job.applicants}</td>
                                <td className="border border-gray-300 p-3 flex justify-center gap-2 flex-wrap">
                                    <button onClick={() => handleEditJob(job.id)} className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
                                        <FaEdit className="mr-2" /> Edit
                                    </button>
                                    <button onClick={() => handleDeleteJob(job.id)} className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center">
                                        <FaTrash className="mr-2" /> Delete
                                    </button>
                                    <button onClick={() => handleViewApplicants(job)} className="bg-purple-500 hover:bg-purple-700 text-white px-4 py-2 rounded-md flex items-center">
                                        <FaUsers className="mr-2" /> View Applicants
                                    </button>
                                    <button onClick={() => handleMarkCompleted(job.id)} className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center">
                                        <FaCheckCircle className="mr-2" /> Mark as Completed
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