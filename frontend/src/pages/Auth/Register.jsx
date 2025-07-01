import React from 'react'
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useRegisterMutation } from "../../redux/api/usersApiSlice.js";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const Register = () => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch()
  const navigate= useNavigate()
  const [register , {isLoading}] = useRegisterMutation()
  const {userInfo} = useSelector(state=>state.auth)

  const search = useLocation()
  const sp = new URLSearchParams(search)
  const redirect = sp.get("redirect")||"/"

  useEffect(()=>{
    if (userInfo){
        navigate(redirect)
    }
  }, [navigate , redirect , userInfo])

  const submitHandler= async(e)=>{
    e.preventDefault()

    if (password!==confirmPassword) {
        toast.error("Password doesnot match")

        
    } else {
        

        try {
        const res = await register({username , email , password}).unwrap()
        dispatch(setCredentials({...res}))
        navigate(redirect)
        toast.success("User Successfully registered")
            
        } catch (error) {
            
            console.error("Registration error:", error);
            console.log("Error response:", error?.data); 
            toast.error(error?.data?.message || "Registration failed. Please try again.");
            
        }
        
    }


  }


  return (
    <section className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={submitHandler}
        className="bg-white p-6 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder='Enter Username'
          />
          
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder='Enter Email'
          />
         
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder='Enter Password'
          />
          
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <label className="block text-gray-700">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder='Confirm Password'
          />
          
        </div>

        <div className='mt-4 mb-6'>
            <p className='text-black '>
                Already have account?{""}
                <Link className="text-blue-500 ml-[0.5rem]" to={redirect ? `/login?redirect=${redirect}`:"/login" }>{""}Login</Link>
            </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          disabled={isLoading}
        >
          {isLoading?"Registering":"Register"}
        </button>
      </form>
    </section>
  )
}

export default Register
