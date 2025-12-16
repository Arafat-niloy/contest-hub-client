import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaArrowLeft } from "react-icons/fa";

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <section className="bg-gray-50 min-h-screen flex items-center justify-center font-sans">
            <div className="container px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
                
                {/* Text Section */}
                <div className="w-full lg:w-1/2">
                    <p className="text-sm font-bold text-[#FF642F] uppercase tracking-widest">404 Error</p>
                    <h1 className="mt-3 text-4xl font-extrabold text-gray-800 md:text-5xl">
                        Page Not Found
                    </h1>
                    <p className="mt-4 text-gray-500 text-lg">
                        Oops! The page you are looking for doesn't exist or has been moved. 
                        It looks like you got lost in the contest arena! 🏟️
                    </p>

                    <div className="flex items-center mt-8 gap-x-4">
                        {/* Go Back Button */}
                        <button 
                            onClick={() => navigate(-1)}
                            className="flex items-center justify-center w-1/2 px-5 py-3 text-sm text-gray-700 transition-colors duration-200 bg-white border border-gray-200 rounded-lg gap-x-2 sm:w-auto hover:bg-gray-100 hover:text-[#FF642F] shadow-sm"
                        >
                            <FaArrowLeft />
                            <span>Go Back</span>
                        </button>

                        {/* Home Button */}
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