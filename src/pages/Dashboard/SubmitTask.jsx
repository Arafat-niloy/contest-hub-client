import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaCloudUploadAlt, FaLink, FaArrowLeft } from "react-icons/fa";

const SubmitTask = () => {
    const { id } = useParams();
    const [taskUrl, setTaskUrl] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const res = await axiosSecure.put(`/contest/submit/${id}`, {
                taskSubmission: taskUrl,
                status: 'submitted'
            });

            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    icon: "success",
                    title: "Well Done!",
                    text: "Your submission has been received.",
                    showConfirmButton: false,
                    timer: 2000
                });
                navigate('/dashboard/my-participated'); 
            }
        } catch (error) {
            Swal.fire("Error", "Could not submit. Try again!", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        // 1. Background color changed for dark mode
        <div className="flex items-center justify-center min-h-[80vh] bg-gray-50 dark:bg-gray-900 p-4 transition-colors duration-300">
            
            {/* 2. Card background and border adjusted */}
            <div className="max-w-lg w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8 transition-colors">
                
                <div className="text-center mb-6">
                    <FaCloudUploadAlt className="text-5xl text-[#FF642F] mx-auto mb-2" />
                    {/* 3. Heading text color */}
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Submit Your Work</h2>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-control w-full mb-6">
                        {/* 4. Label text color */}
                        <label className="label font-semibold text-gray-700 dark:text-gray-300">Project URL</label>
                        
                        {/* 5. Input field dark mode styling */}
                        <input 
                            type="url" 
                            placeholder="https://github.com/your-project" 
                            className="input input-bordered w-full focus:outline-[#FF642F] dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400" 
                            value={taskUrl}
                            onChange={(e) => setTaskUrl(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className="flex gap-4">
                        {/* 6. Back button styling for dark mode */}
                        <button type="button" onClick={() => navigate(-1)} className="btn btn-ghost flex-1 dark:text-gray-300 dark:hover:bg-gray-700">
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