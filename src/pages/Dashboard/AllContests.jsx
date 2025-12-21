import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic"; 
import { Link, useSearchParams } from "react-router-dom"; 

const AllContests = () => {
    const axiosPublic = useAxiosPublic();
    const [contests, setContests] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Pagination States
    const [currentPage, setCurrentPage] = useState(0); // বর্তমান পেজ
    const [itemsPerPage] = useState(10); // প্রতি পেজে ১০টি ডাটা
    const [totalCount, setTotalCount] = useState(0); // মোট কতগুলো ডাটা আছে

    // URL থেকে সার্চ প্যারামিটার ধরা
    const [searchParams, setSearchParams] = useSearchParams();
    const currentSearch = searchParams.get("search") || ""; 
    
    // Tab এর জন্য স্টেট
    const [activeTab, setActiveTab] = useState(currentSearch || 'all');

    useEffect(() => {
        setLoading(true);
        
        // ব্যাকএন্ডে রিকোয়েস্ট (page এবং size পাঠানো হচ্ছে)
        // ব্যাকএন্ড এখন { result: [...], total: 100 } এমন অবজেক্ট রিটার্ন করছে
        axiosPublic.get(`/contests?search=${currentSearch}&page=${currentPage}&size=${itemsPerPage}`) 
            .then(res => {
                setContests(res.data.result); // ডাটা সেট করা
                setTotalCount(res.data.total); // মোট সংখ্যা সেট করা
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [axiosPublic, currentSearch, currentPage, itemsPerPage]);

    // Tab এ ক্লিক করলে এই ফাংশন কল হবে
    const handleTabClick = (category) => {
        setActiveTab(category);
        setCurrentPage(0); // ক্যাটাগরি চেঞ্জ করলে পেজ ০ তে রিসেট করতে হবে
        
        if (category === 'all') {
            setSearchParams({});
        } else {
            setSearchParams({ search: category });
        }
    };

    // Pagination Calculation
    const numberOfPages = Math.ceil(totalCount / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()]; // [0, 1, 2, ...]

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[calc(100vh-80px)]">
                <span className="loading loading-spinner loading-lg text-[#FF642F]"></span>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen pb-20 pt-24 font-sans text-[#1A1A1A]">
            
            {/* Header Section */}
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Explore Contests</h2>
                <p className="text-gray-500 text-lg">Browse through categories and find your next challenge</p>
            </div>

            {/* Tabs / Filter Buttons (Pill Shape) */}
            <div className="flex flex-wrap justify-center gap-3 mb-12 px-4">
                {['all', 'business', 'medical', 'article', 'gaming'].map(cat => (
                    <button 
                        key={cat}
                        onClick={() => handleTabClick(cat)} 
                        className={`px-6 py-2.5 rounded-full font-semibold capitalize transition-all duration-300 border ${
                            activeTab.toLowerCase() === cat.toLowerCase() 
                            ? 'bg-[#FF642F] text-white border-[#FF642F] shadow-md' 
                            : 'bg-white text-gray-600 border-gray-200 hover:border-[#FF642F] hover:text-[#FF642F]'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Contests Grid */}
            <div className="w-11/12 max-w-screen-2xl mx-auto min-h-[400px]">
                {contests.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {contests.map(contest => (
                                <div key={contest._id} className="card bg-white shadow-lg hover:shadow-2xl border border-gray-100 hover:border-orange-100 transition-all duration-300 rounded-2xl overflow-hidden group">
                                    <figure className="h-60 relative overflow-hidden">
                                        <img 
                                            src={contest.image} 
                                            alt={contest.contestName} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                        />
                                        {/* Type Badge */}
                                        <div className="absolute top-4 right-4 badge bg-white text-[#FF642F] border-none px-3 py-1.5 font-bold shadow-sm rounded-full capitalize">
                                            {contest.contestType}
                                        </div>
                                    </figure>
                                    
                                    <div className="card-body p-6">
                                        <h2 className="card-title text-xl font-bold text-[#1A1A1A]">
                                            {contest.contestName}
                                        </h2>
                                        <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                                            {contest.description.length > 90 ? contest.description.slice(0, 90) + '...' : contest.description}
                                        </p>
                                        
                                        {/* Stats Row */}
                                        <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
                                            <div className="flex items-center gap-2 text-gray-600 font-medium text-sm">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FF642F]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                                {contest.participationCount} Participants
                                            </div>
                                        </div>

                                        {/* Action Button */}
                                        <div className="card-actions mt-5">
                                            <Link to={`/contest/${contest._id}`} className="w-full">
                                                <button className="btn bg-transparent hover:bg-[#FF642F] border border-[#FF642F] text-[#FF642F] hover:text-white w-full rounded-full font-bold transition-all">
                                                    View Details
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* ✅ PAGINATION CONTROLS ✅ */}
                        <div className="flex justify-center items-center mt-16 gap-2">
                            <button 
                                className="btn btn-sm btn-circle bg-white border-gray-200 hover:bg-[#FF642F] hover:text-white hover:border-[#FF642F] disabled:bg-gray-100 disabled:text-gray-300"
                                onClick={() => setCurrentPage(currentPage - 1)} 
                                disabled={currentPage === 0}
                            >
                                ❮
                            </button>

                            {pages.map(page => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`btn btn-sm btn-circle border-none ${
                                        currentPage === page 
                                        ? 'bg-[#FF642F] text-white hover:bg-[#e05525]' 
                                        : 'bg-white text-gray-600 hover:bg-orange-50'
                                    }`}
                                >
                                    {page + 1}
                                </button>
                            ))}

                            <button 
                                className="btn btn-sm btn-circle bg-white border-gray-200 hover:bg-[#FF642F] hover:text-white hover:border-[#FF642F] disabled:bg-gray-100 disabled:text-gray-300"
                                onClick={() => setCurrentPage(currentPage + 1)}
                                disabled={currentPage === numberOfPages - 1}
                            >
                                ❯
                            </button>
                        </div>
                    </>
                ) : (
                    // No Data Found State
                    <div className="flex flex-col items-center justify-center py-24 bg-gray-50 rounded-3xl border border-dashed border-gray-300">
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4 text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-700">No Contests Found!</h3>
                        <p className="text-gray-500 mt-2">Try searching with a different keyword or category.</p>
                        <button onClick={() => {setSearchParams({}); setActiveTab('all'); setCurrentPage(0);}} className="mt-6 text-[#FF642F] font-bold hover:underline">
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllContests;