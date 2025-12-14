import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure"; // 👈 Public এর বদলে Secure ইমপোর্ট করুন
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import toast from "react-hot-toast";

const AddContest = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure(); // 👈 এখানে axiosSecure ব্যবহার করুন
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
            status: 'pending', // Admin will approve it later
            participationCount: 0
        }

        try {
            // 👈 এখানে axiosSecure.post ব্যবহার করা হয়েছে
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
        <div className="w-full p-6 bg-base-100 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-center mb-6">Add A Contest</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Contest Name */}
                <div className="form-control w-full mb-4">
                    <label className="label">
                        <span className="label-text">Contest Name</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Contest Name"
                        {...register("contestName", { required: true })}
                        className="input input-bordered w-full"
                    />
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                    {/* Image URL */}
                    <div className="form-control w-full mb-4">
                        <label className="label">
                            <span className="label-text">Image URL</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Image URL"
                            {...register("image", { required: true })}
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Contest Type */}
                    <div className="form-control w-full mb-4">
                        <label className="label">
                            <span className="label-text">Contest Type</span>
                        </label>
                        <select defaultValue="default" {...register("contestType", { required: true })} className="select select-bordered w-full">
                            <option disabled value="default">Select a Type</option>
                            <option value="Business">Business Contest</option>
                            <option value="Medical">Medical Contest</option>
                            <option value="Article">Article Writing</option>
                            <option value="Gaming">Gaming</option>
                        </select>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                    {/* Price */}
                    <div className="form-control w-full mb-4">
                        <label className="label">
                            <span className="label-text">Contest Price ($)</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Price"
                            {...register("price", { required: true })}
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Prize Money */}
                    <div className="form-control w-full mb-4">
                        <label className="label">
                            <span className="label-text">Prize Money ($)</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Prize Money"
                            {...register("prizeMoney", { required: true })}
                            className="input input-bordered w-full"
                        />
                    </div>
                </div>

                 {/* Deadline */}
                 <div className="form-control w-full mb-4">
                        <label className="label">
                            <span className="label-text">Deadline</span>
                        </label>
                        <input
                            type="date"
                            {...register("deadline", { required: true })}
                            className="input input-bordered w-full"
                        />
                    </div>

                {/* Description */}
                <div className="form-control w-full mb-4">
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <textarea
                        {...register("description", { required: true })}
                        className="textarea textarea-bordered h-24"
                        placeholder="Contest Description"
                    ></textarea>
                </div>

                {/* Task Instruction */}
                <div className="form-control w-full mb-4">
                    <label className="label">
                        <span className="label-text">Task Instruction</span>
                    </label>
                    <textarea
                        {...register("taskInstruction", { required: true })}
                        className="textarea textarea-bordered h-24"
                        placeholder="Describe what participants need to do..."
                    ></textarea>
                </div>

                <button className="btn btn-primary w-full">Add Contest</button>
            </form>
        </div>
    );
};

export default AddContest;