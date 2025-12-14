import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

const MyCreatedContest = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [contests, setContests] = useState([]);

    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/contests/creator/${user.email}`)
                .then(res => {
                    setContests(res.data);
                })
        }
    }, [user, axiosSecure]);

    return (
        <div>
            <h2 className="text-3xl font-bold text-center my-10">My Created Contests</h2>
            
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Contest Name</th>
                            <th>Status</th>
                            <th>Action</th>
                            <th>Submissions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            contests.map((contest, index) => <tr key={contest._id}>
                                <th>{index + 1}</th>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={contest.image} alt="Contest" />
                                        </div>
                                    </div>
                                </td>
                                <td>{contest.contestName}</td>
                                <td>
                                    {contest.status === 'accepted' ? 
                                        <span className="text-green-600 font-bold">Accepted</span> : 
                                        <span className="text-red-500">Pending</span>
                                    }
                                </td>
                                <td>
                                    <button className="btn btn-ghost btn-xs"><FaEdit className="text-xl text-blue-600"/></button>
                                    <button className="btn btn-ghost btn-xs"><FaTrash className="text-xl text-red-600"/></button>
                                </td>
                                <td>
                                    <Link to={`/dashboard/contest/submitted/${contest._id}`}>
                                        <button className="btn btn-sm btn-outline btn-accent">
                                            See Submissions
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

export default MyCreatedContest;