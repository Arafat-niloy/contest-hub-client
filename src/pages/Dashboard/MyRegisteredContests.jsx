import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { FaTrophy, FaFileInvoiceDollar, FaCheckCircle, FaCloudUploadAlt, FaListAlt } from "react-icons/fa";

const MyRegisteredContests = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [], isLoading } = useQuery({
        queryKey: ['registered-contests', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/user/${user.email}`);
            return res.data;
        }
    });

    if (isLoading) return <div className="flex justify-center mt-20"><span className="loading loading-spinner loading-lg text-orange-500"></span></div>;

    return (
        <div className="w-full ">
            <style>
                {`
                    .scroll-container::-webkit-scrollbar { height: 8px; }
                    .scroll-container::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 10px; }
                    .scroll-container::-webkit-scrollbar-thumb { background: #FF642F; border-radius: 10px; }
                `}
            </style>

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
                    <FaListAlt className="text-orange-500" /> My Participations
                </h2>
                <div className="badge badge-outline border-orange-500 text-orange-600 p-4 font-bold">
                    Count: {payments.length}
                </div>
            </div>

            <div className="bg-white  rounded-xl shadow-md border border-gray-200">
                
                <div className="w-full overflow-x-auto scroll-container">
                    
                    <table className="table w-full min-w-[800px]">
                        <thead className="bg-gray-50 text-orange-600">
                            <tr>
                                <th className="p-4">#</th>
                                <th className="p-4">Contest Details</th>
                                <th className="p-4">Transaction ID</th>
                                <th className="p-4 text-center">Status</th>
                                <th className="p-4 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {payments.map((payment, index) => (
                                <tr key={payment._id} className="hover:bg-gray-50">
                                    <td className="p-4 font-medium">{index + 1}</td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-10 h-10">
                                                    <img src={payment.image} alt="Contest" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-800">{payment.contestName}</div>
                                                <div className="text-xs text-gray-400 font-bold">${payment.price}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 font-mono text-xs text-gray-500">
                                        <span className="whitespace-nowrap bg-gray-100 px-2 py-1 rounded">
                                            {payment.transactionId}
                                        </span>
                                    </td>
                                    <td className="p-4 text-center">
                                        {payment.isWinner ? (
                                            <span className="badge badge-warning gap-1 font-bold whitespace-nowrap">
                                                <FaTrophy /> Winner
                                            </span>
                                        ) : (
                                            <span className="badge badge-success text-white gap-1 font-bold whitespace-nowrap">
                                                <FaFileInvoiceDollar /> Paid
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-4 text-center">
                                        {payment.taskSubmitted ? (
                                            <button disabled className="btn btn-xs btn-outline btn-success gap-1 whitespace-nowrap">
                                                <FaCheckCircle /> Submitted
                                            </button>
                                        ) : (
                                            <Link to={`/dashboard/payment/submit/${payment._id}`}>
                                                <button className="btn btn-xs md:btn-sm bg-orange-500 hover:bg-orange-600 text-white border-none gap-2 whitespace-nowrap">
                                                    <FaCloudUploadAlt /> Submit Task
                                                </button>
                                            </Link>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="lg:hidden text-center py-2 bg-orange-50 text-[10px] text-orange-400 font-bold uppercase tracking-widest">
                    ← Swipe left/right to see more info →
                </div>
            </div>

            {payments.length === 0 && (
                <div className="text-center py-20 bg-white rounded-xl mt-4 border border-dashed border-gray-300">
                    <p className="text-gray-400">No registered contests found.</p>
                </div>
            )}
        </div>
    );
};

export default MyRegisteredContests;