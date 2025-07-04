import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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

    try {
      const res = await register({ username, email, password }).unwrap();
      dispatch(setCredentials(res));
      toast.success("Registered successfully!");
      navigate(redirect);
    } catch (error) {
      toast.error(error?.data?.message || "Registration failed, try again.");
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
              placeholder="Enter password"
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
          className="w-full mt-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {isLoading ? "Registering..." : "Register"}
        </button>

        {isLoading && <Loader />}
      </form>
    </section>
  );
};

export default Register;
