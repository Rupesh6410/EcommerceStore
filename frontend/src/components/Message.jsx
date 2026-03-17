import React from "react";
import { motion } from "framer-motion";

const Message = ({ children, variant = "info" }) => {
  const getVariantClass = () => {
    switch (variant) {
      case "success":
        return "bg-green-500/10 text-green-400 border-green-500/30";
      case "error":
      case "danger":
        return "bg-red-500/10 text-red-400 border-red-500/30";
      case "warning":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/30";
      default:
        return "bg-primary/10 text-indigo-300 border-primary/30";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
      className={`w-full text-sm md:text-base p-4 rounded-xl glass-card border ${getVariantClass()} flex items-center shadow-lg`}
    >
      <div className="mr-3">
        {variant === "success" && <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>}
        {(variant === "error" || variant === "danger") && <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>}
        {variant === "warning" && <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>}
        {variant === "info" && <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>}
      </div>
      <div className="font-medium">{children}</div>
    </motion.div>
  );
};

export default Message;
