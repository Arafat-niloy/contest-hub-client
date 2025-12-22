import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaTrophy, FaMedal, FaDollarSign, FaCrown } from "react-icons/fa";

const MyWinning = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [], isLoading } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`);
            return res.data;
        }
    });

    // Filter Winning Contests
    const winningContests = payments.filter(contest => contest.status === 'winner');

    // Calculate Total Prize Money
    const totalPrize = winningContests.reduce((acc, curr) => acc + (curr.prizeMoney || 0), 0);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
                <span className="loading loading-spinner loading-lg text-[#FF642F]"></span>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen w-full font-sans text-[#1A1A1A] dark:text-gray-100 transition-colors duration-300">
            
            {/* Stats Header */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="bg-gradient-to-r from-[#FF642F] to-[#ff8e66] rounded-2xl p-6 text-white shadow-lg flex items-center justify-between">
                    <div>
                        <h2 className="text-lg opacity-90 font-medium">Total Wins</h2>
                        <h3 className="text-4xl font-bold mt-1">{winningContests.length}</h3>
                    </div>
                    <div className="bg-white/20 p-4 rounded-full">
                        <FaTrophy className="text-3xl text-white" />
                    </div>
                </div>

                {/* Prize Card - Dark Mode Added */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between transition-colors">
                    <div>
                        <h2 className="text-gray-500 dark:text-gray-400 font-medium">Total Prize Earned</h2>
                        <h3 className="text-4xl font-bold text-gray-800 dark:text-white mt-1">${totalPrize}</h3>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-full">
                        <FaDollarSign className="text-3xl text-green-600 dark:text-green-400" />
                    </div>
                </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                <FaCrown className="text-yellow-500" /> My Winning History
            </h2>

            {/* Table Section */}
            {winningContests.length > 0 ? (
                <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-xl rounded-2xl border border-gray-100 dark:border-gray-700 transition-colors">
                    <table className="table w-full">
                        {/* Head */}
                        <thead className="bg-orange-50 dark:bg-orange-900/20 text-[#FF642F] text-sm uppercase tracking-wider">
                            <tr>
                                <th className="py-5 pl-8">#</th>
                                <th>Contest Profile</th>
                                <th>Category</th>
                                <th>Prize Money</th>
                                <th className="text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {winningContests.map((contest, index) => (
                                <tr key={contest._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                                    <th className="pl-8 text-gray-400 dark:text-gray-500">{index + 1}</th>
                                    
                                    {/* Contest Profile */}
                                    <td>
                                        <div className="flex items-center gap-4">
                                            <div className="avatar">
                                                <div className="w-12 h-12 rounded-xl ring ring-offset-2 ring-[#FF642F]/30 dark:ring-[#FF642F]/50 dark:ring-offset-gray-800">
                                                    <img src={contest.image} alt="Contest" className="object-cover" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-800 dark:text-gray-100 text-lg">{contest.contestName}</div>
                                                <div className="text-xs text-gray-400 dark:text-gray-500">Winning Entry</div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Category */}
                                    <td>
                                        <span className="badge badge-ghost dark:bg-gray-700 dark:text-gray-300 font-medium text-gray-600">
                                            {contest.contestType}
                                        </span>
                                    </td>

                                    {/* Prize */}
                                    <td className="font-bold text-green-600 dark:text-green-400 text-lg">
                                        ${contest.prizeMoney}
                                    </td>

                                    {/* Status Badge */}
                                    <td className="text-center">
                                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 rounded-full font-bold shadow-sm border border-yellow-200 dark:border-yellow-700/50">
                                            <FaMedal className="text-yellow-600 dark:text-yellow-400" /> Winner
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                /* Empty State */
                <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-dashed border-gray-300 dark:border-gray-700 transition-colors">
                    <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-full mb-4">
                        <FaTrophy className="text-5xl text-gray-300 dark:text-gray-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-600 dark:text-gray-300">No Wins Yet</h2>
                    <p className="text-gray-400 dark:text-gray-500 mt-2 max-w-sm text-center">
                        Don't lose hope! Keep participating in more contests to show your talent and win prizes.
                    </p>
                </div>
            )}
        </div>
    );
};

export default MyWinning;