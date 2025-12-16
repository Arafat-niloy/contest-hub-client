import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";

const CheckoutForm = ({ contest }) => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [processing, setProcessing] = useState(false); // পেমেন্ট প্রসেসিং স্টেট

    // Hooks
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();

    // Destructure contest details
    const { price, contestName, _id, image } = contest || {};

    // 1. Load Client Secret from Backend
    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price: price })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                })
                .catch(err => console.error("Error creating payment intent:", err));
        }
    }, [axiosSecure, price]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        // প্রসেসিং শুরু
        setProcessing(true);
        setError('');

        // 2. Create Payment Method
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            console.log('payment error', error);
            setError(error.message);
            setProcessing(false); // এরর হলে প্রসেসিং বন্ধ
            return;
        } else {
            console.log('payment method', paymentMethod);
        }

        // 3. Confirm Payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        });

        if (confirmError) {
            console.log('confirm error', confirmError);
            setError(confirmError.message);
            setProcessing(false);
        } else {
            console.log('payment intent', paymentIntent);

            if (paymentIntent.status === 'succeeded') {
                setTransactionId(paymentIntent.id);

                // 4. Save Payment Info to Database
                const payment = {
                    email: user.email,
                    name: user.displayName,
                    photo: user.photoURL,
                    price: price,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    contestId: _id,
                    contestName: contestName,
                    image: image,
                    taskSubmitted: false,
                    isWinner: false,
                    status: 'paid'
                }

                try {
                    const res = await axiosSecure.post('/payments', payment);
                    
                    if (res.data?.paymentResult?.insertedId || res.data?.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Payment Successful!",
                            text: `Transaction ID: ${paymentIntent.id}`,
                            showConfirmButton: false,
                            timer: 2000
                        }).then(() => {
                            navigate('/dashboard/my-participated');
                        });
                    }
                } catch (err) {
                    setError("Payment successful but failed to save record.");
                } finally {
                    setProcessing(false); // সব কাজ শেষে প্রসেসিং বন্ধ
                }
            }
        }
    }

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-6">
                <label className="block text-gray-600 font-semibold mb-2 ml-1">Card Details</label>
                <div className="border border-gray-300 p-4 rounded-xl bg-white shadow-sm hover:border-[#FF642F] focus-within:border-[#FF642F] transition-colors duration-300">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    fontFamily: 'sans-serif',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                    iconColor: '#FF642F' // কার্ড আইকনের কালার অরেঞ্জ করা হয়েছে
                                },
                                invalid: {
                                    color: '#ef4444', // Red-500
                                },
                            },
                        }}
                    />
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm mb-4 border border-red-100 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                    {error}
                </div>
            )}

            {/* Success Message */}
            {transactionId && (
                <div className="bg-green-50 text-green-600 px-4 py-3 rounded-lg text-sm mb-4 border border-green-100">
                    <p className="font-bold">Payment Complete!</p>
                    <p>Transaction ID: {transactionId}</p>
                </div>
            )}

            {/* Pay Button */}
            <button
                className="btn w-full rounded-full bg-[#FF642F] hover:bg-[#e05828] text-white border-none shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 font-bold text-lg disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed disabled:shadow-none"
                type="submit"
                disabled={!stripe || !clientSecret || processing || transactionId}
            >
                {processing ? (
                    <span className="loading loading-spinner loading-md"></span>
                ) : (
                    <div className="flex items-center gap-2">
                        <FaLock size={16} /> {/* Lock Icon */}
                        {price ? `Pay Securely $${price}` : 'Loading...'}
                    </div>
                )}
            </button>
            
            {/* Footer Trust Badge */}
            <div className="text-center mt-4 text-xs text-gray-400 flex justify-center items-center gap-2">
                <FaLock className="text-gray-300" />
                Payments are secure and encrypted
            </div>
        </form>
    );
};

export default CheckoutForm;