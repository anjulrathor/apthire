"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/context/ToastContext";
import { useAuth } from "@/context/AuthContext";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5001';

export default function NewJobPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { success, error: toastError } = useToast();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
      title: "",
      company: "",
      location: "",
      experience: "fresher", // Default
      salary: "",
      type: "Full-time",
      skills: "",
      description: "",
      requirements: ""
  });

  const handleChange = (e) => {
      setFormData({...formData, [e.target.name]: e.target.value});
  }

  const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);

      try {
          const payload = {
              ...formData,
              skills: formData.skills.split(",").map(s => s.trim()).filter(Boolean)
          };

          const res = await fetch(`${API_BASE_URL}/api/jobs`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${localStorage.getItem("token")}`
              },
              body: JSON.stringify(payload)
          });

          const data = await res.json();
          if (!res.ok) throw new Error(data.message || "Failed to create job");

          success("Job posted successfully!");
          router.push(user?.role === 'admin' ? "/admin/jobs" : "/recruiter/jobs");
      } catch (err) {
          toastError(err.message);
      } finally {
          setLoading(false);
      }
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white p-8">
        <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold font-head mb-6">Post a New Job</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6 bg-[#111] p-8 rounded-xl border border-white/10">
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2">Job Title</label>
                        <input name="title" required onChange={handleChange} className="w-full bg-[#0d0d0d] border border-white/10 rounded px-3 py-2 outline-none focus:border-emerald-500" placeholder="e.g. Senior React Developer" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2">Company Name</label>
                        <input name="company" required onChange={handleChange} className="w-full bg-[#0d0d0d] border border-white/10 rounded px-3 py-2 outline-none focus:border-emerald-500" placeholder="e.g. Google" />
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2">Location</label>
                        <input name="location" required onChange={handleChange} className="w-full bg-[#0d0d0d] border border-white/10 rounded px-3 py-2 outline-none focus:border-emerald-500" placeholder="e.g. Remote / Bangalore" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2">Experience level</label>
                        <select name="experience" onChange={handleChange} className="w-full bg-[#0d0d0d] border border-white/10 rounded px-3 py-2 outline-none focus:border-emerald-500">
                            <option value="fresher">Fresher</option>
                            <option value="1-3 years">1-3 years</option>
                            <option value="3-5 years">3-5 years</option>
                            <option value="5+ years">5+ years</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2">Salary</label>
                        <div className="flex gap-2">
                             <select 
                                name="currency" 
                                className="w-20 bg-[#0d0d0d] border border-white/10 rounded px-2 py-2 outline-none focus:border-emerald-500 text-sm"
                                onChange={(e) => {
                                    const currentVal = formData.salary.replace(/^[^\s]+\s/, '');
                                    setFormData(prev => ({...prev, salary: `${e.target.value} ${currentVal}`}));
                                }}
                             >
                                 <option value="₹">₹ (INR)</option>
                                 <option value="$">$ (USD)</option>
                                 <option value="€">€ (EUR)</option>
                                 <option value="£">£ (GBP)</option>
                             </select>
                             <input 
                                name="salary_amount" 
                                required 
                                onChange={(e) => {
                                    const currency = formData.salary.split(' ')[0] || '₹';
                                    setFormData(prev => ({...prev, salary: `${currency} ${e.target.value}`}));
                                }}
                                className="w-full bg-[#0d0d0d] border border-white/10 rounded px-3 py-2 outline-none focus:border-emerald-500" 
                                placeholder="e.g. 15-25 LPA" 
                             />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2">Employment Type</label>
                        <select name="type" onChange={handleChange} className="w-full bg-[#0d0d0d] border border-white/10 rounded px-3 py-2 outline-none focus:border-emerald-500">
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Contract">Contract</option>
                            <option value="Internship">Internship</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2">Skills (Comma separated)</label>
                        <input name="skills" required onChange={handleChange} className="w-full bg-[#0d0d0d] border border-white/10 rounded px-3 py-2 outline-none focus:border-emerald-500" placeholder="React, Node.js, MongoDB" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2">Job Description</label>
                    <textarea name="description" required rows={5} onChange={handleChange} className="w-full bg-[#0d0d0d] border border-white/10 rounded px-3 py-2 outline-none focus:border-emerald-500" placeholder="Describe the role..." />
                </div>

                <div>
                     <label className="block text-sm font-bold text-gray-400 mb-2">Requirements / Benefits</label>
                     <textarea name="requirements" rows={3} onChange={handleChange} className="w-full bg-[#0d0d0d] border border-white/10 rounded px-3 py-2 outline-none focus:border-emerald-500" placeholder="Bullet points..." />
                </div>

                <div className="flex justify-end gap-4 pt-4">
                    <button type="button" onClick={() => router.back()} className="px-6 py-2 text-gray-400 hover:text-white">Cancel</button>
                    <button type="submit" disabled={loading} className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded shadow-lg shadow-emerald-900/20 disabled:opacity-50">
                        {loading ? "Posting..." : "Post Job"}
                    </button>
                </div>
            </form>
        </div>
    </div>
  );
}
