import { useState, useEffect } from "react";
import { data, Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const redirect = new URLSearchParams(search).get("redirect") || "/";

  useEffect(() => {
    if (userInfo) navigate(redirect);
  }, [userInfo, navigate, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      const res = await register({ username, email, password }).unwrap();
<<<<<<< HEAD

      // Debug: Log the response to see its structure
      console.log("Register API Response:", res);

      // Validate response structure
      if (!res) {
        throw new Error("Invalid response from server");
      }

      // Handle the expected response structure from your backend
      // Based on your userController, it should be: { token, user: {...} }
=======
      
      console.log("Register API Response:", res);
      
      if (!res) {
        throw new Error("Invalid response from server");
      }
>>>>>>> main
      const { user, token } = res;
      console.log("Register API Response:", res);
      if (!token || !user) {
        console.error("Missing token or user in response:", res);
        throw new Error("Invalid response structure - missing token or user data");
      }
<<<<<<< HEAD

      // Dispatch with proper structure
      dispatch(setCredentials({
        user: user,
        token: token
=======
      
      dispatch(setCredentials({ 
        user: user, 
        token: token 
>>>>>>> main
      }));

      toast.success(`Welcome ${user.username}! Registration successful!`);
      navigate(redirect);

    } catch (error) {
      console.error("Register error:", error);
<<<<<<< HEAD

      // Handle different error types
=======
      
>>>>>>> main
      let errorMessage = "Registration failed. Please try again.";

      if (error?.data?.message) {
        errorMessage = error.data.message;
      } else if (error?.message) {
        errorMessage = error.message;
      } else if (error?.status === 400) {
        errorMessage = "Invalid registration data. Please check your input.";
      } else if (error?.status === 409) {
        errorMessage = "User already exists with this email.";
      } else if (error?.status >= 500) {
        errorMessage = "Server error. Please try again later.";
      }

      toast.error(errorMessage);
    }
  };


  return (
    <section className="min-h-[85vh] flex items-center justify-center px-4 mt-8 mb-20 animate-fade-in">
      <div className="w-full max-w-lg p-8 sm:p-10 glass-effect rounded-3xl shadow-2xl border border-white/10 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-secondary/20 rounded-full blur-[50px] pointer-events-none"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-[50px] pointer-events-none"></div>

        <div className="relative z-10">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-secondary to-primary flex items-center justify-center shadow-lg shadow-secondary/30">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
            </div>
          </div>

          <h2 className="text-3xl font-heading font-bold mb-2 text-center text-white">Create an Account</h2>
          <p className="text-center text-gray-400 mb-8 text-sm">Join us and start shopping premium products</p>

          <form onSubmit={submitHandler} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-card/60 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/50 text-white placeholder-gray-500 transition-all"
                  placeholder="Enter your username"
                  minLength={3}
                  maxLength={50}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-card/60 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/50 text-white placeholder-gray-500 transition-all"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-card/60 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/50 text-white placeholder-gray-500 transition-all"
                    placeholder="Min 6 chars"
                    minLength={6}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">Confirm Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                  </div>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-card/60 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/50 text-white placeholder-gray-500 transition-all"
                    placeholder="Confirm password"
                    minLength={6}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-secondary py-3 text-lg font-bold flex justify-center items-center shadow-lg mt-8 mb-6"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>

            <div className="relative my-6 border-t border-white/10">
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 flex items-center px-4 bg-transparent backdrop-blur-sm top-[-10px]">
                <span className="text-xs text-gray-500 font-medium uppercase tracking-wider bg-card px-2">OR</span>
              </div>
            </div>

            <p className="text-center text-gray-400 text-sm">
              Already have an account?
              <Link
                to={redirect ? `/login?redirect=${redirect}` : "/login"}
                className="text-secondary hover:text-pink-400 font-semibold transition-colors ml-2"
              >
                Sign in instead
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;