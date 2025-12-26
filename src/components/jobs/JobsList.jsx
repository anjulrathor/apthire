"use client";
import React, { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

/**
 * JobsList.jsx
 * - Drop into /components
 * - Uses Tailwind + your global fonts/colors
 * - Works with sample data; later replace `jobsData` with API data
 */

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
  
  // Apply Modal State
  const [selectedJob, setSelectedJob] = useState(null);
  const [applying, setApplying] = useState(false);
  const [coverNote, setCoverNote] = useState("");
  const { success, error: toastError } = useToast(); // Use toast context for feedback

  // Read URL params and set initial filters
  useEffect(() => {
    const qParam = searchParams.get('q');
    const locParam = searchParams.get('loc');
    const expParam = searchParams.get('exp');
    
    if (qParam) setQ(qParam);
    if (locParam) setLocationFilter(locParam);
    // expParam can be used for experience filtering if needed
  }, [searchParams]);

  // Fetch jobs on mount
  React.useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/jobs`);
        const data = await res.json();
        // Handle both formats (array or object with count)
        const jobList = Array.isArray(data) ? data : (data.jobs || []);
        setJobs(jobList);
      } catch (err) {
        console.error(err);
        setError("Could not load jobs. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  // all skills for quick-filter buttons
  const allSkills = useMemo(() => {
    if(!jobs) return [];
    const s = new Set();
    jobs.forEach((j) => j.skills.forEach((k) => s.add(k)));
    return Array.from(s);
  }, [jobs]);

  // Initialize filters from user profile for "Matching Jobs"
  useEffect(() => {
    if (user && user.role === 'candidate' && user.profile) {
        if (user.profile.skills && user.profile.skills.length > 0) {
            setSkillFilter(user.profile.skills[0]); // Start with first skill
        }
        if (user.profile.location) {
            setLocationFilter(user.profile.location);
        }
    }
  }, [user]);

  const filtered = useMemo(() => {
    if(!jobs) return [];
    return jobs.filter((job) => {
      const matchQ =
        !q ||
        job.title.toLowerCase().includes(q.toLowerCase()) ||
        job.company.toLowerCase().includes(q.toLowerCase());
      
      const matchSkill =
        !skillFilter || job.skills.some(s => s.toLowerCase().includes(skillFilter.toLowerCase()));
      
      const matchLoc = !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase());
      
      // Experience Matching (Simple substring check)
      const userExp = user?.profile?.experienceLevel || ""; 
      const matchExp = !userExp || job.experience.toLowerCase().includes(userExp.toLowerCase()) || userExp === 'experienced';

      return matchQ && matchSkill && matchLoc && matchExp;
    });
  }, [jobs, q, skillFilter, locationFilter, user]);

  return (
    <section className="w-full bg-[#0d0d0d] text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        
        {error && <div className="text-red-400 mb-6">{error}</div>}

        {loading ? (
           <div className="grid gap-4 sm:grid-cols-2">
              {[...Array(6)].map((_, i) => <JobSkeleton key={i} />)}
           </div>
        ) : (
            <>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT: Profile Sidebar (3 cols) */}
          <div className="hidden lg:block lg:col-span-3">
             <ProfileSidebar />
          </div>

          {/* CENTER: Main Content (6 cols) */}
          <div className="col-span-1 lg:col-span-9 xl:col-span-6">
            
            {/* Header + Search */}
            <div className="bg-[#111] border border-white/6 rounded-lg p-4 mb-4">
               <div className="flex gap-2">
                 <input
                   value={q}
                   onChange={(e) => setQ(e.target.value)}
                   placeholder="Search roles or companies..."
                   className="flex-1 bg-[#0f0f0f] border border-white/10 rounded-md px-3 py-2 text-sm outline-none focus:border-emerald-500/50"
                 />
                 <button className="bg-emerald-600 px-4 rounded-md text-sm font-bold">Search</button>
               </div>
               
               {/* Quick Filters */}
               <div className="flex gap-2 mt-3 overflow-x-auto pb-1 no-scrollbar">
                   {["Remote", "Frontend", "Backend", "Full-time"].map(f => (
                       <button key={f} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/5 whitespace-nowrap hover:bg-white/10">
                           {f}
                       </button>
                   ))}
               </div>
            </div>

            {loading ? (
               <div className="space-y-4">
                  {[...Array(4)].map((_, i) => <JobSkeleton key={i} />)}
               </div>
            ) : (
                <div className="space-y-4">
                  {filtered.length === 0 ? (
                    <div className="text-center py-12 bg-[#111111] rounded-xl border border-white/5 border-dashed">
                      <p className="text-gray-400">No jobs found matching your criteria.</p>
                      <button onClick={() => {setQ(""); setSkillFilter(""); setLocationFilter("")}} className="text-emerald-400 text-sm mt-2 hover:underline">Clear filters</button>
                    </div>
                  ) : (
                    filtered.slice(0, visible).map((job) => (
                      <div key={job.id || job._id} className="bg-[#111111] border border-white/6 rounded-lg p-5 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-900/10 transition-all group">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-lg text-white group-hover:text-emerald-400 transition-colors">{job.title}</h3>
                            <p className="text-sm text-gray-400">{job.company}</p>
                          </div>
                          <span className="text-xs bg-white/5 px-2 py-1 rounded text-gray-400 border border-white/5">
                            {job.type || "Full-time"}
                          </span>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-y-2 gap-x-6 text-sm text-gray-400 font-main">
                          <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-600"></span>
                            {job.salary || "Not disclosed"}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-600"></span>
                            {job.location}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-600"></span>
                            {job.experience || "0-2 Yrs"}
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between pt-4 border-t border-white/5">
                          <div className="text-xs text-gray-500">
                             Posted 2 days ago
                          </div>
                          <div className="flex gap-3">
                             {user?.role === 'admin' && (
                               <button 
                                 className="text-red-400 text-sm hover:underline"
                                 onClick={async () => {
                                     if(confirm("Are you sure you want to delete this job?")) {
                                         try {
                                             const res = await fetch(`${API_BASE_URL}/api/jobs/${job.id || job._id}`, {
                                                 method: "DELETE",
                                                 headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                                             });
                                             if(res.ok) {
                                                 setJobs(prev => prev.filter(j => (j.id || j._id) !== (job.id || job._id)));
                                                 success("Job deleted");
                                             } else {
                                                const d = await res.json();
                                                toastError(d.message);
                                             }
                                         } catch(e) { toastError("Delete failed"); }
                                     }
                                 }}
                               >
                                 Delete
                               </button>
                             )}
                             {user?.role !== 'admin' && (
                                <button 
                                  onClick={() => setSelectedJob(job)}
                                  className="text-white text-xs font-bold px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 flex items-center gap-1 transition-all shadow-lg shadow-emerald-900/20"
                                >
                                  ⚡ Fast Apply
                                </button>
                             )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                  
                  {visible < filtered.length && (
                      <button
                        onClick={() => setVisible((v) => v + 5)}
                        className="w-full py-2 rounded-md bg-white/5 text-sm text-gray-400 hover:text-white hover:bg-white/10 transition"
                       >
                        Load more jobs
                      </button>
                  )}
                </div>
            )}
          </div>

          {/* RIGHT: Preferences Sidebar (3 cols) */}
          <div className="hidden xl:block xl:col-span-3">
             <PreferencesSidebar />
          </div>

        </div>
        </>
        )}

        {/* Apply Modal */}
        {selectedJob && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
               <div className="bg-[#111] border border-white/10 rounded-xl w-full max-w-lg p-6 relative">
                   <button onClick={() => setSelectedJob(null)} className="absolute top-4 right-4 text-gray-500 hover:text-white">✕</button>
                   
                   <h2 className="text-xl font-bold font-head mb-1">Apply for {selectedJob.title}</h2>
                   <p className="text-sm text-gray-400 mb-6">at {selectedJob.company}</p>
                   
                   <div className="space-y-4">
                       <div>
                           <label className="block text-sm font-bold text-gray-300 mb-1">Your Resume Link</label>
                           <input 
                             value={user?.profile?.resumeUrl || ""}
                             disabled
                             className="w-full bg-[#0d0d0d] border border-white/10 rounded px-3 py-2 text-gray-500 cursor-not-allowed" 
                           />
                           <p className="text-xs text-gray-500 mt-1">Updates resume from your profile.</p>
                       </div>
                       
                       <div>
                           <label className="block text-sm font-bold text-gray-300 mb-1">Cover Note (Optional)</label>
                           <textarea 
                             rows={4}
                             value={coverNote}
                             onChange={(e) => setCoverNote(e.target.value)}
                             className="w-full bg-[#0d0d0d] border border-white/10 rounded px-3 py-2 text-white outline-none focus:border-emerald-500"
                             placeholder="Why are you a good fit?"
                           />
                       </div>
                       
                       <button
                         disabled={applying}
                         onClick={async () => {
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
                                 
                                 success("Application sent successfully!");
                                 setSelectedJob(null);
                             } catch(err) {
                                 toastError(err.message);
                             } finally {
                                 setApplying(false);
                             }
                         }}
                         className="w-full py-3 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition disabled:opacity-50"
                       >
                           {applying ? "Sending..." : "Submit Application"}
                       </button>
                   </div>
               </div>
            </div>
        )}
      </div>
    </section>
  );
}
