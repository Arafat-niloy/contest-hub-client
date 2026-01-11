import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic"; 
import useAuth from "../hooks/useAuth"; 
import useAxiosSecure from "../hooks/useAxiosSecure"; 

// Simple Skeleton Component for loading states
const CardSkeleton = () => (
    <div className="card bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden animate-pulse border border-gray-200 dark:border-gray-700">
        <div className="h-60 bg-gray-300 dark:bg-gray-700 w-full"></div>
        <div className="p-6 space-y-4">
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
            <div className="flex justify-between mt-6">
                <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
                <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
            </div>
        </div>
    </div>
);

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
    const [loading, setLoading] = useState(true); // Loading state added

    // Data Fetching
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [popRes, winRes, creatRes] = await Promise.all([
                    axiosPublic.get('/contests/popular'),
                    axiosPublic.get('/leaderboard'),
                    axiosPublic.get('/best-creators')
                ]);
                
                setPopularContests(popRes.data);
                setTopWinners(winRes.data);
                setBestCreators(creatRes.data);

                if (user?.email) {
                    const roleRes = await axiosSecure.get(`/users/role/${user.email}`);
                    setUserRole(roleRes.data.role);
                }
            } catch (err) {
                console.error("Error fetching home data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [axiosPublic, axiosSecure, user]);

    // Handle Search
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/all-contests?search=${searchTerm}`);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-900 font-sans text-[#1A1A1A] dark:text-gray-100 transition-colors duration-300">
            
            {/* 1. HERO SECTION (Height 60-70% rule) */}
            <div className="hero min-h-[70vh] relative">
                 <div className="absolute inset-0 z-0">
                    <img src="https://i.ibb.co.com/20GSGpyY/9486913.jpg" alt="Background" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
                 </div>

                 <div className="hero-content text-center text-neutral-content relative z-10 w-full">
                    <div className="max-w-4xl mx-auto px-4">
                        <h1 className="mb-6 text-5xl md:text-7xl font-bold text-white leading-tight tracking-tight drop-shadow-lg">
                            Unleash Your Talent <br /> 
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF642F] to-[#FFC107]">
                                Win Big Prizes!
                            </span>
                        </h1>
                        <p className="mb-10 text-lg md:text-xl text-gray-200 font-medium max-w-2xl mx-auto drop-shadow-md">
                            The ultimate creative battleground. Compete in design, code, writing, and more.
                        </p>
                        
                         <form onSubmit={handleSearch} className="join w-full max-w-lg shadow-2xl rounded-full overflow-hidden bg-white dark:bg-gray-800 p-2 flex items-center transition-all focus-within:ring-4 focus-within:ring-[#FF642F]/30 mx-auto">
                            <input 
                                type="text" 
                                placeholder="Find your challenge..." 
                                className="w-full bg-transparent text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none text-lg px-4"
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button className="btn bg-[#FF642F] hover:bg-[#e05828] border-none text-white rounded-full px-8 h-12 min-h-0 text-[16px] font-bold">
                                Search
                            </button>
                        </form>
                    </div>
                 </div>
            </div>

            {/* 2. STATISTICS SECTION (New meaningful section) */}
            <div className="py-16 bg-gray-50 dark:bg-gray-800/50">
                <div className="w-11/12 max-w-screen-xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div className="space-y-2">
                        <h3 className="text-4xl font-extrabold text-[#FF642F]">10K+</h3>
                        <p className="text-gray-600 dark:text-gray-400 font-medium">Active Users</p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-4xl font-extrabold text-[#FF642F]">500+</h3>
                        <p className="text-gray-600 dark:text-gray-400 font-medium">Contests Hosted</p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-4xl font-extrabold text-[#FF642F]">$1M+</h3>
                        <p className="text-gray-600 dark:text-gray-400 font-medium">Prizes Awarded</p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-4xl font-extrabold text-[#FF642F]">50+</h3>
                        <p className="text-gray-600 dark:text-gray-400 font-medium">Categories</p>
                    </div>
                </div>
            </div>

            {/* 3. POPULAR CONTESTS SECTION */}
            <div className="w-11/12 max-w-screen-2xl mx-auto my-24">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4 text-[#1A1A1A] dark:text-white">Popular Contests</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-lg">Trending contests with the highest participation</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading 
                        ? Array(6).fill(0).map((_, idx) => <CardSkeleton key={idx} />)
                        : popularContests.slice(0, 6).map(contest => (
                        <div key={contest._id} className="card bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl border border-gray-100 dark:border-gray-700 hover:border-orange-100 dark:hover:border-gray-600 transition-all duration-300 group rounded-2xl overflow-hidden h-full flex flex-col">
                             <figure className="h-60 relative overflow-hidden">
                                <img src={contest.image} alt={contest.contestName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute top-4 right-4 badge bg-white dark:bg-gray-900 text-[#FF642F] border-none px-3 py-1.5 font-bold shadow-sm rounded-full capitalize">
                                    {contest.contestType}
                                </div>
                             </figure>
                             <div className="card-body p-6 flex-grow">
                                <h2 className="card-title text-xl font-bold text-[#1A1A1A] dark:text-white">{contest.contestName}</h2>
                                <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">{contest.description.slice(0, 80)}...</p>
                                
                                <div className="flex justify-between items-center mt-auto pt-6 border-t border-gray-100 dark:border-gray-700">
                                    <span className="flex items-center gap-2 text-gray-600 dark:text-gray-300 font-medium text-sm">
                                        👥 {contest.participationCount} Joined
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

            {/* 4. HOW IT WORKS (New meaningful section) */}
            <div className="bg-[#FFF8F5] dark:bg-gray-800 py-24">
                <div className="w-11/12 max-w-screen-xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4 text-[#1A1A1A] dark:text-white">How It Works</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-lg">Your journey to victory in 3 simple steps</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
                        <div className="p-8 bg-white dark:bg-gray-700 rounded-3xl shadow-sm hover:shadow-md transition-all">
                            <div className="w-20 h-20 bg-[#FF642F]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-3xl">🔍</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3 dark:text-white">Find a Contest</h3>
                            <p className="text-gray-500 dark:text-gray-300">Browse through hundreds of categories and find the one that matches your skills.</p>
                        </div>
                        <div className="p-8 bg-white dark:bg-gray-700 rounded-3xl shadow-sm hover:shadow-md transition-all">
                            <div className="w-20 h-20 bg-[#FF642F]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-3xl">🚀</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3 dark:text-white">Submit Your Entry</h3>
                            <p className="text-gray-500 dark:text-gray-300">Work on your project, follow the guidelines, and upload your submission easily.</p>
                        </div>
                        <div className="p-8 bg-white dark:bg-gray-700 rounded-3xl shadow-sm hover:shadow-md transition-all">
                            <div className="w-20 h-20 bg-[#FF642F]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-3xl">🏆</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3 dark:text-white">Win Prizes</h3>
                            <p className="text-gray-500 dark:text-gray-300">Get rated by experts and the community to win cash prizes and recognition.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 5. BEST CREATORS SECTION */}
            <div className="w-11/12 max-w-screen-2xl mx-auto my-24"> 
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4 text-[#1A1A1A] dark:text-white">Best Creators</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-lg">Meet the masterminds behind our top contests</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading ? (
                         Array(3).fill(0).map((_, idx) => <div key={idx} className="h-24 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse"></div>)
                    ) : (
                        bestCreators.slice(0, 3).map(creator => (
                            <div key={creator._id} className="flex items-center gap-5 p-6 bg-white dark:bg-gray-700 rounded-2xl shadow-sm hover:shadow-md transition-all border border-transparent hover:border-orange-200 dark:hover:border-gray-600 cursor-pointer">
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
                        ))
                    )}
                </div>
            </div>

            {/* 6. TESTIMONIALS (New meaningful section) */}
            <div className="bg-gray-900 text-white py-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF642F] opacity-10 blur-3xl rounded-full"></div>
                <div className="w-11/12 max-w-screen-xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">What Our Users Say</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
                            <p className="italic text-gray-300 mb-6">"This platform changed my career. I won 3 design contests and got hired by a top agency!"</p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-gray-500 rounded-full"></div>
                                <div><h4 className="font-bold">Sarah Jenkins</h4><p className="text-xs text-gray-400">Graphic Designer</p></div>
                            </div>
                        </div>
                        <div className="p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
                            <p className="italic text-gray-300 mb-6">"As a contest holder, I was amazed by the quality of submissions. Highly recommended."</p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-gray-500 rounded-full"></div>
                                <div><h4 className="font-bold">Mike Ross</h4><p className="text-xs text-gray-400">Startup Founder</p></div>
                            </div>
                        </div>
                        <div className="p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
                            <p className="italic text-gray-300 mb-6">"The payment process is smooth and the community is super supportive."</p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-gray-500 rounded-full"></div>
                                <div><h4 className="font-bold">David Chen</h4><p className="text-xs text-gray-400">Web Developer</p></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 7. TOP WINNERS SECTION */}
            <div className="w-11/12 max-w-screen-2xl mx-auto my-24">
                 <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4 text-[#1A1A1A] dark:text-white">Hall of Fame</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-lg">Top winners who are dominating the leaderboard</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {loading ? (
                        Array(5).fill(0).map((_, idx) => <div key={idx} className="h-48 bg-gray-100 dark:bg-gray-800 rounded-2xl animate-pulse"></div>)
                    ) : (
                        topWinners.map((winner, index) => (
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
                        ))
                    )}
                </div>
            </div>

            {/* 8. PROMOTION / CALL TO ACTION */}
            {(!user || userRole === 'creator' || userRole === 'admin') && (
            <div className="w-11/12 max-w-screen-2xl mx-auto my-20 bg-gradient-to-tr from-[#FF642F] to-[#FF9100] rounded-3xl p-10 md:p-20 text-white flex flex-col md:flex-row items-center justify-between shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-white opacity-10 blur-2xl"></div>
                <div className="text-center md:text-left mb-8 md:mb-0 md:w-2/3 z-10">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to host your own contest?</h2>
                    <p className="text-lg opacity-90 leading-relaxed">Create a contest today, manage participants easily, and find the best talents.</p>
                </div>
                <div className="z-10">
                    <Link to={user ? "/dashboard/add-contest" : "/login"}>
                        <button className="btn bg-white text-[#FF642F] hover:bg-gray-50 border-none px-10 h-14 rounded-full text-lg font-bold shadow-lg flex items-center gap-2 group">
                            {user ? "Create Contest" : "Start Hosting"}
                        </button>
                    </Link>
                </div>
            </div>
            )}

            {/* 9. FAQ SECTION (New meaningful section) */}
            <div className="bg-white dark:bg-gray-900 py-20">
                <div className="max-w-3xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-10 dark:text-white">Frequently Asked Questions</h2>
                    <div className="join join-vertical w-full bg-base-100 dark:bg-gray-800 rounded-2xl shadow">
                      <div className="collapse collapse-arrow join-item border border-base-300 dark:border-gray-700">
                        <input type="radio" name="my-accordion-4" defaultChecked /> 
                        <div className="collapse-title text-xl font-medium dark:text-gray-200">How do I join a contest?</div>
                        <div className="collapse-content dark:text-gray-400"> 
                          <p>Simply create an account, browse the active contests, and click 'Join'. Pay the entry fee if applicable and submit your work.</p>
                        </div>
                      </div>
                      <div className="collapse collapse-arrow join-item border border-base-300 dark:border-gray-700">
                        <input type="radio" name="my-accordion-4" /> 
                        <div className="collapse-title text-xl font-medium dark:text-gray-200">Is payment secured?</div>
                        <div className="collapse-content dark:text-gray-400"> 
                          <p>Yes, we use Stripe for all transactions ensuring your financial data is encrypted and safe.</p>
                        </div>
                      </div>
                      <div className="collapse collapse-arrow join-item border border-base-300 dark:border-gray-700">
                        <input type="radio" name="my-accordion-4" /> 
                        <div className="collapse-title text-xl font-medium dark:text-gray-200">Can I organize a contest?</div>
                        <div className="collapse-content dark:text-gray-400"> 
                          <p>Absolutely! If you have a Creator or Admin account, you can host contests and set your own prizes.</p>
                        </div>
                      </div>
                    </div>
                </div>
            </div>

            {/* 10. NEWSLETTER SECTION (New meaningful section) */}
            <div className="bg-gray-100 dark:bg-gray-800 py-20">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Stay Updated</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto">Subscribe to our newsletter to get the latest contest updates, tips for winning, and exclusive offers.</p>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-lg mx-auto">
                        <input type="email" placeholder="Enter your email" className="input input-bordered w-full dark:bg-gray-700 dark:text-white focus:outline-none focus:border-[#FF642F]" />
                        <button className="btn bg-[#FF642F] hover:bg-[#e05828] text-white border-none w-full sm:w-auto">Subscribe</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Home;