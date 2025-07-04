import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const AdminMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "Admin Dashboard", to: "/admin/dashboard" },
    { label: "Create Category", to: "/admin/categorylist" },
    { label: "Create Product", to: "/admin/productlist" },
    { label: "All Products", to: "/admin/allproductslist" },
    { label: "Manage User", to: "/admin/userlist" },
    { label: "Manage Order", to: "/admin/orderlist" },
  ];

  return (
    <div className="relative inline-block text-left">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 rounded-lg bg-primary text-white font-medium shadow hover:bg-secondary transition duration-200 cursor-pointer"
      >
        Admin Menu
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="absolute mt-2 w-48 rounded-xl bg-white border border-neutral-200 shadow-xl z-50 overflow-hidden"
          >
            <ul className="flex flex-col">
              {menuItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block px-5 py-3 text-sm font-medium transition-colors cursor-pointer ${
                        isActive
                          ? "bg-accent text-white"
                          : "text-neutral-700 hover:bg-neutral-100"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminMenu;
