import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import Loader from "../../components/Loader"
import { Link } from "react-router-dom"
import { setCredentials } from "../../redux/features/auth/authSlice"
import { useProfileMutation } from "../../redux/api/usersApiSlice"

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const { userInfo } = useSelector(state => state.auth)
  const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation()
  useEffect(() => {
    setUsername(userInfo.username)
    setEmail(userInfo.email)
  }, [userInfo.email, userInfo.username])

  const dispatch = useDispatch()

  const submitHandler = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error("Passwords do not match")

    } else {

      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password
        }).unwrap()
        dispatch(setCredentials({ ...res }))
        toast.success("Profile updated successfully")
      } catch (error) {
        toast.error(error?.data?.message || "Update Failed.");
      }

    }

  }

  return (
    <section className="min-h-[85vh] flex items-center justify-center px-4 mt-8 mb-20 animate-fade-in text-gray-200">
      <div className="w-full max-w-lg p-8 sm:p-10 glass-card rounded-3xl shadow-2xl border border-white/10 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-[50px] pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-secondary/20 rounded-full blur-[50px] pointer-events-none"></div>

        <div className="relative z-10">
          <h2 className="text-3xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-8 text-center drop-shadow-sm">
            Update Profile
          </h2>

          <form onSubmit={submitHandler} className="space-y-5">
            {/* Username */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300 ml-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-card/60 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-white placeholder-gray-500 transition-all"
                placeholder="Enter Username"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300 ml-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-card/60 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-white placeholder-gray-500 transition-all opacity-70 cursor-not-allowed"
                placeholder="Enter Email"
                disabled
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300 ml-1">New Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-card/60 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-white placeholder-gray-500 transition-all"
                placeholder="Enter new password"
              />
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300 ml-1">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 bg-card/60 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-white placeholder-gray-500 transition-all"
                placeholder="Confirm new password"
              />
            </div>

            <div className="pt-6 flex flex-col sm:flex-row justify-between gap-4">
              <Link
                to="/user-orders"
                className="btn-secondary py-3 px-6 text-center text-sm font-bold shadow-lg w-full sm:w-auto"
              >
                My Orders
              </Link>

              <button
                type="submit"
                disabled={loadingUpdateProfile}
                className="btn-primary py-3 px-8 text-sm font-bold shadow-lg w-full sm:w-auto flex justify-center items-center"
              >
                {loadingUpdateProfile ? (
                  <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                ) : (
                  "Update Profile"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Profile
