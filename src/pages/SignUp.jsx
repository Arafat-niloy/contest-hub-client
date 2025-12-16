import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { FaUser, FaImage, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGoogle, FaArrowRight } from "react-icons/fa";

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
                const loggedUser = result.user;
                console.log(loggedUser);
                
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        // Create user info object
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            photo: data.photoURL,
                            role: 'user'
                        };
                        
                        // Save user to MongoDB
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    reset();
                                    toast.success('Account Created Successfully!');
                                    navigate('/');
                                }
                            })
                    })
                    .catch(error => {
                        console.error(error);
                        toast.error("Profile update failed.");
                        setLoading(false);
                    });
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
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    photo: result.user?.photoURL,
                    role: 'user'
                };
                
                axiosPublic.post('/users', userInfo)
                    .then(() => {
                        toast.success('Google Sign-Up Successful');
                        navigate('/');
                    });
            })
            .catch(error => {
                console.error(error);
                toast.error(error.message);
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden">
                
                {/* Left Side - Form Section */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center order-2 md:order-1">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
                        <p className="text-gray-500 mt-2">Join ContestHub to start your journey!</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        
                        {/* Name Input */}
                        <div className="form-control">
                            <label className="label font-semibold text-gray-700">Full Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <FaUser />
                                </div>
                                <input 
                                    type="text" 
                                    {...register("name", { required: true })} 
                                    placeholder="John Doe" 
                                    className="input input-bordered w-full pl-10 focus:outline-none focus:border-[#FF642F] focus:ring-1 focus:ring-[#FF642F]" 
                                />
                            </div>
                            {errors.name && <span className="text-red-500 text-xs mt-1">Name is required</span>}
                        </div>

                        {/* Photo URL Input */}
                        <div className="form-control">
                            <label className="label font-semibold text-gray-700">Photo URL</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <FaImage />
                                </div>
                                <input 
                                    type="text" 
                                    {...register("photoURL", { required: true })} 
                                    placeholder="https://example.com/photo.jpg" 
                                    className="input input-bordered w-full pl-10 focus:outline-none focus:border-[#FF642F] focus:ring-1 focus:ring-[#FF642F]" 
                                />
                            </div>
                            {errors.photoURL && <span className="text-red-500 text-xs mt-1">Photo URL is required</span>}
                        </div>

                        {/* Email Input */}
                        <div className="form-control">
                            <label className="label font-semibold text-gray-700">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <FaEnvelope />
                                </div>
                                <input 
                                    type="email" 
                                    {...register("email", { required: true })} 
                                    placeholder="name@example.com" 
                                    className="input input-bordered w-full pl-10 focus:outline-none focus:border-[#FF642F] focus:ring-1 focus:ring-[#FF642F]" 
                                />
                            </div>
                            {errors.email && <span className="text-red-500 text-xs mt-1">Email is required</span>}
                        </div>

                        {/* Password Input */}
                        <div className="form-control">
                            <label className="label font-semibold text-gray-700">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <FaLock />
                                </div>
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    {...register("password", { 
                                        required: true, 
                                        minLength: 6, 
                                        maxLength: 20,
                                        pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                    })} 
                                    placeholder="Create a strong password" 
                                    className="input input-bordered w-full pl-10 pr-10 focus:outline-none focus:border-[#FF642F] focus:ring-1 focus:ring-[#FF642F]" 
                                />
                                <div 
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400 hover:text-[#FF642F]"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </div>
                            </div>
                            {errors.password?.type === 'required' && <p className="text-red-500 text-xs mt-1">Password is required</p>}
                            {errors.password?.type === 'minLength' && <p className="text-red-500 text-xs mt-1">Must be at least 6 characters</p>}
                            {errors.password?.type === 'pattern' && <p className="text-red-500 text-xs mt-1">Must have uppercase, lowercase, number & special char.</p>}
                        </div>

                        {/* Submit Button */}
                        <div className="form-control mt-6">
                            <button 
                                disabled={loading}
                                className="btn bg-[#FF642F] hover:bg-[#e55a2a] text-white border-none w-full text-lg shadow-md hover:shadow-lg transition-all"
                            >
                                {loading ? <span className="loading loading-spinner"></span> : "Sign Up"}
                            </button>
                        </div>
                    </form>

                    {/* Divider */}
                    <div className="divider text-gray-400 my-6">OR JOIN WITH</div>

                    {/* Google Sign Up */}
                    <button 
                        onClick={handleGoogleSignIn} 
                        className="btn btn-outline border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 hover:text-gray-900 w-full flex items-center gap-2"
                    >
                        <FaGoogle className="text-red-500 text-lg" />
                        <span>Continue with Google</span>
                    </button>

                    <p className="mt-6 text-center text-gray-600">
                        Already have an account? 
                        <Link to="/login" className="text-[#FF642F] font-bold hover:underline ml-1">
                            Login here
                        </Link>
                    </p>
                </div>

                {/* Right Side - Illustration (Order changed for visual variety) */}
                <div className="hidden md:flex w-1/2 bg-[#FF642F] flex-col justify-center items-center p-10 relative order-1 md:order-2 text-white">
                    <div className="absolute inset-0 bg-black opacity-10"></div>
                    <div className="relative z-10 text-center">
                        <h2 className="text-4xl font-bold mb-4">Be a Creator!</h2>
                        <p className="text-lg opacity-90 mb-8 max-w-sm">
                            Participate in world-class contests, submit your best work, and win amazing prizes.
                        </p>
                        <img 
                            src="https://i.ibb.co/3r5m7z6/signup-illustration.png" // বা আপনার পছন্দের ইলাস্ট্রেশন
                            alt="Sign Up Illustration" 
                            className="w-3/4 mx-auto drop-shadow-lg transform hover:scale-105 transition duration-500"
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