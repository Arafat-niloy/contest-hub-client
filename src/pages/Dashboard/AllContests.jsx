import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic"; 
import { Link, useSearchParams } from "react-router-dom"; 

const AllContests = () => {
    const axiosPublic = useAxiosPublic();
    const [contests, setContests] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // URL থেকে সার্চ প্যারামিটার ধরা এবং সেট করার হুক
    const [searchParams, setSearchParams] = useSearchParams();
    const currentSearch = searchParams.get("search") || ""; 
    
    // Tab এর জন্য একটি স্টেট, যাতে বুঝা যায় কোনটা একটিভ আছে
    // যদি URL এ কিছু না থাকে তবে 'all', নাহলে যা সার্চ করা হয়েছে সেটাই
    const [activeTab, setActiveTab] = useState(currentSearch || 'all');

    useEffect(() => {
        setLoading(true);
        // ব্যাকএন্ডে রিকোয়েস্ট পাঠানো হচ্ছে
        axiosPublic.get(`/contests?search=${currentSearch}`) 
            .then(res => {
                setContests(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [axiosPublic, currentSearch]); // currentSearch চেঞ্জ হলেই ডাটা আবার লোড হবে

    // Tab এ ক্লিক করলে এই ফাংশন কল হবে
    const handleTabClick = (category) => {
        setActiveTab(category);
        if (category === 'all') {
            setSearchParams({}); // URL থেকে search সরিয়ে ফেলবে
        } else {
            setSearchParams({ search: category }); // URL এ ?search=CategoryName যোগ করবে
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="w-11/12 mx-auto my-10">
            <h2 className="text-4xl font-bold text-center mb-8">All Contests</h2>

            {/* Tabs / Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
                {['all', 'business', 'medical', 'article', 'gaming'].map(cat => (
                    <button 
                        key={cat}
                        onClick={() => handleTabClick(cat)} 
                        className={`btn capitalize ${activeTab.toLowerCase() === cat.toLowerCase() ? 'btn-primary' : 'btn-outline'}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Contests Grid */}
            {contests.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {contests.map(contest => (
                        <div key={contest._id} className="card bg-base-100 shadow-xl border">
                            <figure>
                                <img src={contest.image} alt={contest.contestName} className="h-60 w-full object-cover" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">
                                    {contest.contestName}
                                    <div className="badge badge-secondary">{contest.contestType}</div>
                                </h2>
                                <p>{contest.description.slice(0, 100)}...</p>
                                <p className="font-semibold">Participants: {contest.participationCount}</p>
                                <div className="card-actions justify-end mt-4">
                                    <Link to={`/contest/${contest._id}`}>
                                        <button className="btn btn-primary btn-sm">Details</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                // No Data Found
                <div className="flex flex-col items-center justify-center py-20 bg-base-200 rounded-lg">
                    <h3 className="text-2xl font-bold text-gray-500">No Contests Found!</h3>
                    <p className="text-gray-400">Try searching with a different keyword or category.</p>
                </div>
            )}
        </div>
    );
};

export default AllContests;