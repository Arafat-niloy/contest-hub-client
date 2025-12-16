import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { FaTrophy, FaCheckCircle, FaCloudUploadAlt, FaHistory } from "react-icons/fa";

const MyParticipated = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [], isLoading } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`);
            return res.data;
        }
    });

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen"><span className="loading loading-spinner loading-lg text-[#FF642F]"></span></div>;
    }

    return (
        <div className="p-8 bg-gray-50 min-h-screen w-full font-sans text-[#1A1A1A]">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                        <FaHistory className="text-[#FF642F]" /> My Participations
                    </h2>
                    <p className="text-gray-500 mt-1">Track your contest entries and results.</p>
                </div>
                <div className="bg-white px-6 py-3 rounded-xl shadow-sm border border-gray-200 mt-4 md:mt-0">
                    <span className="font-bold text-gray-600">Total Joined: </span>
                    <span className="text-[#FF642F] font-bold text-xl ml-2">{payments.length}</span>
                </div>
            </div>

            {/* Table Container */}
            <div className="overflow-hidden bg-white shadow-xl rounded-2xl border border-gray-100">
                <table className="table w-full">
                    {/* Head */}
                    <thead className="bg-orange-50 text-[#FF642F] text-sm uppercase tracking-wider">
                        <tr>
                            <th className="py-5 pl-8">#</th>
                            <th>Contest Info</th>
                            <th>Payment Date</th>
                            <th className="text-center">Status</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {
                            payments.map((payment, index) => (
                                <tr key={payment._id} className="hover:bg-gray-50 transition-colors duration-200">
                                    <th className="pl-8 text-gray-400">{index + 1}</th>
                                    
                                    {/* Contest Info & Image */}
                                    <td>
                                        <div className="flex items-center gap-4">
                                            <div className="avatar">
                                                <div className="w-12 h-12 rounded-xl shadow-sm border border-gray-100">
                                                    <img 
                                                        src={payment.image || "https://i.ibb.co/xz9s2wN/placeholder.jpg"} 
                                                        alt="contest" 
                                                        className="object-cover"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-700">{payment.contestName}</div>
                                                <div className="text-xs text-gray-400 font-mono mt-0.5">TX: {payment.transactionId}</div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Date */}
                                    <td className="text-gray-600 font-medium text-sm">
                                        {new Date(payment.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                    </td>

                                    {/* Payment/Winner Status */}
                                    <td className="text-center">
                                        {payment.status === 'winner' ? (
                                            <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 py-1 px-3 rounded-full text-xs font-bold border border-yellow-200 shadow-sm">
                                                <FaTrophy className="text-yellow-600" /> Winner
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 py-1 px-3 rounded-full text-xs font-bold border border-green-200">
                                                <span className="w-2 h-2 rounded-full bg-green-500"></span> Paid
                                            </span>
                                        )}
                                    </td>

                                    {/* Action Buttons */}
                                    <td className="text-center">
                                        {payment.taskSubmission ? (
                                            <button disabled className="btn btn-sm bg-gray-100 text-green-600 border-green-200 flex items-center gap-2 mx-auto disabled:bg-gray-100 disabled:text-green-600">
                                                <FaCheckCircle /> Submitted
                                            </button>
                                        ) : (
                                            <Link to={`/dashboard/payment/submit/${payment._id}`}>
                                                <button className="btn btn-sm bg-[#FF642F] hover:bg-[#e55a2a] text-white border-none transition-all duration-300 flex items-center gap-2 mx-auto shadow-sm hover:shadow-md">
                                                    <FaCloudUploadAlt /> Submit Task
                                                </button>
                                            </Link>
                                        )}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

                {/* Empty State */}
                {payments.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="bg-orange-50 p-4 rounded-full mb-4">
                            <FaHistory className="text-4xl text-[#FF642F] opacity-50" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">No Participations Yet</h3>
                        <p className="text-gray-500 mt-2">You haven't registered for any contests yet.</p>
                        <Link to="/all-contests" className="btn btn-outline border-[#FF642F] text-[#FF642F] hover:bg-[#FF642F] hover:text-white hover:border-[#FF642F] mt-6">
                            Browse Contests
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyParticipated;