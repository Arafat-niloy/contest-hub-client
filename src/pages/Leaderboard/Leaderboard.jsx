import React from 'react';

const Leaderboard = () => {
    // আপাতত আমরা ডামি ডেটা (Mock Data) ব্যবহার করছি। 
    // পরে এখানে ব্যাকএন্ড থেকে ডেটা লোড (TanStack Query দিয়ে) করব।
    const users = [
        { _id: 1, name: "Arafatul Islam", photo: "https://i.ibb.co/tYw53pS/user-avatar.png", winCount: 15 },
        { _id: 2, name: "Sadia Rahman", photo: "https://randomuser.me/api/portraits/women/44.jpg", winCount: 12 },
        { _id: 3, name: "Rahim Ahmed", photo: "https://randomuser.me/api/portraits/men/32.jpg", winCount: 10 },
        { _id: 4, name: "Karim Ullah", photo: "https://randomuser.me/api/portraits/men/85.jpg", winCount: 8 },
        { _id: 5, name: "Nasrin Akter", photo: "https://randomuser.me/api/portraits/women/65.jpg", winCount: 7 },
        { _id: 6, name: "John Doe", photo: "https://randomuser.me/api/portraits/men/11.jpg", winCount: 5 },
    ];

    return (
        <div className="pt-24 pb-10 px-4 max-w-7xl mx-auto">
            <div className="text-center mb-10">
                <h2 className="text-4xl font-bold text-gray-900">🏆 Contest Leaderboard</h2>
                <p className="text-gray-600 mt-2">Top winners based on contest achievements</p>
            </div>

            {/* Top 3 Leaders Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 items-end">
                {/* 2nd Place */}
                <div className="order-2 md:order-1 flex flex-col items-center bg-white p-6 rounded-2xl shadow-lg border border-gray-100 transform hover:-translate-y-2 transition duration-300">
                    <div className="relative">
                        <img src={users[1].photo} alt="" className="w-24 h-24 rounded-full border-4 border-gray-300" />
                        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-gray-300 text-gray-800 px-3 py-1 rounded-full text-sm font-bold shadow">2nd</div>
                    </div>
                    <h3 className="mt-4 text-xl font-bold text-gray-800">{users[1].name}</h3>
                    <p className="text-[#FF642F] font-bold text-lg">{users[1].winCount} Wins</p>
                </div>

                {/* 1st Place (Winner) - Crown Removed */}
                <div className="order-1 md:order-2 flex flex-col items-center bg-gradient-to-b from-orange-50 to-white p-8 rounded-2xl shadow-xl border border-orange-200 transform scale-110 z-10">
                    <div className="relative">
                        {/* Crown Image Removed Here */}
                        <img src={users[0].photo} alt="" className="w-32 h-32 rounded-full border-4 border-[#FF642F]" />
                        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-[#FF642F] text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">1st</div>
                    </div>
                    <h3 className="mt-5 text-2xl font-bold text-gray-900">{users[0].name}</h3>
                    <p className="text-[#FF642F] font-bold text-2xl">{users[0].winCount} Wins</p>
                </div>

                {/* 3rd Place */}
                <div className="order-3 flex flex-col items-center bg-white p-6 rounded-2xl shadow-lg border border-gray-100 transform hover:-translate-y-2 transition duration-300">
                    <div className="relative">
                        <img src={users[2].photo} alt="" className="w-24 h-24 rounded-full border-4 border-yellow-700" />
                        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-yellow-700 text-white px-3 py-1 rounded-full text-sm font-bold shadow">3rd</div>
                    </div>
                    <h3 className="mt-4 text-xl font-bold text-gray-800">{users[2].name}</h3>
                    <p className="text-[#FF642F] font-bold text-lg">{users[2].winCount} Wins</p>
                </div>
            </div>

            {/* Rest of the Users Table */}
            <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
                <table className="table w-full">
                    {/* Head */}
                    <thead className="bg-gray-50 text-gray-600">
                        <tr>
                            <th className="py-4 pl-8">Rank</th>
                            <th>Participant</th>
                            <th className="text-center">Total Wins</th>
                            <th className="text-right pr-8">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Rows */}
                        {users.slice(3).map((user, index) => (
                            <tr key={user._id} className="hover:bg-gray-50 transition border-b border-gray-100 last:border-none">
                                <td className="pl-8 font-bold text-gray-500">#{index + 4}</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-10 h-10">
                                                <img src={user.photo} alt={user.name} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-800">{user.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="text-center font-bold text-[#FF642F]">{user.winCount}</td>
                                <td className="text-right pr-8">
                                    <span className="badge badge-ghost badge-sm">Contestant</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Leaderboard;