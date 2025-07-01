import { useState , useEffect } from "react";
import { useSelector , useDispatch } from "react-redux";
import { Link ,useLocation , useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";

const Login = () => {
    const [login , { isLoading }] = useLoginMutation();
    const {userInfo} = useSelector((state) => state.auth);
    const search=useLocation()
    const sp= new URLSearchParams(search.search)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const redirect = sp.get("redirect") || "/";

    useEffect(() => {
        if (userInfo) {
          navigate(redirect);
        }
      }, [userInfo, redirect, navigate]);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        const res = await login({email , password}).unwrap()
        console.log(res)
        dispatch(setCredentials({...res}))
        
    } catch (error) {
        toast.error(error?.data?.message || error.error)
        
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Sign In</h2>

        <form className="mt-6" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-4 relative">
            <label className="block text-gray-600 text-sm font-medium" htmlFor="password">Password</label>
            <input
              id="password"
              type={passwordVisible ? "text" : "password"}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {/* Show/Hide Password Icon */}
            <button
            
              type="button"
              className="absolute right-3 top-[54%] transform -translate-y-1/2 text-gray-600"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? <AiOutlineEyeInvisible size={22} className="mt-[1rem]"/> : <AiOutlineEye size={22} className="mt-[1rem]"/>}
            </button>
          </div>

          {/* Forgot Password & Register */}
          <div className="flex justify-between text-sm text-gray-500">
            <Link to="#" className="hover:underline">
              Forgot Password?
            </Link>
            <Link to={redirect?`/register?redirect=${redirect}`:"/register"} className="text-blue-600 hover:underline">
              Create an Account
            </Link>
          </div>

          {/* Submit Button */}
          <button
            disabled={isLoading}
            type="submit"
            className="w-full mt-4 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
          {isLoading && <Loader />}
        </form>
      </div>
    </div>
  );
};

export default Login;