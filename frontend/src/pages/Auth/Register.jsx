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

    // Basic password validation
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      const res = await register({ username, email, password }).unwrap();
      
      // Debug: Log the response to see its structure
      console.log("Register API Response:", res);
      
      // Validate response structure
      if (!res) {
        throw new Error("Invalid response from server");
      }
      
      // Handle the expected response structure from your backend
      // Based on your userController, it should be: { token, user: {...} }
      const { user, token } = res;
      console.log("Register API Response:", res);
      if (!token || !user) {
        console.error("Missing token or user in response:", res);
        throw new Error("Invalid response structure - missing token or user data");
      }
      
      // Dispatch with proper structure
      dispatch(setCredentials({ 
        user: user, 
        token: token 
      }));
      
      toast.success(`Welcome ${user.username}! Registration successful!`);
      navigate(redirect);
      
    } catch (error) {
      console.error("Register error:", error);
      
      // Handle different error types
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
    <section className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={submitHandler}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create an Account</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Username</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter username"
              minLength={3}
              maxLength={50}
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter email"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter password (min 6 characters)"
              minLength={6}
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Confirm password"
              minLength={6}
            />
          </div>
        </div>

        <div className="text-sm mt-4 text-center">
          Already have an account?
          <Link
            to={redirect ? `/login?redirect=${redirect}` : "/login"}
            className="text-blue-600 ml-1 hover:underline"
          >
            Login
          </Link>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Registering..." : "Register"}
        </button>

        {isLoading && (
          <div className="flex justify-center mt-3">
            <Loader />
          </div>
        )}
      </form>
    </section>
  );
};

export default Register;