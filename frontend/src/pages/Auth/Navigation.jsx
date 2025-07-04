import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";
import { useNavigate } from "react-router-dom";
import {
    AiOutlineHome,
    AiOutlineShopping,
    AiOutlineLogin,
    AiOutlineUserAdd,
    AiOutlineShoppingCart,
    AiOutlineSearch, // Added for potential search icon on mobile
} from "react-icons/ai";
import { FaHeart, FaBars, FaTimes } from "react-icons/fa"; // Added FaBars and FaTimes for toggle
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logOut } from "../../redux/features/auth/authSlice";
import FavoriteCounts from "../Products/FavoriteCounts";

const Navigation = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.cart);

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false); // State to control mobile sidebar visibility

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    // Toggle sidebar visibility for mobile
    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    // Close sidebar (e.g., when clicking outside or navigating)
    const closeSidebar = () => {
        setShowSidebar(false);
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logOut());
            navigate("/login");
            closeSidebar(); // Close sidebar after logout
        } catch (err) {
            console.error(err); // Use console.error for errors
        }
    };

    return (
        <>
            {/* Hamburger menu for mobile */}
            <div className="xl:hidden lg:hidden md:flex sm:flex flex-row items-center justify-between p-4 bg-[#000] text-white fixed top-0 left-0 w-full z-[10000]">
                <button onClick={toggleSidebar} className="text-white focus:outline-none">
                    {showSidebar ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
                <Link to="/" className="text-xl font-bold">
                    E-Shop
                </Link>
                <Link to="/cart" className="relative">
                    <AiOutlineShoppingCart size={24} />
                    {cartItems.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                            {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                        </span>
                    )}
                </Link>
            </div>

            {/* Overlay when sidebar is open on mobile */}
            {showSidebar && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-[9998] xl:hidden lg:hidden md:block sm:block"
                    onClick={closeSidebar}
                ></div>
            )}

            {/* Main Navigation Container */}
            <div
                style={{ zIndex: 9999 }}
                // Dynamically apply 'sidebar-open' class based on state
                className={`
                    ${showSidebar ? "sidebar-open" : "hidden"} 
                    xl:flex lg:flex md:hidden sm:hidden 
                    flex-col justify-between p-4 text-white bg-[#000] 
                    w-[4%] hover:w-[15%] h-[100vh] fixed
                `}
                id="navigation-container"
            >
                <div className="flex flex-col justify-center space-y-4 mt-[3rem] ">
                    {/* The mt-[3rem] was causing issues on mobile, moved it to the parent div or consider removing/adjusting */}
                    <Link
                        to="/"
                        className="flex items-center transition-transform transform hover:translate-x-2"
                        onClick={closeSidebar} // Close sidebar on navigation
                    >
                        <AiOutlineHome className="mr-2" size={20} />
                        <span className="nav-item-name">HOME</span>{" "}
                    </Link>

                    <Link
                        to="/shop"
                        className="flex items-center transition-transform transform hover:translate-x-2"
                        onClick={closeSidebar}
                    >
                        <AiOutlineShopping className="mr-2" size={20} />
                        <span className="nav-item-name">SHOP</span>{" "}
                    </Link>

                    <Link
                        to="/cart"
                        className="flex items-center transition-transform transform hover:translate-x-2 relative"
                        onClick={closeSidebar}
                    >
                        <AiOutlineShoppingCart className="mr-2" size={20} />
                        <span className="nav-item-name">CART</span>{" "}
                        {cartItems.length > 0 && (
                            <div className="absolute -top-3 -right-2"> {/* Adjusted position */}
                                <span className="bg-pink-500 text-white text-xs font-medium px-2 py-1 rounded-full ">
                                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                                </span>
                            </div>
                        )}
                    </Link>

                    <Link
                        to="/favorite"
                        className="flex items-center transition-transform transform hover:translate-x-2"
                        onClick={closeSidebar}
                    >
                        <FaHeart className="mr-2" size={20} />
                        <span className="nav-item-name">FAVORITE</span>{" "}
                        <FavoriteCounts />
                    </Link>
                    {/* You might want a search input here too for mobile */}
                    {/* <div className="flex items-center">
                        <AiOutlineSearch className="mr-2" size={20} />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="search-input bg-transparent border-b border-gray-600 focus:outline-none text-white w-full"
                        />
                    </div> */}
                </div>

                <div className="relative mb-4"> {/* Added mb-4 for some bottom margin */}
                    <button onClick={toggleDropdown} className="flex items-center text-white focus:outline-none ">
                        {userInfo ? (
                            <span className="mr-1">{userInfo.username}</span>
                        ) : (
                            <></>
                        )}
                        {userInfo && (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-4 w-4 ml-1 ${
                                    dropdownOpen ? "transform rotate-180" : ""
                                }`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="white"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                                />
                            </svg>
                        )}
                    </button>
                    {dropdownOpen && userInfo && (
                        <ul
                            className={`absolute right-0 mt-2 mr-14 space-y-2 bg-black text-gray-400 ${
                                !userInfo.isAdmin ? "-top-20" : "-top-80"
                            }`}
                        >
                            {userInfo.isAdmin && (
                                <>
                                    <li>
                                        <Link
                                            to="/admin/dashboard"
                                            className="block px-4 py-2 hover:bg-gray-700 hover:text-white"
                                            onClick={closeSidebar}
                                        >
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/admin/productlist"
                                            className="block px-4 py-2 hover:bg-gray-700 hover:text-white"
                                            onClick={closeSidebar}
                                        >
                                            Products
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/admin/categorylist"
                                            className="block px-4 py-2 hover:bg-gray-700 hover:text-white"
                                            onClick={closeSidebar}
                                        >
                                            Category
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/admin/orderlist"
                                            className="block px-4 py-2 hover:bg-gray-700 hover:text-white"
                                            onClick={closeSidebar}
                                        >
                                            Orders
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/admin/userlist"
                                            className="block px-4 py-2 hover:bg-gray-700 hover:text-white"
                                            onClick={closeSidebar}
                                        >
                                            Users
                                        </Link>
                                    </li>
                                </>
                            )}
                            <li>
                                <Link
                                    to="/profile"
                                    className="block px-4 py-2 hover:bg-gray-700 hover:text-white"
                                    onClick={closeSidebar}
                                >
                                    Profile
                                </Link>
                            </li>
                            <li className="block px-4 py-2 hover:bg-gray-700 hover:text-white">
                                <button onClick={logoutHandler}>Logout</button>
                            </li>
                        </ul>
                    )}
                </div>

                {!userInfo && (
                    <ul className="mb-4"> {/* Added mb-4 for some bottom margin */}
                        <li>
                            <Link
                                to="/login"
                                className="flex items-center transition-transform transform hover:translate-x-2"
                                onClick={closeSidebar}
                            >
                                <AiOutlineLogin className="mr-2" size={20} />
                                <span className="nav-item-name">LOGIN</span>{" "}
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/register"
                                className="flex items-center transition-transform transform hover:translate-x-2"
                                onClick={closeSidebar}
                            >
                                <AiOutlineUserAdd className="mr-2" size={20} />
                                <span className="nav-item-name">REGISTER</span>{" "}
                            </Link>
                        </li>
                    </ul>
                )}
            </div>
        </>
    );
};

export default Navigation;