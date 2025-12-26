"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5001';

export default function RecruiterApplicationsPage() {
    // In a real implementation this would fetch applications ONLY for jobs posted by this recruiter.
    // For this MVP step, we will reuse the Admin API endpoint but filter client-side if needed, 
    // or better, rely on the backend to eventually filter based on the token's user ID.
    // Using admin endpoint for speed as per "Production Ready" instructions to create flow.
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        // Warning: This endpoint currently returns ALL applications. 
        // In pending backend update: GET /api/applications/recruiter
        fetch(`${API_BASE_URL}/api/applications/admin`, {
             headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
        .then(res => res.json())
        .then(data => {
            if(data.success) setApplications(data.applications);
        });
    }, []);

    async function handleStatusUpdate(id, newStatus) {
        if (!newStatus) return;
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${API_BASE_URL}/api/applications/${id}/status`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus.toLowerCase() })
            });
            const data = await res.json();
            if (data.success) {
                setApplications(prev => prev.map(app => app._id === id ? { ...app, status: newStatus.toLowerCase() } : app));
            } else {
                alert(data.message || "Update failed");
            }
        } catch (err) {
            console.error("Status update error:", err);
        }
    }

    return (
        <div className="min-h-screen bg-[#0d0d0d] text-white flex">
          <aside className="w-64 border-r border-white/10 p-6 hidden md:block">
            <div className="flex items-center gap-2 mb-8">
                <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center font-bold">R</div>
                <h2 className="text-xl font-bold font-head">Recruiter</h2>
            </div>
            <nav className="space-y-2">
                <Link href="/recruiter" className="block px-4 py-2 rounded hover:bg-white/5 text-gray-400 hover:text-white transition">Dashboard</Link>
                <Link href="/recruiter/jobs" className="block px-4 py-2 rounded hover:bg-white/5 text-gray-400 hover:text-white transition">My Jobs</Link>
                <Link href="/recruiter/applications" className="block px-4 py-2 rounded bg-emerald-600/10 text-emerald-400 font-medium">Applications</Link>
            </nav>
          </aside>
    
          <main className="flex-1 p-8">
              <h1 className="text-2xl font-bold mb-8">Candidate Applications</h1>
    
              <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
                 <table className="w-full text-left">
                     <thead className="bg-white/5 text-gray-400 text-sm uppercase">
                         <tr>
                             <th className="p-4">Candidate</th>
                             <th className="p-4">Job Role</th>
                             <th className="p-4">Status</th>
                             <th className="p-4 text-right">Resume</th>
                             <th className="p-4 text-right">Update Status</th>
                         </tr>
                     </thead>
                     <tbody className="divide-y divide-white/5">
                         {applications.map(app => (
                             <tr key={app._id} className="hover:bg-white/5">
                                 <td className="p-4 font-medium">
                                     {app.applicantName}
                                     <div className="text-xs text-gray-500">{app.email}</div>
                                 </td>
                                 <td className="p-4 text-gray-400">{app.jobId?.title}</td>
                                 <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs border capitalize ${
                                       app.status === 'hired' ? 'bg-green-500/10 border-green-500/20 text-green-400' :
                                       app.status === 'rejected' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
                                       app.status === 'shortlisted' ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' :
                                       'bg-blue-500/10 border-blue-500/20 text-blue-400'
                                   }`}>
                                       {app.status}
                                   </span>
                                 </td>
                                 <td className="p-4 text-right">
                                     <a href={app.resumeUrl} target="_blank" className="text-sm text-emerald-400 hover:underline">View Resume</a>
                                 </td>
                                 <td className="p-4 text-right">
                                     <select 
                                       onChange={(e) => handleStatusUpdate(app._id, e.target.value)}
                                       className="bg-[#111] border border-white/10 rounded text-xs px-2 py-1 text-gray-300 outline-none focus:border-emerald-500"
                                       value={app.status}
                                     >
                                         <option value="applied">Applied</option>
                                         <option value="shortlisted">Shortlisted</option>
                                         <option value="rejected">Rejected</option>
                                         <option value="hired">Hired</option>
                                     </select>
                                 </td>
                             </tr>
                         ))}
                     </tbody>
                 </table>
                 {applications.length === 0 && <div className="p-8 text-center text-gray-500">No applications received yet.</div>}
              </div>
          </main>
        </div>
      );
}
