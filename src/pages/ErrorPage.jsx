import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaArrowLeft } from "react-icons/fa";

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        // 1. Main Background Updated
        <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center font-sans transition-colors duration-300">
            <div className="container px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
                
                {/* Text Section */}
                <div className="w-full lg:w-1/2">
                    <p className="text-sm font-bold text-[#FF642F] uppercase tracking-widest">404 Error</p>
                    {/* 2. Heading Color Updated */}
                    <h1 className="mt-3 text-4xl font-extrabold text-gray-800 dark:text-white md:text-5xl">
                        Page Not Found
                    </h1>
                    {/* 3. Description Color Updated */}
                    <p className="mt-4 text-gray-500 dark:text-gray-400 text-lg">
                        Oops! The page you are looking for doesn't exist or has been moved. 
                        It looks like you got lost in the contest arena! 🏟️
                    </p>

                    <div className="flex items-center mt-8 gap-x-4">
                        {/* Go Back Button */}
                        {/* 4. Button Background, Text, Border & Hover Updated */}
                        <button 
                            onClick={() => navigate(-1)}
                            className="flex items-center justify-center w-1/2 px-5 py-3 text-sm text-gray-700 dark:text-gray-200 transition-colors duration-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg gap-x-2 sm:w-auto hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-[#FF642F] dark:hover:text-[#FF642F] shadow-sm"
                        >
                            <FaArrowLeft />
                            <span>Go Back</span>
                        </button>

                        {/* Home Button */}
                        {/* 5. Primary Button (Orange) generally stays same, added dark hover nuance if needed */}
                        <Link 
                            to="/" 
                            className="flex items-center justify-center w-1/2 px-5 py-3 text-sm text-white transition-colors duration-200 bg-[#FF642F] rounded-lg gap-x-2 sm:w-auto hover:bg-[#e55a2a] shadow-md hover:shadow-lg"
                        >
                            <FaHome />
                            <span>Take Me Home</span>
                        </Link>
                    </div>
                </div>

                {/* Image Section */}
                <div className="relative w-full mt-12 lg:w-1/2 lg:mt-0">
                    <img 
                        className="w-full max-w-lg lg:mx-auto drop-shadow-xl" 
                        src="https://i.ibb.co/ck1SGFJ/Group.png" 
                        alt="404 Illustration" 
                    />
                </div>
            </div>
        </section>
    );
};

export default ErrorPage;