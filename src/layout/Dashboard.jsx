import { NavLink, Outlet } from "react-router-dom";
import { FaHome, FaUser, FaTrophy, FaList } from 'react-icons/fa'; 
import useRole from "../hooks/useRole"; // 1. useRole হুক ইম্পোর্ট করা হলো

const Dashboard = () => {
    // 2. ডাটাবেস থেকে রোল নিয়ে আসা হচ্ছে
    const [role] = useRole(); 

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                {/* Page content here */}
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                <div className="w-full p-10">
                    <Outlet></Outlet>
                </div>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                    
                    {/* ---------------- Admin Sidebar ---------------- */}
                    {role === 'admin' && <>
                        <li>
                            <NavLink to="/dashboard/manage-users">
                                <FaUser></FaUser> Manage Users
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/manage-contests">
                                <FaList></FaList> Manage Contests
                            </NavLink>
                        </li>
                    </>}

                    {/* ---------------- Creator Sidebar ---------------- */}
                    {role === 'creator' && <>
                        <li>
                            <NavLink to="/dashboard/add-contest">
                                <FaList></FaList> Add Contest
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/my-created"> 
                                <FaList></FaList> My Created Contest
                            </NavLink>
                        </li>
                    </>}

                    {/* ---------------- User Sidebar ---------------- */}
                    {role === 'user' && <>
                        <li>
                            <NavLink to="/dashboard/my-participated">
                                <FaList></FaList> My Registered Contests
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/my-winning">
                                <FaTrophy></FaTrophy> My Winning
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/profile">
                                <FaUser></FaUser> My Profile
                            </NavLink>
                        </li>
                    </>}

                    <div className="divider"></div>
                    
                    {/* ---------------- Shared Routes ---------------- */}
                    <li><NavLink to="/"><FaHome></FaHome> Home</NavLink></li> 
                    <li><NavLink to="/all-contests"><FaList></FaList> All Contests</NavLink></li>
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;