import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { FaTrash, FaListAlt, FaEye } from "react-icons/fa";
import Swal from "sweetalert2";

const MyCreatedContest = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [contests, setContests] = useState([]);
    const [loading, setLoading] = useState(true);

    // ডাটা লোড করা
    useEffect(() => {
        if (user?.email) {
            setLoading(true);
            axiosSecure.get(`/contests/creator/${user.email}`)
                .then(res => {
                    setContests(res.data);
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }
    }, [user, axiosSecure]);

    // কন্টেস্ট ডিলিট করার ফাংশন
    const handleDelete = (id) => {
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
                axiosSecure.delete(`/contests/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your contest has been deleted.",
                                icon: "success",
                                confirmButtonColor: "#FF642F"
                            });
                            // UI থেকে ডিলিট হওয়া আইটেম সরিয়ে ফেলা
                            const remaining = contests.filter(contest => contest._id !== id);
                            setContests(remaining);
                        }
                    })
            }
        });
    }

    if (loading) {
        return <div className="flex justify-center items-center h-screen"><span className="loading loading-spinner loading-lg text-[#FF642F]"></span></div>;
    }

    return (
        <div className="p-8 bg-gray-50 min-h-screen w-full font-sans text-[#1A1A1A]">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                        <FaListAlt className="text-[#FF642F]" /> My Created Contests
                    </h2>
                    <p className="text-gray-500 mt-1">Manage all the contests you have published.</p>
                </div>
                <div className="bg-white px-6 py-3 rounded-xl shadow-sm border border-gray-200 mt-4 md:mt-0">
                    <span className="font-bold text-gray-600">Total Contests: </span>
                    <span className="text-[#FF642F] font-bold text-xl ml-2">{contests.length}</span>
                </div>
            </div>

            {/* Table Container */}
            <div className="overflow-hidden bg-white shadow-xl rounded-2xl border border-gray-100">
                <table className="table w-full">
                    {/* Head */}
                    <thead className="bg-orange-50 text-[#FF642F] text-sm uppercase tracking-wider">
                        <tr>
                            <th className="py-5 pl-8">#</th>
                            <th>Image</th>
                            <th>Contest Name</th>
                            <th>Status</th>
                            <th className="text-center">Action</th>
                            <th className="text-center">Submissions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {
                            contests.map((contest, index) => (
                                <tr key={contest._id} className="hover:bg-gray-50 transition-colors duration-200">
                                    <th className="pl-8 text-gray-400">{index + 1}</th>
                                    
                                    {/* Image */}
                                    <td>
                                        <div className="avatar">
                                            <div className="w-14 h-14 rounded-xl shadow-sm border border-gray-100">
                                                <img 
                                                    src={contest.image} 
                                                    alt="Contest" 
                                                    className="object-cover"
                                                    onError={(e) => { e.target.src = "https://i.ibb.co/xz9s2wN/placeholder.jpg" }}
                                                />
                                            </div>
                                        </div>
                                    </td>

                                    {/* Contest Name */}
                                    <td className="font-bold text-gray-700 text-base">
                                        {contest.contestName}
                                    </td>

                                    {/* Status Badge */}
                                    <td>
                                        {contest.status === 'accepted' ? (
                                            <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 py-1 px-3 rounded-full text-xs font-bold border border-green-200">
                                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                                Accepted
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 py-1 px-3 rounded-full text-xs font-bold border border-yellow-200">
                                                <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
                                                Pending
                                            </span>
                                        )}
                                    </td>

                                    {/* Delete Action */}
                                    <td className="flex justify-center py-6">
                                        <div className="tooltip" data-tip="Delete Contest">
                                            <button 
                                                onClick={() => handleDelete(contest._id)}
                                                className="btn btn-sm btn-circle bg-red-50 text-red-500 hover:bg-red-500 hover:text-white border-red-200 hover:border-red-500 transition-all duration-300 shadow-sm hover:shadow-md"
                                            >
                                                <FaTrash className="text-sm"/>
                                            </button>
                                        </div>
                                    </td>

                                    {/* View Submissions */}
                                    <td className="text-center">
                                        <Link to={`/dashboard/contest/submitted/${contest._id}`}>
                                            <button className="btn btn-sm bg-white text-[#FF642F] border border-[#FF642F] hover:bg-[#FF642F] hover:text-white transition-all duration-300 flex items-center gap-2 mx-auto">
                                                <FaEye /> See Submissions
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

                {/* Empty State */}
                {contests.length === 0 && (
                    <div className="text-center py-20 text-gray-400">
                        <p>You haven't created any contests yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyCreatedContest;