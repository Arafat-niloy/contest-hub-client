import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaTrophy, FaExternalLinkAlt, FaUserCircle, FaClock } from "react-icons/fa";

const ContestSubmitted = () => {
    const { id } = useParams(); // Contest ID
    const axiosSecure = useAxiosSecure();

    const { data: submissions = [], refetch, isLoading } = useQuery({
        queryKey: ['submissions', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/contest/submissions/${id}`);
            return res.data;
        }
    });

    const handleDeclareWinner = (submission) => {
        Swal.fire({
            title: "Declare Winner?",
            text: `Are you sure you want to select ${submission.name} as the winner?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#FF642F", // Theme Color
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Confirm!",
            iconColor: "#FF642F",
            // Dark Mode for SweetAlert2
            background: "#1f2937", 
            color: "#fff" 
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.patch(`/contest/winner/${submission._id}`);

                    if (res.data.modifiedCount > 0) {
                        Swal.fire({
                            title: "Congratulations!",
                            text: `${submission.name} has been declared the winner!`,
                            icon: "success",
                            confirmButtonColor: "#FF642F",
                            background: "#1f2937",
                            color: "#fff"
                        });
                        refetch();
                    }
                } catch (error) {
                    console.error(error);
                    Swal.fire({
                        title: "Error!",
                        text: "Something went wrong.",
                        icon: "error",
                        background: "#1f2937",
                        color: "#fff"
                    });
                }
            }
        });
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
                <span className="loading loading-spinner loading-lg text-[#FF642F]"></span>
            </div>
        );
    }

    return (
        // ✅ Main Container Dark Mode
        <div className="p-8 bg-gray-50 dark:bg-gray-900 min-h-screen font-sans text-[#1A1A1A] dark:text-gray-100 transition-colors duration-300">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Contest Submissions</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Review tasks and declare a winner.</p>
                </div>
                {/* Stats Box Dark Mode */}
                <div className="bg-white dark:bg-gray-800 px-6 py-3 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mt-4 md:mt-0 transition-colors">
                    <span className="font-bold text-gray-600 dark:text-gray-300">Total Participants: </span>
                    <span className="text-[#FF642F] font-bold text-xl ml-2">{submissions.length}</span>
                </div>
            </div>

            {/* Submissions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {submissions.map(item => (
                    <div 
                        key={item._id} 
                        className={`relative bg-white dark:bg-gray-800 rounded-2xl border transition-all duration-300 group
                        ${item.status === 'winner' 
                            ? 'border-orange-200 dark:border-orange-500/50 shadow-orange-100 dark:shadow-orange-900/20 shadow-xl' 
                            : 'border-gray-100 dark:border-gray-700 shadow-md hover:shadow-xl dark:shadow-black/20'}`}
                    >
                        {/* Winner Badge  */}
                        {item.status === 'winner' && (
                            <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg z-10 animate-bounce">
                                <FaTrophy className="text-xl" />
                            </div>
                        )}

                        <div className="p-6">
                            {/* User Info */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className="avatar">
                                    <div className={`w-14 h-14 rounded-full p-0.5 ${item.status === 'winner' ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 'bg-gray-200 dark:bg-gray-700'}`}>
                                        <img 
                                            src={item.photo} 
                                            alt={item.name} 
                                            className="rounded-full bg-white dark:bg-gray-800 object-cover h-full w-full" 
                                            onError={(e) => {e.target.src="https://i.ibb.co/5c5k7Z7/user.png"}} // Fallback image
                                        />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 line-clamp-1">{item.name}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">{item.email}</p>
                                </div>
                            </div>

                            {/* Task Submission Box Dark Mode */}
                            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl border border-gray-100 dark:border-gray-600 mb-6 transition-colors">
                                <p className="text-xs font-bold text-gray-400 dark:text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <FaExternalLinkAlt /> Task Submission
                                </p>
                                {item.taskSubmission ? (
                                    <a 
                                        href={item.taskSubmission} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-[#FF642F] font-medium text-sm hover:underline break-all line-clamp-2 block"
                                    >
                                        {item.taskSubmission}
                                    </a>
                                ) : (
                                    <div className="flex items-center gap-2 text-red-400 dark:text-red-400 text-sm font-medium">
                                        <FaClock /> Not Submitted Yet
                                    </div>
                                )}
                            </div>

                            {/* Action Button */}
                            <div className="mt-auto">
                                {item.status === 'winner' ? (
                                    <div className="w-full bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 font-bold py-3 rounded-xl border border-green-200 dark:border-green-800 flex items-center justify-center gap-2 transition-colors">
                                        <FaTrophy /> Winner Selected
                                    </div>
                                ) : (
                                    <button 
                                        onClick={() => handleDeclareWinner(item)} 
                                        disabled={!item.taskSubmission}
                                        className="btn w-full bg-[#FF642F] hover:bg-[#e55a2a] text-white border-none rounded-xl font-bold normal-case text-base disabled:bg-gray-200 disabled:text-gray-400 dark:disabled:bg-gray-700 dark:disabled:text-gray-500 transition-colors"
                                    >
                                        Declare Winner
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State Dark Mode */}
            {submissions.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 text-center transition-colors">
                    <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-full mb-4">
                        <FaUserCircle className="text-4xl text-[#FF642F]" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">No Participants Yet</h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-sm">
                        It seems no one has registered for this contest yet. Check back later!
                    </p>
                </div>
            )}
        </div>
    );
};

export default ContestSubmitted;