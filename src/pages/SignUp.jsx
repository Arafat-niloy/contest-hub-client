import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { FaUser, FaImage, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGoogle, FaArrowRight } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";


const SignUp = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile, googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    
    // UI States
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSubmit = data => {
        setLoading(true);
        createUser(data.email, data.password)
            .then(result => {
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            photo: data.photoURL,
                            role: 'user'
                        };
                        
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId || res.data.message === 'user already exists') {
                                    reset();
                                    toast.success('Account Created Successfully!');
                                    navigate('/');
                                }
                            })
                            .catch(err => {
                                console.error("DB Save Error:", err);
                                setLoading(false);
                            });
                    })
            })
            .catch(error => {
                console.error(error);
                toast.error(error.message);
                setLoading(false);
            });
    };

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const user = result.user;
                const userInfo = {
                    email: user?.email,
                    name: user?.displayName,
                    photo: user?.photoURL,
                    role: 'user'
                };
                
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log('User saved to DB:', res.data);
                        toast.success('Google Sign-Up Successful');
                        navigate('/');
                    })
            })
            .catch(error => {
                console.error(error);
                toast.error(error.message);
            });
    };

    return (
        // 1. Global Background 
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4 transition-colors duration-300">
            {/* 2. Card Background & Border  */}
            <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-transparent dark:border-gray-700">
                
                {/* Left Side - Form Section */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center order-2 md:order-1">
                    <div className="mb-6">
                        {/* 3. Headers  */}
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Create Account</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">Join ContestHub to start your journey!</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        
                        {/* Name Input */}
                        <div className="form-control">
                            {/* 4. Labels  */}
                            <label className="label font-semibold text-gray-700 dark:text-gray-300">Full Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <FaUser />
                                </div>
                                {/* 5. Inputs  (Dark bg, Light Text, Dark Border) */}
                                <input 
                                    type="text" 
                                    {...register("name", { required: true })} 
                                    placeholder="John Doe" 
                                    className="input input-bordered w-full pl-10 focus:outline-none focus:border-[#FF642F] focus:ring-1 focus:ring-[#FF642F] bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-400" 
                                />
                            </div>
                            {errors.name && <span className="text-red-500 text-xs mt-1">Name is required</span>}
                        </div>

                        {/* Photo URL Input */}
                        <div className="form-control">
                            <label className="label font-semibold text-gray-700 dark:text-gray-300">Photo URL</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <FaImage />
                                </div>
                                <input 
                                    type="text" 
                                    {...register("photoURL", { required: true })} 
                                    placeholder="https://example.com/photo.jpg" 
                                    className="input input-bordered w-full pl-10 focus:outline-none focus:border-[#FF642F] focus:ring-1 focus:ring-[#FF642F] bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-400" 
                                />
                            </div>
                            {errors.photoURL && <span className="text-red-500 text-xs mt-1">Photo URL is required</span>}
                        </div>

                        {/* Email Input */}
                        <div className="form-control">
                            <label className="label font-semibold text-gray-700 dark:text-gray-300">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <FaEnvelope />
                                </div>
                                <input 
                                    type="email" 
                                    {...register("email", { required: true })} 
                                    placeholder="name@example.com" 
                                    className="input input-bordered w-full pl-10 focus:outline-none focus:border-[#FF642F] focus:ring-1 focus:ring-[#FF642F] bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-400" 
                                />
                            </div>
                            {errors.email && <span className="text-red-500 text-xs mt-1">Email is required</span>}
                        </div>

                        {/* Password Input */}
                        <div className="form-control">
                            <label className="label font-semibold text-gray-700 dark:text-gray-300">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <FaLock />
                                </div>
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    {...register("password", { 
                                        required: true, 
                                        minLength: 6, 
                                        pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                    })} 
                                    placeholder="Create a strong password" 
                                    className="input input-bordered w-full pl-10 pr-10 focus:outline-none focus:border-[#FF642F] focus:ring-1 focus:ring-[#FF642F] bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-400" 
                                />
                                <div 
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400 hover:text-[#FF642F]"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </div>
                            </div>
                            {errors.password && <p className="text-red-500 text-xs mt-1">Password must be 6+ chars with Uppercase, Lowercase, Number & Special char.</p>}
                        </div>

                        {/* Submit Button */}
                        <div className="form-control mt-6">
                            <button 
                                disabled={loading}
                                className="btn bg-[#FF642F] hover:bg-[#e55a2a] text-white border-none w-full text-lg shadow-md transition-all"
                            >
                                {loading ? <span className="loading loading-spinner"></span> : "Sign Up"}
                            </button>
                        </div>
                    </form>

                    {/* 6. Divider  */}
                    <div className="divider text-gray-400 dark:text-gray-500 my-6">OR JOIN WITH</div>

                    {/* 7. Google Button  */}
                    <button 
                        onClick={handleGoogleSignIn} 
                        className="btn btn-outline border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white w-full flex items-center gap-2"
                    >
                        <FcGoogle className="text-xl" />
                        <span>Continue with Google</span>
                    </button>

                    <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
                        Already have an account? 
                        <Link to="/login" className="text-[#FF642F] font-bold hover:underline ml-1">
                            Login here
                        </Link>
                    </p>
                </div>

                {/* Right Side  */}
                <div className="hidden md:flex w-1/2 bg-[#FF642F] flex-col justify-center items-center p-10 relative order-1 md:order-2 text-white">
                    <div className="absolute inset-0 bg-black opacity-10"></div>
                    <div className="relative z-10 text-center">
                        <h2 className="text-4xl font-bold mb-4">Be a Creator!</h2>
                        <p className="text-lg opacity-90 mb-8 max-w-sm">
                            Participate in world-class contests, submit your best work, and win amazing prizes.
                        </p>
                        <img 
                            src="https://i.ibb.co.com/Wv8nfqCf/a-man-working-in-an-office-concept-flat-illustration-vector.jpg" 
                            alt="Sign Up Illustration" 
                            className="w-3/4 mx-auto drop-shadow-lg rounded-2xl"
                        />
                        <Link to="/" className="mt-8 inline-flex items-center gap-2 text-white hover:underline opacity-80 hover:opacity-100">
                             Back to Home <FaArrowRight />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;