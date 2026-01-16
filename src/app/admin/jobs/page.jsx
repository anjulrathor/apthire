"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";



export default function AdminJobsPage() {
  const { user, loading } = useAuth();
  const [jobs, setJobs] = useState([]);
  
  useEffect(() => {
    async function fetchJobs() {
        const res = await fetch(`/api/jobs`);
        const data = await res.json();
        if (data.success) {
            setJobs(data.jobs);
        }
    }
    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this job?")) return;
    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setJobs(jobs.filter((j) => j._id !== id));
      } else {
        alert("Failed to delete job");
      }
    } catch (error) {
      console.error(error);
      alert("Error deleting job");
    }
  };

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
                  <button onClick={() => handleDelete(job._id)} className="text-red-400 hover:text-red-300 transition-colors text-sm">Delete</button>
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
