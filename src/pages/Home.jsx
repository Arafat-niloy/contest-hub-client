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
        // 1. Fetch Popular Contests
        axiosPublic.get('/contests/popular')
            .then(res => setPopularContests(res.data));

        // 2. Fetch Top Winners (Leaderboard)
        axiosPublic.get('/leaderboard')
            .then(res => setTopWinners(res.data));

        // 3. Fetch Best Creators
        axiosPublic.get('/best-creators')
            .then(res => setBestCreators(res.data));
            
        // 4. Fetch User Role (Only if logged in)
        if (user?.email) {
            axiosSecure.get(`/users/role/${user.email}`)
                .then(res => {
                    setUserRole(res.data.role);
                })
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
        <div className="bg-base-100 pb-20">
            
            {/* ================= HERO SECTION ================= */}
            <div className="hero min-h-[500px]" style={{ backgroundImage: 'url(https://i.ibb.co/6X9m0gM/contest-bg.jpg)' }}>
                 <div className="hero-overlay bg-opacity-70"></div>
                 <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-3xl">
                        <h1 className="mb-5 text-5xl font-bold text-white leading-tight">
                            Unleash Your Talent & <br /> <span className="text-yellow-400">Win Big Prizes!</span>
                        </h1>
                        <p className="mb-5 text-lg text-gray-200">
                            Participate in world-class contests, compete with top talents, and showcase your creativity to the world.
                        </p>
                         {/* Search Form */}
                         <form onSubmit={handleSearch} className="join w-full max-w-md shadow-2xl">
                            <input 
                                type="text" 
                                placeholder="Search for contests..." 
                                className="input input-bordered join-item w-full text-black focus:outline-none"
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button className="btn btn-primary join-item rounded-r-lg text-white border-none">Search</button>
                        </form>
                    </div>
                 </div>
            </div>

            {/* ================= POPULAR CONTESTS SECTION ================= */}
            <div className="w-11/12 mx-auto my-20">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-3 text-gray-800">Popular Contests</h2>
                    <p className="text-gray-500">Trending contests with the highest participation</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {popularContests.map(contest => (
                        <div key={contest._id} className="card bg-base-100 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
                             <figure className="h-56 relative">
                                <img src={contest.image} alt={contest.contestName} className="w-full h-full object-cover" />
                                <div className="absolute top-2 right-2 badge badge-secondary">{contest.contestType}</div>
                             </figure>
                             <div className="card-body">
                                <h2 className="card-title">{contest.contestName}</h2>
                                <p className="text-gray-600">{contest.description.slice(0, 60)}...</p>
                                <div className="flex justify-between items-center mt-2 text-sm font-semibold text-gray-500">
                                    <span>Participants: {contest.participationCount}</span>
                                    <span>Price: ${contest.contestPrice}</span>
                                </div>
                                <div className="card-actions justify-end mt-4">
                                    <Link to={`/contest/${contest._id}`} className="w-full">
                                        <button className="btn btn-outline btn-primary w-full">View Details</button>
                                    </Link>
                                </div>
                             </div>
                        </div>
                    ))}
                </div>
                
                <div className="text-center mt-12">
                    <Link to="/all-contests">
                        <button className="btn btn-wide btn-primary">See All Contests</button>
                    </Link>
                </div>
            </div>

            {/* ================= BEST CREATORS SECTION ================= */}
            <div className="bg-base-200 py-20">
                <div className="w-11/12 mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-3 text-gray-800">Best Creators</h2>
                        <p className="text-gray-500">Meet the masterminds behind our top contests</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {bestCreators.map(creator => (
                            <div key={creator._id} className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-md border hover:border-primary transition-all">
                                <div className="avatar">
                                    <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img src={creator.photo || "https://i.ibb.co/tY949qL/avatar.png"} alt={creator.name} />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">{creator.name}</h3>
                                    <p className="text-sm text-gray-500">Contest Creator</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ================= TOP WINNERS SECTION ================= */}
            <div className="w-11/12 mx-auto my-20">
                 <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-3 text-gray-800">Top Winners</h2>
                    <p className="text-gray-500">Hall of fame for our most successful participants</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {topWinners.map((winner, index) => (
                         <div key={index} className="card bg-base-100 shadow-lg border hover:-translate-y-2 transition-transform duration-300">
                            <div className="card-body items-center text-center">
                                <div className="avatar mb-3">
                                    <div className="w-24 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
                                        <img src={winner.photo || "https://i.ibb.co/tY949qL/avatar.png"} alt={winner.name} />
                                    </div>
                                </div>
                                <h3 className="font-bold text-lg">{winner.name}</h3>
                                <div className="badge badge-accent text-white font-bold mt-2">
                                    🏆 {winner.winCount} Wins
                                </div>
                            </div>
                         </div>
                    ))}
                </div>
            </div>

             {/* ================= PROMOTION / CALL TO ACTION (UPDATED AS PER IMAGES) ================= */}
             
             {/* 1. Purple Banner (For Creators/Guest/Admin) */}
             {(!user || userRole === 'creator' || userRole === 'admin') && (
                <div className="w-11/12 mx-auto my-20 bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] rounded-xl p-10 md:p-14 text-white flex flex-col md:flex-row items-center justify-between shadow-2xl">
                    <div className="text-center md:text-left mb-6 md:mb-0 md:w-2/3">
                        <h2 className="text-3xl md:text-4xl font-bold mb-3">Ready to host your own contest?</h2>
                        <p className="text-lg opacity-90">Create a contest today and find the best talents from around the world.</p>
                    </div>
                    <div>
                        <Link to={user ? "/dashboard/add-contest" : "/login"}>
                            <button className="btn bg-white/20 hover:bg-white/30 text-white border-none px-8 text-lg font-bold">
                                {user ? "Create Contest Now" : "Create Contest Now"}
                            </button>
                        </Link>
                    </div>
                </div>
             )}

             {/* 2. Teal/Green Banner (For Users/Participants) */}
             {user && userRole === 'user' && (
                <div className="w-11/12 mx-auto my-20 bg-[#009688] rounded-xl p-10 md:p-14 text-white flex flex-col md:flex-row items-center justify-between shadow-2xl">
                    <div className="text-center md:text-left mb-6 md:mb-0 md:w-2/3">
                        <h2 className="text-3xl md:text-4xl font-bold mb-3">Ready to Showcase Your Skills?</h2>
                        <p className="text-lg opacity-90">Participate in challenges, compete with others, and win exciting prizes!</p>
                    </div>
                    <div>
                        <Link to="/all-contests">
                            <button className="btn bg-white text-[#009688] hover:bg-gray-100 border-none px-8 text-lg font-bold">
                                Browse Contests
                            </button>
                        </Link>
                    </div>
                </div>
             )}
             
        </div>
    );
};

export default Home;