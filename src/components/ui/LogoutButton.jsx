"use client";
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { LogOut } from "lucide-react";

export default function LogoutButton({ className = "", showText = true, label = "Log Out" }) {
  const { logout } = useAuth();
  
  const handleLogout = () => {
    if (confirm("Are you sure you want to log out?")) {
      logout();
    }
  };
  
  return (
    <button
      onClick={handleLogout}
      className={`flex items-center gap-2 text-red-400 hover:text-red-300 hover:bg-white/5 px-3 py-2 rounded-lg transition-colors ${className}`}
      title={label}
    >
      <LogOut size={18} />
      {showText && <span className="font-medium text-sm">{label}</span>}
    </button>
  );
}
