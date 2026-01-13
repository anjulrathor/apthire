"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useToast } from "@/context/ToastContext";
import { motion } from "framer-motion";
import Avatar from "@/components/ui/Avatar";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5001';

export default function ProfilePage() {
  const { user, login } = useAuth();
  const router = useRouter();
  const { success, error: toastError } = useToast();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    headline: "",
    location: "",
    phone: "",
    resumeUrl: "",
    skillsStr: "", 
    summary: "",
    experienceLevel: "fresher"
  });

  useEffect(() => {
    if (!user) {
        if (!loading) router.push("/login");
        return;
    }

    if (user.role === "admin") {
        router.push("/admin");
        return;
    }

    async function fetchProfile() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/users/me`, {
           headers: {
             Authorization: `Bearer ${localStorage.getItem("token")}`
           }
        });
        const data = await res.json();
        
        setFormData({
            name: data.name || "",
            headline: data.profile?.headline || "",
            location: data.profile?.location || "",
            phone: data.profile?.phone || "",
            resumeUrl: data.profile?.resumeUrl || "",
            skillsStr: data.profile?.skills ? data.profile.skills.join(", ") : "",
            summary: data.profile?.summary || "",
            experienceLevel: data.profile?.experienceLevel || "fresher"
        });
        setLoading(false);
      } catch (err) {
        toastError("Failed to load profile data");
        setLoading(false);
      }
    }

    fetchProfile();
  }, [user, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateCompleteness = () => {
      let score = 0;
      if (formData.name) score += 20;
      if (formData.headline) score += 20;
      if (formData.location) score += 10;
      if (formData.resumeUrl) score += 30;
      if (formData.skillsStr) score += 20;
      return Math.min(score, 100);
  };

  const completeness = calculateCompleteness();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    const payload = {
       name: formData.name,
       profile: {
          headline: formData.headline,
          location: formData.location,
          phone: formData.phone,
          resumeUrl: formData.resumeUrl,
          summary: formData.summary,
          skills: formData.skillsStr.split(",").map(s => s.trim()).filter(Boolean),
          experienceLevel: formData.experienceLevel
       }
    };

    try {
        const res = await fetch(`${API_BASE_URL}/api/users/profile`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(payload)
        });
        
        const updatedUser = await res.json();
        if (!res.ok) throw new Error(updatedUser.message || "Update failed");

        login(updatedUser, localStorage.getItem("token"));
        success("Profile updated successfully!");
    } catch (err) {
        toastError(err.message);
    } finally {
        setSaving(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0d0d0d] flex flex-col items-center justify-center text-white space-y-4">
        <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
        <p className="font-head font-bold uppercase tracking-widest text-xs">Authenticating...</p>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#0d0d0d] pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Sidebar Cards */}
            <motion.aside 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-4 space-y-6"
            >
                <div className="glass p-8 rounded-3xl text-center">
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <Avatar name={formData.name || user?.name} size="xl" />
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center border-4 border-[#111] text-white">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                            </div>
                        </div>
                    </div>
                    <h2 className="text-2xl font-head font-bold text-white mb-2">{formData.name}</h2>
                    <p className="text-gray-400 text-sm mb-8 leading-relaxed">{formData.headline || "Passionate Developer"}</p>
                    
                    <div className="space-y-4 text-left">
                        <div className="flex justify-between items-end mb-1">
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Strength</span>
                            <span className="text-sm font-bold text-emerald-500">{completeness}%</span>
                        </div>
                        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${completeness}%` }}
                                className="h-full bg-emerald-600"
                            />
                        </div>
                        {completeness < 100 && (
                            <p className="text-[10px] text-yellow-500/50 uppercase font-bold text-center tracking-tighter">Complete your profile to unlock more opportunities</p>
                        )}
                    </div>
                </div>

                <div className="glass p-8 rounded-3xl">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Resume Asset</h3>
                    {formData.resumeUrl ? (
                        <div className="space-y-4">
                            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-4">
                                <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                                </div>
                                <div className="text-left overflow-hidden">
                                    <p className="text-sm font-bold text-white truncate">resume_v1.pdf</p>
                                    <p className="text-[10px] text-gray-500 uppercase">External Link</p>
                                </div>
                            </div>
                            <a 
                                href={formData.resumeUrl} 
                                target="_blank" 
                                className="block w-full text-center py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold transition border border-white/10"
                            >
                                View Detailed Resume
                            </a>
                        </div>
                    ) : (
                        <div className="py-10 border-2 border-dashed border-white/10 rounded-3xl text-center">
                            <p className="text-xs text-gray-600 font-bold uppercase">No resume linked</p>
                        </div>
                    )}
                </div>
            </motion.aside>

            {/* Form Section */}
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-8"
            >
                <div className="glass p-8 md:p-12 rounded-[40px]">
                    <h1 className="text-3xl font-head font-bold text-white mb-12">Edit Profile</h1>
                    
                    <form onSubmit={handleSubmit} className="space-y-10">
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Legal Name</label>
                                <input 
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-main"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Contact Phone</label>
                                <input 
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+91..."
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-main"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Professional Headline</label>
                            <input 
                                name="headline"
                                value={formData.headline}
                                onChange={handleChange}
                                placeholder="Student at ABC University | Fullstack Developer"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-main"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Location</label>
                                <input 
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="Noida, India"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-main"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Seniority Level</label>
                                <select 
                                    name="experienceLevel"
                                    value={formData.experienceLevel}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-main appearance-none cursor-pointer"
                                >
                                    <option className="bg-[#111]" value="fresher">Undergraduate / Fresher</option>
                                    <option className="bg-[#111]" value="1-3 years">Junior (1-3 Years)</option>
                                    <option className="bg-[#111]" value="3-5 years">Intermediate (3-5 Years)</option>
                                    <option className="bg-[#111]" value="5+ years">Senior (5+ Years)</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Key Disciplines (Comma Separated)</label>
                            <input 
                                name="skillsStr"
                                value={formData.skillsStr}
                                onChange={handleChange}
                                placeholder="React, Node.js, TypeScript..."
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-main"
                            />
                        </div>

                        <div className="bg-emerald-600/10 border border-emerald-500/20 p-8 rounded-3xl">
                            <label className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-3 block">Primary Resume Link</label>
                            <input 
                                name="resumeUrl"
                                value={formData.resumeUrl}
                                onChange={handleChange}
                                placeholder="https://drive.google.com/..."
                                className="w-full bg-white/5 border border-emerald-500/20 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-main text-sm"
                            />
                            <p className="mt-4 text-[10px] text-emerald-500/60 font-medium uppercase tracking-tighter">Please ensure link sharing is set to "Anyone with the link can view".</p>
                        </div>

                        <div className="flex flex-col md:flex-row items-center justify-end gap-6 pt-10 border-t border-white/5">
                            <button 
                                type="button"
                                onClick={() => router.back()}
                                className="text-xs font-bold text-gray-500 uppercase tracking-widest hover:text-white transition-colors"
                            >
                                Discard Changes
                            </button>
                            <button 
                                type="submit"
                                disabled={saving}
                                className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-12 rounded-2xl transition shadow-lg shadow-emerald-500/20 active:scale-95 disabled:opacity-50"
                            >
                                {saving ? "Syncing Profile..." : "Update Settings"}
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>

        </div>
      </div>
    </main>
  );
}
