import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaTrashAlt, FaUserShield, FaUserTie } from "react-icons/fa"; // আইকন ইমপোর্ট

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const handleUpdateRole = (user, newRole) => {
        Swal.fire({
            title: `Make ${newRole}?`,
            text: `Do you want to promote ${user.name} to ${newRole}?`,
            icon: "warning",
            showCancelButton: true,
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
                                icon: "success"
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
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire("Deleted!", "User has been deleted.", "success");
                        }
                    })
            }
        });
    }

    return (
        <div className="w-full px-4 my-10">
            <h2 className="text-3xl font-bold text-center mb-6">Manage Users: {users.length}</h2>
            <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                <table className="table w-full">
                    <thead className="bg-slate-800 text-white">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id} className="hover:bg-gray-50 border-b">
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td className="font-bold capitalize text-gray-600">
                                    {user.role === 'admin' ? 'Admin' : user.role === 'creator' ? 'Creator' : 'User'}
                                </td>
                                <td className="flex justify-center gap-2">
                                    {/* Creator Button */}
                                    {user.role !== 'creator' && (
                                        <button
                                            onClick={() => handleUpdateRole(user, 'creator')}
                                            className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white border-none tooltip"
                                            data-tip="Make Creator">
                                            <FaUserTie className="text-lg" />
                                        </button>
                                    )}
                                    
                                    {/* Admin Button */}
                                    {user.role !== 'admin' && (
                                        <button
                                            onClick={() => handleUpdateRole(user, 'admin')}
                                            className="btn btn-sm bg-green-500 hover:bg-green-600 text-white border-none tooltip"
                                            data-tip="Make Admin">
                                            <FaUserShield className="text-lg" />
                                        </button>
                                    )}

                                    {/* Delete Button */}
                                    <button
                                        onClick={() => handleDeleteUser(user)}
                                        className="btn btn-sm bg-red-500 hover:bg-red-600 text-white border-none tooltip"
                                        data-tip="Delete User">
                                        <FaTrashAlt className="text-lg" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;