import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllContests = () => {
    const [contests, setContests] = useState([]);

    useEffect(() => {
        // ডাটাবেস থেকে সব কন্টেস্ট লোড করা হচ্ছে
        fetch('http://localhost:5000/contests')
            .then(res => res.json())
            .then(data => {
                setContests(data);
            })
    }, []);

    return (
        <div className="my-10 px-4 lg:px-24">
            <h2 className="text-4xl font-bold text-center mb-10 text-primary">All Contests</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    contests.map(contest => (
                        <div key={contest._id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border">
                            <figure className="h-48 w-full overflow-hidden">
                                <img 
                                    src={contest.image} 
                                    alt={contest.contestName} 
                                    className="w-full h-full object-cover" 
                                />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">
                                    {contest.contestName}
                                    <div className="badge badge-secondary text-xs">{contest.contestType}</div>
                                </h2>
                                <p className="text-gray-600 text-sm">
                                    {contest.description?.length > 100 
                                        ? contest.description.slice(0, 100) + '...' 
                                        : contest.description}
                                </p>
                                <div className="flex justify-between items-center mt-4 text-sm">
                                    <div className="font-semibold">Entry: <span className="text-orange-600">${contest.price}</span></div>
                                    <div className="font-semibold">Prize: <span className="text-green-600">${contest.prizeMoney}</span></div>
                                </div>
                                <div className="card-actions justify-end mt-4">
                                    <Link to={`/contest/${contest._id}`}>
                                        <button className="btn btn-primary w-full btn-sm">Details</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default AllContests;