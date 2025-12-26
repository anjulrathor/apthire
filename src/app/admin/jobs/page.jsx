"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5001';

export default function AdminJobsPage() {
  const { user, loading } = useAuth();
  const [jobs, setJobs] = useState([]);
  
  useEffect(() => {
    async function fetchJobs() {
        const res = await fetch(`${API_BASE_URL}/api/jobs`);
        const data = await res.json();
        if (data.success) {
            setJobs(data.jobs); // Note: Current controller returns { count, jobs: [] }
        }
    }
    fetchJobs();
  }, []);

  if (loading) return null;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Manage Jobs</h1>
        <Link href="/admin/jobs/new" className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md font-bold transition">
          + Post New Job
        </Link>
      </div>

      <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="p-4 font-bold text-sm text-gray-400">Title</th>
              <th className="p-4 font-bold text-sm text-gray-400">Company</th>
              <th className="p-4 font-bold text-sm text-gray-400">Location</th>
              <th className="p-4 font-bold text-sm text-gray-400">Posted</th>
              <th className="p-4 font-bold text-sm text-gray-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map(job => (
              <tr key={job._id} className="border-b border-white/5 hover:bg-white/5 transition">
                <td className="p-4 font-medium text-white">{job.title}</td>
                <td className="p-4 text-gray-400">{job.company}</td>
                <td className="p-4 text-gray-400">{job.location}</td>
                <td className="p-4 text-gray-400 text-sm">
                  {new Date(job.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4 text-right space-x-2">
                  <button className="text-blue-400 hover:underline text-sm">Edit</button>
                  <button className="text-red-400 hover:underline text-sm">Close</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {jobs.length === 0 && <div className="p-8 text-center text-gray-500">No jobs posted yet.</div>}
      </div>
    </div>
  );
}
