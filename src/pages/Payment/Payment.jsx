import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLoaderData, Link } from "react-router-dom";
import { FaShieldAlt, FaArrowLeft } from "react-icons/fa";

// Stripe Promise (Key from ENV)
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
    const contest = useLoaderData();
    const { contestName, price, image } = contest;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center items-center py-24 px-4 font-sans text-[#1A1A1A] dark:text-gray-200 transition-colors duration-300">
            
            {/* Back Link */}
            <div className="w-full max-w-lg mb-6">
                <Link to={`/contest/${contest._id}`} className="text-gray-500 dark:text-gray-400 hover:text-[#FF642F] flex items-center gap-2 transition-colors font-medium">
                    <FaArrowLeft /> Cancel & Go Back
                </Link>
            </div>

            {/* Main Payment Card */}
            <div className="bg-white dark:bg-gray-800 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700 transition-colors">
                
                {/* Header Section */}
                <div className="bg-gray-900 text-white p-8 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[#FF642F] opacity-10"></div>
                    <div className="relative z-10">
                        <div className="flex justify-center mb-3">
                            <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2 backdrop-blur-sm border border-white/10">
                                <FaShieldAlt /> Secure Checkout
                            </span>
                        </div>
                        <h2 className="text-3xl font-bold">Make Payment</h2>
                        <p className="text-gray-400 text-sm mt-1">Complete your registration</p>
                    </div>
                </div>

                {/* Order Summary & Form */}
                <div className="p-8">
                    
                    {/* Summary Box */}
                    <div className="flex gap-4 items-center bg-orange-50 dark:bg-gray-700/40 p-4 rounded-xl border border-orange-100 dark:border-gray-600 mb-8 transition-colors">
                        <img 
                            src={image} 
                            alt="Contest" 
                            className="w-16 h-16 rounded-lg object-cover shadow-sm"
                            onError={(e) => { e.target.src = "https://i.ibb.co/xz9s2wN/placeholder.jpg" }}
                        />
                        <div className="flex-1">
                            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider">You are paying for</p>
                            <h3 className="font-bold text-[#1A1A1A] dark:text-white line-clamp-1">{contestName}</h3>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider">Total</p>
                            <p className="text-xl font-bold text-[#FF642F]">${price}</p>
                        </div>
                    </div>

                    {/* Stripe Elements Wrapper */}
                    <Elements stripe={stripePromise}>
                        <CheckoutForm contest={contest} />
                    </Elements>

                </div>
            </div>
            
            {/* Footer Note */}
            <p className="mt-6 text-gray-400 dark:text-gray-500 text-sm text-center">
                Need help? <Link to="/contact" className="text-[#FF642F] underline">Contact Support</Link>
            </p>
        </div>
    );
};

export default Payment;