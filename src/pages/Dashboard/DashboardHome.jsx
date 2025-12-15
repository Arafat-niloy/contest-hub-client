import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useRole from "../../hooks/useRole"; // ✅ ১. useRole ইম্পোর্ট করুন
import { FaUsers, FaTrophy, FaDollarSign, FaListAlt } from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DashboardHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [role] = useRole(); // ✅ ২. রোল নিয়ে আসুন

    // Fetch Admin Stats
    const { data: stats = {} } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats');
            return res.data;
        },
        // ✅ ৩. সমাধান: শুধুমাত্র অ্যাডমিন হলেই ডাটা ফেচ করবে
        enabled: role === 'admin' 
    });

    // Pie Chart Data
    const pieChartData = [
        { name: 'Users', value: stats.users || 0 },
        { name: 'Contests', value: stats.contests || 0 },
        { name: 'Orders', value: stats.orders || 0 },
    ];
    
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

    return (
        <div className="w-11/12 mx-auto mt-10">
            <h2 className="text-3xl font-bold mb-6">
                Hi, Welcome Back <span className="text-primary">{user?.displayName}</span>!
            </h2>
            
            {/* ✅ ৪. কন্ডিশনাল রেন্ডারিং: শুধুমাত্র অ্যাডমিন হলে চার্ট দেখাবে */}
            {role === 'admin' && stats.users !== undefined ? (
                <div>
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        <div className="stat bg-gradient-to-r from-purple-500 to-purple-300 text-white rounded-2xl p-6 shadow-lg">
                            <div className="stat-figure text-white text-3xl opacity-80"><FaDollarSign /></div>
                            <div className="stat-title text-white opacity-90">Revenue</div>
                            <div className="stat-value text-4xl font-bold">${stats.revenue}</div>
                        </div>
                        
                        <div className="stat bg-gradient-to-r from-orange-500 to-orange-300 text-white rounded-2xl p-6 shadow-lg">
                            <div className="stat-figure text-white text-3xl opacity-80"><FaUsers /></div>
                            <div className="stat-title text-white opacity-90">Users</div>
                            <div className="stat-value text-4xl font-bold">{stats.users}</div>
                        </div>

                        <div className="stat bg-gradient-to-r from-pink-500 to-pink-300 text-white rounded-2xl p-6 shadow-lg">
                            <div className="stat-figure text-white text-3xl opacity-80"><FaTrophy /></div>
                            <div className="stat-title text-white opacity-90">Contests</div>
                            <div className="stat-value text-4xl font-bold">{stats.contests}</div>
                        </div>

                        <div className="stat bg-gradient-to-r from-blue-500 to-blue-300 text-white rounded-2xl p-6 shadow-lg">
                            <div className="stat-figure text-white text-3xl opacity-80"><FaListAlt /></div>
                            <div className="stat-title text-white opacity-90">Orders</div>
                            <div className="stat-value text-4xl font-bold">{stats.orders}</div>
                        </div>
                    </div>

                    {/* Simple Pie Chart */}
                    <div className="flex flex-col items-center bg-white p-10 rounded-xl shadow-xl border">
                        <h3 className="text-2xl font-bold mb-4 text-gray-700">Platform Overview</h3>
                        <div className="w-full h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieChartData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={120}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {pieChartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            ) : (
                /* ✅ ৫. অ্যাডমিন না হলে এই অংশ দেখাবে */
                <div className="hero min-h-[300px] bg-base-200 rounded-xl">
                    <div className="hero-content text-center">
                        <div className="max-w-md">
                            <h1 className="text-5xl font-bold">Welcome to Dashboard</h1>
                            <p className="py-6">
                                Check the sidebar menu to view your activities, participations, or create new contests.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardHome;