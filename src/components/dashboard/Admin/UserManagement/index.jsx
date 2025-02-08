// 'use client';
// import React, { useState } from 'react';
// import Swal from 'sweetalert2';
// import { faker } from '@faker-js/faker';
// import { FaUserPlus, FaEdit, FaTrash, FaTasks } from 'react-icons/fa';

// // Generate fake users data
// const generateFakeUsers = () => {
//     return Array.from({ length: 10 }, (_, i) => ({
//         id: i + 1,
//         name: faker.person.fullName(),
//         role: faker.helpers.arrayElement(['Client', 'Vendor', 'Employee']),
//         email: faker.internet.email(),
//         job: faker.company.catchPhrase(),
//     }));
// };

// export default function UserManagement() {
//     const [users, setUsers] = useState(generateFakeUsers());

//     // Handle User Deletion
//     const handleDelete = (id) => {
//         Swal.fire({
//             title: 'Are you sure?',
//             text: "This action cannot be undone!",
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#3085d6',
//             cancelButtonColor: '#d33',
//             confirmButtonText: 'Yes, delete it!'
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 setUsers(users.filter(user => user.id !== id));
//                 Swal.fire('Deleted!', 'User has been removed.', 'success');
//             }
//         });
//     };

//     // Handle Job Assignment
//     const handleAssignJob = (id) => {
//         Swal.fire({
//             title: 'Assign Job',
//             input: 'text',
//             inputLabel: 'Enter Job Title',
//             showCancelButton: true,
//             confirmButtonText: 'Assign',
//         }).then((result) => {
//             if (result.isConfirmed && result.value) {
//                 setUsers(users.map(user => user.id === id ? { ...user, job: result.value } : user));
//                 Swal.fire('Success!', 'Job assigned successfully.', 'success');
//             }
//         });
//     };

//     // Handle User Addition
//     const handleAddUser = () => {
//         Swal.fire({
//             title: 'Add New User',
//             html:
//                 '<input id="name" class="swal2-input" placeholder="Full Name">' +
//                 '<input id="email" class="swal2-input" placeholder="Email">' +
//                 '<select id="role" class="swal2-select">' +
//                 '<option>Client</option>' +
//                 '<option>Vendor</option>' +
//                 '<option>Employee</option>' +
//                 '</select>',
//             focusConfirm: false,
//             showCancelButton: true,
//             confirmButtonText: 'Add',
//             preConfirm: () => {
//                 const name = document.getElementById('name').value;
//                 const email = document.getElementById('email').value;
//                 const role = document.getElementById('role').value;
//                 if (!name || !email || !role) {
//                     Swal.showValidationMessage('Please enter all details');
//                     return false;
//                 }
//                 const newUser = {
//                     id: users.length + 1,
//                     name,
//                     email,
//                     role,
//                     job: 'Not Assigned',
//                 };
//                 setUsers([...users, newUser]);
//                 Swal.fire('Success!', 'New user added.', 'success');
//             }
//         });
//     };

//     // Handle User Editing
//     const handleEditUser = (id) => {
//         const user = users.find(user => user.id === id);
//         Swal.fire({
//             title: 'Edit User',
//             html:
//                 `<input id="name" class="swal2-input" placeholder="Full Name" value="${user.name}">` +
//                 `<input id="email" class="swal2-input" placeholder="Email" value="${user.email}">` +
//                 `<select id="role" class="swal2-select">` +
//                 `<option ${user.role === 'Client' ? 'selected' : ''}>Client</option>` +
//                 `<option ${user.role === 'Vendor' ? 'selected' : ''}>Vendor</option>` +
//                 `<option ${user.role === 'Employee' ? 'selected' : ''}>Employee</option>` +
//                 `</select>`,
//             focusConfirm: false,
//             showCancelButton: true,
//             confirmButtonText: 'Save',
//             preConfirm: () => {
//                 const name = document.getElementById('name').value;
//                 const email = document.getElementById('email').value;
//                 const role = document.getElementById('role').value;
//                 if (!name || !email || !role) {
//                     Swal.showValidationMessage('Please enter all details');
//                     return false;
//                 }
//                 setUsers(users.map(u => u.id === id ? { ...u, name, email, role } : u));
//                 Swal.fire('Success!', 'User details updated.', 'success');
//             }
//         });
//     };

//     return (
//         <div className="p-6 bg-gray-100 min-h-screen">
//             <div className="flex justify-between items-center mb-6">
//                 <h1 className="text-3xl font-bold">User Management</h1>
//                 <button onClick={handleAddUser} className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700">
//                     <FaUserPlus className="mr-2" /> Add User
//                 </button>
//             </div>
//             <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
//                 <table className="w-full table-auto border-collapse border border-gray-300">
//                     <thead>
//                         <tr className="bg-gray-200">
//                             <th className="border border-gray-300 p-2">Name</th>
//                             <th className="border border-gray-300 p-2">Role</th>
//                             <th className="border border-gray-300 p-2">Email</th>
//                             <th className="border border-gray-300 p-2">Job</th>
//                             <th className="border border-gray-300 p-2">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {users.map((user) => (
//                             <tr key={user.id} className="text-center bg-white border-b border-gray-200">
//                                 <td className="border border-gray-300 p-2">{user.name}</td>
//                                 <td className="border border-gray-300 p-2">{user.role}</td>
//                                 <td className="border border-gray-300 p-2">{user.email}</td>
//                                 <td className="border border-gray-300 p-2">{user.job}</td>
//                                 <td className="border border-gray-300 p-2">
//                                     <button onClick={() => handleEditUser(user.id)} className="px-3 py-1 bg-yellow-500 text-white rounded-md mr-2 hover:bg-yellow-700 flex items-center">
//                                         <FaEdit />
//                                     </button>
//                                     <button onClick={() => handleAssignJob(user.id)} className="px-3 py-1 bg-blue-500 text-white rounded-md mr-2 hover:bg-blue-700 flex items-center">
//                                         <FaTasks />
//                                     </button>
//                                     <button onClick={() => handleDelete(user.id)} className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-700 flex items-center">
//                                         <FaTrash />
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }