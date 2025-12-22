import { NavLink, Outlet } from "react-router-dom";
import { FaHome, FaUser, FaTrophy, FaList, FaChartPie, FaBars } from 'react-icons/fa';
import useRole from "../hooks/useRole";
import { useEffect } from "react"; // 1. useEffect ইম্পোর্ট করা হয়েছে

const Dashboard = () => {
    const [role] = useRole();

    // 2. এই useEffect টি পেজ লোড/রিফ্রেশ হলে localStorage চেক করে থিম সেট করবে
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const html = document.documentElement;

        if (savedTheme === 'dark') {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }
    }, []);

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            
            <div className="drawer-content flex flex-col min-w-0 overflow-hidden transition-colors duration-300"> 
                
                {/* 📱 Mobile & Tablet View: Navbar */}
                <div className="flex justify-between items-center w-full lg:hidden bg-white dark:bg-gray-800 p-4 shadow-md sticky top-0 z-50 transition-colors duration-300">
                    <label htmlFor="my-drawer-2" className="btn btn-ghost drawer-button text-[#FF642F] text-2xl p-0 min-h-0 h-auto hover:bg-gray-100 dark:hover:bg-gray-700">
                        <FaBars />
                    </label>
                    <h2 className="text-[22px] font-bold text-[#333333] dark:text-white tracking-tight">
                        Contest<span className="text-[#FF642F]">Hub</span>
                    </h2>
                    <div className="w-8"></div> 
                </div>

                {/* 📝 Main Outlet */}
                <div className="w-full max-w-full p-3 md:p-8 lg:p-10 bg-gray-50 dark:bg-gray-900 min-h-screen overflow-x-hidden transition-colors duration-300">
                    <Outlet></Outlet>
                </div>
            </div> 

            {/* 🛠️ Sidebar Drawer */}
            <div className="drawer-side z-[100]">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                
                <ul className="menu p-4 w-72 md:w-80 min-h-full bg-base-200 dark:bg-gray-800 text-base-content dark:text-gray-200 space-y-1 transition-colors duration-300">
                    <div className="hidden lg:block mb-8 px-4">
                        <h2 className="text-[22px] font-bold text-[#333333] dark:text-white">Contest<span className="text-[#FF642F]">Hub</span></h2>
                    </div>

                    <li>
                        <NavLink 
                            to="/dashboard" 
                            end 
                            className={({ isActive }) => isActive 
                                ? "bg-[#FF642F] text-white font-bold" 
                                : "font-medium hover:bg-gray-300 dark:hover:bg-gray-700"
                            }
                        >
                            <FaChartPie className="text-xl"/> Dashboard Overview
                        </NavLink>
                    </li>

                    <div className="divider opacity-50 dark:opacity-70 text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400">Menu</div>

                    {/* Admin */}
                    {role === 'admin' && <>
                        <li><NavLink to="/dashboard/manage-users" className={({ isActive }) => isActive ? "bg-[#FF642F] text-white font-bold" : "hover:bg-gray-300 dark:hover:bg-gray-700"}><FaUser /> Manage Users</NavLink></li>
                        <li><NavLink to="/dashboard/manage-contests" className={({ isActive }) => isActive ? "bg-[#FF642F] text-white font-bold" : "hover:bg-gray-300 dark:hover:bg-gray-700"}><FaList /> Manage Contests</NavLink></li>
                    </>}

                    {/* Creator */}
                    {role === 'creator' && <>
                        <li><NavLink to="/dashboard/add-contest" className={({ isActive }) => isActive ? "bg-[#FF642F] text-white font-bold" : "hover:bg-gray-300 dark:hover:bg-gray-700"}><FaList /> Add Contest</NavLink></li>
                        <li><NavLink to="/dashboard/my-created" className={({ isActive }) => isActive ? "bg-[#FF642F] text-white font-bold" : "hover:bg-gray-300 dark:hover:bg-gray-700"}><FaList /> My Created Contest</NavLink></li>
                    </>}

                    {/* User */}
                    {role === 'user' && <>
                        <li><NavLink to="/dashboard/my-participated" className={({ isActive }) => isActive ? "bg-[#FF642F] text-white font-bold" : "hover:bg-gray-300 dark:hover:bg-gray-700"}><FaList /> My Registered Contests</NavLink></li>
                        <li><NavLink to="/dashboard/my-winning" className={({ isActive }) => isActive ? "bg-[#FF642F] text-white font-bold" : "hover:bg-gray-300 dark:hover:bg-gray-700"}><FaTrophy /> My Winning</NavLink></li>
                        <li><NavLink to="/dashboard/profile" className={({ isActive }) => isActive ? "bg-[#FF642F] text-white font-bold" : "hover:bg-gray-300 dark:hover:bg-gray-700"}><FaUser /> My Profile</NavLink></li>
                    </>}

                    <div className="divider opacity-50 dark:opacity-70 dark:before:bg-gray-600 dark:after:bg-gray-600"></div>
                    
                    <li><NavLink to="/" className="hover:bg-gray-300 dark:hover:bg-gray-700"><FaHome /> Website Home</NavLink></li> 
                    <li><NavLink to="/all-contests" className="hover:bg-gray-300 dark:hover:bg-gray-700"><FaList /> All Contests</NavLink></li>
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;