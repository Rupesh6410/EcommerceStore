import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";

const Modal = ({ isOpen, onClose, title, children, footer }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.3 }}
            className="w-[90%] max-w-md bg-white rounded-2xl p-6 shadow-xl relative dark:bg-neutral-900"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-neutral-500 hover:text-black dark:hover:text-white text-xl"
            >
              <IoClose />
            </button>

            {/* Title */}
            {title && (
              <h2 className="text-lg font-semibold text-neutral-800 mb-4 dark:text-neutral-100">
                {title}
              </h2>
            )}

            {/* Body */}
            <div className="text-sm text-neutral-700 dark:text-neutral-300">
              {children}
            </div>

            {/* Footer (optional) */}
            {footer && <div className="mt-6">{footer}</div>}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
