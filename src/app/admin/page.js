"use client";
import React, { useEffect, useState } from "react";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5001';

export default function AdminDashboard() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({ totalUsers: 0, totalJobs: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading) {
        if (!user || user.role !== 'admin') {
            router.push("/"); // Redirect non-admins
        }
    }
  }, [user, authLoading, router]);

  // Fetch stats from our new backend endpoint
  useEffect(() => {
    async function fetchStats() {
      if (!user || user.role !== 'admin') return;

      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE_URL}/api/admin/stats`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        if (res.ok) {
           const data = await res.json();
           if(data.success) {
               setStats(data.stats);
           }
        }
      } catch (error) {
        console.error("Failed to fetch stats", error);
      } finally {
        setLoading(false);
      }
    }
    
    if (!authLoading && user?.role === 'admin') {
        fetchStats();
    }
  }, [user, authLoading]);

  if (authLoading || loading) {
      return <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <div>
      <header className="mb-8">
         <h2 className="text-3xl font-bold">Dashboard Overview</h2>
         <p className="text-gray-400 mt-2">Welcome back, Admin.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
         {/* Total Users */}
         <div className="bg-[#0f0f0f] border border-white/10 p-6 rounded-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full -mr-10 -mt-10 blur-2xl group-hover:bg-emerald-500/20 transition-all"></div>
            <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider">Total Users</h3>
            <p className="text-4xl font-bold mt-2 text-white">{loading ? "-" : stats?.totalUsers || 0}</p>
         </div>

         {/* Total Jobs */}
         <div className="bg-[#0f0f0f] border border-white/10 p-6 rounded-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full -mr-10 -mt-10 blur-2xl group-hover:bg-blue-500/20 transition-all"></div>
            <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider">Active Jobs</h3>
            <p className="text-4xl font-bold mt-2 text-white">{loading ? "-" : stats?.totalJobs || 0}</p>
         </div>

         {/* Recent Activity (Placeholder) */}
         <div className="bg-[#0f0f0f] border border-white/10 p-6 rounded-xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full -mr-10 -mt-10 blur-2xl group-hover:bg-purple-500/20 transition-all"></div>
            <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider">System Status</h3>
            <p className="text-4xl font-bold mt-2 text-emerald-400">Normal</p>
         </div>
      </div>

       <div className="bg-[#0f0f0f] border border-white/10 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
          <div className="flex gap-4">
              <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-sm font-medium transition-colors">
                  Post New Job
              </button>
               <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-md text-sm font-medium transition-colors">
                  Manage Users
              </button>
          </div>
       </div>
    </div>
  );
}
