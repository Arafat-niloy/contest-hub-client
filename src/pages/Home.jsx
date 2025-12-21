import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic"; 
import useAuth from "../hooks/useAuth"; 
import useAxiosSecure from "../hooks/useAxiosSecure"; 

const Home = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();
    
    // States
    const [popularContests, setPopularContests] = useState([]);
    const [topWinners, setTopWinners] = useState([]);
    const [bestCreators, setBestCreators] = useState([]); 
    const [searchTerm, setSearchTerm] = useState("");
    const [userRole, setUserRole] = useState(null);

    // Data Fetching
    useEffect(() => {
        axiosPublic.get('/contests/popular').then(res => setPopularContests(res.data));
        axiosPublic.get('/leaderboard').then(res => setTopWinners(res.data));
        axiosPublic.get('/best-creators').then(res => setBestCreators(res.data));
            
        if (user?.email) {
            axiosSecure.get(`/users/role/${user.email}`)
                .then(res => setUserRole(res.data.role))
                .catch(err => console.log(err));
        }
    }, [axiosPublic, axiosSecure, user]);

    // Handle Search
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/all-contests?search=${searchTerm}`);
        }
    };

    return (
        // ✅ 1. Main Container Background Updated
        <div className="bg-white dark:bg-gray-900 pb-20 font-sans text-[#1A1A1A] dark:text-gray-100 transition-colors duration-300">
            
            {/* ================= HERO SECTION ================= */}
            <div className="hero min-h-[600px] relative">
                 <div className="absolute inset-0 z-0">
                    <img src="https://i.ibb.co.com/20GSGpyY/9486913.jpg" alt="Background" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60"></div>
                 </div>

                 <div className="hero-content text-center text-neutral-content relative z-10">
                    <div className="max-w-4xl">
                        <h1 className="mb-6 text-5xl md:text-7xl font-bold text-white leading-tight tracking-tight">
                            Unleash Your Talent <br /> 
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF642F] to-[#FFC107]">
                                Win Big Prizes!
                            </span>
                        </h1>
                        <p className="mb-10 text-lg md:text-xl text-gray-200 font-medium max-w-2xl mx-auto">
                            Join the ultimate hub for creators. Participate in world-class contests, compete with top talents, and showcase your creativity.
                        </p>
                        
                         {/* ✅ 2. Search Form Dark Mode Fix */}
                         <form onSubmit={handleSearch} className="join w-full max-w-lg shadow-2xl rounded-full overflow-hidden bg-white dark:bg-gray-800 p-1.5 pl-6 flex items-center transition-colors duration-300">
                            <input 
                                type="text" 
                                placeholder="Search for contests..." 
                                className="w-full bg-transparent text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none text-lg"
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button className="btn bg-[#FF642F] hover:bg-[#e05828] border-none text-white rounded-full px-8 h-12 min-h-0 text-[16px] font-bold">
                                Search
                            </button>
                        </form>
                    </div>
                 </div>
            </div>

            {/* ================= POPULAR CONTESTS SECTION ================= */}
            <div className="w-11/12 max-w-screen-2xl mx-auto my-24">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4 text-[#1A1A1A] dark:text-white">Popular Contests</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-lg">Trending contests with the highest participation</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {popularContests.map(contest => (
                        // ✅ 3. Card Dark Mode Fix
                        <div key={contest._id} className="card bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl border border-gray-100 dark:border-gray-700 hover:border-orange-100 dark:hover:border-gray-600 transition-all duration-300 group rounded-2xl overflow-hidden">
                             <figure className="h-60 relative overflow-hidden">
                                <img src={contest.image} alt={contest.contestName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute top-4 right-4 badge bg-white dark:bg-gray-900 text-[#FF642F] border-none px-3 py-1.5 font-bold shadow-sm rounded-full capitalize">
                                    {contest.contestType}
                                </div>
                             </figure>
                             <div className="card-body p-6">
                                <h2 className="card-title text-xl font-bold text-[#1A1A1A] dark:text-white">{contest.contestName}</h2>
                                <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">{contest.description.slice(0, 80)}...</p>
                                
                                <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                                    <span className="flex items-center gap-2 text-gray-600 dark:text-gray-300 font-medium text-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FF642F]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                        {contest.participationCount} Joined
                                    </span>
                                    <span className="text-[#FF642F] text-xl font-bold">${contest.price}</span>
                                </div>

                                <div className="card-actions mt-5">
                                    <Link to={`/contest/${contest._id}`} className="w-full">
                                        <button className="btn bg-transparent hover:bg-[#FF642F] border border-[#FF642F] text-[#FF642F] hover:text-white w-full rounded-full font-bold transition-all dark:hover:bg-[#FF642F] dark:text-[#FF642F] dark:hover:text-white">
                                            View Details
                                        </button>
                                    </Link>
                                </div>
                             </div>
                        </div>
                    ))}
                </div>
                
                <div className="text-center mt-14">
                    <Link to="/all-contests">
                        <button className="btn btn-wide bg-[#FF642F] hover:bg-[#e05828] text-white border-none rounded-full text-lg shadow-lg hover:shadow-xl transition-all">
                            See All Contests
                        </button>
                    </Link>
                </div>
            </div>

            {/* ================= BEST CREATORS SECTION ================= */}
            {/* ✅ 4. Section Background Updated */}
            <div className="bg-[#FFF8F5] dark:bg-gray-800 py-24 transition-colors duration-300"> 
                <div className="w-11/12 max-w-screen-2xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4 text-[#1A1A1A] dark:text-white">Best Creators</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-lg">Meet the masterminds behind our top contests</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {bestCreators.map(creator => (
                            // ✅ 5. Creator Card Updated
                            <div key={creator._id} className="flex items-center gap-5 p-6 bg-white dark:bg-gray-700 rounded-2xl shadow-sm hover:shadow-md transition-all border border-transparent hover:border-orange-200 dark:hover:border-gray-600">
                                <div className="avatar">
                                    <div className="w-16 rounded-full ring ring-[#FF642F] ring-offset-base-100 dark:ring-offset-gray-700 ring-offset-2">
                                        <img src={creator.photo || "https://i.ibb.co/tY949qL/avatar.png"} alt={creator.name} />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-[#1A1A1A] dark:text-white">{creator.name}</h3>
                                    <p className="text-sm text-[#FF642F] font-semibold tracking-wide uppercase mt-1">Contest Creator</p>
                                    <div className="flex items-center gap-1 mt-1">
                                        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                                        <span className="text-xs text-gray-400 font-medium">Verified</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ================= TOP WINNERS SECTION ================= */}
            <div className="w-11/12 max-w-screen-2xl mx-auto my-24">
                 <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4 text-[#1A1A1A] dark:text-white">Top Winners</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-lg">Hall of fame for our most successful participants</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {topWinners.map((winner, index) => (
                          // ✅ 6. Winner Card Updated
                          <div key={index} className="card bg-white dark:bg-gray-800 shadow-md hover:shadow-xl border border-gray-100 dark:border-gray-700 hover:-translate-y-2 transition-transform duration-300 rounded-2xl">
                            <div className="card-body items-center text-center p-8">
                                <div className="avatar mb-4">
                                    <div className="w-24 rounded-full ring ring-[#FFC107] ring-offset-base-100 dark:ring-offset-gray-800 ring-offset-2">
                                        <img src={winner.photo || "https://i.ibb.co/tY949qL/avatar.png"} alt={winner.name} />
                                    </div>
                                </div>
                                <h3 className="font-bold text-lg text-[#1A1A1A] dark:text-white">{winner.name}</h3>
                                <div className="badge bg-gradient-to-r from-[#FF642F] to-[#FFC107] text-white border-none font-bold mt-3 px-4 py-3 rounded-full shadow-sm">
                                    🏆 {winner.winCount} Wins
                                </div>
                            </div>
                         </div>
                    ))}
                </div>
            </div>

             {/* ================= PROMOTION / CALL TO ACTION ================= */}
             
             {/* 1. Creator Promotion (Gradient remains mostly same, just text tweaks if needed) */}
             {(!user || userRole === 'creator' || userRole === 'admin') && (
                <div className="w-11/12 max-w-screen-2xl mx-auto my-20 bg-gradient-to-tr from-[#FF642F] to-[#FF9100] rounded-3xl p-10 md:p-20 text-white flex flex-col md:flex-row items-center justify-between shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-white opacity-10 blur-2xl"></div>
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-60 h-60 rounded-full bg-black opacity-5 blur-2xl"></div>
                    
                    <div className="text-center md:text-left mb-8 md:mb-0 md:w-2/3 z-10">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to host your own contest?</h2>
                        <p className="text-lg opacity-90 leading-relaxed">Create a contest today, manage participants easily, and find the best talents from around the world.</p>
                    </div>
                    <div className="z-10">
                        <Link to={user ? "/dashboard/add-contest" : "/login"}>
                            <button className="btn bg-white text-[#FF642F] hover:bg-gray-50 border-none px-10 h-14 rounded-full text-lg font-bold shadow-lg flex items-center gap-2 group">
                                {user ? "Create Contest" : "Start Hosting"}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 group-hover:translate-x-1 transition-transform">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </button>
                        </Link>
                    </div>
                </div>
             )}

             {/* 2. User Promotion (Dark Card) */}
             {user && userRole === 'user' && (
                <div className="w-11/12 max-w-screen-2xl mx-auto my-20 bg-[#1A1A1A] dark:bg-gray-800 dark:border dark:border-gray-700 rounded-3xl p-10 md:p-20 text-white flex flex-col md:flex-row items-center justify-between shadow-2xl relative overflow-hidden transition-colors duration-300">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF642F] opacity-5 rounded-full blur-3xl"></div>
                    
                    <div className="text-center md:text-left mb-8 md:mb-0 md:w-2/3 z-10">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Showcase Your Skills</h2>
                        <p className="text-lg text-gray-300">Participate in challenges, compete with others, and <span className="text-[#FF642F] font-bold">win exciting prizes!</span></p>
                    </div>
                    <div className="z-10">
                        <Link to="/all-contests">
                            <button className="btn bg-[#FF642F] hover:bg-[#e05828] text-white border-none px-10 h-14 rounded-full text-lg font-bold shadow-lg flex items-center gap-2 group">
                                Browse Contests
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 group-hover:translate-x-1 transition-transform">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </button>
                        </Link>
                    </div>
                </div>
             )}
        </div>
    );
};

export default Home;