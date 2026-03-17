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
<<<<<<< HEAD
    const [showSidebar, setShowSidebar] = useState(false);
<<<<<<< HEAD
    const location = useLocation();

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    const toggleSidebar = () => setShowSidebar(!showSidebar);
    const closeSidebar = () => setShowSidebar(false);
=======

=======
    const [showSidebar, setShowSidebar] = useState(false); // State to control mobile sidebar visibility

>>>>>>> parent of eb9ef12 (Fix: improve responsiveness)
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

<<<<<<< HEAD
=======
    // Toggle sidebar visibility for mobile
>>>>>>> parent of eb9ef12 (Fix: improve responsiveness)
    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

<<<<<<< HEAD
    const closeSidebar = () => {
        setShowSidebar(false);
    };
>>>>>>> main
=======
    // Close sidebar (e.g., when clicking outside or navigating)
    const closeSidebar = () => {
        setShowSidebar(false);
    };
>>>>>>> parent of eb9ef12 (Fix: improve responsiveness)

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
<<<<<<< HEAD
<<<<<<< HEAD
            {/* Mobile Header */}
            <div className="lg:hidden flex items-center justify-between p-4 bg-background/90 backdrop-blur-lg text-white fixed top-0 left-0 w-full z-[100] border-b border-white/5 shadow-md">
                <Link to="/" className="text-2xl font-heading font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
=======
=======
            {/* Hamburger menu for mobile */}
>>>>>>> parent of eb9ef12 (Fix: improve responsiveness)
            <div className="xl:hidden lg:hidden md:flex sm:flex flex-row items-center justify-between p-4 bg-[#000] text-white fixed top-0 left-0 w-full z-[10000]">
                <button onClick={toggleSidebar} className="text-white focus:outline-none">
                    {showSidebar ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
                <Link to="/" className="text-xl font-bold">
<<<<<<< HEAD
>>>>>>> main
=======
>>>>>>> parent of eb9ef12 (Fix: improve responsiveness)
                    E-Shop
                </Link>
            </div>

<<<<<<< HEAD
<<<<<<< HEAD
            {/* Mobile Overlay */}
=======
>>>>>>> main
=======
            {/* Overlay when sidebar is open on mobile */}
>>>>>>> parent of eb9ef12 (Fix: improve responsiveness)
            {showSidebar && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-[9998] xl:hidden lg:hidden md:block sm:block"
                    onClick={closeSidebar}
                ></div>
            )}

<<<<<<< HEAD
<<<<<<< HEAD
            {/* Main Navigation Sidebar */}
            <div
=======
            <div
                style={{ zIndex: 9999 }}
>>>>>>> main
=======
            {/* Main Navigation Container */}
            <div
                style={{ zIndex: 9999 }}
                // Dynamically apply 'sidebar-open' class based on state
>>>>>>> parent of eb9ef12 (Fix: improve responsiveness)
                className={`
                    ${showSidebar ? "sidebar-open" : "hidden"} 
                    xl:flex lg:flex md:hidden sm:hidden 
                    flex-col justify-between p-4 text-white bg-[#000] 
                    w-[4%] hover:w-[15%] h-[100vh] fixed
                `}
                id="navigation-container"
            >
<<<<<<< HEAD
<<<<<<< HEAD
                <div className="flex flex-col space-y-3 mt-16 lg:mt-2">
                    <Link to="/" className="hidden lg:flex items-center justify-center lg:justify-start py-4 px-2 mb-4">
                        <div className="brand-icon w-[40px] h-[40px] rounded-xl bg-gradient-to-tr from-primary to-secondary flex-shrink-0 shadow-lg shadow-primary/30 mr-4"></div>
                        <span className="text-2xl font-heading font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent nav-brand whitespace-nowrap overflow-hidden transition-all duration-300 opacity-0 lg:group-hover:opacity-100">
                            E-Shop
                        </span>
=======
                <div className="flex flex-col justify-center space-y-4 mt-[3rem] ">
                    {/* The mt-[3rem] was causing issues on mobile, moved it to the parent div or consider removing/adjusting */}
                    <Link
                        to="/"
                        className="flex items-center transition-transform transform hover:translate-x-2"
                        onClick={closeSidebar} // Close sidebar on navigation
                    >
                        <AiOutlineHome className="mr-2" size={20} />
                        <span className="nav-item-name">HOME</span>{" "}
