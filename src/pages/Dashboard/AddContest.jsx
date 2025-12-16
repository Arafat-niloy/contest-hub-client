import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import toast from "react-hot-toast";
import { FaTrophy, FaImage, FaDollarSign, FaCalendarAlt, FaAlignLeft, FaListUl, FaPlusCircle } from "react-icons/fa";

const AddContest = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    const onSubmit = async (data) => {
        const contestData = {
            contestName: data.contestName,
            image: data.image,
            contestType: data.contestType,
            description: data.description,
            price: parseFloat(data.price),
            prizeMoney: parseFloat(data.prizeMoney),
            taskInstruction: data.taskInstruction,
            deadline: data.deadline,
            creatorName: user?.displayName,
            creatorEmail: user?.email,
            creatorPhoto: user?.photoURL,
            status: 'pending',
            participationCount: 0
        }

        try {
            const res = await axiosSecure.post('/contests', contestData);
            if(res.data.insertedId){
                toast.success('Contest added successfully!');
                reset();
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to add contest. Make sure you are a Creator.");
        }
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen w-full font-sans text-[#1A1A1A]">
            
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                {/* Header */}
                <div className="bg-orange-50 p-8 border-b border-orange-100">
                    <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                        <FaTrophy className="text-[#FF642F]" /> Create New Contest
                    </h2>
                    <p className="text-gray-500 mt-2">Fill in the details below to launch a new challenge.</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="p-8">
                    
                    {/* Row 1: Name & Image */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="form-control w-full">
                            <label className="label font-semibold text-gray-600">
                                <span className="flex items-center gap-2"><FaTrophy className="text-xs"/> Contest Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="E.g., Logo Design Challenge"
                                {...register("contestName", { required: true })}
                                className="input input-bordered w-full focus:outline-none focus:border-[#FF642F] focus:ring-1 focus:ring-[#FF642F] bg-gray-50"
                            />
                        </div>

                        <div className="form-control w-full">
                            <label className="label font-semibold text-gray-600">
                                <span className="flex items-center gap-2"><FaImage className="text-xs"/> Image URL</span>
                            </label>
                            <input
                                type="text"
                                placeholder="https://example.com/image.jpg"
                                {...register("image", { required: true })}
                                className="input input-bordered w-full focus:outline-none focus:border-[#FF642F] focus:ring-1 focus:ring-[#FF642F] bg-gray-50"
                            />
                        </div>
                    </div>

                    {/* Row 2: Type & Deadline */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="form-control w-full">
                            <label className="label font-semibold text-gray-600">
                                <span className="flex items-center gap-2"><FaListUl className="text-xs"/> Contest Type</span>
                            </label>
                            <select 
                                defaultValue="default" 
                                {...register("contestType", { required: true })} 
                                className="select select-bordered w-full focus:outline-none focus:border-[#FF642F] focus:ring-1 focus:ring-[#FF642F] bg-gray-50"
                            >
                                <option disabled value="default">Select a Category</option>
                                <option value="Business">Business Contest</option>
                                <option value="Medical">Medical Contest</option>
                                <option value="Article">Article Writing</option>
                                <option value="Gaming">Gaming</option>
                            </select>
                        </div>

                        <div className="form-control w-full">
                            <label className="label font-semibold text-gray-600">
                                <span className="flex items-center gap-2"><FaCalendarAlt className="text-xs"/> Deadline</span>
                            </label>
                            <input
                                type="date"
                                {...register("deadline", { required: true })}
                                className="input input-bordered w-full focus:outline-none focus:border-[#FF642F] focus:ring-1 focus:ring-[#FF642F] bg-gray-50"
                            />
                        </div>
                    </div>

                    {/* Row 3: Price & Prize */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="form-control w-full">
                            <label className="label font-semibold text-gray-600">
                                <span className="flex items-center gap-2"><FaDollarSign className="text-xs"/> Entry Price ($)</span>
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                {...register("price", { required: true })}
                                className="input input-bordered w-full focus:outline-none focus:border-[#FF642F] focus:ring-1 focus:ring-[#FF642F] bg-gray-50"
                            />
                        </div>

                        <div className="form-control w-full">
                            <label className="label font-semibold text-gray-600">
                                <span className="flex items-center gap-2"><FaDollarSign className="text-xs"/> Prize Money ($)</span>
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                {...register("prizeMoney", { required: true })}
                                className="input input-bordered w-full focus:outline-none focus:border-[#FF642F] focus:ring-1 focus:ring-[#FF642F] bg-gray-50"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="form-control w-full mb-6">
                        <label className="label font-semibold text-gray-600">
                            <span className="flex items-center gap-2"><FaAlignLeft className="text-xs"/> Description</span>
                        </label>
                        <textarea
                            {...register("description", { required: true })}
                            className="textarea textarea-bordered h-24 focus:outline-none focus:border-[#FF642F] focus:ring-1 focus:ring-[#FF642F] bg-gray-50"
                            placeholder="Write a detailed description of the contest..."
                        ></textarea>
                    </div>

                    {/* Task Instruction */}
                    <div className="form-control w-full mb-8">
                        <label className="label font-semibold text-gray-600">
                            <span className="flex items-center gap-2"><FaListUl className="text-xs"/> Task Instruction</span>
                        </label>
                        <textarea
                            {...register("taskInstruction", { required: true })}
                            className="textarea textarea-bordered h-24 focus:outline-none focus:border-[#FF642F] focus:ring-1 focus:ring-[#FF642F] bg-gray-50"
                            placeholder="Explain exactly what participants need to submit..."
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button className="btn bg-[#FF642F] hover:bg-[#e55a2a] text-white w-full text-lg font-bold border-none shadow-md hover:shadow-lg transition-all duration-300">
                        <FaPlusCircle className="mr-2" /> Publish Contest
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddContest;