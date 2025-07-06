import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useLoginMutation } from "../../redux/api/usersApiSlice.js";
import { setCredentials } from "../../redux/features/auth/authSlice.js";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";

const Login = () => {
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const sp = new URLSearchParams(location.search);
  const redirect = sp.get("redirect") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await login({ email, password }).unwrap();
      
      // Debug: Log the response to see its structure
      console.log("Login API Response:", res);
    
      
      // Validate response structure
      if (!res) {
        throw new Error("Invalid response from server");
      }
      
      // Handle the expected response structure from your backend
      // Based on your userController, it should be: { token, user: {...} }
      const { token, user } = res;
      console.log("Login Token:", token);
      console.log("Login User:", user);
      
      if (!token || !user) {
        console.error("Missing token or user in response:", res);
        throw new Error("Invalid response structure - missing token or user data");
      }
      
      // Dispatch with proper structure
      dispatch(setCredentials({ 
        user: user, 
        token: token 
      }));
      
      toast.success(`Welcome back, ${user.username}!`);
      navigate(redirect);
      
    } catch (error) {
      console.error("Login error:", error);
      
      // Handle different error types
      let errorMessage = "Login failed. Please try again.";
      
      if (error?.data?.message) {
        errorMessage = error.data.message;
      } else if (error?.message) {
        errorMessage = error.message;
      } else if (error?.status === 401) {
        errorMessage = "Invalid email or password.";
      } else if (error?.status === 404) {
        errorMessage = "User not found. Please check your email.";
      } else if (error?.status >= 500) {
        errorMessage = "Server error. Please try again later.";
      }
      
      toast.error(errorMessage);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign In</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
              autoComplete="email"
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-9 right-3 text-gray-600 hover:text-gray-800"
              aria-label={passwordVisible ? "Hide password" : "Show password"}
            >
              {passwordVisible ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <Link to="#" className="hover:underline">
              Forgot Password?
            </Link>
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
              className="text-blue-600 hover:underline"
            >
              Create an Account
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>

          {isLoading && (
            <div className="flex justify-center mt-3">
              <Loader />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;