>>>>>>> parent of eb9ef12 (Fix: improve responsiveness)
                    </Link>

                    <Link
                        to="/shop"
                        className="flex items-center transition-transform transform hover:translate-x-2"
                        onClick={closeSidebar}
                    >
                        <AiOutlineShopping className="mr-2" size={20} />
                        <span className="nav-item-name">SHOP</span>{" "}
                    </Link>

<<<<<<< HEAD
                    <Link to="/shop" className={navLinkClass("/shop")} onClick={closeSidebar}>
                        <AiOutlineShopping className="flex-shrink-0 mx-auto lg:mx-0" size={26} />
                        <span className="nav-item-name ml-4 font-medium whitespace-nowrap overflow-hidden hidden lg:block">SHOP</span>
                    </Link>

                    <Link to="/cart" className={`${navLinkClass("/cart")} relative`} onClick={closeSidebar}>
                        <div className="relative flex items-center justify-center lg:justify-start w-full">
                            <AiOutlineShoppingCart className="flex-shrink-0 mx-auto lg:mx-0" size={26} />
                            {cartItems.length > 0 && (
                                <span className="absolute -top-2 -right-1 lg:left-5 lg:top-[-8px] bg-secondary text-white text-[10px] font-bold px-[6px] py-[2px] rounded-full animate-pulse-slow shadow-lg shadow-secondary/50">
=======
                <div className="flex flex-col justify-center space-y-4 mt-[3rem] ">
                    <Link
                        to="/"
                        className="flex items-center transition-transform transform hover:translate-x-2"
                        onClick={closeSidebar}
                    >
                        <AiOutlineHome className="mr-2" size={20} />
                        <span className="nav-item-name">HOME</span>
                    </Link>

                    <Link
                        to="/shop"
                        className="flex items-center transition-transform transform hover:translate-x-2"
                        onClick={closeSidebar}
                    >
                        <AiOutlineShopping className="mr-2" size={20} />
                        <span className="nav-item-name">SHOP</span>
                    </Link>

                    <Link
                        to="/cart"
                        className="flex items-center transition-transform transform hover:translate-x-2"
                        onClick={closeSidebar}
                    >
                        <div className="relative mr-2">
                            <AiOutlineShoppingCart size={20} />
                            {cartItems.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-[10px] font-medium px-1.5 py-0.5 rounded-full">
>>>>>>> main
                                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                                </span>
                            )}
                        </div>
<<<<<<< HEAD
                        <span className="nav-item-name ml-4 font-medium whitespace-nowrap overflow-hidden hidden lg:block">CART</span>
=======
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
>>>>>>> parent of eb9ef12 (Fix: improve responsiveness)
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

<<<<<<< HEAD
                <div className="flex flex-col space-y-2 mb-4 lg:mb-0">
                    {userInfo ? (
                        <div className="relative rounded-xl bg-navTheme/30 hover:bg-navTheme/80 transition-colors p-2">
                            <button onClick={toggleDropdown} className="w-full flex items-center justify-center lg:justify-start py-2 px-1 text-white hover:text-primary transition-colors focus:outline-none">
                                <div className="w-[40px] h-[40px] rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center flex-shrink-0 uppercase font-bold text-[16px] shadow-lg shadow-primary/20">
                                    {userInfo.username.charAt(0)}
                                </div>
                                <span className="nav-item-name ml-3 font-medium whitespace-nowrap overflow-hidden capitalize hidden lg:block">{userInfo.username}</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`nav-item-name h-5 w-5 ml-auto transition-transform duration-300 hidden lg:block ${dropdownOpen ? "rotate-180" : ""}`}
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
=======
                        <span className="nav-item-name">CART</span>
                    </Link>

                    <Link
                        to="/favorite"
                        className="flex items-center transition-transform transform hover:translate-x-2"
                        onClick={closeSidebar}
                    >
                        <div className="relative mr-2">
                            <FaHeart size={20} />
                            <FavoriteCounts />
                        </div>
                        <span className="nav-item-name">FAVORITE</span>
                    </Link>
                </div>

                <div className="relative mb-4">
=======
                <div className="relative mb-4"> {/* Added mb-4 for some bottom margin */}
>>>>>>> parent of eb9ef12 (Fix: improve responsiveness)
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
<<<<<<< HEAD
                            )}
                            <li>
                                <Link
                                    to="/profile"
                                    className="block px-4 py-2 hover:bg-gray-700 hover:text-white"
                                    onClick={closeSidebar}
