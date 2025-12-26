"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import Avatar from "./Avatar";
import { useToast } from "@/context/ToastContext";
import { motion, AnimatePresence } from "framer-motion";

export default function UserMenu() {
  const { user, logout } = useAuth();
  const { success } = useToast();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 hover:bg-white/5 p-1.5 rounded-full transition-colors border border-transparent hover:border-white/10"
      >
        <div className="text-right hidden md:block">
            <p className="text-xs text-gray-400 font-main">Welcome,</p>
            <p className="text-sm font-medium text-white font-head leading-none">{user.name.split(' ')[0]}</p>
        </div>
        <Avatar name={user.name} size="md" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className="absolute right-0 mt-2 w-56 bg-[#0f0f0f] border border-white/10 rounded-xl shadow-2xl py-2 z-50 overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-white/5 mb-2">
                <p className="text-sm font-bold text-white truncate">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>

            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
            >
              Dashboard
            </Link>
            
            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
            >
              Profile
            </Link>

            {user.role === 'admin' && (
                 <Link
                 href="/admin"
                 onClick={() => setOpen(false)}
                 className="block px-4 py-2 text-sm text-purple-400 hover:bg-purple-500/10 transition-colors"
               >
                 Admin Panel
               </Link>
            )}

            <div className="h-px bg-white/5 my-2"></div>

            <button
              onClick={() => {
                setOpen(false);
                success("Logged out successfully");
                logout();
              }}
              className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
            >
              Log Out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
