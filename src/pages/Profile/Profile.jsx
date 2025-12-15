import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider"; // আপনার AuthProvider এর পাথ ঠিক করুন
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const Profile = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const [dbUser, setDbUser] = useState({});
    const [loading, setLoading] = useState(true);

    // Form States
    const [name, setName] = useState("");
    const [photo, setPhoto] = useState("");

    useEffect(() => {
        if (user?.email) {
            
            
            setName(user.displayName);
            setPhoto(user.photoURL);
            setLoading(false);
        }
    }, [user]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        
        const updateInfo = {
            name: name,
            photo: photo
        };

        try {
            // ১. ডাটাবেসে আপডেট
            const res = await axiosPublic.put(`/users/${user.email}`, updateInfo);
            
            if (res.data.modifiedCount > 0 || res.data.matchedCount > 0) {
                Swal.fire({
                    title: "Success!",
                    text: "Profile Updated Successfully",
                    icon: "success"
                });
                // window.location.reload(); 
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Error!",
                text: "Something went wrong",
                icon: "error"
            });
        }
    };

    if (loading) return <div className="text-center mt-20">Loading Profile...</div>;

    return (
        <div className="w-11/12 mx-auto my-10">
            <div className="flex flex-col md:flex-row gap-10 bg-base-100 shadow-2xl rounded-2xl overflow-hidden">
                
                {/* Left Side: Display Info */}
                <div className="w-full md:w-1/3 bg-primary text-white flex flex-col items-center justify-center p-10">
                    <div className="avatar mb-5">
                        <div className="w-32 rounded-full ring ring-white ring-offset-base-100 ring-offset-2">
                            <img src={photo || user?.photoURL} alt="Profile" />
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold">{name || user?.displayName}</h2>
                    <p className="mt-2 text-gray-200">{user?.email}</p>
                    <div className="badge badge-secondary mt-4 p-3">User ID: {user?.uid?.slice(0, 8)}...</div>
                </div>

                {/* Right Side: Update Form */}
                <div className="w-full md:w-2/3 p-10">
                    <h2 className="text-3xl font-bold mb-6 text-gray-700">Update Profile</h2>
                    <form onSubmit={handleUpdate} className="space-y-4">
                        
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Full Name</span>
                            </label>
                            <input 
                                type="text" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)}
                                className="input input-bordered w-full" 
                                placeholder="Type your name"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Photo URL</span>
                            </label>
                            <input 
                                type="text" 
                                value={photo} 
                                onChange={(e) => setPhoto(e.target.value)}
                                className="input input-bordered w-full" 
                                placeholder="http://example.com/photo.jpg"
                            />
                        </div>

                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary w-full md:w-auto">
                                Save Changes
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;