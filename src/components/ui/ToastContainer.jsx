"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const toastTypes = {
  success: { bg: "bg-emerald-900/90", border: "border-emerald-500/50", icon: "CheckCircle" },
  error: { bg: "bg-red-900/90", border: "border-red-500/50", icon: "XCircle" },
  info: { bg: "bg-gray-800/90", border: "border-gray-600/50", icon: "Info" },
};

export default function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} removeToast={removeToast} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastItem({ toast, removeToast }) {
  const style = toastTypes[toast.type] || toastTypes.info;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      layout
      className={`pointer-events-auto min-w-[300px] max-w-sm rounded-lg border ${style.bg} ${style.border} p-4 shadow-xl backdrop-blur-sm`}
    >
      <div className="flex items-start gap-3">
        {/* Icon Placeholder - Simple SVGs */}
        <div className="flex-shrink-0 mt-0.5">
           {toast.type === 'success' && <CheckIcon className="w-5 h-5 text-emerald-400" />}
           {toast.type === 'error' && <XIcon className="w-5 h-5 text-red-400" />}
           {toast.type === 'info' && <InfoIcon className="w-5 h-5 text-blue-400" />}
        </div>
        
        <div className="flex-1">
          <p className="text-sm font-medium text-white">{toast.message}</p>
        </div>

        <button
          onClick={() => removeToast(toast.id)}
          className="text-gray-400 hover:text-white transition"
        >
          <XIcon className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

// Simple Icons
const CheckIcon = (props) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const XIcon = (props) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const InfoIcon = (props) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
