"use client";
import React from "react";
import Link from "next/link";
import Avatar from "@/components/ui/Avatar";
import { useAuth } from "@/context/AuthContext";

export default function ProfileSidebar() {
  const { user } = useAuth();
  
  if (!user) return null;

  // Simple completeness logic (mocked for now, implies 50% if basic data exists)
  const completeness = 45; 

  return (
    <div className="hidden lg:block space-y-4">
      {/* Profile Snapshot Card */}
      <div className="bg-[#111111] border border-white/10 rounded-xl overflow-hidden relative">
        {/* Cover Pattern */}
        <div className="h-16 bg-gradient-to-r from-emerald-900/40 to-emerald-600/10"></div>
        
        <div className="px-4 pb-4 text-center -mt-8">
           <div className="flex justify-center">
              <Avatar name={user.name} size="xl" className="border-4 border-[#111111]" />
           </div>
           
           <h3 className="mt-2 font-bold font-head text-white truncate">{user.name}</h3>
           <p className="text-xs text-gray-400 font-main truncate">
              {user.profile?.headline || "Add a headline"}
           </p>

           <div className="mt-4 pt-4 border-t border-white/5 text-left">
              <div className="flex justify-between items-center text-xs mb-1">
                 <span className="text-gray-400">Profile Completeness</span>
                 <span className="text-emerald-400 font-medium">{completeness}%</span>
              </div>
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                 <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${completeness}%` }}></div>
              </div>
              <Link href="/profile" className="block mt-2 text-xs text-blue-400 hover:underline">
                 Update Profile
              </Link>
           </div>
        </div>
      </div>

      {/* Quick Links Card */}
      <div className="bg-[#111111] border border-white/10 rounded-xl p-4">
         <h4 className="font-bold text-sm mb-3">Quick Links</h4>
         <nav className="space-y-1">
             <Link href="/jobs" className="block px-2 py-1.5 text-sm text-emerald-400 bg-emerald-500/10 rounded font-medium">
               Jobs
             </Link>
             <Link href="/profile" className="block px-2 py-1.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded transition">
               My Profile
             </Link>
             <Link href="/dashboard" className="block px-2 py-1.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded transition">
               Dashboard
             </Link>
             <button disabled className="block w-full text-left px-2 py-1.5 text-sm text-gray-600 cursor-not-allowed">
               Applied Jobs (Coming Soon)
             </button>
         </nav>
      </div>
    </div>
  );
}
