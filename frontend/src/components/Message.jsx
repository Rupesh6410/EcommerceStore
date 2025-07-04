import React from "react";
import { motion } from "framer-motion";

const Message = ({ children, variant = "info" }) => {
  const getVariantClass = () => {
    switch (variant) {
      case "success":
        return "bg-green-100 text-green-700 border border-green-300";
      case "error":
        return "bg-red-100 text-red-700 border border-red-300";
      case "warning":
        return "bg-yellow-100 text-yellow-700 border border-yellow-300";
      default:
        return "bg-primary/10 text-primary border border-primary/30";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`w-full text-sm md:text-base p-4 rounded-lg ${getVariantClass()}`}
    >
      {children}
    </motion.div>
  );
};

export default Message;
