import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaGoogle, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
    const { signIn, googleSignIn } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    
    // UI States
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const from = location.state?.from?.pathname || "/";

    const onSubmit = data => {
        setLoading(true);
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast.success('Welcome back! Login Successful');
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.error(error);
                toast.error("Invalid Email or Password");
                setLoading(false);
            });
    };

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user);
                toast.success('Google Login Successful');
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.error(error);
                toast.error(error.message);
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden">
                
                {/* Left Side - Image/Illustration */}
                <div className="hidden md:flex w-1/2 bg-[#FF642F] text-white flex-col justify-center items-center p-10 relative">
                    <div className="absolute inset-0 bg-black opacity-10"></div>
                    <div className="relative z-10 text-center">
                        <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
                        <p className="text-lg opacity-90 mb-8">
                            Access your dashboard, manage your contests, and track your winnings.
                        </p>
                        <img 
                            src="https://i.ibb.co/vzDpZqL/login-illustration.png" // বা আপনার পছন্দের ইলাস্ট্রেশন
                            alt="Login Illustration" 
                            className="w-3/4 mx-auto drop-shadow-lg"
                        />
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800">Login to ContestHub</h2>
                        <p className="text-gray-500 mt-2">Enter your details below</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        
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
                                    placeholder="Enter your email" 
                                    className="input input-bordered w-full pl-10 focus:outline-none focus:border-[#FF642F] focus:ring-1 focus:ring-[#FF642F]" 
                                />
                            </div>
                            {errors.email && <span className="text-red-500 text-sm mt-1">Email is required</span>}
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
                                    {...register("password", { required: true })} 
                                    placeholder="Enter your password" 
                                    className="input input-bordered w-full pl-10 pr-10 focus:outline-none focus:border-[#FF642F] focus:ring-1 focus:ring-[#FF642F]" 
                                />
                                <div 
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400 hover:text-[#FF642F]"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </div>
                            </div>
                            {errors.password && <span className="text-red-500 text-sm mt-1">Password is required</span>}
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover text-[#FF642F]">Forgot password?</a>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <div className="form-control mt-4">
                            <button 
                                disabled={loading}
                                className="btn bg-[#FF642F] hover:bg-[#e55a2a] text-white border-none w-full text-lg shadow-md hover:shadow-lg transition-all"
                            >
                                {loading ? <span className="loading loading-spinner"></span> : "Login"}
                            </button>
                        </div>
                    </form>

                    {/* Divider */}
                    <div className="divider text-gray-400 my-6">OR LOGIN WITH</div>

                    {/* Google Login */}
                    <button 
                        onClick={handleGoogleSignIn} 
                        className="btn btn-outline border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 hover:text-gray-900 w-full flex items-center gap-2"
                    >
                        <FaGoogle className="text-red-500 text-lg" />
                        <span>Continue with Google</span>
                    </button>

                    {/* Register Link */}
                    <p className="mt-8 text-center text-gray-600">
                        Don't have an account? 
                        <Link to="/signup" className="text-[#FF642F] font-bold hover:underline ml-1">
                            Create an account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;