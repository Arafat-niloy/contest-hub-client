import { NavLink, Outlet } from "react-router-dom";
import { FaHome, FaUser, FaTrophy, FaList, FaChartPie, FaBars } from 'react-icons/fa';
import useRole from "../hooks/useRole"; 

const Dashboard = () => {
    const [role] = useRole(); 

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            
            <div className="drawer-content flex flex-col min-w-0 overflow-hidden"> {/* min-w-0 এবং overflow-hidden খুব গুরুত্বপূর্ণ */}
                
                {/* 📱 Mobile & Tablet View: Navbar */}
                <div className="flex justify-between items-center w-full lg:hidden bg-white p-4 shadow-md sticky top-0 z-50">
                    <label htmlFor="my-drawer-2" className="btn btn-ghost drawer-button text-[#FF642F] text-2xl p-0 min-h-0 h-auto">
                        <FaBars />
                    </label>
                    <h2 className="text-[22px] font-bold text-[#333333] tracking-tight">
                        Contest<span className="text-[#FF642F]">Hub</span>
                    </h2>
                    <div className="w-8"></div> 
                </div>

                {/* 📝 Main Outlet: এখানে p-5 এর বদলে মোবাইলে p-3 করা হয়েছে */}
                <div className="w-full max-w-full p-3 md:p-8 lg:p-10 bg-gray-50 min-h-screen overflow-x-hidden">
                    <Outlet></Outlet>
                </div>
            </div> 

            {/* 🛠️ Sidebar Drawer */}
            <div className="drawer-side z-[100]">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                
                <ul className="menu p-4 w-72 md:w-80 min-h-full bg-base-200 text-base-content space-y-1">
                    <div className="hidden lg:block mb-8 px-4">
                        <h2 className="text-[22px] font-bold text-[#333333]">Contest<span className="text-[#FF642F]">Hub</span></h2>
                    </div>

                    <li>
                        <NavLink 
                            to="/dashboard" 
                            end 
                            className={({ isActive }) => isActive ? "bg-[#FF642F] text-white font-bold" : "font-medium"}
                        >
                            <FaChartPie className="text-xl"/> Dashboard Overview
                        </NavLink>
                    </li>

                    <div className="divider opacity-50 text-xs uppercase tracking-widest">Menu</div>

                    {/* Admin */}
                    {role === 'admin' && <>
                        <li><NavLink to="/dashboard/manage-users"><FaUser /> Manage Users</NavLink></li>
                        <li><NavLink to="/dashboard/manage-contests"><FaList /> Manage Contests</NavLink></li>
                    </>}

                    {/* Creator */}
                    {role === 'creator' && <>
                        <li><NavLink to="/dashboard/add-contest"><FaList /> Add Contest</NavLink></li>
                        <li><NavLink to="/dashboard/my-created"><FaList /> My Created Contest</NavLink></li>
                    </>}

                    {/* User */}
                    {role === 'user' && <>
                        <li><NavLink to="/dashboard/my-participated"><FaList /> My Registered Contests</NavLink></li>
                        <li><NavLink to="/dashboard/my-winning"><FaTrophy /> My Winning</NavLink></li>
                        <li><NavLink to="/dashboard/profile"><FaUser /> My Profile</NavLink></li>
                    </>}

                    <div className="divider opacity-50"></div>
                    
                    <li><NavLink to="/"><FaHome /> Website Home</NavLink></li> 
                    <li><NavLink to="/all-contests"><FaList /> All Contests</NavLink></li>
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;