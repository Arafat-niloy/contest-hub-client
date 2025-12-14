import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ContestSubmitted = () => {
    const { id } = useParams(); // এটি হলো Contest ID
    const axiosSecure = useAxiosSecure();
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        axiosSecure.get(`/submissions/contest/${id}`)
            .then(res => {
                setSubmissions(res.data);
            })
    }, [id, axiosSecure]);

    const handleDeclareWinner = (submission) => {
        Swal.fire({
            title: "Are you sure?",
            text: `Do you want to declare ${submission.participantName} as the winner?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Declare Winner!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.patch(`/contests/winner/${id}`, {
                        winnerEmail: submission.participantEmail,
                        winnerName: submission.participantName,
                        winnerPhoto: submission.participantPhoto,
                        submissionId: submission._id
                    });

                    if(res.data.contestRes.modifiedCount > 0){
                        Swal.fire({
                            title: "Success!",
                            text: `${submission.participantName} is now the winner!`,
                            icon: "success"
                        });
                        // উইনার ঘোষণা হয়ে গেলে পেজ রিফ্রেশ করে বা স্টেট আপডেট করে UI ঠিক করা হলো
                        const remaining = submissions.map(sub => {
                            if(sub._id === submission._id){
                                return {...sub, isWinner: true}
                            }
                            return sub;
                        })
                        setSubmissions(remaining);
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
        <div className="p-4">
            <h2 className="text-3xl font-bold text-center mb-10">Submissions: {submissions.length}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    submissions.map(item => <div key={item._id} className="card bg-base-100 shadow-xl border">
                        <div className="card-body">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="avatar">
                                    <div className="w-12 rounded-full">
                                        <img src={item.participantPhoto} alt="Participant" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-bold">{item.participantName}</h3>
                                    <p className="text-xs text-gray-500">{item.participantEmail}</p>
                                </div>
                            </div>
                            
                            <p className="mb-2"><strong>Task Link:</strong> <a href={item.taskUrl} target="_blank" rel="noopener noreferrer" className="link link-primary break-all">{item.taskUrl}</a></p>
                            
                            <div className="card-actions justify-end mt-4">
                                {
                                    item.isWinner ? 
                                    <span className="badge badge-success p-3 text-white font-bold">Winner 🏆</span> 
                                    :
                                    <button onClick={() => handleDeclareWinner(item)} className="btn btn-primary btn-sm w-full">
                                        Declare Winner
                                    </button>
                                }
                            </div>
                        </div>
                    </div>)
                }
            </div>
            
            {submissions.length === 0 && <p className="text-center text-gray-500 mt-10">No submissions found for this contest yet.</p>}
        </div>
    );
};

export default ContestSubmitted;