"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';
import { Users, Briefcase, FileText, CheckCircle } from "lucide-react";
import LogoutButton from "@/components/ui/LogoutButton";

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({
      totalUsers: 0,
      totalJobs: 0,
      totalApplications: 0,
      totalHired: 0,
      roleStats: { admin: 0, recruiter: 0, candidate: 0 },
      applicationTrends: [],
      jobTrends: []
  });
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
        router.push("/login");
        return;
    }

    if (user?.role === 'admin') {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch(`/api/admin/stats`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                if (data.success) {
                    setStats(data.stats);
                }
            } catch (err) {
                console.error("Failed to fetch dashboard stats", err);
            } finally {
                setFetching(false);
            }
        };
        fetchStats();
    }
  }, [user, loading, router]);

  if (loading || fetching || !user) return <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center text-white font-head">Loading Admin Analytics...</div>;

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold font-head">Dashboard Overview</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400 font-main">{user.email}</span>
          <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center font-bold font-head">A</div>
          <LogoutButton showText={false} className="bg-white/5 border border-white/10" />
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard icon={<Users size={20} />} title="Total Users" value={stats.totalUsers} color="bg-blue-500/10 text-blue-400" />
        <StatCard icon={<Briefcase size={20} />} title="Active Jobs" value={stats.totalJobs} color="bg-emerald-500/10 text-emerald-400" />
        <StatCard icon={<FileText size={20} />} title="Applications" value={stats.totalApplications} color="bg-purple-500/10 text-purple-400" />
        <StatCard icon={<CheckCircle size={20} />} title="Hired" value={stats.totalHired} color="bg-orange-500/10 text-orange-400" />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#111] p-6 rounded-xl border border-white/10 shadow-lg">
          <h3 className="font-bold font-head mb-4 text-gray-300">Application Trends (7d)</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.applicationTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                <XAxis dataKey="name" stroke="#666" fontSize={10} tick={{fill: '#666'}} />
                <YAxis stroke="#666" fontSize={10} tick={{fill: '#666'}} />
                <Tooltip contentStyle={{background: '#000', border: '1px solid #333', borderRadius: '8px'}} />
                <Line type="monotone" dataKey="applications" stroke="#10b981" strokeWidth={3} dot={{r: 4, fill: '#10b981'}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#111] p-6 rounded-xl border border-white/10 shadow-lg">
          <h3 className="font-bold font-head mb-4 text-gray-300">Jobs Posted (30d)</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.jobTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                <XAxis dataKey="name" stroke="#666" fontSize={10} tick={{fill: '#666'}} />
                <YAxis stroke="#666" fontSize={10} tick={{fill: '#666'}} />
                <Tooltip contentStyle={{background: '#000', border: '1px solid #333', borderRadius: '8px'}} />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, color }) {
    return (
        <div className={`p-6 rounded-xl border border-white/5 flex items-center gap-4 ${color}`}>
            <div className="p-3 bg-white/5 rounded-lg">{icon}</div>
            <div>
                <p className="text-sm opacity-80 font-main">{title}</p>
                <h4 className="text-2xl font-bold text-white font-head">{value}</h4>
            </div>
        </div>
    )
}
