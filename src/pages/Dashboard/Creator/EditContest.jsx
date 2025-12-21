import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { 
    FaEdit, FaImage, FaListAlt, FaDollarSign, FaTrophy, 
    FaCalendarAlt, FaAlignLeft, FaArrowLeft, FaHeading 
} from "react-icons/fa";

const EditContest = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const [startDate, setStartDate] = useState(new Date());
    const [loading, setLoading] = useState(true);

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const contestTypes = [
        "Image Design", "Article Writing", "Marketing Strategy", 
        "Digital Art", "Gaming Review", "Book Review", 
        "Business Idea", "Movie Review"
    ];

    // Data Fetching
    useEffect(() => {
        axiosSecure.get(`/contests/${id}`)
            .then(res => {
                const data = res.data;
                setValue("contestName", data.contestName);
                setValue("image", data.image);
                setValue("contestType", data.contestType);
                setValue("description", data.description);
                setValue("price", data.price);
                setValue("prizeMoney", data.prizeMoney);
                setValue("taskInstruction", data.taskInstruction);
                setStartDate(new Date(data.deadline));
                setLoading(false);
            });
    }, [id, axiosSecure, setValue]);

    // Submit Handler
    const onSubmit = async (data) => {
        const updatedContest = {
            ...data,
            deadline: startDate,
            price: parseFloat(data.price),
            prizeMoney: parseFloat(data.prizeMoney)
        };

        const res = await axiosSecure.put(`/contests/update/${id}`, updatedContest);

        if (res.data.modifiedCount > 0) {
            Swal.fire({
                title: "Updated!",
                text: "Contest information has been updated.",
                icon: "success",
                confirmButtonColor: "#FF642F",
                background: "#fff",
                customClass: {
                    title: 'text-gray-800',
                    popup: 'rounded-xl'
                }
            });
            navigate('/dashboard/my-created');
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-screen bg-gray-50">
            <div className="loading loading-spinner loading-lg text-[#FF642F]"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50/50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                
                {/* Header Section */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <button 
                            onClick={() => navigate(-1)} 
                            className="flex items-center text-gray-500 hover:text-[#FF642F] transition-colors mb-2 text-sm font-medium"
                        >
                            <FaArrowLeft className="mr-2" /> Back to List
                        </button>
                        <h2 className="text-3xl font-extrabold text-gray-800 flex items-center gap-3">
                            <span className="bg-[#FF642F] text-white p-2 rounded-lg text-xl">
                                <FaEdit />
                            </span>
                            Edit Contest Details
                        </h2>
                        <p className="text-gray-500 mt-1 ml-11">Update the contest information accurately.</p>
                    </div>
                </div>

                {/* Form Section */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="p-8">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                            
                            {/* Section 1: Basic Info */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">Basic Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    
                                    {/* Contest Name */}
                                    <div className="form-control md:col-span-2">
                                        <label className="label text-gray-600 font-medium text-sm">Contest Name</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaHeading className="text-gray-400" />
                                            </div>
                                            <input 
                                                type="text" 
                                                {...register("contestName", { required: true })} 
                                                className="input input-bordered w-full p-2 focus:border-[#FF642F] focus:ring-1 focus:ring-[#FF642F] bg-gray-50 focus:bg-white transition-all rounded-lg"
                                                placeholder="e.g. Logo Design Championship"
                                            />
                                        </div>
                                        {errors.contestName && <span className="text-red-500 text-xs mt-1 ml-1">Name is required</span>}
                                    </div>

                                    {/* Image URL */}
                                    <div className="form-control">
                                        <label className="label text-gray-600 font-medium text-sm">Banner Image URL</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaImage className="text-gray-400" />
                                            </div>
                                            <input 
                                                type="url" 
                                                {...register("image", { required: true })} 
                                                className="input input-bordered w-full p-2 focus:border-[#FF642F] focus:ring-1 focus:ring-[#FF642F] bg-gray-50 focus:bg-white transition-all rounded-lg"
                                                placeholder="https://..."
                                            />
                                        </div>
                                    </div>

                                    {/* Contest Type */}
                                    <div className="form-control">
                                        <label className="label text-gray-600 font-medium text-sm">Category</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaListAlt className="text-gray-400" />
                                            </div>
                                            <select 
                                                defaultValue="" 
                                                {...register("contestType", { required: true })} 
                                                className="select select-bordered w-full p-2 focus:border-[#FF642F] focus:ring-1 focus:ring-[#FF642F] bg-gray-50 focus:bg-white transition-all rounded-lg"
                                            >
                                                <option disabled value="">Select Category</option>
                                                {contestTypes.map(type => <option key={type} value={type}>{type}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Financials & Dates */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">Financials & Deadline</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* Price */}
                                    <div className="form-control">
                                        <label className="label text-gray-600 font-medium text-sm">Entry Fee</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaDollarSign className="text-gray-400" />
                                            </div>
                                            <input 
                                                type="number" 
                                                step="0.01"
                                                {...register("price", { required: true })} 
                                                className="input input-bordered w-full p-2 focus:border-[#FF642F] focus:ring-1 focus:ring-[#FF642F] bg-gray-50 focus:bg-white transition-all rounded-lg"
                                                placeholder="0.00"
                                            />
                                        </div>
                                    </div>

                                    {/* Prize Money */}
                                    <div className="form-control">
                                        <label className="label text-gray-600 font-medium text-sm">Winning Prize</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaTrophy className="text-[#FFC107]" /> {/* Gold color for trophy */}
                                            </div>
                                            <input 
                                                type="number" 
                                                step="0.01"
                                                {...register("prizeMoney", { required: true })} 
                                                className="input input-bordered w-full p-2 focus:border-[#FF642F] focus:ring-1 focus:ring-[#FF642F] bg-gray-50 focus:bg-white transition-all rounded-lg"
                                                placeholder="0.00"
                                            />
                                        </div>
                                    </div>

                                    {/* Deadline */}
                                    <div className="form-control">
                                        <label className="label text-gray-600 font-medium text-sm">Submission Deadline</label>
                                        <div className="relative flex items-center">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                                                <FaCalendarAlt className="text-gray-400" />
                                            </div>
                                            <div className="w-full">
                                                <DatePicker 
                                                    selected={startDate} 
                                                    onChange={(date) => setStartDate(date)} 
                                                    className="input input-bordered w-full pl-8 focus:border-[#FF642F] focus:ring-1 focus:ring-[#FF642F] bg-gray-50 focus:bg-white transition-all rounded-lg"
                                                    dateFormat="dd/MM/yyyy"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section 3: Details */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">Detailed Description</h3>
                                <div className="space-y-6">
                                    {/* Description */}
                                    <div className="form-control">
                                        <label className="label text-gray-600 font-medium text-sm flex items-center gap-2">
                                            <FaAlignLeft className="text-gray-400" /> Description
                                        </label>
                                        <textarea 
                                            {...register("description", { required: true })} 
                                            className="textarea textarea-bordered h-32 focus:border-[#FF642F] focus:ring-1 focus:ring-[#FF642F] bg-gray-50 focus:bg-white transition-all rounded-lg p-2 text-base"
                                            placeholder="Describe your contest in detail..."
                                        ></textarea>
                                    </div>

                                    {/* Task Instruction */}
                                    <div className="form-control">
                                        <label className="label text-gray-600 font-medium text-sm flex items-center gap-2">
                                            <FaListAlt className="text-gray-400" /> Submission Instructions
                                        </label>
                                        <textarea 
                                            {...register("taskInstruction", { required: true })} 
                                            className="textarea textarea-bordered h-32 focus:border-[#FF642F] focus:ring-1 focus:ring-[#FF642F] bg-gray-50 focus:bg-white transition-all rounded-lg p-2 text-base" 
                                            placeholder="Step-by-step guide for submission..."
                                        ></textarea>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex justify-end pt-4 border-t border-gray-100">
                                <button 
                                    type="button" 
                                    onClick={() => navigate(-1)}
                                    className="btn btn-ghost mr-4 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className="btn bg-[#FF642F] hover:bg-[#e05525] text-white border-none px-10 text-lg shadow-md hover:shadow-lg transition-all rounded-lg"
                                >
                                    Update Contest
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditContest;