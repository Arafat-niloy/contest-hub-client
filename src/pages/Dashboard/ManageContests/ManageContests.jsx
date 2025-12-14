import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaTrash, FaCheck } from "react-icons/fa";

const ManageContests = () => {
    const axiosSecure = useAxiosSecure();

    // সব কন্টেস্ট (Pending + Accepted) লোড করা হচ্ছে
    const { data: contests = [], refetch } = useQuery({
        queryKey: ['admin-contests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/contests/admin/all');
            return res.data;
        }
    });

    // কন্টেস্ট Approve করার ফাংশন
    const handleApprove = (contest) => {
        axiosSecure.patch(`/contests/status/${contest._id}`, { status: 'accepted' })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Contest Approved!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    };

    // কন্টেস্ট Delete করার ফাংশন
    const handleDelete = (contest) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
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

    return (
        <div className="w-full">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Manage All Contests</h2>
            
            <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-200">
                <table className="table w-full">
                    {/* Head */}
                    <thead className="bg-orange-400 text-white text-lg">
                        <tr>
                            <th className="py-4 pl-6">#</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Creator</th>
                            <th>Status</th>
                            <th className="text-center">Action</th>
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
                                <td className="text-gray-500 text-sm">{contest.creatorEmail}</td>
                                <td>
                                    {contest.status === 'accepted' ? (
                                        <span className="bg-green-100 text-green-600 py-1 px-3 rounded-full text-xs font-bold">
                                            Accepted
                                        </span>
                                    ) : (
                                        <span className="bg-yellow-100 text-yellow-600 py-1 px-3 rounded-full text-xs font-bold">
                                            Pending
                                        </span>
                                    )}
                                </td>
                                <td className="flex justify-center gap-3 py-4">
                                    {/* Approve Button (Green) */}
                                    <button 
                                        onClick={() => handleApprove(contest)}
                                        disabled={contest.status === 'accepted'}
                                        // নিচে সরাসরি কালার কোড ব্যবহার করা হয়েছে যাতে আইকন দেখা যায়
                                        className={`btn btn-sm text-white border-none ${
                                            contest.status === 'accepted' 
                                            ? 'bg-gray-300 cursor-not-allowed' 
                                            : 'bg-green-500 hover:bg-green-600'
                                        }`}
                                        title="Approve Contest"
                                    >
                                        <FaCheck className="text-lg" />
                                    </button>

                                    {/* Delete Button (Red) */}
                                    <button 
                                        onClick={() => handleDelete(contest)}
                                        className="btn btn-sm bg-red-500 hover:bg-red-600 text-white border-none"
                                        title="Delete Contest"
                                    >
                                        <FaTrash className="text-lg" />
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

export default ManageContests;