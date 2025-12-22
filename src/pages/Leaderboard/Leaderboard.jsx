import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaCrown, FaTrophy } from "react-icons/fa";

const Leaderboard = () => {
    const axiosPublic = useAxiosPublic();

    const { data: users = [], isLoading } = useQuery({
        queryKey: ['leaderboard'],
        queryFn: async () => {
            const res = await axiosPublic.get('/leaderboard'); 
            return res.data; 
        }
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[60vh] bg-gray-50 dark:bg-gray-900 transition-colors">
                <span className="loading loading-spinner loading-lg text-[#FF642F]"></span>
            </div>
        );
    }

    const topLeaders = users.slice(0, 3);
    const otherLeaders = users.slice(3);

    return (
        <div className="py-12 px-4 max-w-7xl mx-auto bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
            
            {/* Header */}
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white flex justify-center items-center gap-3">
                    <FaTrophy className="text-[#FF642F]" /> Contest Leaderboard
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mt-3 text-lg">Celebrating our top achievers and winners</p>
            </div>

            {/* Top 3 Podium Section */}
            {users.length > 0 && (
                <div className="flex flex-col md:flex-row justify-center items-end gap-6 md:gap-10 mb-16 px-4">
                    
                    {/* 2nd Place */}
                    {topLeaders[1] && (
                        <div className="order-2 md:order-1 flex flex-col items-center w-full md:w-1/3">
                            <div className="relative">
                                <FaCrown className="absolute -top-8 left-1/2 -translate-x-1/2 text-3xl text-gray-400" />
                                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-gray-400 p-1 bg-white dark:bg-gray-800 shadow-xl overflow-hidden transition-colors">
                                    <img src={topLeaders[1].photo} alt="User" className="w-full h-full rounded-full object-cover" />
                                </div>
                                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-gray-400 text-white px-4 py-1 rounded-full text-sm font-bold shadow-md">
                                    2nd
                                </div>
                            </div>
                            <div className="mt-6 text-center bg-white dark:bg-gray-800 p-6 rounded-2xl w-full shadow-lg border-t-4 border-gray-400 transition-colors">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">{topLeaders[1].name}</h3>
                                <p className="text-[#FF642F] font-bold text-lg mt-1">{topLeaders[1].winCount} Wins</p>
                            </div>
                        </div>
                    )}

                    {/* 1st Place (Winner) */}
                    {topLeaders[0] && (
                        <div className="order-1 md:order-2 flex flex-col items-center w-full md:w-1/3 transform scale-110 z-10">
                            <div className="relative">
                                <FaCrown className="absolute -top-10 left-1/2 -translate-x-1/2 text-5xl text-yellow-500 animate-bounce" />
                                <div className="w-32 h-32 md:w-36 md:h-36 rounded-full border-4 border-yellow-500 p-1 bg-white dark:bg-gray-800 shadow-2xl overflow-hidden ring-4 ring-yellow-100 dark:ring-yellow-900/30 transition-colors">
                                    <img src={topLeaders[0].photo} alt="Winner" className="w-full h-full rounded-full object-cover" />
                                </div>
                                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-6 py-1 rounded-full text-base font-bold shadow-lg flex items-center gap-1">
                                    <FaTrophy /> 1st
                                </div>
                            </div>
                            <div className="mt-8 text-center bg-gradient-to-b from-[#FFF0E6] to-white dark:from-gray-700 dark:to-gray-800 p-8 rounded-2xl w-full shadow-2xl border-t-4 border-yellow-500 transition-colors">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{topLeaders[0].name}</h3>
                                <p className="text-[#FF642F] font-extrabold text-2xl mt-1">{topLeaders[0].winCount} Wins</p>
                                <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 uppercase tracking-widest">Champion</p>
                            </div>
                        </div>
                    )}

                    {/* 3rd Place */}
                    {topLeaders[2] && (
                        <div className="order-3 flex flex-col items-center w-full md:w-1/3">
                            <div className="relative">
                                <FaCrown className="absolute -top-8 left-1/2 -translate-x-1/2 text-3xl text-amber-700" />
                                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-amber-700 p-1 bg-white dark:bg-gray-800 shadow-xl overflow-hidden transition-colors">
                                    <img src={topLeaders[2].photo} alt="User" className="w-full h-full rounded-full object-cover" />
                                </div>
                                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-amber-700 text-white px-4 py-1 rounded-full text-sm font-bold shadow-md">
                                    3rd
                                </div>
                            </div>
                            <div className="mt-6 text-center bg-white dark:bg-gray-800 p-6 rounded-2xl w-full shadow-lg border-t-4 border-amber-700 transition-colors">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">{topLeaders[2].name}</h3>
                                <p className="text-[#FF642F] font-bold text-lg mt-1">{topLeaders[2].winCount} Wins</p>
                            </div>
                        </div>
                    )}
                </div>
            )}

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 max-w-5xl mx-auto transition-colors">
                <div className="p-6 bg-[#FF642F] bg-opacity-10 dark:bg-opacity-20 border-b border-[#FF642F] border-opacity-20">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">All Participants Ranking</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* 7. Table Head updated */}
                        <thead className="bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-300 uppercase text-sm">
                            <tr>
                                <th className="py-5 pl-8">Rank</th>
                                <th>Participant</th>
                                <th className="text-center">Total Wins</th>
                                <th className="text-right pr-8">Badge</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {otherLeaders.map((user, index) => (
                                // 8. Table Rows & Hover updated
                                <tr key={index} className="hover:bg-orange-50 dark:hover:bg-gray-700/50 transition border-b border-gray-100 dark:border-gray-700 last:border-none">
                                    <td className="pl-8 font-bold text-gray-400 dark:text-gray-500 text-lg">#{index + 4}</td>
                                    <td>
                                        <div className="flex items-center gap-4">
                                            <div className="avatar">
                                                <div className="mask mask-circle w-12 h-12 ring ring-[#FF642F] ring-offset-base-100 dark:ring-offset-gray-800 ring-offset-2">
                                                    <img src={user.photo} alt={user.name} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-800 dark:text-gray-100 text-lg">{user.name}</div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">{user._id}</div> 
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-center font-bold text-[#FF642F] text-xl">{user.winCount}</td>
                                    <td className="text-right pr-8">
                                        <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-semibold border border-gray-200 dark:border-gray-600">
                                            Contestant
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {users.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="text-center py-8 text-gray-400 dark:text-gray-500">
                                        No winners found yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;