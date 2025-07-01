import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle Dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      {/* Button to Open Dropdown */}
      <button
        onClick={toggleDropdown}
        className="px-4 py-2 bg-blue-700 text-white rounded"
      >
        Admin Menu
      </button>

      {/* Dropdown Content */}
      {isOpen && (
        <div className="absolute mt-2 w-40 bg-white border rounded shadow-lg z-10">
          <ul className="py-2">
            <li>
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) =>
                  `block px-4 py-2 text-gray-700 ${
                    isActive ? "bg-blue-200" : "hover:bg-gray-100"
                  }`
                }
              >
                Admin Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/categorylist"
                className={({ isActive }) =>
                  `block px-4 py-2 text-gray-700 ${
                    isActive ? "bg-gray-200" : "hover:bg-gray-100"
                  }`
                }
              >
                Create Category
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/productlist"
                className={({ isActive }) =>
                  `block px-4 py-2 text-gray-700 ${
                    isActive ? "bg-gray-200" : "hover:bg-gray-100"
                  }`
                }
              >
                Create Product
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/allproductslist"
                className={({ isActive }) =>
                  `block px-4 py-2 text-gray-700 ${
                    isActive ? "bg-gray-200" : "hover:bg-gray-100"
                  }`
                }
              >
                All Porducts
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/userlist"
                className={({ isActive }) =>
                  `block px-4 py-2 text-gray-700 ${
                    isActive ? "bg-gray-200 " : "hover:bg-gray-100"
                  }`
                }
              >
                Manage User
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/orderlist"
                className={({ isActive }) =>
                  `block px-4 py-2 text-gray-700 ${
                    isActive ? "bg-gray-200" : "hover:bg-gray-100"
                  }`
                }
              >
                Manage Order
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminMenu;
