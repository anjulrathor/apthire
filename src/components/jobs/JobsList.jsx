"use client";
import React, { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import JobSkeleton from "./JobSkeleton";
import ProfileSidebar from "../profile/ProfileSidebar";
import PreferencesSidebar from "./PreferencesSidebar";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5001';

export default function JobsList() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");
  const [skillFilter, setSkillFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [visible, setVisible] = useState(6);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applying, setApplying] = useState(false);
  const [coverNote, setCoverNote] = useState("");
  const { success, error: toastError } = useToast();

  useEffect(() => {
    const qParam = searchParams.get('q');
    const locParam = searchParams.get('loc');
    if (qParam) setQ(qParam);
    if (locParam) setLocationFilter(locParam);
  }, [searchParams]);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/jobs`);
        const data = await res.json();
        const jobList = Array.isArray(data) ? data : (data.jobs || []);
        setJobs(jobList);
      } catch (err) {
        setError("Could not load jobs. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  const filtered = useMemo(() => {
    if(!jobs) return [];
    return jobs.filter((job) => {
      const matchQ = !q || job.title.toLowerCase().includes(q.toLowerCase()) || job.company.toLowerCase().includes(q.toLowerCase());
      const matchSkill = !skillFilter || job.skills.some(s => s.toLowerCase().includes(skillFilter.toLowerCase()));
      const matchLoc = !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase());
      return matchQ && matchSkill && matchLoc;
    });
  }, [jobs, q, skillFilter, locationFilter]);

  return (
    <div className="bg-[#0d0d0d] min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-16">
            <h1 className="text-4xl sm:text-6xl font-head font-black text-white mb-4 tracking-[-0.04em] leading-tight">
              Available <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">Opportunities</span>
            </h1>
            <p className="text-gray-400 text-lg font-main max-w-2xl">Find the perfect role that matches your skills in the global startup ecosystem.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebars - Hidden on mobile, visible on large screens */}
          <aside className="hidden lg:block lg:col-span-3 space-y-8">
             <div className="sticky top-24">
                <ProfileSidebar />
                <div className="mt-8">
                    <PreferencesSidebar />
                </div>
             </div>
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-9 space-y-6">
            
            {/* Search & Mobile Filters */}
            <div className="glass p-4 rounded-2xl flex flex-col sm:flex-row gap-4 items-center">
                <div className="relative flex-grow w-full">
                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      placeholder="Search roles, companies, or keywords..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all shadow-inner"
                    />
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                    <select 
                        value={locationFilter}
                        onChange={(e) => setLocationFilter(e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-400 focus:outline-none w-full sm:w-32"
                    >
                        <option value="">Remote</option>
                        <option value="delhi">Delhi</option>
                        <option value="bangalore">Bangalore</option>
                    </select>
                </div>
            </div>

            {/* Job Grid */}
            {loading ? (
               <div className="grid gap-6 sm:grid-cols-2">
                  {[...Array(6)].map((_, i) => <JobSkeleton key={i} />)}
               </div>
            ) : error ? (
                <div className="text-center py-20 glass rounded-2xl border-dashed border-2 border-white/10">
                    <p className="text-red-400 mb-4">{error}</p>
                    <button onClick={() => window.location.reload()} className="text-emerald-500 hover:underline">Try again</button>
                </div>
            ) : filtered.length === 0 ? (
                <div className="text-center py-20 glass rounded-2xl border-dashed border-2 border-white/10">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">No jobs matched your search</h3>
                    <p className="text-gray-400 mb-6">Try adjusting your filters or search query.</p>
                    <button onClick={() => {setQ(""); setLocationFilter(""); setSkillFilter("");}} className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-xl transition font-bold">Clear all filters</button>
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2">
                  <AnimatePresence mode="popLayout">
                    {filtered.slice(0, visible).map((job, index) => (
                      <motion.div 
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                        key={job.id || job._id} 
                        className="glass-card p-6 flex flex-col justify-between group"
                      >
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500 font-bold text-xs uppercase tracking-widest border border-emerald-500/20">
                                    {job.type || "Full-time"}
                                </div>
                                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">Posted 2 days ago</span>
                            </div>
                            
                            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-emerald-500 transition-colors">{job.title}</h3>
                            <p className="text-sm text-gray-400 mb-6 flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                {job.company}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {job.skills.slice(0, 3).map(skill => (
                                    <span key={skill} className="text-[10px] px-2 py-1 bg-white/5 rounded-md text-gray-400 border border-white/5">{skill}</span>
                                ))}
                                {job.skills.length > 3 && <span className="text-[10px] text-gray-600">+{job.skills.length - 3} more</span>}
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-6 border-t border-white/5">
                            <div className="text-sm text-white font-bold">
                                {job.salary || "Competitive"}
                            </div>
                            <button 
                                onClick={() => setSelectedJob(job)}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
                            >
                                Fast Apply
                            </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
            )}

            {visible < filtered.length && (
                <div className="flex justify-center pt-10">
                    <button
                        onClick={() => setVisible((v) => v + 6)}
                        className="glass px-8 py-3 rounded-xl text-sm font-bold text-white hover:bg-white/10 transition-all border border-white/10"
                    >
                        Load more opportunities
                    </button>
                </div>
            )}
          </main>
        </div>
      </div>

      {/* Apply Modal */}
      <AnimatePresence>
        {selectedJob && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            >
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9, y: 20 }}
                 animate={{ opacity: 1, scale: 1, y: 0 }}
                 exit={{ opacity: 0, scale: 0.9, y: 20 }}
                 className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl"
               >
                   <div className="p-8 pb-4 relative">
                        <button 
                            onClick={() => setSelectedJob(null)} 
                            className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 transition"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                        <h2 className="text-2xl font-bold font-head text-white mb-1">Apply for {selectedJob.title}</h2>
                        <p className="text-emerald-500 text-sm font-bold mb-8">at {selectedJob.company}</p>
                        
                        <div className="space-y-6">
                            <div className="glass p-4 rounded-xl border-emerald-500/20">
                                <p className="text-xs text-gray-500 font-bold uppercase mb-2">Authenticated as</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">{user?.name?.charAt(0) || "U"}</div>
                                    <div>
                                        <p className="text-sm font-bold text-white">{user?.name || "Guest User"}</p>
                                        <p className="text-xs text-gray-500">{user?.email}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest">Cover Note (Optional)</label>
                                <textarea 
                                    rows={4}
                                    value={coverNote}
                                    onChange={(e) => setCoverNote(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all placeholder:text-gray-700"
                                    placeholder="Briefly explain why you're a good fit..."
                                />
                            </div>
                        </div>
                   </div>

                   <div className="p-8 pt-4">
                        <button
                          disabled={applying}
                          onClick={async () => {
                              if(!user) return window.location.href = '/login';
                              setApplying(true);
                              try {
                                  const res = await fetch(`${API_BASE_URL}/api/applications`, {
                                      method: "POST",
                                      headers: {
                                          "Content-Type": "application/json",
                                          "Authorization": `Bearer ${localStorage.getItem("token")}`
                                      },
                                      body: JSON.stringify({ jobId: selectedJob._id, coverNote })
                                  });
                                  const data = await res.json();
                                  if(!res.ok) throw new Error(data.message);
                                  success("Application submitted successfully!");
                                  setSelectedJob(null);
                              } catch(err) {
                                  toastError(err.message || "Something went wrong. Please try again.");
                              } finally {
                                  setApplying(false);
                              }
                          }}
                          className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition shadow-lg shadow-emerald-500/20 disabled:opacity-50 active:scale-[0.98]"
                        >
                            {applying ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                    Processing...
                                </span>
                            ) : "Confirm Application"}
                        </button>
                        <p className="mt-4 text-center text-[10px] text-gray-600 uppercase tracking-tighter">Your profile and resume will be shared with the recruiter.</p>
                   </div>
               </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
