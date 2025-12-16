import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaCloudUploadAlt, FaLink, FaPaperPlane, FaArrowLeft } from "react-icons/fa";

const SubmitTask = () => {
    const { id } = useParams();
    const [taskUrl, setTaskUrl] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false); // লোডিং স্টেট
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!taskUrl) {
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please enter a valid URL!",
                confirmButtonColor: "#FF642F"
            });
        }

        setIsSubmitting(true);

        try {
            const res = await axiosSecure.put(`/contest/submit/${id}`, {
                taskSubmission: taskUrl
            });

            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Good Job!",
                    text: "Your task has been submitted successfully.",
                    showConfirmButton: false,
                    timer: 2000
                });
                navigate('/dashboard/my-participated');
            } else {
                Swal.fire({
                    icon: "info",
                    title: "No Changes",
                    text: "You have already submitted this link.",
                    confirmButtonColor: "#FF642F"
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Submission Failed",
                text: "Something went wrong. Please try again.",
                confirmButtonColor: "#FF642F"
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh] bg-gray-50 p-4">
            <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                
                {/* Header with Icon */}
                <div className="bg-orange-50 p-8 text-center border-b border-orange-100">
                    <div className="mx-auto bg-white w-20 h-20 rounded-full flex items-center justify-center shadow-sm mb-4">
                        <FaCloudUploadAlt className="text-4xl text-[#FF642F]" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Submit Your Work</h2>
                    <p className="text-gray-500 mt-2 text-sm">
                        Paste your project link below (Google Drive, GitHub, Live Link, etc.)
                    </p>
                </div>

                {/* Form Section */}
                <form onSubmit={handleSubmit} className="p-8">
                    <div className="form-control w-full mb-6">
                        <label className="label font-semibold text-gray-700 mb-2">
                            Project URL
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaLink className="text-gray-400" />
                            </div>
                            <input 
                                type="url" 
                                placeholder="https://" 
                                className="input input-bordered w-full pl-10 focus:outline-none focus:border-[#FF642F] focus:ring-1 focus:ring-[#FF642F] bg-gray-50" 
                                value={taskUrl}
                                onChange={(e) => setTaskUrl(e.target.value)}
                                required
                            />
                        </div>
                        <label className="label">
                            <span className="label-text-alt text-gray-400">Make sure the link is accessible publicly.</span>
                        </label>
                    </div>
                    
                    <div className="flex gap-4">
                        <button 
                            type="button" 
                            onClick={() => navigate(-1)}
                            className="btn btn-ghost flex-1 text-gray-500 hover:bg-gray-100"
                        >
                            <FaArrowLeft className="mr-2" /> Cancel
                        </button>
                        
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="btn bg-[#FF642F] hover:bg-[#e55a2a] text-white flex-1 border-none shadow-md hover:shadow-lg transition-all"
                        >
                            {isSubmitting ? (
                                <span className="loading loading-spinner loading-sm"></span>
                            ) : (
                                <>
                                    Submit Now <FaPaperPlane className="ml-2" />
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SubmitTask;