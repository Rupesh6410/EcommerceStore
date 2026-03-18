import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";

const Modal = ({ isOpen, onClose, title, children, footer }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop with extreme blur and subtle tint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          ></motion.div>

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="w-full max-w-lg glass-card rounded-3xl p-8 relative z-10 mx-4 border border-white/10 shadow-[0_0_50px_-12px_rgba(0,0,0,0.8)]"
          >

            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-card/50 text-gray-400 hover:text-white hover:bg-white/10 transition-colors border border-white/5"
            >
              <IoClose size={20} />
            </button>

            {title && (
              <h2 className="text-2xl font-heading font-bold text-white mb-6 pr-8">
                {title}
              </h2>
            )}


            {/* Body */}
            <div className="text-gray-300">
              {children}
            </div>

            {/* Footer (optional) */}
            {footer && <div className="mt-8 pt-6 border-t border-white/10">{footer}</div>}
            <div className="text-sm text-neutral-700 dark:text-neutral-300">
              {children}
            </div>

            {footer && <div className="mt-6">{footer}</div>}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
