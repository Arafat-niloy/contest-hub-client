import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

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
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="w-full px-2 lg:px-10 my-10">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
                My Participated Contests: {payments.length}
            </h2>
            
            <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-200">
                <table className="table w-full">
                    {/* Head */}
                    <thead className="bg-orange-400 text-white text-lg">
                        <tr>
                            <th className="py-4 pl-6">#</th>
                            <th>Image</th>
                            <th>Contest Name</th>
                            <th>Deadline</th>
                            <th className="text-center">Payment Status</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            payments.map((payment, index) => (
                                <tr key={payment._id} className="hover:bg-gray-50 border-b transition-all">
                                    <th className="pl-6">{index + 1}</th>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img 
                                                    src={payment.image || "https://i.ibb.co/xz9s2wN/placeholder.jpg"} 
                                                    alt="contest" 
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="font-bold">{payment.contestName}</div>
                                        <div className="text-sm opacity-50">TX: {payment.transactionId}</div>
                                    </td>
                                    <td className="text-red-500 font-semibold">
                                        {/* যদি ডেডলাইন পেমেন্ট অবজেক্টে সেভ না থাকে তবে কনটেস্ট ডিটেইলস থেকে আনা ভালো, আপাতত পেমেন্ট ডেট দেখাচ্ছি */}
                                        {new Date(payment.date).toLocaleDateString()}
                                    </td>
                                    <td className="text-center">
                                         {payment.status === 'winner' ? (
                                            <span className="badge badge-warning p-3 font-bold">Winner 🏆</span>
                                         ) : (
                                            <span className="badge badge-success text-white p-3">Paid</span>
                                         )}
                                    </td>
                                    <td className="text-center">
                                        {/* 👇 লজিক: যদি taskSubmission ফিল্ড থাকে, মানে সাবমিট করা হয়েছে */}
                                        {payment.taskSubmission ? (
                                            <button disabled className="btn btn-sm bg-gray-300 text-gray-600 cursor-not-allowed">
                                                Submitted
                                            </button>
                                        ) : (
                                            <Link to={`/dashboard/payment/submit/${payment._id}`}>
                                                <button className="btn btn-sm bg-indigo-600 hover:bg-indigo-700 text-white">
                                                    Submit Task
                                                </button>
                                            </Link>
                                        )}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

                {payments.length === 0 && (
                    <div className="text-center p-10 text-gray-500">
                        <p className="text-lg">You haven't registered for any contests yet.</p>
                        <Link to="/all-contests" className="text-orange-500 font-bold hover:underline mt-2 inline-block">
                            Browse Contests
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyParticipated;