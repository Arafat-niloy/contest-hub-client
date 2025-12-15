import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ contest }) => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');

    // Hooks
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();

    // Destructure contest details (Image সহ)
    const { price, contestName, _id, image } = contest || {};

    // 1. Load Client Secret from Backend
    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price: price })
                .then(res => {
                    console.log('Client Secret:', res.data.clientSecret);
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

        // 2. Create Payment Method (Optional Check)
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            console.log('payment error', error);
            setError(error.message);
        } else {
            console.log('payment method', paymentMethod);
            setError('');
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
        } else {
            console.log('payment intent', paymentIntent);

            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);

                // 4. Save Payment Info to Database
                const payment = {
                    email: user.email,
                    name: user.displayName,
                    photo: user.photoURL,
                    price: price,
                    transactionId: paymentIntent.id,
                    date: new Date(), // UTC date conversion recommended for production
                    contestId: _id,
                    contestName: contestName,
                    image: image, // ড্যাশবোর্ডে ছবি দেখানোর জন্য
                    taskSubmitted: false,
                    isWinner: false,
                    status: 'paid'
                }

                try {
                    const res = await axiosSecure.post('/payments', payment);
                    console.log('payment saved', res.data);

                    // 👇 গুরুত্ত্বপূর্ণ আপডেট: রিডাইরেক্ট লজিক ঠিক করা হয়েছে
                    if (res.data?.paymentResult?.insertedId || res.data?.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Payment Successful!",
                            text: `Transaction ID: ${paymentIntent.id}`,
                            showConfirmButton: false,
                            timer: 1500
                        }).then(() => {
                            // টাইমার শেষ হওয়ার পর অথবা ইউজার পপ-আপ বন্ধ করলে এখানে নিয়ে যাবে
                            navigate('/dashboard/my-participated');
                        });
                    }
                } catch (err) {
                    console.error("Error saving payment info:", err);
                    setError("Payment successful but failed to save record.");
                }
            }
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="border p-4 rounded-md shadow-sm bg-gray-50 mb-6">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
            </div>

            {/* Error Message */}
            <p className="text-red-600 text-sm mb-2">{error}</p>

            {/* Success Message */}
            {transactionId && <p className="text-green-600 text-sm mb-4"> Transaction ID: {transactionId}</p>}

            {/* Pay Button */}
            <button
                className="btn btn-primary w-full  font-bold text-lg disabled:bg-gray-300 disabled:text-gray-500"
                type="submit"
                disabled={!stripe || !clientSecret}
            >
                {/* লোডিং বা প্রাইস দেখানো */}
                {price ? `Pay $${price}` : 'Loading...'}
            </button>
        </form>
    );
};

export default CheckoutForm;