import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider"; 
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }

    // মেনু লিংকগুলোর স্টাইল (একদম ছবির মতো ক্লিন লুক)
    const navLinkStyles = ({ isActive }) =>
        isActive
            ? "text-black font-semibold text-[16px] bg-transparent hover:bg-transparent"
            : "text-[#1A1A1A] font-medium text-[16px] hover:text-[#FF642F] bg-transparent hover:bg-transparent transition-colors";

    // মেনু আইটেমগুলো (Updated: Home, All Contests, Leaderboard)
    const navOptions = <>
        <li><NavLink to="/" className={navLinkStyles}>Home</NavLink></li>
        <li><NavLink to="/all-contests" className={navLinkStyles}>All Contests</NavLink></li>
        <li><NavLink to="/leaderboard" className={navLinkStyles}>Leaderboard</NavLink></li>
    </>

    return (
        <div className="navbar fixed z-50 bg-white border-b border-gray-100 top-0 py-4 font-sans h-[80px]">
            <div className="max-w-screen-2xl mx-auto w-full px-4 md:px-8 flex justify-between items-center">
                
                {/* --- Navbar Start: Logo & Mobile Menu --- */}
                <div className="navbar-start w-auto flex items-center">
                    {/* Mobile Dropdown */}
                    <div className="dropdown lg:hidden mr-2">
                        <label tabIndex={0} className="btn btn-ghost p-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-white rounded-xl w-52 text-gray-700">
                            {navOptions}
                        </ul>
                    </div>

                    {/* Logo Section (Updated Name: ContestHub) */}
                    <Link to="/" className="flex items-center gap-2.5 select-none cursor-pointer">
                        {/* Custom SVG Icon (Orange Sparkle/Star) */}
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FF642F] to-[#FFC107] flex items-center justify-center relative shadow-sm">
                             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="white"/>
                            </svg>
                        </div>
                        <span className="text-[22px] font-bold text-[#333333] tracking-tight">
                            Contest<span className="text-[#FF642F]">Hub</span>
                        </span>
                    </Link>
                </div>

                {/* --- Navbar Center: Menu Links --- */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-10">
                        {navOptions}
                    </ul>
                </div>

                {/* --- Navbar End: Button / Profile --- */}
                <div className="navbar-end w-auto flex items-center">
                    {
                        user ? (
                            // User Logged In State (Profile Picture)
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar ring-2 ring-transparent hover:ring-[#FF642F] transition-all">
                                    <div className="w-10 rounded-full border border-gray-200">
                                        <img src={user?.photoURL || "https://i.ibb.co/tY949qL/avatar.png"} alt="User" />
                                    </div>
                                </div>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl bg-white rounded-xl w-52 border border-gray-100">
                                    <li className="menu-title px-4 py-2 text-gray-500 border-b mb-2">{user?.displayName || 'User'}</li>
                                    <li><Link to="/dashboard" className="hover:text-[#FF642F]">Dashboard</Link></li>
                                    <li><button onClick={handleLogOut} className="hover:text-red-500">Logout</button></li>
                                </ul>
                            </div>
                        ) : (
                            // User Logged Out State: "Login" Button
                            // Updated Text to 'Login' and Link to '/login'
                            <Link to="/login" className="group flex items-center gap-2 bg-[#FF5500] hover:bg-[#E04B00] text-white pl-6 pr-1.5 py-1.5 rounded-full transition-all shadow-md hover:shadow-lg">
                                <span className="font-bold text-[15px] tracking-wide">Login</span>
                                
                                {/* The White Circle with Arrow Icon */}
                                <div className="bg-white text-[#FF5500] w-8 h-8 rounded-full flex items-center justify-center transform group-hover:rotate-45 transition-transform duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                                    </svg>
                                </div>
                            </Link>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;