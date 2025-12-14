import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const MyRegisteredContests = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/payments/user/${user.email}`)
                .then(res => {
                    setPayments(res.data);
                })
        }
    }, [axiosSecure, user?.email]);

    return (
        <div>
            <h2 className="text-3xl font-bold text-center my-10">My Registered Contests: {payments.length}</h2>
            
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Contest Name</th>
                            <th>Payment ID</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            payments.map((payment, index) => <tr key={payment._id}>
                                <th>{index + 1}</th>
                                <td>{payment.contestName}</td>
                                <td>{payment.transactionId}</td>
                                <td>${payment.price}</td>
                                <td>
                                    {payment.isWinner ? 
                                        <span className="text-green-600 font-bold">Winner! 🏆</span> : 
                                        <span className="text-blue-600">Paid</span>
                                    }
                                </td>
                                <td>
                                   {/* টাস্ক সাবমিশন বাটন - আমরা এটি পরবর্তী ধাপে ফাংশনাল করব */}
                                   <Link to={`/dashboard/payment/submit/${payment._id}`}>
                                        <button 
                                            disabled={payment.taskSubmitted} 
                                            className="btn btn-sm btn-secondary">
                                            {payment.taskSubmitted ? 'Submitted' : 'Submit Task'}
                                        </button>
                                   </Link>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyRegisteredContests;