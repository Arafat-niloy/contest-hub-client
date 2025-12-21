import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider"; 
import { FaSignOutAlt, FaColumns, FaSun, FaMoon } from "react-icons/fa";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    // ১. থিম স্টেট ম্যানেজমেন্ট
    const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light");

    // ২. থিম পরিবর্তন এবং লোকাল স্টোরেজে সেভ করার ইফেক্ট
    useEffect(() => {
        localStorage.setItem("theme", theme);
        const html = document.documentElement;
        if (theme === "dark") {
            html.classList.add("dark");
        } else {
            html.classList.remove("dark");
        }
    }, [theme]);

    // ৩. টগল হ্যান্ডলার
    const handleToggle = (e) => {
        if (e.target.checked) {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    };

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }

    // ৪. ডার্ক মোড স্টাইল আপডেট (dark: prefix ব্যবহার করে)
    const navLinkStyles = ({ isActive }) =>
        isActive
            ? "text-black dark:text-white font-semibold text-[16px] bg-transparent hover:bg-transparent"
            : "text-[#1A1A1A] dark:text-gray-300 font-medium text-[16px] hover:text-[#FF642F] bg-transparent hover:bg-transparent transition-colors";

    const navOptions = <>
        <li><NavLink to="/" className={navLinkStyles}>Home</NavLink></li>
        <li><NavLink to="/all-contests" className={navLinkStyles}>All Contests</NavLink></li>
        <li><NavLink to="/leaderboard" className={navLinkStyles}>Leaderboard</NavLink></li>
    </>

    return (
        // dark:bg-gray-900 এবং dark:border-gray-800 যোগ করা হয়েছে
        <div className="navbar fixed z-50 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 top-0 py-4 font-sans h-[80px] transition-colors duration-300">
            <div className="max-w-screen-2xl mx-auto w-full px-4 md:px-8 flex justify-between items-center">
                
                {/* --- Logo Section --- */}
                <div className="navbar-start w-auto flex items-center">
                    <div className="dropdown lg:hidden mr-2">
                        <label tabIndex={0} className="btn btn-ghost p-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700 dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        {/* Mobile Menu Background Update */}
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-white dark:bg-gray-800 rounded-xl w-52 text-gray-700 dark:text-gray-200 border border-gray-100 dark:border-gray-700">
                            {navOptions}
                        </ul>
                    </div>

                    <Link to="/" className="flex items-center gap-2.5 select-none">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FF642F] to-[#FFC107] flex items-center justify-center relative shadow-sm">
                             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="white"/>
                            </svg>
                        </div>
                        <span className="text-[22px] font-bold text-[#333333] dark:text-white tracking-tight">
                            Contest<span className="text-[#FF642F]">Hub</span>
                        </span>
                    </Link>
                </div>

                {/* --- Menu Links --- */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-10">
                        {navOptions}
                    </ul>
                </div>

                {/* --- Navbar End --- */}
                <div className="navbar-end w-auto flex items-center gap-3">
                    
                    {/* ৫. Theme Toggle Button (DaisyUI Swap) */}
                    <label className="swap swap-rotate mr-2">
                        {/* this hidden checkbox controls the state */}
                        <input 
                            type="checkbox" 
                            onChange={handleToggle} 
                            checked={theme === "dark"}
                        />
                        
                        {/* sun icon */}
                        <FaSun className="swap-on fill-current w-6 h-6 text-yellow-500" />
                        
                        {/* moon icon */}
                        <FaMoon className="swap-off fill-current w-6 h-6 text-gray-600 dark:text-gray-300" />
                    </label>

                    {
                        user ? (
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar ring-1 ring-gray-200 dark:ring-gray-600 hover:ring-[#FF642F] transition-all p-0.5">
                                    <div className="w-full rounded-full">
                                        <img src={user?.photoURL || "https://i.ibb.co/tY949qL/avatar.png"} alt="User" />
                                    </div>
                                </div>

                                {/* Updated Google Style Dropdown with Dark Mode */}
                                <div tabIndex={0} className="dropdown-content mt-3 z-[1] card card-compact w-80 p-0 shadow-2xl bg-white dark:bg-gray-800 rounded-[28px] border border-gray-100 dark:border-gray-700 overflow-hidden">
                                    <div className="p-6 flex flex-col items-center bg-white dark:bg-gray-800 text-center transition-colors">
                                        {/* User Email */}
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 font-medium">{user?.email}</p>
                                        
                                        {/* Profile Photo */}
                                        <div className="mb-4">
                                            <div className="w-20 h-20 rounded-full border border-gray-100 dark:border-gray-600 shadow-sm overflow-hidden mx-auto">
                                                <img className="w-full h-full object-cover" src={user?.photoURL || "https://i.ibb.co/tY949qL/avatar.png"} alt="User" />
                                            </div>
                                        </div>

                                        {/* Full Name */}
                                        <h3 className="text-[20px] font-semibold text-gray-800 dark:text-white mb-1 leading-tight">
                                            {user?.displayName || 'Guest User'}
                                        </h3>
                                        
                                        {/* Dashboard Link */}
                                        <Link 
                                            to="/dashboard" 
                                            className="mt-6 flex items-center gap-2 px-6 py-2.5 border border-gray-200 dark:border-gray-600 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium text-[#1a73e8] dark:text-[#66b2ff] w-fit"
                                        >
                                            <FaColumns className="text-gray-400" />
                                            See Dashboard
                                        </Link>
                                    </div>

                                    {/* Footer: Logout */}
                                    <div className="bg-gray-50 dark:bg-gray-700 p-2 flex justify-center border-t border-gray-100 dark:border-gray-600">
                                        <button 
                                            onClick={handleLogOut} 
                                            className="w-full py-3 flex items-center justify-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-b-[20px] transition-colors"
                                        >
                                            <FaSignOutAlt className="text-gray-400" />
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Link to="/login" className="group flex items-center gap-2 bg-[#FF5500] hover:bg-[#E04B00] text-white pl-6 pr-1.5 py-1.5 rounded-full transition-all shadow-md hover:shadow-lg">
                                <span className="font-bold text-[15px] tracking-wide">Login</span>
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