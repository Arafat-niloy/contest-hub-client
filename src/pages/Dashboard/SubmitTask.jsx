import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const SubmitTask = () => {
    const { id } = useParams(); // এটি হলো Payment ID (MongoDB _id)
    const [taskUrl, setTaskUrl] = useState('');
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!taskUrl){
            return Swal.fire("Error", "Please enter a valid URL", "error");
        }

        try {
            // ✅ FIX: Backend রাউটের সাথে মিল রাখা হয়েছে
            const res = await axiosSecure.put(`/contest/submit/${id}`, {
                taskSubmission: taskUrl // Backend এ এই নামেই রিসিভ করা হচ্ছে
            });

            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Task Submitted Successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/dashboard/my-participated');
            } else {
                Swal.fire({
                    icon: "info",
                    title: "No Changes",
                    text: "You have already submitted this link.",
                });
            }

        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Submission Failed",
                text: "Could not submit task. Please try again.",
            });
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl border border-gray-200">
            <h2 className="text-2xl font-bold text-center mb-6 text-indigo-600">Submit Your Task</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text font-semibold">Project/Task Link</span>
                    </label>
                    <input 
                        type="url" 
                        placeholder="https://drive.google.com/..." 
                        className="input input-bordered w-full focus:outline-none focus:border-indigo-500" 
                        value={taskUrl}
                        onChange={(e) => setTaskUrl(e.target.value)}
                        required
                    />
                    <label className="label">
                        <span className="label-text-alt text-gray-500">Share your Google Drive, GitHub or Live link</span>
                    </label>
                </div>
                
                <button type="submit" className="btn bg-indigo-600 hover:bg-indigo-700 text-white w-full mt-6">
                    Submit Now
                </button>
            </form>
        </div>
    );
};

export default SubmitTask;