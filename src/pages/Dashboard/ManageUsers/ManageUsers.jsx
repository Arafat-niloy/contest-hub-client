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
            confirmButtonText: "Yes, Update!"
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
                                confirmButtonColor: "#FF642F"
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
            confirmButtonText: "Yes, delete it!"
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
                                confirmButtonColor: "#FF642F"
                            });
                        }
                    })
            }
        });
    }

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen"><span className="loading loading-spinner loading-lg text-[#FF642F]"></span></div>;
    }

    return (
        <div className="p-8 bg-gray-50 min-h-screen w-full font-sans text-[#1A1A1A]">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                        <FaUsers className="text-[#FF642F]" /> Manage Users
                    </h2>
                    <p className="text-gray-500 mt-1">Control user roles and access from here.</p>
                </div>
                <div className="bg-white px-6 py-3 rounded-xl shadow-sm border border-gray-200 mt-4 md:mt-0">
                    <span className="font-bold text-gray-600">Total Users: </span>
                    <span className="text-[#FF642F] font-bold text-xl ml-2">{users.length}</span>
                </div>
            </div>

            {/* Table Container */}
            <div className="overflow-hidden bg-white shadow-xl rounded-2xl border border-gray-100">
                <table className="table w-full">
                    {/* Head */}
                    <thead className="bg-orange-50 text-[#FF642F] text-sm uppercase tracking-wider">
                        <tr>
                            <th className="py-5 pl-8">#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Current Role</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {users.map((user, index) => (
                            <tr key={user._id} className="hover:bg-gray-50 transition-colors duration-200">
                                <th className="pl-8 text-gray-400">{index + 1}</th>
                                <td className="font-bold text-gray-700">{user.name}</td>
                                <td className="text-gray-500">{user.email}</td>
                                
                                {/* Role Badge */}
                                <td>
                                    {user.role === 'admin' ? (
                                        <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 py-1 px-3 rounded-full text-xs font-bold border border-green-200">
                                            Admin
                                        </span>
                                    ) : user.role === 'creator' ? (
                                        <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 py-1 px-3 rounded-full text-xs font-bold border border-blue-200">
                                            Creator
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 py-1 px-3 rounded-full text-xs font-bold border border-gray-200">
                                            User
                                        </span>
                                    )}
                                </td>

                                {/* Action Buttons */}
                                <td className="flex justify-center gap-3 py-4">
                                    {/* Make Creator Button */}
                                    {user.role !== 'creator' && (
                                        <div className="tooltip" data-tip="Make Creator">
                                            <button
                                                onClick={() => handleUpdateRole(user, 'creator')}
                                                className="btn btn-sm btn-circle bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white border-blue-200 hover:border-blue-600 transition-all duration-300 shadow-sm"
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
                                                className="btn btn-sm btn-circle bg-green-50 text-green-600 hover:bg-green-600 hover:text-white border-green-200 hover:border-green-600 transition-all duration-300 shadow-sm"
                                            >
                                                <FaUserShield className="text-base" />
                                            </button>
                                        </div>
                                    )}

                                    {/* Delete Button */}
                                    <div className="tooltip" data-tip="Delete User">
                                        <button
                                            onClick={() => handleDeleteUser(user)}
                                            className="btn btn-sm btn-circle bg-red-50 text-red-500 hover:bg-red-500 hover:text-white border-red-200 hover:border-red-500 transition-all duration-300 shadow-sm"
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
                    <div className="text-center py-20 text-gray-400">
                        <p>No users found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageUsers;