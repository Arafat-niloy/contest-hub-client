import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const BestCreators = () => {
    const axiosPublic = useAxiosPublic();
    const [creators, setCreators] = useState([]);
    const [winners, setWinners] = useState([]);

    useEffect(() => {
        // Fetch Best Creators
        axiosPublic.get('/best-creators')
            .then(res => setCreators(res.data));
        
        // Fetch Top Winners (Leaderboard)
        axiosPublic.get('/leaderboard')
            .then(res => setWinners(res.data));
    }, [axiosPublic]);

    return (
        <div className="my-16 w-11/12 mx-auto">
            
            {/* Section 1: Best Creators */}
            <div className="mb-16">
                <h2 className="text-4xl font-bold text-center mb-2">Best Creators</h2>
                <p className="text-center text-gray-500 mb-8">Meet the masterminds behind the best contests</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {creators.map(creator => (
                        <div key={creator._id} className="card bg-base-100 shadow-xl border text-center p-5">
                            <div className="avatar justify-center">
                                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img src={creator.photo || "https://i.ibb.co/tY949qL/avatar.png"} alt="Creator" />
                                </div>
                            </div>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">{creator.name}</h2>
                                <p className="text-gray-500">Contest Creator</p>
                                <p className="text-sm">{creator.email}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Section 2: Top Winners Leaderboard */}
            <div>
                <h2 className="text-4xl font-bold text-center mb-2">Leaderboard</h2>
                <p className="text-center text-gray-500 mb-8">Top winners who dominated the contests</p>

                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full shadow-lg border">
                        {/* head */}
                        <thead className="bg-primary text-white">
                            <tr>
                                <th>Rank</th>
                                <th>Winner Name</th>
                                <th>Total Wins</th>
                            </tr>
                        </thead>
                        <tbody>
                            {winners.map((winner, index) => (
                                <tr key={index}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={winner.photo || "https://i.ibb.co/tY949qL/avatar.png"} alt="Winner" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{winner.name}</div>
                                                <div className="text-sm opacity-50">{winner._id}</div> 
                                            </div>
                                        </div>
                                    </td>
                                    <td className="font-bold text-lg text-secondary">{winner.winCount} Wins</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default BestCreators;