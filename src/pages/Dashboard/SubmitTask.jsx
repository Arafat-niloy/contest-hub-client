import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const SubmitTask = () => {
    const { id } = useParams(); // এটি হলো পেমেন্ট আইডি (submission ID হিসেবে কাজ করবে)
    const [taskUrl, setTaskUrl] = useState('');
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!taskUrl){
            return alert("Please enter a URL");
        }

        try {
            const res = await axiosSecure.patch(`/payments/submit-task/${id}`, {
                taskUrl: taskUrl
            });

            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Task Submitted Successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/dashboard/registered-contests');
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold text-center mb-6">Submit Your Task</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Project/Task Link</span>
                    </label>
                    <input 
                        type="url" 
                        placeholder="https://drive.google.com/..." 
                        className="input input-bordered w-full" 
                        value={taskUrl}
                        onChange={(e) => setTaskUrl(e.target.value)}
                        required
                    />
                    <label className="label">
                        <span className="label-text-alt text-gray-500">Share your Google Drive, GitHub or Live link</span>
                    </label>
                </div>
                
                <button type="submit" className="btn btn-primary w-full mt-6">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default SubmitTask;