>>>>>>> main
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                                </svg>
                            </button>

                            {dropdownOpen && (
                                <div className={`
                                    absolute left-4 lg:left-full bottom-full lg:bottom-0 mb-2 lg:mb-0 lg:ml-4 w-48 
                                    bg-card/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl py-2
                                    animate-fade-in z-[101]
                                `}>
                                    {userInfo.isAdmin && (
                                        <>
                                            <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Admin Space</div>
                                            <Link to="/admin/dashboard" className="block px-4 py-2 text-sm text-gray-300 hover:bg-navTheme hover:text-primary transition-colors" onClick={() => { closeSidebar(); setDropdownOpen(false); }}>Dashboard</Link>
                                            <Link to="/admin/productlist" className="block px-4 py-2 text-sm text-gray-300 hover:bg-navTheme hover:text-primary transition-colors" onClick={() => { closeSidebar(); setDropdownOpen(false); }}>Products</Link>
                                            <Link to="/admin/categorylist" className="block px-4 py-2 text-sm text-gray-300 hover:bg-navTheme hover:text-primary transition-colors" onClick={() => { closeSidebar(); setDropdownOpen(false); }}>Category</Link>
                                            <Link to="/admin/orderlist" className="block px-4 py-2 text-sm text-gray-300 hover:bg-navTheme hover:text-primary transition-colors" onClick={() => { closeSidebar(); setDropdownOpen(false); }}>Orders</Link>
                                            <Link to="/admin/userlist" className="block px-4 py-2 text-sm text-gray-300 hover:bg-navTheme hover:text-primary transition-colors" onClick={() => { closeSidebar(); setDropdownOpen(false); }}>Users</Link>
                                            <div className="border-t border-white/5 my-2"></div>
                                        </>
                                    )}
                                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-navTheme hover:text-white transition-colors" onClick={() => { closeSidebar(); setDropdownOpen(false); }}>Profile</Link>
                                    <button onClick={logoutHandler} className="w-full text-left block px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors">Logout</button>
                                </div>
=======
>>>>>>> parent of eb9ef12 (Fix: improve responsiveness)
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
<<<<<<< HEAD
<<<<<<< HEAD
=======

                {!userInfo && (
                    <ul className="mb-4">
=======

                {!userInfo && (
                    <ul className="mb-4"> {/* Added mb-4 for some bottom margin */}
>>>>>>> parent of eb9ef12 (Fix: improve responsiveness)
                        <li>
                            <Link
                                to="/login"
                                className="flex items-center transition-transform transform hover:translate-x-2"
                                onClick={closeSidebar}
                            >
                                <AiOutlineLogin className="mr-2" size={20} />
<<<<<<< HEAD
                                <span className="nav-item-name">LOGIN</span>
=======
                                <span className="nav-item-name">LOGIN</span>{" "}
>>>>>>> parent of eb9ef12 (Fix: improve responsiveness)
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/register"
                                className="flex items-center transition-transform transform hover:translate-x-2"
                                onClick={closeSidebar}
                            >
                                <AiOutlineUserAdd className="mr-2" size={20} />
<<<<<<< HEAD
                                <span className="nav-item-name">REGISTER</span>
=======
                                <span className="nav-item-name">REGISTER</span>{" "}
>>>>>>> parent of eb9ef12 (Fix: improve responsiveness)
                            </Link>
                        </li>
                    </ul>
                )}
<<<<<<< HEAD
>>>>>>> main
=======
>>>>>>> parent of eb9ef12 (Fix: improve responsiveness)
            </div>
        </>
    );
};

export default Navigation;