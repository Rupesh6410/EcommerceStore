import { useSelector ,useDispatch } from "react-redux"
import { useEffect , useState } from "react"
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
    
      
      const {userInfo}= useSelector(state=>state.auth)
      const[updateProfile , {isLoading:loadingUpdateProfile}]=useProfileMutation()
      useEffect(()=>{
        setUsername(userInfo.username)
        setEmail(userInfo.email)
      } , [userInfo.email , userInfo.username])

       const dispatch=useDispatch()

       const submitHandler= async(e)=>{
        e.preventDefault()

        if (password!==confirmPassword) {
            toast.error("Passwords do not match")
            
        } else {

            try {
                const res = await updateProfile({
                    _id:userInfo._id,
                    username,
                    email,
                    password
                }).unwrap()
                dispatch(setCredentials({...res}))
                toast.success("Profile updated successfully")
            } catch (error) {
                 toast.error(error?.data?.message || "Update Failed."); 
            }
            
        }

       }

  return (
    <section className="flex justify-center items-center h-screen bg-gray-100">
          <form onSubmit={submitHandler}
            
            className="bg-white p-6 rounded-lg shadow-md w-96"
          >
            <h2 className="text-2xl font-bold mb-4 text-center">Update Profile</h2>
    
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
    
            <div className="mt-6 mb-8 flex justify-between space-x-4">
  
            <button className="bg-pink-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-pink-600 transition duration-300 ease-in-out transform hover:scale-105">
                <Link to="/user-orders">My Orders</Link>  
             </button>

         
            <button type="submit"
            disabled={loadingUpdateProfile}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105">
                {loadingUpdateProfile?"Updating":"Update"}
            </button>
            </div>
            
    
            
            
          </form>
          
        </section>
  )
}

export default Profile
