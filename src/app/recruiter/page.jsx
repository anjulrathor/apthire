"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Briefcase, FileText, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5001';

export default function RecruiterDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({ jobs: 0, applications: 0, hired: 0, pending: 0 });
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && (!user || user.role !== 'recruiter')) {
        router.push("/login");
        return;
    }
    
    if (user?.role === 'recruiter') {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch(`${API_BASE_URL}/api/admin/stats`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                if (data.success) {
                    setStats({
                        jobs: data.stats.totalJobs,
                        applications: data.stats.totalApplications,
                        hired: data.stats.totalHired,
                        pending: data.stats.totalApplications - data.stats.totalHired
                    });
                }
            } catch (err) {
                console.error("Failed to fetch recruiter stats", err);
            } finally {
                setFetching(false);
            }
        };
        fetchStats();
    }
  }, [user, loading, router]);


  if (loading || fetching || !user) return <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 p-6 hidden md:block">
        <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center font-bold">R</div>
            <h2 className="text-xl font-bold font-head">Recruiter</h2>
        </div>
        <nav className="space-y-2">
            <Link href="/recruiter" className="block px-4 py-2 rounded bg-emerald-600/10 text-emerald-400 font-medium">Dashboard</Link>
            <Link href="/recruiter/jobs" className="block px-4 py-2 rounded hover:bg-white/5 text-gray-400 hover:text-white transition">My Jobs</Link>
            <Link href="/recruiter/applications" className="block px-4 py-2 rounded hover:bg-white/5 text-gray-400 hover:text-white transition">Applications</Link>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8">
          <header className="flex justify-between items-center mb-8">
              <div>
                  <h1 className="text-2xl font-bold">Hello, {user.name}</h1>
                  <p className="text-gray-400 text-sm">Manage your hiring pipeline.</p>
              </div>
              <Link href="/recruiter/jobs/new" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md font-bold text-sm">
                  + Post New Job
              </Link>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="p-6 rounded-xl border border-white/10 bg-[#111] flex items-center gap-4">
                  <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400"><Briefcase size={24}/></div>
                  <div>
                      <p className="text-sm text-gray-400">Active Jobs</p>
                      <h3 className="text-2xl font-bold">{stats.jobs}</h3>
                  </div>
              </div>
              <div className="p-6 rounded-xl border border-white/10 bg-[#111] flex items-center gap-4">
                  <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400"><FileText size={24}/></div>
                  <div>
                      <p className="text-sm text-gray-400">Total Applications</p>
                      <h3 className="text-2xl font-bold">{stats.applications}</h3>
                  </div>
              </div>
              <div className="p-6 rounded-xl border border-white/10 bg-[#111] flex items-center gap-4">
                  <div className="p-3 bg-orange-500/10 rounded-lg text-orange-400"><Clock size={24}/></div>
                  <div>
                      <p className="text-sm text-gray-400">Pending Review</p>
                      <h3 className="text-2xl font-bold">{stats.pending}</h3>
                  </div>
              </div>
          </div>

          <div className="bg-[#111] border border-white/10 rounded-xl p-6">
              <h3 className="font-bold mb-4">Recent Applications</h3>
              <div className="text-center py-8 text-gray-500 text-sm">
                  Go to <Link href="/recruiter/applications" className="text-emerald-400 hover:underline">Applications</Link> to manage candidates.
              </div>
          </div>
      </main>
    </div>
  );
}
