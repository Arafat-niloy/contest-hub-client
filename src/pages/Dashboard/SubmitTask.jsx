import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaCloudUploadAlt, FaLink, FaArrowLeft } from "react-icons/fa";

const SubmitTask = () => {
    const { id } = useParams(); // এটি পেমেন্ট আইডি
    const [taskUrl, setTaskUrl] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // পেমেন্ট ডক আপডেট করছি: স্ট্যাটাস 'submitted' করছি
            const res = await axiosSecure.put(`/contest/submit/${id}`, {
                taskSubmission: taskUrl,
                status: 'submitted' // এটি যোগ করা হয়েছে
            });

            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    icon: "success",
                    title: "Well Done!",
                    text: "Your submission has been received.",
                    showConfirmButton: false,
                    timer: 2000
                });
                // আপনার রাউটার অনুযায়ী সঠিক পাথ 'my-participated' অথবা আপনার রেজিস্টার্ড পেজ
                navigate('/dashboard/my-participated'); 
            }
        } catch (error) {
            Swal.fire("Error", "Could not submit. Try again!", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh] bg-gray-50 p-4">
            <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                <div className="text-center mb-6">
                    <FaCloudUploadAlt className="text-5xl text-[#FF642F] mx-auto mb-2" />
                    <h2 className="text-2xl font-bold text-gray-800">Submit Your Work</h2>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-control w-full mb-6">
                        <label className="label font-semibold text-gray-700">Project URL</label>
                        <input 
                            type="url" 
                            placeholder="https://github.com/your-project" 
                            className="input input-bordered w-full focus:outline-[#FF642F]" 
                            value={taskUrl}
                            onChange={(e) => setTaskUrl(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className="flex gap-4">
                        <button type="button" onClick={() => navigate(-1)} className="btn btn-ghost flex-1">
                            <FaArrowLeft className="mr-2" /> Back
                        </button>
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="btn bg-[#FF642F] hover:bg-[#e55a2a] text-white flex-1 border-none"
                        >
                            {isSubmitting ? "Submitting..." : "Submit Now"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SubmitTask;