import { useLoaderData, Link } from "react-router-dom";

const ContestDetails = () => {
    const contest = useLoaderData();
    const { _id, contestName, image, description, price, prizeMoney, taskInstruction, deadline, participationCount } = contest;

    // ডেডলাইন চেক করার লজিক
    const isDeadlineOver = new Date(deadline) < new Date();

    return (
        <div className="my-10 px-4 lg:px-24">
            <div className="card lg:card-side bg-base-100 shadow-xl border overflow-hidden">
                <figure className="lg:w-1/2 relative">
                    <img 
                        src={image} 
                        alt={contestName} 
                        className="w-full h-full object-cover min-h-[400px]" 
                        onError={(e) => { e.target.src = "https://i.ibb.co/xz9s2wN/placeholder.jpg" }}
                    />
                    {/* ইমেজের ওপর স্ট্যাটাস ব্যাজ */}
                    {isDeadlineOver && (
                        <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                            Deadline Over
                        </div>
                    )}
                </figure>
                
                <div className="card-body lg:w-1/2 p-8">
                    <h2 className="card-title text-4xl font-bold text-gray-800 mb-4">{contestName}</h2>
                    <p className="text-gray-600 mb-6 text-lg leading-relaxed">{description}</p>
                    
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="stat bg-orange-50 rounded-xl border border-orange-100 p-4">
                            <div className="stat-title text-orange-600 font-semibold uppercase text-xs tracking-wider">Entry Fee</div>
                            <div className="stat-value text-orange-600 text-3xl font-bold">${price}</div>
                        </div>
                        <div className="stat bg-green-50 rounded-xl border border-green-100 p-4">
                            <div className="stat-title text-green-600 font-semibold uppercase text-xs tracking-wider">Prize Money</div>
                            <div className="stat-value text-green-600 text-3xl font-bold">${prizeMoney}</div>
                        </div>
                        <div className="stat bg-blue-50 rounded-xl border border-blue-100 p-4">
                            <div className="stat-title text-blue-600 font-semibold uppercase text-xs tracking-wider">Participants</div>
                            <div className="stat-value text-blue-600 text-3xl font-bold">{participationCount || 0}</div>
                        </div>
                        <div className={`stat rounded-xl border p-4 ${isDeadlineOver ? 'bg-red-50 border-red-100' : 'bg-purple-50 border-purple-100'}`}>
                            <div className={`stat-title font-semibold uppercase text-xs tracking-wider ${isDeadlineOver ? 'text-red-600' : 'text-purple-600'}`}>Deadline</div>
                            <div className={`stat-value text-xl font-bold ${isDeadlineOver ? 'text-red-600' : 'text-purple-600'}`}>
                                {deadline}
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                            📝 Task Instruction:
                        </h3>
                        <div className="bg-gray-100 p-5 rounded-xl border-l-4 border-primary italic text-gray-700">
                            "{taskInstruction}"
                        </div>
                    </div>

                    <div className="card-actions justify-end mt-auto">
                        {
                            isDeadlineOver ? 
                            <button disabled className="btn btn-disabled w-full text-lg bg-gray-300 text-gray-500 cursor-not-allowed">
                                Registration Closed
                            </button>
                            :
                            <Link to={`/payment/${_id}`} className="w-full">
                                <button className="btn btn-primary w-full text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                                    Register Now
                                </button>
                            </Link>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContestDetails;