import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaTrash, FaCheck, FaListAlt, FaTimes } from "react-icons/fa";

const ManageContests = () => {
    const axiosSecure = useAxiosSecure();

    // সব কন্টেস্ট (Pending + Accepted + Rejected) লোড করা হচ্ছে
    const { data: contests = [], refetch, isLoading } = useQuery({
        queryKey: ['admin-contests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/contests/admin/all');
            return res.data;
        }
    });

    // ১. কন্টেস্ট Approve (Confirm) করার ফাংশন
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
                        timer: 1500
                    });
                }
            })
    };

    // ২. কন্টেস্ট Reject করার ফাংশন
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
                        timer: 1500
                    });
                }
            })
    };

    // ৩. কন্টেস্ট Delete করার ফাংশন
    const handleDelete = (contest) => {
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
                axiosSecure.delete(`/contests/${contest._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire("Deleted!", "Contest has been deleted.", "success");
                        }
                    })
            }
        });
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen"><span className="loading loading-spinner loading-lg text-[#FF642F]"></span></div>;
    }

    return (
        <div className="p-8 bg-gray-50 min-h-screen w-full font-sans text-[#1A1A1A]">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                        <FaListAlt className="text-[#FF642F]" /> Manage Contests
                    </h2>
                    <p className="text-gray-500 mt-1">Review, approve, reject or delete user submitted contests.</p>
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
                            <th>Thumbnail</th>
                            <th>Contest Title</th>
                            <th>Creator</th>
                            <th>Status</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {
                            contests.map((contest, index) => {
                                // Logic: যদি স্ট্যাটাস accepted অথবা rejected হয়, বাটন ডিসেবল থাকবে
                                const isActionDisabled = contest.status === 'accepted' || contest.status === 'rejected';

                                return (
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
                                        
                                        {/* Title */}
                                        <td className="font-bold text-gray-700 text-base">
                                            {contest.contestName}
                                        </td>
                                        
                                        {/* Creator */}
                                        <td className="text-gray-500 text-sm">
                                            {contest.creatorEmail}
                                        </td>
                                        
                                        {/* Status Badge */}
                                        <td>
                                            {contest.status === 'accepted' && (
                                                <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 py-1 px-3 rounded-full text-xs font-bold border border-green-200">
                                                    Accepted
                                                </span>
                                            )}
                                            {contest.status === 'rejected' && (
                                                <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 py-1 px-3 rounded-full text-xs font-bold border border-red-200">
                                                    Rejected
                                                </span>
                                            )}
                                            {(contest.status !== 'accepted' && contest.status !== 'rejected') && (
                                                <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 py-1 px-3 rounded-full text-xs font-bold border border-yellow-200">
                                                    Pending
                                                </span>
                                            )}
                                        </td>
                                        
                                        {/* Actions (Confirm | Reject | Delete) */}
                                        <td className="flex justify-center gap-2 py-6">
                                            
                                            {/* 1. Confirm Button */}
                                            <div className="tooltip" data-tip={isActionDisabled ? "Action Locked" : "Confirm"}>
                                                <button 
                                                    onClick={() => handleApprove(contest)}
                                                    disabled={isActionDisabled}
                                                    className={`btn btn-sm btn-circle border-none shadow-md transition-all ${
                                                        isActionDisabled
                                                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none' 
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
                                                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none' 
                                                        : 'bg-yellow-500 hover:bg-yellow-600 text-white hover:scale-105'
                                                    }`}
                                                >
                                                    <FaTimes />
                                                </button>
                                            </div>

                                            {/* 3. Delete Button (Always Active) */}
                                            <div className="tooltip" data-tip="Delete">
                                                <button 
                                                    onClick={() => handleDelete(contest)}
                                                    className="btn btn-sm btn-circle bg-red-100 hover:bg-red-500 text-red-500 hover:text-white border-none shadow-sm hover:shadow-md transition-all hover:scale-105"
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
                    <div className="text-center py-20 text-gray-400">
                        <p>No contests found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageContests;