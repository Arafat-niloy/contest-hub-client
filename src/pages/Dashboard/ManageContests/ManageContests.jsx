import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaTrash, FaCheck, FaListAlt, FaTimes } from "react-icons/fa";

const ManageContests = () => {
    const axiosSecure = useAxiosSecure();

    const { data: contests = [], refetch, isLoading } = useQuery({
        queryKey: ['admin-contests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/contests/admin/all');
            return res.data;
        }
    });

    const handleApprove = (contest) => {
        axiosSecure.patch(`/contests/status/${contest._id}`, { status: 'accepted' })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Contest Approved Successfully!",
                        showConfirmButton: false,
                        timer: 1500,
                        background: "#1f2937", 
                        color: "#fff" 
                    });
                }
            })
    };

    const handleReject = (contest) => {
        axiosSecure.patch(`/contests/status/${contest._id}`, { status: 'rejected' })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "warning",
                        title: "Contest Rejected!",
                        showConfirmButton: false,
                        timer: 1500,
                        background: "#1f2937",
                        color: "#fff"
                    });
                }
            })
    };

    const handleDelete = (contest) => {
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
                axiosSecure.delete(`/contests/${contest._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Contest has been deleted.",
                                icon: "success",
                                background: "#1f2937",
                                color: "#fff"
                            });
                        }
                    })
            }
        });
    };

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
                        <FaListAlt className="text-[#FF642F]" /> Manage Contests
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Review, approve, reject or delete user submitted contests.</p>
                </div>
                {/* Stats Box Dark Mode */}
                <div className="bg-white dark:bg-gray-800 px-6 py-3 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mt-4 md:mt-0 transition-colors">
                    <span className="font-bold text-gray-600 dark:text-gray-300">Total Contests: </span>
                    <span className="text-[#FF642F] font-bold text-xl ml-2">{contests.length}</span>
                </div>
            </div>
            
            {/* Table Container Dark Mode */}
            <div className="overflow-hidden bg-white dark:bg-gray-800 shadow-xl rounded-2xl border border-gray-100 dark:border-gray-700 transition-colors">
                <table className="table w-full">
                    {/* Head */}
                    <thead className="bg-orange-50 dark:bg-gray-700 text-[#FF642F] dark:text-[#FF642F] text-sm uppercase tracking-wider">
                        <tr>
                            <th className="py-5 pl-8">#</th>
                            <th>Thumbnail</th>
                            <th>Contest Title</th>
                            <th>Creator</th>
                            <th>Status</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                        {
                            contests.map((contest, index) => {
                                const isActionDisabled = contest.status === 'accepted' || contest.status === 'rejected';

                                return (
                                    <tr key={contest._id} className="hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors duration-200">
                                        <th className="pl-8 text-gray-400 dark:text-gray-500">{index + 1}</th>
                                        
                                        {/* Image */}
                                        <td>
                                            <div className="avatar">
                                                <div className="w-14 h-14 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600">
                                                    <img 
                                                        src={contest.image} 
                                                        alt="Contest" 
                                                        className="object-cover"
                                                        onError={(e) => { e.target.src = "https://i.ibb.co/xz9s2wN/placeholder.jpg" }}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        
                                        {/* Title */}
                                        <td className="font-bold text-gray-700 dark:text-gray-200 text-base">
                                            {contest.contestName}
                                        </td>
                                        
                                        {/* Creator */}
                                        <td className="text-gray-500 dark:text-gray-400 text-sm">
                                            {contest.creatorEmail}
                                        </td>
                                        
                                        {/* Status Badge with Dark Mode */}
                                        <td>
                                            {contest.status === 'accepted' && (
                                                <span className="inline-flex items-center gap-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 py-1 px-3 rounded-full text-xs font-bold border border-green-200 dark:border-green-800">
                                                    Accepted
                                                </span>
                                            )}
                                            {contest.status === 'rejected' && (
                                                <span className="inline-flex items-center gap-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 py-1 px-3 rounded-full text-xs font-bold border border-red-200 dark:border-red-800">
                                                    Rejected
                                                </span>
                                            )}
                                            {(contest.status !== 'accepted' && contest.status !== 'rejected') && (
                                                <span className="inline-flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 py-1 px-3 rounded-full text-xs font-bold border border-yellow-200 dark:border-yellow-800">
                                                    Pending
                                                </span>
                                            )}
                                        </td>
                                        
                                        {/* Actions */}
                                        <td className="flex justify-center gap-2 py-6">
                                            
                                            {/* 1. Confirm Button */}
                                            <div className="tooltip" data-tip={isActionDisabled ? "Action Locked" : "Confirm"}>
                                                <button 
                                                    onClick={() => handleApprove(contest)}
                                                    disabled={isActionDisabled}
                                                    className={`btn btn-sm btn-circle border-none shadow-md transition-all ${
                                                        isActionDisabled
                                                        ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed shadow-none' 
                                                        : 'bg-green-500 hover:bg-green-600 text-white hover:scale-105'
                                                    }`}
                                                >
                                                    <FaCheck />
                                                </button>
                                            </div>

                                            {/* 2. Reject Button */}
                                            <div className="tooltip" data-tip={isActionDisabled ? "Action Locked" : "Reject"}>
                                                <button 
                                                    onClick={() => handleReject(contest)}
                                                    disabled={isActionDisabled}
                                                    className={`btn btn-sm btn-circle border-none shadow-md transition-all ${
                                                        isActionDisabled
                                                        ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed shadow-none' 
                                                        : 'bg-yellow-500 hover:bg-yellow-600 text-white hover:scale-105'
                                                    }`}
                                                >
                                                    <FaTimes />
                                                </button>
                                            </div>

                                            {/* 3. Delete Button */}
                                            <div className="tooltip" data-tip="Delete">
                                                <button 
                                                    onClick={() => handleDelete(contest)}
                                                    className="btn btn-sm btn-circle bg-red-100 dark:bg-red-900/20 hover:bg-red-500 dark:hover:bg-red-600 text-red-500 dark:text-red-400 hover:text-white border-none shadow-sm hover:shadow-md transition-all hover:scale-105"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
                
                {/* Empty State */}
                {contests.length === 0 && (
                    <div className="text-center py-20 text-gray-400 dark:text-gray-500">
                        <p>No contests found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageContests;