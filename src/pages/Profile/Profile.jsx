import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import {
  FaUser,
  FaCamera,
  FaEnvelope,
  FaSave,
  FaQuoteLeft,
  FaChartPie,
} from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const Profile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form States
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [bio, setBio] = useState("");

  // Stats States
  const [stats, setStats] = useState({
    totalWins: 0,
    totalParticipated: 0,
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user?.email) return;

      try {
        const statsRes = await axiosSecure.get(
          `/my-winning-stats/${user.email}`
        );

        setStats({
          totalWins: statsRes.data.totalWins || 0,
          totalParticipated: statsRes.data.totalParticipated || 0,
        });

        setName(user.displayName || "");
        setPhoto(user.photoURL || "");
        setBio(user.bio || "Contest Enthusiast!");
      } catch (error) {
        console.error("Profile load error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [user, axiosSecure]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const updateInfo = {
      name,
      photo,
      bio,
    };

    try {
      await updateUserProfile(name, photo);
      const res = await axiosSecure.put(`/users/${user.email}`, updateInfo);

      if (res.data.modifiedCount > 0 || res.data.matchedCount > 0) {
        Swal.fire({
          title: "Profile Updated!",
          text: "Your profile information has been updated successfully.",
          icon: "success",
          confirmButtonColor: "#FF642F",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to update profile.",
        icon: "error",
        confirmButtonColor: "#FF642F",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Chart Data
  const chartData = [
    { name: "Won", value: stats.totalWins },
    {
      name: "Pending / Lost",
      value: Math.max(0, stats.totalParticipated - stats.totalWins),
    },
  ];

  const COLORS = ["#FF642F", "#8884d8"];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh] bg-gray-50 dark:bg-gray-900">
        <span className="loading loading-spinner loading-lg text-[#FF642F]"></span>
      </div>
    );
  }

  return (
    <div className="w-full p-4 md:p-10 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="md:col-span-2 bg-gradient-to-r from-[#FF642F] to-[#F97316] rounded-3xl p-8 text-white flex flex-col md:flex-row items-center gap-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>

            <div className="avatar">
              <div className="w-32 rounded-full ring-4 ring-white/30 shadow-2xl">
                <img src={user?.photoURL} alt="User" />
              </div>
            </div>

            <div className="text-center md:text-left z-10">
              <h1 className="text-3xl font-bold">{user?.displayName}</h1>
              <p className="opacity-80 flex items-center justify-center md:justify-start gap-2 mt-1">
                <FaEnvelope className="text-sm" /> {user?.email}
              </p>

              <div className="mt-4 p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                <p className="text-sm italic flex gap-2">
                  <FaQuoteLeft className="text-white/50" />
                  {bio || "No bio added yet."}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center transition-colors">
            <h3 className="text-gray-700 dark:text-gray-200 font-bold flex items-center gap-2 mb-2">
              <FaChartPie className="text-[#FF642F]" />
              Winning Ratio
            </h3>

            <div className="w-full h-52">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map((_, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                        stroke="none"
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} 
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36} 
                    formatter={(value) => <span className="text-gray-600 dark:text-gray-300">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
              Based on {stats.totalParticipated} participations
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100 dark:border-gray-700 transition-colors">
          <div className="mb-10 border-b dark:border-gray-700 pb-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Account Settings
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Update your profile information and bio.
            </p>
          </div>

          <form
            onSubmit={handleUpdate}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Full Name */}
            <div className="form-control">
              <label className="label font-semibold text-gray-700 dark:text-gray-300">
                Full Name
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-4 text-gray-400 dark:text-gray-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input input-bordered pl-4 w-full border dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:border-[#FF642F]"
                  required
                />
              </div>
            </div>

            {/* Photo URL */}
            <div className="form-control">
              <label className="label font-semibold text-gray-700 dark:text-gray-300">
                Profile Photo URL
              </label>
              <div className="relative">
                <FaCamera className="absolute left-3 top-4 text-gray-400 dark:text-gray-500" />
                <input
                  type="text"
                  value={photo}
                  onChange={(e) => setPhoto(e.target.value)}
                  className="input input-bordered pl-4 w-full border dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:border-[#FF642F]"
                />
              </div>
            </div>

            {/* Bio */}
            <div className="form-control md:col-span-2 space-x-2">
              <label className="label font-semibold text-gray-700 dark:text-gray-300">
                Bio
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="textarea textarea-bordered h-24 border p-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:border-[#FF642F]"
                placeholder="Tell us about your skills or goals..."
              ></textarea>
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={submitting}
                className="btn bg-[#FF642F] hover:bg-[#e55a2a] text-white px-10 border-none shadow-lg w-full md:w-auto"
              >
                {submitting ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  <>
                    <FaSave /> Update Profile
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