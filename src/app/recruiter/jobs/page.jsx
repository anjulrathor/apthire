"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5001';

export default function RecruiterJobsPage() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    if (!user) return;
    
    // Leverage the backend filtering I just implemented/verified
    fetch(`${API_BASE_URL}/api/jobs?postedBy=${user._id}`)
      .then(res => res.json())
      .then(data => {
          setJobs(data.jobs || []);
      })
      .catch(err => console.error(err));
  }, [user]);

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex">
      <aside className="w-64 border-r border-white/10 p-6 hidden md:block">
        <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center font-bold">R</div>
            <h2 className="text-xl font-bold font-head">Recruiter</h2>
        </div>
        <nav className="space-y-2">
            <Link href="/recruiter" className="block px-4 py-2 rounded hover:bg-white/5 text-gray-400 hover:text-white transition">Dashboard</Link>
            <Link href="/recruiter/jobs" className="block px-4 py-2 rounded bg-emerald-600/10 text-emerald-400 font-medium">My Jobs</Link>
            <Link href="/recruiter/applications" className="block px-4 py-2 rounded hover:bg-white/5 text-gray-400 hover:text-white transition">Applications</Link>
        </nav>
      </aside>

      <main className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold">My Jobs</h1>
              <Link href="/recruiter/jobs/new" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md font-bold text-sm">
                  + Post New Job
              </Link>
          </div>

          <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
             <table className="w-full text-left">
                 <thead className="bg-white/5 text-gray-400 text-sm uppercase">
                     <tr>
                         <th className="p-4">Title</th>
                         <th className="p-4">Location</th>
                         <th className="p-4">Posted</th>
                         <th className="p-4 text-right">Actions</th>
                     </tr>
                 </thead>
                 <tbody className="divide-y divide-white/5">
                     {jobs.map(job => (
                         <tr key={job._id} className="hover:bg-white/5">
                             <td className="p-4">{job.title}</td>
                             <td className="p-4 text-gray-400">{job.location}</td>
                             <td className="p-4 text-gray-500 text-sm">{new Date(job.createdAt).toLocaleDateString()}</td>
                             <td className="p-4 text-right">
                                 <button className="text-sm text-emerald-400 hover:underline">View Applicants</button>
                             </td>
                         </tr>
                     ))}
                 </tbody>
             </table>
             {jobs.length === 0 && <div className="p-8 text-center text-gray-500">You haven't posted any jobs yet.</div>}
          </div>
      </main>
    </div>
  );
}
