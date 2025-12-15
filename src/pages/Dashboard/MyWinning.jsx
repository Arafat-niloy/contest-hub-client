import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyWinning = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`);
            return res.data;
        }
    });

    const winningContests = payments.filter(contest => contest.status === 'winner');

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">My Winning Contests</h2>
                <h2 className="text-xl font-semibold text-primary">Total Wins: {winningContests.length}</h2>
            </div>

            {winningContests.length > 0 ? (
                <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                    <table className="table w-full">
                        {/* head */}
                        <thead className="bg-gray-200 text-gray-700 uppercase">
                            <tr>
                                <th>#</th>
                                <th>Contest Name</th>
                                <th>Category</th>
                                <th>Prize</th>
                                <th className="text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {winningContests.map((contest, index) => (
                                <tr key={contest._id} className="hover:bg-gray-50 transition">
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={contest.image} alt="Contest" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{contest.contestName}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{contest.contestType}</td>
                                    <td className="font-semibold text-green-600">${contest.prizeMoney}</td>
                                    <td className="text-center">
                                        <span className="badge badge-warning font-bold p-3 text-white">Winner 🏆</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                // যদি কোনো উইনিং না থাকে
                <div className="flex flex-col items-center justify-center min-h-[300px] space-y-4">
                    <h2 className="text-2xl font-bold text-gray-400">You haven't won any contests yet.</h2>
                    <p className="text-gray-500">Keep participating to showcase your skills!</p>
                </div>
            )}
        </div>
    );
};

export default MyWinning;