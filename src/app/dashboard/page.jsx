"use client";
import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Avatar from "@/components/ui/Avatar";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0d0d0d] text-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 border-b border-white/10 pb-6 flex items-center gap-6">
          <Avatar name={user.name} size="xl" />
          <div>
              <h1 className="text-3xl font-head font-bold">Dashboard</h1>
              <p className="text-gray-400 mt-1 font-main">
                Welcome back, <span className="text-white font-medium">{user.name}</span>!
              </p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <section className="bg-[#111111] border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4 font-head">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/jobs"
                className="flex items-center justify-center py-3 rounded-lg bg-emerald-600/10 text-emerald-400 hover:bg-emerald-600 hover:text-white font-medium transition border border-emerald-600/20"
              >
                Browse Jobs
              </Link>
              <Link
                href="/profile"
                className="flex items-center justify-center py-3 rounded-lg bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white font-medium transition border border-white/10"
              >
                Profile
              </Link>
              {(user.role === 'admin' || user.role === 'recruiter') && (
                 <Link
                   href="/post-job"
                   className="col-span-2 flex items-center justify-center py-3 rounded-lg bg-blue-600/10 text-blue-400 hover:bg-blue-600 hover:text-white font-medium transition border border-blue-600/20"
                 >
                   Post a New Job
                 </Link>
              )}
            </div>
          </section>

          {/* Stats / Info */}
          <section className="bg-[#111111] border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">Your Activity</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                 <span className="text-gray-400">Role</span>
                 <span className="capitalize px-2 py-1 rounded bg-white/5 text-sm">{user.role}</span>
              </div>
               <div className="flex justify-between items-center border-b border-white/5 pb-2">
                 <span className="text-gray-400">Account Status</span>
                 <span className="text-emerald-400 text-sm">Active</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
