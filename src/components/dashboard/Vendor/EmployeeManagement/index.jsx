'use client';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { faker } from '@faker-js/faker';
import { FaTrash, FaChartBar } from 'react-icons/fa';

// Generate fake employee data
const generateFakeEmployees = () => {
    return Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        name: faker.person.fullName(),
        role: faker.person.jobTitle(),
        performance: faker.helpers.arrayElement(['Excellent', 'Good', 'Average', 'Poor']),
    }));
};

export default function EmployeeManagement() {
    const [employees, setEmployees] = useState(generateFakeEmployees());

    // Remove Employee
    const handleRemoveEmployee = (id) => {
        setEmployees(employees.filter(employee => employee.id !== id));
        Swal.fire('Removed!', 'Employee has been removed.', 'warning');
    };

    // Track Employee Performance
    const handleTrackPerformance = (employee) => {
        Swal.fire({
            title: `${employee.name}'s Performance`,
            text: `Performance rating: ${employee.performance}`,
            icon: 'info',
        });
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-6 text-center">Employee Management</h1>
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl overflow-x-auto">
                <table className="w-full table-auto border-collapse border border-gray-300 text-sm md:text-base">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="border border-gray-300 p-3">Name</th>
                            <th className="border border-gray-300 p-3">Role</th>
                            <th className="border border-gray-300 p-3">Performance</th>
                            <th className="border border-gray-300 p-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => (
                            <tr key={employee.id} className="bg-white border-b border-gray-200 text-center hover:bg-gray-100">
                                <td className="border border-gray-300 p-3">{employee.name}</td>
                                <td className="border border-gray-300 p-3">{employee.role}</td>
                                <td className="border border-gray-300 p-3 font-semibold">{employee.performance}</td>
                                <td className="border border-gray-300 p-3 flex justify-center gap-2 flex-wrap">
                                    <button onClick={() => handleTrackPerformance(employee)} className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
                                        <FaChartBar className="mr-2" /> Track Performance
                                    </button>
                                    <button onClick={() => handleRemoveEmployee(employee.id)} className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center">
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
