import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa"; // FaEdit রিমুভ করা হয়েছে
import Swal from "sweetalert2";

const MyCreatedContest = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [contests, setContests] = useState([]);

    // ডাটা লোড করা
    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/contests/creator/${user.email}`)
                .then(res => {
                    setContests(res.data);
                })
        }
    }, [user, axiosSecure]);

    // কন্টেস্ট ডিলিট করার ফাংশন
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                
                axiosSecure.delete(`/contests/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your contest has been deleted.",
                                icon: "success"
                            });
                            // UI থেকে ডিলিট হওয়া আইটেম সরিয়ে ফেলা
                            const remaining = contests.filter(contest => contest._id !== id);
                            setContests(remaining);
                        }
                    })
            }
        });
    }

    return (
        <div className="w-full px-2 lg:px-10 my-10">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
                My Created Contests: {contests.length}
            </h2>
            
            <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-200">
                <table className="table w-full">
                    {/* head */}
                    <thead className="bg-indigo-600 text-white text-lg">
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Contest Name</th>
                            <th>Status</th>
                            <th className="text-center">Action</th>
                            <th className="text-center">Submissions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            contests.map((contest, index) => <tr key={contest._id} className="hover:bg-gray-50 border-b">
                                <th className="pl-6">{index + 1}</th>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={contest.image} alt="Contest" />
                                        </div>
                                    </div>
                                </td>
                                <td className="font-semibold text-gray-700">{contest.contestName}</td>
                                <td>
                                    {contest.status === 'accepted' ? 
                                        <span className="badge badge-success text-white p-3 font-bold">Accepted</span> : 
                                        <span className="badge badge-warning p-3 font-bold">Pending</span>
                                    }
                                </td>
                                <td className="flex justify-center py-4">
                                    {/* Only Delete Button */}
                                    <button 
                                        onClick={() => handleDelete(contest._id)}
                                        className="btn btn-ghost btn-sm tooltip" 
                                        data-tip="Delete"
                                    >
                                        <FaTrash className="text-lg text-red-600"/>
                                    </button>
                                </td>
                                <td className="text-center">
                                    <Link to={`/dashboard/contest/submitted/${contest._id}`}>
                                        <button className="btn btn-sm btn-outline btn-accent">
                                            See Submissions
                                        </button>
                                    </Link>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyCreatedContest;