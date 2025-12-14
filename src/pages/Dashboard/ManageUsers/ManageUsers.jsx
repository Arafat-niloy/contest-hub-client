import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    
    // TanStack Query দিয়ে ডাটা লোড করা হচ্ছে
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    // রোল চেঞ্জ করার ফাংশন
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
                            refetch(); // ডাটা রিফ্রেশ
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

    // ইউজার ডিলিট করার ফাংশন
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
        <div className="p-6">
            <h2 className="text-3xl font-bold text-center mb-6">Manage Users: {users.length}</h2>
            <div className="overflow-x-auto rounded-t-lg shadow-md">
                <table className="table bg-white">
                    {/* head */}
                    <thead className="bg-primary text-white text-lg">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr key={user._id} className="hover:bg-gray-50">
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td className="font-bold text-primary capitalize">{user.role || 'User'}</td>
                                <td className="flex justify-center gap-2">
                                    {/* Creator বাটন */}
                                    { user.role !== 'creator' && 
                                        <button 
                                            onClick={() => handleUpdateRole(user, 'creator')}
                                            className="btn btn-xs btn-info text-white">
                                            Make Creator
                                        </button>
                                    }
                                    
                                    {/* Admin বাটন */}
                                    { user.role !== 'admin' && 
                                        <button 
                                            onClick={() => handleUpdateRole(user, 'admin')}
                                            className="btn btn-xs btn-success text-white">
                                            Make Admin
                                        </button>
                                    }

                                    {/* Delete বাটন */}
                                    <button 
                                        onClick={() => handleDeleteUser(user)}
                                        className="btn btn-xs btn-error text-white">
                                        Delete
                                    </button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;