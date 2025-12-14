import { NavLink, Outlet } from "react-router-dom";
import { FaHome, FaUser, FaTrophy, FaList } from 'react-icons/fa'; 

const Dashboard = () => {
    // TODO: get user role from database later
    // আপাতত টেস্ট করার জন্য সব false রাখুন, তাহলে User Menu দেখতে পাবেন
    const isAdmin = false; 
    const isCreator = false; // <--- এটি false থাকলে আপনি User Menu দেখতে পাবেন

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
                    {/* Sidebar content here */}
                    
                    {
                        isAdmin ? <>
                             {/* Admin Routes */}
                            <li><NavLink to="/dashboard/admin-home"><FaHome></FaHome> Admin Home</NavLink></li>
                            <li><NavLink to="/dashboard/manage-users"><FaUser></FaUser> Manage Users</NavLink></li>
                            <li><NavLink to="/dashboard/manage-contests"><FaList></FaList> Manage Contests</NavLink></li>
                        </> : isCreator ? <>
                            {/* Creator Routes */}
                            <li><NavLink to="/dashboard/creator-home"><FaHome></FaHome> Creator Home</NavLink></li>
                            <li><NavLink to="/dashboard/add-contest"><FaList></FaList> Add Contest</NavLink></li>
                            <li><NavLink to="/dashboard/my-created-contest"><FaList></FaList> My Created Contest</NavLink></li>
                        </> : <>
                            {/* User Routes (Default) */}
                            <li><NavLink to="/dashboard/user-home"><FaHome></FaHome> User Home</NavLink></li>
                            
                            {/* 👇👇 User এর জন্য এই লিংকটি এখন দেখা যাবে 👇👇 */}
                            <li>
                                <NavLink to="/dashboard/registered-contests">
                                    <FaList></FaList> My Registered Contests
                                </NavLink>
                            </li>
                            
                            <li><NavLink to="/dashboard/my-winning"><FaTrophy></FaTrophy> My Winning</NavLink></li>
                            <li><NavLink to="/dashboard/my-profile"><FaUser></FaUser> My Profile</NavLink></li>
                        </>
                    }

                    <div className="divider"></div>
                    {/* Shared Routes */}
                    <li><NavLink to="/"><FaHome></FaHome> Home</NavLink></li> 
                    <li><NavLink to="/all-contests"><FaList></FaList> All Contests</NavLink></li>
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;