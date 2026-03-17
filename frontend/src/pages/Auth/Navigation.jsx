import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
    AiOutlineHome,
    AiOutlineShopping,
    AiOutlineLogin,
    AiOutlineUserAdd,
    AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart, FaBars, FaTimes } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logOut } from "../../redux/features/auth/authSlice";
import FavoriteCounts from "../Products/FavoriteCounts";

import "./Navigation.css";

const Navigation = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.cart);

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
<<<<<<< HEAD
    const location = useLocation();

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    const toggleSidebar = () => setShowSidebar(!showSidebar);
    const closeSidebar = () => setShowSidebar(false);
=======

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    const closeSidebar = () => {
        setShowSidebar(false);
    };
>>>>>>> main

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logOut());
            navigate("/login");
            closeSidebar();
        } catch (err) {
            console.error(err);
        }
    };

    const isActive = (path) => location.pathname === path;

    const navLinkClass = (path) => `
        flex items-center py-3 px-3 rounded-xl transition-all duration-300 group
        ${isActive(path) ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'text-gray-400 hover:bg-navTheme hover:text-white'}
    `;

    return (
        <>
<<<<<<< HEAD
            {/* Mobile Header */}
            <div className="lg:hidden flex items-center justify-between p-4 bg-background/90 backdrop-blur-lg text-white fixed top-0 left-0 w-full z-[100] border-b border-white/5 shadow-md">
                <Link to="/" className="text-2xl font-heading font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
=======
            <div className="xl:hidden lg:hidden md:flex sm:flex flex-row items-center justify-between p-4 bg-[#000] text-white fixed top-0 left-0 w-full z-[10000]">
                <button onClick={toggleSidebar} className="text-white focus:outline-none">
                    {showSidebar ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
                <Link to="/" className="text-xl font-bold">
>>>>>>> main
                    E-Shop
                </Link>
                <button onClick={toggleSidebar} className="text-white hover:text-primary transition-colors focus:outline-none">
                    {showSidebar ? <FaTimes size={26} /> : <FaBars size={26} />}
                </button>
            </div>

<<<<<<< HEAD
            {/* Mobile Overlay */}
=======
>>>>>>> main
            {showSidebar && (
                <div
                    className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[98] lg:hidden transition-opacity duration-300"
                    onClick={closeSidebar}
                ></div>
            )}

<<<<<<< HEAD
            {/* Main Navigation Sidebar */}
            <div
=======
            <div
                style={{ zIndex: 9999 }}
>>>>>>> main
                className={`
                    fixed top-0 left-0 h-[100dvh] z-[99]
                    flex flex-col justify-between py-6 px-3 bg-card/95 backdrop-blur-xl border-r border-white/5 shadow-2xl
                    transition-all duration-300 ease-in-out
                    ${showSidebar ? "translate-x-0 w-72" : "-translate-x-full lg:translate-x-0 lg:w-[84px] lg:hover:w-64"}
                `}
                id="navigation-container"
            >
<<<<<<< HEAD
                <div className="flex flex-col space-y-3 mt-16 lg:mt-2">
                    <Link to="/" className="hidden lg:flex items-center justify-center lg:justify-start py-4 px-2 mb-4">
                        <div className="brand-icon w-[40px] h-[40px] rounded-xl bg-gradient-to-tr from-primary to-secondary flex-shrink-0 shadow-lg shadow-primary/30 mr-4"></div>
                        <span className="text-2xl font-heading font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent nav-brand whitespace-nowrap overflow-hidden transition-all duration-300 opacity-0 lg:group-hover:opacity-100">
                            E-Shop
                        </span>
                    </Link>

                    <Link to="/" className={navLinkClass("/")} onClick={closeSidebar}>
                        <AiOutlineHome className="flex-shrink-0 mx-auto lg:mx-0" size={26} />
                        <span className="nav-item-name ml-4 font-medium whitespace-nowrap overflow-hidden hidden lg:block">HOME</span>
                    </Link>

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
                    </Link>

                    <Link to="/favorite" className={navLinkClass("/favorite")} onClick={closeSidebar}>
                        <div className="relative flex items-center justify-center lg:justify-start w-full">
                            <FaHeart className="flex-shrink-0 text-gray-400 group-hover:text-red-500 transition-colors mx-auto lg:mx-0" size={24} />
                            <div className="absolute -top-1 -right-1 lg:left-4 lg:top-[-6px]">
                                <FavoriteCounts />
                            </div>
                        </div>
                        <span className="nav-item-name ml-4 font-medium whitespace-nowrap overflow-hidden hidden lg:block">FAVORITE</span>
                    </Link>
                </div>

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
                            )}
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <Link to="/login" className={navLinkClass("/login")} onClick={closeSidebar}>
                                <AiOutlineLogin className="flex-shrink-0 mx-auto lg:mx-0" size={26} />
                                <span className="nav-item-name ml-4 font-medium whitespace-nowrap overflow-hidden hidden lg:block">LOGIN</span>
                            </Link>
                            <Link to="/register" className={navLinkClass("/register")} onClick={closeSidebar}>
                                <AiOutlineUserAdd className="flex-shrink-0 mx-auto lg:mx-0" size={26} />
                                <span className="nav-item-name ml-4 font-medium whitespace-nowrap overflow-hidden hidden lg:block">REGISTER</span>
                            </Link>
                        </div>
                    )}
                </div>
<<<<<<< HEAD
=======

                {!userInfo && (
                    <ul className="mb-4">
                        <li>
                            <Link
                                to="/login"
                                className="flex items-center transition-transform transform hover:translate-x-2"
                                onClick={closeSidebar}
                            >
                                <AiOutlineLogin className="mr-2" size={20} />
                                <span className="nav-item-name">LOGIN</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/register"
                                className="flex items-center transition-transform transform hover:translate-x-2"
                                onClick={closeSidebar}
                            >
                                <AiOutlineUserAdd className="mr-2" size={20} />
                                <span className="nav-item-name">REGISTER</span>
                            </Link>
                        </li>
                    </ul>
                )}
>>>>>>> main
            </div>
        </>
    );
};

export default Navigation;