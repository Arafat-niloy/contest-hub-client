import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaTrashAlt, FaUserShield, FaUserTie, FaUsers } from "react-icons/fa";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const handleUpdateRole = (user, newRole) => {
        Swal.fire({
            title: `Promote to ${newRole}?`,
            text: `Do you want to grant ${newRole} privileges to ${user.name}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#FF642F",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Update!",
            background: "#1f2937", // Dark mode background
            color: "#fff" // Dark mode text
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/role/${user._id}`, { role: newRole })
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Updated!",
                                text: `${user.name} is now a ${newRole}!`,
                                icon: "success",
                                confirmButtonColor: "#FF642F",
                                background: "#1f2937",
                                color: "#fff"
                            });
                        }
                    })
            }
        });
    }

    const handleDeleteUser = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            background: "#1f2937",
            color: "#fff"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "User has been deleted.",
                                icon: "success",
                                confirmButtonColor: "#FF642F",
                                background: "#1f2937",
                                color: "#fff"
                            });
                        }
                    })
            }
        });
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
                <span className="loading loading-spinner loading-lg text-[#FF642F]"></span>
            </div>
        );
    }

    return (
        // ✅ Main Container Dark Mode
        <div className="p-8 bg-gray-50 dark:bg-gray-900 min-h-screen w-full font-sans text-[#1A1A1A] dark:text-gray-100 transition-colors duration-300">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
                        <FaUsers className="text-[#FF642F]" /> Manage Users
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Control user roles and access from here.</p>
                </div>
                {/* Stats Box Dark Mode */}
                <div className="bg-white dark:bg-gray-800 px-6 py-3 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mt-4 md:mt-0 transition-colors">
                    <span className="font-bold text-gray-600 dark:text-gray-300">Total Users: </span>
                    <span className="text-[#FF642F] font-bold text-xl ml-2">{users.length}</span>
                </div>
            </div>

            {/* Table Container Dark Mode */}
            <div className="overflow-hidden bg-white dark:bg-gray-800 shadow-xl rounded-2xl border border-gray-100 dark:border-gray-700 transition-colors">
                <table className="table w-full">
                    {/* Head */}
                    <thead className="bg-orange-50 dark:bg-gray-700 text-[#FF642F] dark:text-[#FF642F] text-sm uppercase tracking-wider">
                        <tr>
                            <th className="py-5 pl-8">#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Current Role</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                        {users.map((user, index) => (
                            <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors duration-200">
                                <th className="pl-8 text-gray-400 dark:text-gray-500">{index + 1}</th>
                                <td className="font-bold text-gray-700 dark:text-gray-200">{user.name}</td>
                                <td className="text-gray-500 dark:text-gray-400">{user.email}</td>
                                
                                {/* Role Badge with Dark Mode */}
                                <td>
                                    {user.role === 'admin' ? (
                                        <span className="inline-flex items-center gap-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 py-1 px-3 rounded-full text-xs font-bold border border-green-200 dark:border-green-800">
                                            Admin
                                        </span>
                                    ) : user.role === 'creator' ? (
                                        <span className="inline-flex items-center gap-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 py-1 px-3 rounded-full text-xs font-bold border border-blue-200 dark:border-blue-800">
                                            Creator
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 py-1 px-3 rounded-full text-xs font-bold border border-gray-200 dark:border-gray-600">
                                            User
                                        </span>
                                    )}
                                </td>

                                {/* Action Buttons with Dark Mode */}
                                <td className="flex justify-center gap-3 py-4">
                                    {/* Make Creator Button */}
                                    {user.role !== 'creator' && (
                                        <div className="tooltip" data-tip="Make Creator">
                                            <button
                                                onClick={() => handleUpdateRole(user, 'creator')}
                                                className="btn btn-sm btn-circle bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white border-blue-200 dark:border-blue-800 hover:border-blue-600 transition-all duration-300 shadow-sm"
                                            >
                                                <FaUserTie className="text-base" />
                                            </button>
                                        </div>
                                    )}
                                    
                                    {/* Make Admin Button */}
                                    {user.role !== 'admin' && (
                                        <div className="tooltip" data-tip="Make Admin">
                                            <button
                                                onClick={() => handleUpdateRole(user, 'admin')}
                                                className="btn btn-sm btn-circle bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-600 hover:text-white border-green-200 dark:border-green-800 hover:border-green-600 transition-all duration-300 shadow-sm"
                                            >
                                                <FaUserShield className="text-base" />
                                            </button>
                                        </div>
                                    )}

                                    {/* Delete Button */}
                                    <div className="tooltip" data-tip="Delete User">
                                        <button
                                            onClick={() => handleDeleteUser(user)}
                                            className="btn btn-sm btn-circle bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 hover:bg-red-500 hover:text-white border-red-200 dark:border-red-800 hover:border-red-500 transition-all duration-300 shadow-sm"
                                        >
                                            <FaTrashAlt className="text-base" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Empty State */}
                {users.length === 0 && (
                    <div className="text-center py-20 text-gray-400 dark:text-gray-500">
                        <p>No users found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageUsers;