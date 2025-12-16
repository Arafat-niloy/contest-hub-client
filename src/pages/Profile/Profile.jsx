import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider"; 
import useAxiosSecure from "../../hooks/useAxiosSecure"; // Secure ব্যবহার করা ভালো
import Swal from "sweetalert2";
import { FaUser, FaCamera, FaEnvelope, FaSave, FaIdCard } from "react-icons/fa";

const Profile = () => {
    const { user, updateUserProfile } = useContext(AuthContext); // updateUserProfile context থেকে আনা হলো
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Form States
    const [name, setName] = useState("");
    const [photo, setPhoto] = useState("");

    useEffect(() => {
        if (user) {
            setName(user.displayName || "");
            setPhoto(user.photoURL || "");
            setLoading(false);
        }
    }, [user]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        
        const updateInfo = {
            name: name,
            photo: photo
        };

        try {
            // ১. ফায়ারবেস প্রোফাইল আপডেট (রিলোড ছাড়া UI আপডেটের জন্য)
            await updateUserProfile(name, photo);

            // ২. ডাটাবেসে আপডেট
            const res = await axiosSecure.put(`/users/${user.email}`, updateInfo);
            
            if (res.data.modifiedCount > 0 || res.data.matchedCount > 0) {
                Swal.fire({
                    title: "Profile Updated!",
                    text: "Your profile has been updated successfully.",
                    icon: "success",
                    confirmButtonColor: "#FF642F"
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Error!",
                text: "Failed to update profile.",
                icon: "error",
                confirmButtonColor: "#FF642F"
            });
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[80vh]">
                <span className="loading loading-spinner loading-lg text-[#FF642F]"></span>
            </div>
        );
    }

    return (
        <div className="w-full p-4 md:p-10 bg-gray-50 min-h-screen flex items-center justify-center">
            <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white shadow-2xl rounded-2xl overflow-hidden">
                
                {/* Left Side: Display Info (Gradient Background) */}
                <div className="w-full md:w-2/5 bg-gradient-to-br from-[#FF642F] to-[#F97316] text-white flex flex-col items-center justify-center p-10 relative">
                    {/* Decoratiive Circle */}
                    <div className="absolute top-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-x-10 -translate-y-10"></div>
                    <div className="absolute bottom-0 right-0 w-24 h-24 bg-black opacity-10 rounded-full translate-x-5 translate-y-5"></div>

                    <div className="avatar mb-6">
                        <div className="w-40 rounded-full ring-4 ring-white ring-offset-4 ring-offset-[#FF642F] shadow-lg">
                            <img src={photo || user?.photoURL} alt="Profile" className="object-cover" />
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold text-center">{name || user?.displayName}</h2>
                    
                    <div className="flex items-center gap-2 mt-2 opacity-90">
                        <FaEnvelope /> <span>{user?.email}</span>
                    </div>

                    <div className="mt-6 bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full flex items-center gap-2 border border-white/30">
                        <FaIdCard />
                        <span className="text-sm font-mono">ID: {user?.uid?.slice(0, 8)}...</span>
                    </div>
                </div>

                {/* Right Side: Update Form */}
                <div className="w-full md:w-3/5 p-8 md:p-12">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-800">Edit Profile</h2>
                        <p className="text-gray-500 mt-1">Update your personal details here.</p>
                    </div>

                    <form onSubmit={handleUpdate} className="space-y-6">
                        
                        {/* Name Input */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold text-gray-700">Full Name</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <FaUser />
                                </div>
                                <input 
                                    type="text" 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)}
                                    className="input input-bordered w-full pl-10 focus:outline-none focus:border-[#FF642F] focus:ring-1 focus:ring-[#FF642F] bg-gray-50" 
                                    placeholder="Type your name"
                                />
                            </div>
                        </div>

                        {/* Photo URL Input */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold text-gray-700">Profile Photo URL</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <FaCamera />
                                </div>
                                <input 
                                    type="text" 
                                    value={photo} 
                                    onChange={(e) => setPhoto(e.target.value)}
                                    className="input input-bordered w-full pl-10 focus:outline-none focus:border-[#FF642F] focus:ring-1 focus:ring-[#FF642F] bg-gray-50" 
                                    placeholder="http://example.com/photo.jpg"
                                />
                            </div>
                            <label className="label">
                                <span className="label-text-alt text-gray-400">Paste a direct image link from an image host.</span>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <div className="form-control mt-8">
                            <button 
                                type="submit" 
                                disabled={submitting}
                                className="btn bg-[#FF642F] hover:bg-[#e55a2a] text-white w-full md:w-auto text-lg px-8 border-none shadow-md hover:shadow-lg transition-all"
                            >
                                {submitting ? (
                                    <span className="loading loading-spinner"></span>
                                ) : (
                                    <>
                                        <FaSave className="mr-2" /> Save Changes
                                    </>
                                )}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;