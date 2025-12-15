import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ContestSubmittedPage = () => {
    const { id } = useParams(); // কন্টেস্টের ID
    const axiosSecure = useAxiosSecure();

    // ১. নির্দিষ্ট কন্টেস্টের সব সাবমিশন লোড করা
    const { data: submissions = [], refetch } = useQuery({
        queryKey: ['submissions', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/submissions/contest/${id}`);
            return res.data;
        }
    });

    // ২. উইনার ঘোষণা করার ফাংশন
    const handleDeclareWinner = async (submission) => {
        Swal.fire({
            title: "Are you sure?",
            text: `You are about to declare ${submission.name} as the winner!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Declare Winner!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const winnerData = {
                        winnerEmail: submission.email,
                        winnerName: submission.name,
                        winnerPhoto: submission.photo,
                        submissionId: submission._id
                    };

                    const res = await axiosSecure.patch(`/contests/winner/${id}`, winnerData);

                    if (res.data.contestRes.modifiedCount > 0) {
                        Swal.fire({
                            title: "Success!",
                            text: `${submission.name} is now the winner!`,
                            icon: "success"
                        });
                        refetch(); // ডাটা রিফ্রেশ
                    }
                } catch (error) {
                    Swal.fire({
                        title: "Error!",
                        text: "Something went wrong.",
                        icon: "error"
                    });
                }
            }
        });
    };

    return (
        <div className="w-full px-2 lg:px-10 my-10">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
                Submitted Tasks: {submissions.length}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {submissions.map((submission) => (
                    <div key={submission._id} className={`card bg-base-100 shadow-xl border ${submission.isWinner ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200'}`}>
                        <div className="card-body">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="avatar">
                                    <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img src={submission.photo} alt={submission.name} />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">{submission.name}</h3>
                                    <p className="text-xs text-gray-500">{submission.email}</p>
                                </div>
                            </div>

                            <p className="text-sm font-semibold text-gray-600">Task Link:</p>
                            <a 
                                href={submission.taskUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="link link-primary text-sm truncate block mb-4"
                            >
                                {submission.taskUrl}
                            </a>

                            <div className="card-actions justify-end mt-auto">
                                {submission.isWinner ? (
                                    <div className="badge badge-warning gap-2 p-3 font-bold">
                                        🏆 WINNER
                                    </div>
                                ) : (
                                    <button 
                                        onClick={() => handleDeclareWinner(submission)}
                                        className="btn btn-sm btn-outline btn-success w-full"
                                    >
                                        Select as Winner
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {submissions.length === 0 && (
                <div className="text-center text-gray-500 mt-10">
                    No submissions found for this contest yet.
                </div>
            )}
        </div>
    );
};

export default ContestSubmittedPage;