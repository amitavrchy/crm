"use client";
import React, { useState, useEffect } from "react";
import { faker } from "@faker-js/faker";

const generateApplications = (count = 10) => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    applicantName: faker.person.fullName(),
    email: faker.internet.email(),
    position: faker.person.jobTitle(),
    status: faker.helpers.arrayElement(["Pending", "Approved", "Rejected"]),
    date: faker.date.recent().toLocaleDateString(),
    avatar: faker.image.avatar(),
  }));
};

export default function ApplicationManagementE() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    setApplications(generateApplications(15));
  }, []);

  // Function to update status
  const updateStatus = (id, newStatus) => {
    setApplications((prevApplications) =>
      prevApplications.map((app) =>
        app.id === id ? { ...app, status: newStatus } : app
      )
    );
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Application Management Dashboard</h1>
      <p className="text-gray-700 mb-4">
        Welcome to your admin dashboard. Here you can manage all the applications efficiently.
      </p>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left border-b">Avatar</th>
              <th className="py-3 px-4 text-left border-b">Name</th>
              <th className="py-3 px-4 text-left border-b">Email</th>
              <th className="py-3 px-4 text-left border-b">Position</th>
              <th className="py-3 px-4 text-left border-b">Status</th>
              <th className="py-3 px-4 text-left border-b">Date</th>
              <th className="py-3 px-4 text-left border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">
                  <img src={app.avatar} alt={app.applicantName} className="w-10 h-10 rounded-full" />
                </td>
                <td className="py-3 px-4">{app.applicantName}</td>
                <td className="py-3 px-4">{app.email}</td>
                <td className="py-3 px-4">{app.position}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm ${
                      app.status === "Approved"
                        ? "bg-green-500"
                        : app.status === "Rejected"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {app.status}
                  </span>
                </td>
                <td className="py-3 px-4">{app.date}</td>
                <td className="py-3 px-4">
                  <select
                    value={app.status}
                    onChange={(e) => updateStatus(app.id, e.target.value)}
                    className="p-2 border rounded-lg"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
