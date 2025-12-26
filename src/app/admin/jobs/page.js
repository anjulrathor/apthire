"use client";
import React, { useEffect, useState } from "react";

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      const res = await fetch("/api/jobs");
      const data = await res.json();
      if (data.success) {
        setJobs(data.jobs);
      }
    } catch (error) {
      console.error("Failed to fetch jobs", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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

  return (
    <div className="bg-[#0f0f0f] border border-white/10 rounded-xl overflow-hidden">
      <div className="p-6 border-b border-white/10 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Job Management</h2>
        <span className="text-sm text-gray-400">{jobs.length} Jobs</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="bg-white/5 text-gray-200 uppercase font-medium">
            <tr>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Company</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4">Posted</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {loading ? (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center">Loading...</td>
              </tr>
            ) : jobs.length === 0 ? (
                <tr>
                <td colSpan="5" className="px-6 py-8 text-center">No jobs found</td>
              </tr>
            ) : (
              jobs.map((job) => (
                <tr key={job._id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">
                      <div>{job.title}</div>
                      <div className="text-xs text-gray-500 mt-1">{job.salary}</div>
                  </td>
                  <td className="px-6 py-4">{job.company}</td>
                  <td className="px-6 py-4">{job.location}</td>
                  <td className="px-6 py-4">{new Date(job.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(job._id)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
