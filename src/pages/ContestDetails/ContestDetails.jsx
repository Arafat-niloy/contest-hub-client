import { useLoaderData, Link } from "react-router-dom";
import { FaClock, FaTrophy, FaUsers, FaDollarSign, FaFileAlt } from "react-icons/fa";

const ContestDetails = () => {
    const contest = useLoaderData();
    const { _id, contestName, image, description, price, prizeMoney, taskInstruction, deadline, participationCount } = contest;

    // ডেডলাইন চেক করার লজিক
    const isDeadlineOver = new Date(deadline) < new Date();

    return (
        // ✅ 1. Main Container Dark Mode
        <div className="bg-white dark:bg-gray-900 min-h-screen pt-24 pb-20 font-sans text-[#1A1A1A] dark:text-gray-100 transition-colors duration-300">
            <div className="w-11/12 max-w-screen-2xl mx-auto">
                
                {/* Back Button / Breadcrumb */}
                <div className="mb-6">
                    <Link to="/all-contests" className="text-gray-500 dark:text-gray-400 hover:text-[#FF642F] dark:hover:text-[#FF642F] transition-colors flex items-center gap-2 font-medium">
                        ← Back to all contests
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                    
                    {/* Left Side: Image Section */}
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl dark:shadow-gray-800 group h-full max-h-[600px]">
                        <img 
                            src={image} 
                            alt={contestName} 
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                            onError={(e) => { e.target.src = "https://i.ibb.co/xz9s2wN/placeholder.jpg" }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        
                        {/* Status Badge */}
                        <div className="absolute top-6 right-6">
                            {isDeadlineOver ? (
                                <div className="bg-red-500 text-white px-5 py-2 rounded-full font-bold shadow-lg flex items-center gap-2">
                                    <FaClock /> Deadline Over
                                </div>
                            ) : (
                                <div className="bg-[#FF642F] text-white px-5 py-2 rounded-full font-bold shadow-lg flex items-center gap-2">
                                    <FaClock /> Active Contest
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Side: Details Section */}
                    <div className="flex flex-col h-full">
                        <h2 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] dark:text-white mb-6 leading-tight">
                            {contestName}
                        </h2>
                        
                        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
                            {description}
                        </p>

                        {/* ✅ 2. Stats Grid - Custom Design for Dark Mode */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            {/* Entry Fee */}
                            <div className="bg-orange-50 dark:bg-gray-800 p-5 rounded-2xl border border-orange-100 dark:border-gray-700 flex flex-col items-center text-center hover:shadow-md transition-all">
                                <FaDollarSign className="text-3xl text-[#FF642F] mb-2" />
                                <span className="text-gray-500 dark:text-gray-400 text-sm font-semibold uppercase tracking-wider">Entry Fee</span>
                                <span className="text-2xl font-bold text-[#1A1A1A] dark:text-gray-100">${price}</span>
                            </div>

                            {/* Prize Money */}
                            <div className="bg-yellow-50 dark:bg-gray-800 p-5 rounded-2xl border border-yellow-100 dark:border-gray-700 flex flex-col items-center text-center hover:shadow-md transition-all">
                                <FaTrophy className="text-3xl text-[#FFC107] mb-2" />
                                <span className="text-gray-500 dark:text-gray-400 text-sm font-semibold uppercase tracking-wider">Prize Money</span>
                                <span className="text-2xl font-bold text-[#1A1A1A] dark:text-gray-100">${prizeMoney}</span>
                            </div>

                            {/* Participants */}
                            <div className="bg-blue-50 dark:bg-gray-800 p-5 rounded-2xl border border-blue-100 dark:border-gray-700 flex flex-col items-center text-center hover:shadow-md transition-all">
                                <FaUsers className="text-3xl text-blue-500 mb-2" />
                                <span className="text-gray-500 dark:text-gray-400 text-sm font-semibold uppercase tracking-wider">Participants</span>
                                <span className="text-2xl font-bold text-[#1A1A1A] dark:text-gray-100">{participationCount || 0}</span>
                            </div>

                            {/* Deadline */}
                            <div className={`p-5 rounded-2xl border flex flex-col items-center text-center hover:shadow-md transition-all 
                                ${isDeadlineOver 
                                    ? 'bg-red-50 dark:bg-gray-800 border-red-100 dark:border-red-900/30' 
                                    : 'bg-purple-50 dark:bg-gray-800 border-purple-100 dark:border-purple-900/30'
                                }`}>
                                <FaClock className={`text-3xl mb-2 ${isDeadlineOver ? 'text-red-500' : 'text-purple-500'}`} />
                                <span className="text-gray-500 dark:text-gray-400 text-sm font-semibold uppercase tracking-wider">Deadline</span>
                                <span className={`text-lg font-bold ${isDeadlineOver ? 'text-red-500' : 'text-purple-500'}`}>
                                    {deadline}
                                </span>
                            </div>
                        </div>

                        {/* ✅ 3. Task Instruction Box Dark Mode */}
                        <div className="mb-10">
                            <h3 className="font-bold text-xl mb-4 flex items-center gap-2 text-[#1A1A1A] dark:text-white">
                                <FaFileAlt className="text-[#FF642F]" /> Task Instruction
                            </h3>
                            <div className="bg-[#FFF8F5] dark:bg-gray-800 p-6 rounded-2xl border border-orange-100 dark:border-gray-700 text-gray-700 dark:text-gray-300 italic relative transition-colors">
                                <span className="absolute top-2 left-4 text-6xl text-orange-200 dark:text-gray-600 font-serif opacity-50">“</span>
                                <p className="relative z-10 px-4">{taskInstruction}</p>
                            </div>
                        </div>

                        {/* Action Button */}
                        <div className="mt-auto">
                            {isDeadlineOver ? (
                                <button disabled className="btn w-full rounded-full text-lg h-14 bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 border-none cursor-not-allowed font-bold transition-colors">
                                    Registration Closed
                                </button>
                            ) : (
                                <Link to={`/payment/${_id}`} className="block w-full">
                                    <button className="btn w-full rounded-full text-lg h-14 bg-[#FF642F] hover:bg-[#e05828] text-white border-none shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 font-bold">
                                        Register Now for ${price}
                                    </button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContestDetails;