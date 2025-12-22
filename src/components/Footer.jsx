import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    const footerLinks = [
        { name: "Home", path: "/" },
        { name: "All Contests", path: "/all-contests" },
        { name: "Leaderboard", path: "/leaderboard" },
        { name: "About Us", path: "/" }, 
        { name: "Privacy", path: "/" }, 
        { name: "Terms", path: "/" }, 
    ];

    return (
        // 1. Background & Border Updated
        <footer className="bg-orange-100 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 pt-16 pb-8 font-sans transition-colors duration-300">
            <div className="max-w-screen-xl mx-auto px-4 flex flex-col items-center text-center">
                
                {/* 1. Logo Section */}
                <div className="mb-8 flex flex-col items-center gap-4">
                    <Link to="/" className="flex flex-col items-center gap-2 group">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#FF642F] to-[#FFC107] flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="white"/>
                            </svg>
                        </div>
                        <div>
                            {/* 2. Logo Text Color Updated */}
                            <h2 className="text-2xl font-bold text-[#1A1A1A] dark:text-white tracking-tight">
                                Contest<span className="text-[#FF642F]">Hub</span>
                            </h2>
                        </div>
                    </Link>
                    {/* 3. Description Text Updated */}
                    <p className="text-gray-500 dark:text-gray-400 text-[15px] font-medium max-w-xs mx-auto leading-relaxed">
                        The ultimate platform for creative challenges. Join, compete, and win.
                    </p>
                </div>

                {/* 2. Navigation Links */}
                <ul className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-10">
                    {footerLinks.map((item, index) => (
                        <li key={index}>
                            <Link 
                                to={item.path} 
                                // 4. Link Text Colors Updated
                                className="text-gray-600 dark:text-gray-300 hover:text-[#FF642F] dark:hover:text-[#FF642F] font-medium text-[15px] transition-colors relative group"
                            >
                                {item.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF642F] transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* 3. Social Icons */}
                <div className="flex items-center gap-5 mb-10">
                    {/* 5. Social Buttons Updated (Bg, Border, Icon Color) */}
                    <a href="#" className="w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-[#FF642F] hover:text-white hover:border-[#FF642F] hover:-translate-y-1 transition-all duration-300 shadow-sm">
                        <FaInstagram size={18} />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-[#FF642F] hover:text-white hover:border-[#FF642F] hover:-translate-y-1 transition-all duration-300 shadow-sm">
                        <FaFacebookF size={18} />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-[#FF642F] hover:text-white hover:border-[#FF642F] hover:-translate-y-1 transition-all duration-300 shadow-sm">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-[#FF642F] hover:text-white hover:border-[#FF642F] hover:-translate-y-1 transition-all duration-300 shadow-sm">
                        <FaLinkedinIn size={18} />
                    </a>
                </div>

                {/* 4. Copyright Text */}
                {/* 6. Border & Text Color Updated */}
                <div className="w-full border-t border-gray-100 dark:border-gray-800 pt-8">
                    <p className="text-gray-400 dark:text-gray-500 text-sm">
                        © {new Date().getFullYear()} ContestHub. All rights reserved.
                    </p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;