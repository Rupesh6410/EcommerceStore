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
    <div className="min-h-[85vh] flex items-center justify-center px-4 mt-8 mb-20 animate-fade-in">
      <div className="w-full max-w-md p-8 sm:p-10 glass-effect rounded-3xl shadow-2xl border border-white/10 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-[50px] pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-secondary/20 rounded-full blur-[50px] pointer-events-none"></div>

        <div className="relative z-10">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/30">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            </div>
          </div>

          <h2 className="text-3xl font-heading font-bold text-center text-white mb-2">Welcome Back</h2>
          <p className="text-center text-gray-400 mb-8 text-sm">Sign in to your account to continue</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path></svg>
                </div>
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-card/60 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-white placeholder-gray-500 transition-all"
                  placeholder="Enter your email"
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                </div>
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-12 py-3 bg-card/60 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-white placeholder-gray-500 transition-all"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-white transition-colors"
                  aria-label={passwordVisible ? "Hide password" : "Show password"}
                >
                  {passwordVisible ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm mt-2 mb-6">
              <label className="flex items-center cursor-pointer group">
                <input type="checkbox" className="mr-2 h-4 w-4 rounded bg-card/80 border-white/20 text-primary focus:ring-primary focus:ring-offset-0 transition-colors checked:bg-primary" />
                <span className="text-gray-400 group-hover:text-gray-300 transition-colors">Remember me</span>
              </label>
              <Link to="#" className="text-primary hover:text-indigo-400 font-medium transition-colors">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-3 text-lg font-bold flex justify-center items-center shadow-lg mb-6"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>

            <div className="relative my-6 border-t border-white/10">
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 flex items-center px-4 bg-transparent backdrop-blur-sm top-[-10px]">
                <span className="text-xs text-gray-500 font-medium uppercase tracking-wider bg-card px-2">OR</span>
              </div>
            </div>

            <p className="text-center text-gray-400 text-sm">
              Don't have an account?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                className="text-primary hover:text-indigo-400 font-semibold transition-colors ml-1"
              >
                Create one now
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;