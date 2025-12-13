import { useLoaderData } from "react-router-dom";

const ContestDetails = () => {
    const contest = useLoaderData();
    const { contestName, image, description, price, prizeMoney, taskInstruction, deadline, participationCount } = contest;

    return (
        <div className="my-10 px-4 lg:px-24">
            <div className="card lg:card-side bg-base-100 shadow-xl border">
                <figure className="lg:w-1/2">
                    <img src={image} alt={contestName} className="w-full h-full object-cover" />
                </figure>
                <div className="card-body lg:w-1/2">
                    <h2 className="card-title text-3xl font-bold text-primary">{contestName}</h2>
                    <p className="text-gray-600 my-4">{description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="stat bg-gray-100 rounded-lg p-2 place-items-center">
                            <div className="stat-title">Entry Fee</div>
                            <div className="stat-value text-secondary text-2xl">${price}</div>
                        </div>
                        <div className="stat bg-gray-100 rounded-lg p-2 place-items-center">
                            <div className="stat-title">Prize Money</div>
                            <div className="stat-value text-green-600 text-2xl">${prizeMoney}</div>
                        </div>
                        <div className="stat bg-gray-100 rounded-lg p-2 place-items-center">
                            <div className="stat-title">Participants</div>
                            <div className="stat-value text-2xl">{participationCount || 0}</div>
                        </div>
                        <div className="stat bg-gray-100 rounded-lg p-2 place-items-center">
                            <div className="stat-title">Deadline</div>
                            <div className="stat-value text-lg text-red-500">{deadline}</div>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-2">Task Instruction:</h3>
                        <p className="bg-base-200 p-4 rounded-lg italic text-gray-700">{taskInstruction}</p>
                    </div>

                    <div className="card-actions justify-end mt-6">
                        {/* আপাতত বাটনটি কাজ করবে না, পরে আমরা এখানে পেমেন্ট বসাবো */}
                        <button className="btn btn-primary w-full text-lg shadow-lg">Register Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContestDetails;