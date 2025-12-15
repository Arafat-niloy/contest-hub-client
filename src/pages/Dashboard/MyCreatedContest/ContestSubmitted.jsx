import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ContestSubmitted = () => {
    const { id } = useParams(); // Contest ID
    const axiosSecure = useAxiosSecure();

    // TanStack Query ব্যবহার করা হলো ডাটা ফেচ এবং অটো রিফ্রেশের জন্য
    const { data: submissions = [], refetch } = useQuery({
        queryKey: ['submissions', id],
        queryFn: async() => {
            const res = await axiosSecure.get(`/contest/submissions/${id}`);
            return res.data;
        }
    })

    const handleDeclareWinner = (submission) => {
        Swal.fire({
            title: "Are you sure?",
            text: `Do you want to declare ${submission.name} as the winner?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Declare Winner!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // Payment ID (submission._id) পাঠানো হচ্ছে
                    const res = await axiosSecure.patch(`/contest/winner/${submission._id}`);

                    if(res.data.modifiedCount > 0){
                        Swal.fire({
                            title: "Success!",
                            text: `${submission.name} is now the winner!`,
                            icon: "success"
                        });
                        refetch(); // ডাটা রিফ্রেশ করা
                    }
                } catch (error) {
                    console.error(error);
                    Swal.fire({
                        title: "Error!",
                        text: "Something went wrong.",
                        icon: "error"
                    });
                }
            }
        });
    }

    return (
        <div className="p-4 md:p-10">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
                Submissions: {submissions.length}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    submissions.map(item => (
                        <div key={item._id} className="card bg-base-100 shadow-xl border border-gray-100">
                            <div className="card-body">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="avatar">
                                        <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                            <img src={item.photo} alt="User" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">{item.name}</h3>
                                        <p className="text-xs text-gray-500">{item.email}</p>
                                    </div>
                                </div>
                                
                                <div className="bg-gray-100 p-3 rounded-md mb-4 break-all">
                                    <p className="text-xs font-bold text-gray-500 uppercase mb-1">Task Link:</p>
                                    {item.taskSubmission ? (
                                         <a href={item.taskSubmission} target="_blank" rel="noopener noreferrer" className="link link-primary text-sm">
                                            {item.taskSubmission}
                                         </a>
                                    ) : (
                                        <span className="text-red-400 text-sm">Not Submitted Yet</span>
                                    )}
                                </div>
                                
                                <div className="card-actions justify-end mt-2">
                                    {item.status === 'winner' ? (
                                        <div className="badge badge-success p-4 text-white font-bold w-full">
                                            Winner 🏆
                                        </div>
                                    ) : (
                                        <button 
                                            onClick={() => handleDeclareWinner(item)} 
                                            // যদি টাস্ক সাবমিট না করে, তবে উইনার করা যাবে না (অপশনাল লজিক)
                                            disabled={!item.taskSubmission}
                                            className="btn btn-primary btn-sm w-full"
                                        >
                                            Declare Winner
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            
            {submissions.length === 0 && (
                <div className="text-center mt-10">
                    <p className="text-gray-500 text-lg">No one has joined this contest yet.</p>
                </div>
            )}
        </div>
    );
};

export default ContestSubmitted;