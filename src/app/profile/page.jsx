"use client";
import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <div className="min-h-screen bg-[#0d0d0d]" />;
  }

  return (
    <main className="min-h-screen bg-[#0d0d0d] text-white py-16 px-4">
      <div className="max-w-2xl mx-auto bg-[#111111] border border-white/10 rounded-xl p-8">
        <h1 className="text-2xl font-bold mb-6 border-b border-white/10 pb-4">My Profile</h1>
        
        <div className="space-y-6">
           {/* Avatar Placeholder */}
           <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-emerald-600 flex items-center justify-center text-2xl font-bold text-white">
                  {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                  <h2 className="text-xl font-semibold">{user.name}</h2>
                  <p className="text-gray-400 text-sm">{user.email}</p>
              </div>
           </div>

           {/* Details Grid */}
           <div className="grid grid-cols-1 gap-4 mt-6">
               <div className="p-4 bg-white/5 rounded-lg">
                   <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">User ID</label>
                   <p className="font-mono text-sm text-gray-300">{user._id}</p>
               </div>
               
               <div className="p-4 bg-white/5 rounded-lg">
                   <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Role</label>
                   <p className="capitalize text-emerald-400 font-medium">{user.role}</p>
               </div>
           </div>
        </div>
      </div>
    </main>
  );
}
