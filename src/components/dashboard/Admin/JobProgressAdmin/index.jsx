"use client";
import React, { useState } from "react";
import { faker } from "@faker-js/faker";
import { FiSearch } from "react-icons/fi";
import { MdEdit, MdDelete, MdSave } from "react-icons/md";

function generateMockJobs(count) {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    title: faker.company.catchPhrase(),
    client: faker.company.name(),
    vendor: faker.person.fullName(),
    startDate: faker.date.past().toLocaleDateString(),
    status: faker.helpers.arrayElement(["Not Started", "In Progress", "Completed"]),
    progress: faker.number.int({ min: 0, max: 100 }),
  }));
}

function JobProgressAdmin() {
  const [jobs, setJobs] = useState(generateMockJobs(8));
  const [searchTerm, setSearchTerm] = useState("");
  const [editingJob, setEditingJob] = useState(null);
  const [editValues, setEditValues] = useState({});

  const handleDelete = (id) => {
    setJobs(jobs.filter((job) => job.id !== id));
  };

  const handleEdit = (job) => {
    setEditingJob(job.id);
    setEditValues({ ...job });
  };

  const handleSave = () => {
    setJobs(jobs.map((job) => (job.id === editingJob ? editValues : job)));
    setEditingJob(null);
  };

  const handleChange = (e) => {
    setEditValues({ ...editValues, [e.target.name]: e.target.value });
  };

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Job Progress Dashboard</h1>
      
      <div className="mb-6 flex items-center bg-gray-100 p-3 rounded-lg shadow-md">
        <FiSearch className="mr-3 text-gray-500" />
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent outline-none w-full"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500 hover:shadow-2xl transition"
          >
            {editingJob === job.id ? (
              <input
                name="title"
                value={editValues.title}
                onChange={handleChange}
                className="text-xl font-semibold text-gray-900 border p-1 w-full"
              />
            ) : (
              <h2 className="text-xl font-semibold text-gray-900">{job.title}</h2>
            )}

            <p className="text-gray-600">Client: {job.client}</p>
            <p className="text-gray-600">Vendor: {job.vendor}</p>
            <p className="text-gray-600">Start Date: {job.startDate}</p>
            <p
              className={`mt-2 inline-block px-3 py-1 rounded-full text-sm font-medium text-white ${
                job.status === "Completed"
                  ? "bg-green-500"
                  : job.status === "In Progress"
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
            >
              {job.status}
            </p>
            <div className="mt-4 relative w-full h-2 bg-gray-200 rounded-full">
              <div
                className="absolute h-full bg-blue-500 rounded-full"
                style={{ width: `${job.progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-1">Progress: {job.progress}%</p>
            
            <div className="flex justify-end mt-4 space-x-3">
              {editingJob === job.id ? (
                <button onClick={handleSave} className="bg-green-500 text-white px-3 py-1 rounded-lg flex items-center">
                  <MdSave className="mr-1" /> Save
                </button>
              ) : (
                <button onClick={() => handleEdit(job)} className="bg-blue-500 text-white px-3 py-1 rounded-lg flex items-center">
                  <MdEdit className="mr-1" /> Edit
                </button>
              )}
              <button onClick={() => handleDelete(job.id)} className="bg-red-500 text-white px-3 py-1 rounded-lg flex items-center">
                <MdDelete className="mr-1" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobProgressAdmin;
