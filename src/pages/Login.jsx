import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import useAxiosPublic from "../hooks/useAxiosPublic"; 

const Login = () => {
    const { signIn, googleSignIn } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosPublic = useAxiosPublic();
    
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const from = location.state?.from?.pathname || "/";

    const getAndSaveToken = async (email) => {
        const userInfo = { email: email };
        const res = await axiosPublic.post('/jwt', userInfo);
        if (res.data.token) {
            localStorage.setItem('access-token', res.data.token);
        }
    };

    const onSubmit = data => {
        setLoading(true);
        signIn(data.email, data.password)
            .then(async (result) => {
                await getAndSaveToken(data.email);
                
                toast.success('Welcome back! Login Successful');
                setLoading(false);
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
                const user = result.user;
                const userInfo = {
                    email: user?.email,
                    name: user?.displayName,
                    photo: user?.photoURL,
                    role: 'user' 
                };

                axiosPublic.post('/users', userInfo)
                    .then(async (res) => {
                        await getAndSaveToken(user?.email);
                        
                        toast.success('Google Login Successful');
                        navigate(from, { replace: true });
                    })
            })
            .catch(error => {
                console.error(error);
                toast.error(error.message);
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4 transition-colors duration-300">
            <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-transparent dark:border-gray-700">
                
                {/* Left Side */}
                <div className="hidden md:flex w-1/2 bg-[#FF642F] text-white flex-col justify-center items-center p-10 relative">
                    <div className="absolute inset-0 bg-black opacity-10"></div>
                    <div className="relative z-10 text-center">
                        <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
                        <p className="text-lg opacity-90 mb-8">Access your dashboard, manage your contests, and track your winnings.</p>
                        <img src="https://i.ibb.co.com/WpYSC5bP/conceptual-illustration-mobile-phone-login-process-with-abstract-lines-1263357-36975.avif" alt="Login" className="w-3/4 mx-auto rounded-xl drop-shadow-lg" />
                    </div>
                </div>

                {/* Right Side */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Login to ContestHub</h2>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">Enter your details below</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div className="form-control">
                            <label className="label font-semibold text-gray-700 dark:text-gray-300">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <FaEnvelope />
                                </div>
                                <input 
                                    type="email" 
                                    {...register("email", { required: true })} 
                                    placeholder="Enter your email" 
                                    className="input input-bordered w-full pl-10 focus:outline-none focus:border-[#FF642F] bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-400" 
                                />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label font-semibold text-gray-700 dark:text-gray-300">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <FaLock />
                                </div>
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    {...register("password", { required: true })} 
                                    placeholder="Enter your password" 
                                    className="input input-bordered w-full pl-10 pr-10 focus:outline-none focus:border-[#FF642F] bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-400" 
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </div>
                            </div>
                        </div>

                        <button disabled={loading} className="btn bg-[#FF642F] hover:bg-[#e55a2a] text-white border-none w-full text-lg shadow-md">
                            {loading ? <span className="loading loading-spinner"></span> : "Login"}
                        </button>
                    </form>

                    <div className="divider text-gray-400 dark:text-gray-500 my-6">OR LOGIN WITH</div>

                    <button onClick={handleGoogleSignIn} className="btn btn-outline border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white w-full flex items-center gap-2">
                        <FcGoogle className="text-xl" />
                        <span>Continue with Google</span>
                    </button>

                    <p className="mt-8 text-center text-gray-600 dark:text-gray-400">
                        Don't have an account? <Link to="/signup" className="text-[#FF642F] font-bold hover:underline ml-1">Create an account</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;