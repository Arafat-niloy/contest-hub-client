import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLoaderData } from "react-router-dom";

// TODO: add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
    const contest = useLoaderData();

    return (
        <div className="my-10 px-4 lg:px-24">
            <h2 className="text-3xl text-center mb-10 font-bold">Payment for {contest.contestName}</h2>
            <div className="w-full lg:w-1/2 mx-auto border p-10 rounded-xl shadow-lg">
                <Elements stripe={stripePromise}>
                    <CheckoutForm contest={contest}></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;