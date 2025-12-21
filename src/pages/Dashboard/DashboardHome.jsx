import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useRole from "../../hooks/useRole";
import { Link } from "react-router-dom";
import { FaUsers, FaTrophy, FaDollarSign, FaListAlt, FaChartPie, FaUserCircle } from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DashboardHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [role] = useRole();

    // Fetch Admin Stats
    const { data: stats = {}, isLoading } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats');
            return res.data;
        },
        enabled: role === 'admin'
    });

    const pieChartData = [
        { name: 'Users', value: stats.users || 0 },
        { name: 'Contests', value: stats.contests || 0 },
        { name: 'Orders', value: stats.orders || 0 },
    ];
    
    const COLORS = ['#0088FE', '#FF642F', '#00C49F'];

    if (isLoading && role === 'admin') {
        return <div className="flex justify-center items-center h-screen"><span className="loading loading-spinner loading-lg text-[#FF642F]"></span></div>;
    }

    return (
        <div className="p-4 md:p-8 bg-gray-50 min-h-screen font-sans text-[#1A1A1A]">
            
            {/* 🌟 Welcome Section (Updated for full responsiveness) */}
            <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 mb-8 gap-6">
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-center md:text-left">
                    <div className="avatar">
                        <div className="w-20 md:w-24 rounded-full ring ring-[#FF642F] ring-offset-base-100 ring-offset-2">
                            <img src={user?.photoURL || "https://i.ibb.co/5c5k7Z7/user.png"} alt="User" />
                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                            Welcome back, <span className="text-[#FF642F]">{user?.displayName?.split(' ')[0]}!</span>
                        </h2>
                        <div className="flex flex-col md:flex-row items-center gap-2 mt-2">
                            <span className="badge badge-ghost font-semibold uppercase text-[10px] md:text-xs tracking-wider py-3 px-3">
                                {role} Dashboard
                            </span>
                            <span className="text-sm text-gray-500">Here is what's happening today.</span>
                        </div>
                    </div>
                </div>

                {/* 📅 Date Section (Fix: Mobile-friendly view) */}
                <div className="bg-orange-50 lg:bg-transparent p-4 lg:p-0 rounded-xl w-full lg:w-auto text-center lg:text-right border border-orange-100 lg:border-none">
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Current Date</p>
                    <p className="text-lg md:text-xl font-black text-gray-700">{new Date().toDateString()}</p>
                </div>
            </div>

            {/* Admin Dashboard View */}
            {role === 'admin' && stats.users !== undefined ? (
                <div>
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
                        {/* Revenue */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                            <div className="p-4 bg-green-50 text-green-600 rounded-xl text-2xl">
                                <FaDollarSign />
                            </div>
                            <div>
                                <h3 className="text-gray-500 text-sm font-medium">Total Revenue</h3>
                                <p className="text-2xl md:text-3xl font-bold text-gray-800">${stats.revenue}</p>
                            </div>
                        </div>

                        {/* Users */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                            <div className="p-4 bg-blue-50 text-blue-600 rounded-xl text-2xl">
                                <FaUsers />
                            </div>
                            <div>
                                <h3 className="text-gray-500 text-sm font-medium">Total Users</h3>
                                <p className="text-2xl md:text-3xl font-bold text-gray-800">{stats.users}</p>
                            </div>
                        </div>

                        {/* Contests */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                            <div className="p-4 bg-orange-50 text-[#FF642F] rounded-xl text-2xl">
                                <FaTrophy />
                            </div>
                            <div>
                                <h3 className="text-gray-500 text-sm font-medium">Total Contests</h3>
                                <p className="text-2xl md:text-3xl font-bold text-gray-800">{stats.contests}</p>
                            </div>
                        </div>

                        {/* Orders */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                            <div className="p-4 bg-purple-50 text-purple-600 rounded-xl text-2xl">
                                <FaListAlt />
                            </div>
                            <div>
                                <h3 className="text-gray-500 text-sm font-medium">Total Orders</h3>
                                <p className="text-2xl md:text-3xl font-bold text-gray-800">{stats.orders}</p>
                            </div>
                        </div>
                    </div>

                    {/* Chart Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                        <div className="bg-white p-5 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                    <FaChartPie className="text-[#FF642F]" /> Platform Statistics
                                </h3>
                            </div>
                            <div className="w-full h-[300px] md:h-[350px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={pieChartData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                                            outerRadius="80%"
                                            innerRadius="50%"
                                            fill="#8884d8"
                                            dataKey="value"
                                            paddingAngle={5}
                                        >
                                            {pieChartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip 
                                            contentStyle={{ backgroundColor: '#fff', borderRadius: '10px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} 
                                        />
                                        <Legend verticalAlign="bottom" height={36}/>
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Quick Action Box */}
                        <div className="bg-[#FF642F] text-white p-8 rounded-2xl shadow-lg flex flex-col justify-center items-start overflow-hidden relative">
                            {/* Decorative element for mobile UI */}
                            <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-white opacity-10 rounded-full"></div>
                            
                            <h3 className="text-2xl md:text-3xl font-bold mb-4 relative z-10">Manage Contests efficiently!</h3>
                            <p className="opacity-90 mb-6 text-base md:text-lg relative z-10">
                                Review new contest submissions, check payment history, and manage user roles from the sidebar.
                            </p>
                            <Link to="/all-contests" className="w-full sm:w-auto relative z-10">
                                <button className="btn bg-white text-[#FF642F] border-none hover:bg-gray-100 font-bold px-8 w-full">
                                    Go to Contests
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                /* User/Creator View */
                <div className="flex flex-col items-center justify-center bg-white p-6 md:p-12 rounded-2xl shadow-sm border border-gray-100 text-center min-h-[350px] md:min-h-[400px]">
                    <div className="bg-orange-50 p-6 rounded-full mb-6">
                        <FaUserCircle className="text-6xl text-[#FF642F]" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Welcome to ContestHub</h1>
                    <p className="text-gray-500 max-w-lg mx-auto text-base md:text-lg mb-8 px-4">
                        Explore challenges, participate in contests, and win exciting prizes. Check your sidebar to manage your activities.
                    </p>
                </div>
            )}
        </div>
    );
};

export default DashboardHome;