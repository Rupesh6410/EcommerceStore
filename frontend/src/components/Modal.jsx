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
<<<<<<< HEAD
<<<<<<< HEAD
            {/* Top decorative glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-70"></div>

=======
>>>>>>> parent of eb9ef12 (Fix: improve responsiveness)
            {/* Close Button */}
=======
>>>>>>> main
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-neutral-500 hover:text-black dark:hover:text-white text-xl"
            >
              <IoClose />
            </button>

            {title && (
              <h2 className="text-lg font-semibold text-neutral-800 mb-4 dark:text-neutral-100">
                {title}
              </h2>
            )}

<<<<<<< HEAD
            {/* Body */}
            <div className="text-sm text-neutral-700 dark:text-neutral-300">
              {children}
            </div>

            {/* Footer (optional) */}
<<<<<<< HEAD
            {footer && <div className="mt-8 pt-6 border-t border-white/10">{footer}</div>}
=======
            <div className="text-sm text-neutral-700 dark:text-neutral-300">
              {children}
            </div>

            {footer && <div className="mt-6">{footer}</div>}
>>>>>>> main
=======
            {footer && <div className="mt-6">{footer}</div>}
>>>>>>> parent of eb9ef12 (Fix: improve responsiveness)
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
