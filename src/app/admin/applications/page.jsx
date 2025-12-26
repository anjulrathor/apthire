"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5001';

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState([]);
  
  useEffect(() => {
    async function fetchApps() {
        const res = await fetch(`${API_BASE_URL}/api/applications/admin`, {
             headers: {
                 Authorization: `Bearer ${localStorage.getItem("token")}`
             }
        });
        const data = await res.json();
        if (data.success) {
            setApplications(data.applications);
        }
    }
    fetchApps();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Manage Applications</h1>

      <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="p-4 font-bold text-sm text-gray-400">Candidate</th>
              <th className="p-4 font-bold text-sm text-gray-400">Position</th>
              <th className="p-4 font-bold text-sm text-gray-400">Status</th>
              <th className="p-4 font-bold text-sm text-gray-400">Date</th>
              <th className="p-4 font-bold text-sm text-gray-400 text-right">Resume</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(app => (
              <tr key={app._id} className="border-b border-white/5 hover:bg-white/5 transition">
                <td className="p-4 font-medium text-white">
                  {app.applicantName}
                  <div className="text-xs text-gray-500">{app.email}</div>
                </td>
                <td className="p-4 text-gray-300">{app.jobId?.title || "Unknown Job"}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs border ${
                    app.status === 'hired' ? 'bg-green-500/10 border-green-500/20 text-green-400' :
                    app.status === 'rejected' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
                    'bg-blue-500/10 border-blue-500/20 text-blue-400'
                  }`}>
                    {app.status}
                  </span>
                </td>
                <td className="p-4 text-gray-400 text-sm">
                  {new Date(app.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4 text-right">
                  <a href={app.resumeUrl} target="_blank" className="text-emerald-400 hover:underline text-sm font-medium">
                    View Resume
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {applications.length === 0 && <div className="p-8 text-center text-gray-500">No applications received yet.</div>}
      </div>
    </div>
  );
}
