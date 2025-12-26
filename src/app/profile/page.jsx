"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useToast } from "@/context/ToastContext";
import Avatar from "@/components/ui/Avatar";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5001';

export default function ProfilePage() {
  const { user, login } = useAuth(); // login used here to update context if needed
  const router = useRouter();
  const { success, error: toastError } = useToast();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form State
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

  // Load latest data
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
        
        // Populate form
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
  }, [user, router]); // eslint-disable-line

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateCompleteness = () => {
      let score = 0;
      if (formData.name) score += 20;
      if (formData.headline) score += 20;
      if (formData.location) score += 10;
      if (formData.resumeUrl) score += 30; // High value
      if (formData.skillsStr) score += 20;
      return Math.min(score, 100);
  };

  const completeness = calculateCompleteness();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    // Prepare payload
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

        // Update local context
        login(updatedUser, localStorage.getItem("token"));
        
        success("Profile updated successfully!");
    } catch (err) {
        toastError(err.message);
    } finally {
        setSaving(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center text-white">Loading profile...</div>;

  return (
    <main className="min-h-screen bg-[#0d0d0d] text-white py-12 px-4">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* LEFT: Quick Stats / Avatar */}
        <div className="md:col-span-4 space-y-6">
            <div className="bg-[#111111] border border-white/10 rounded-xl p-6 text-center">
                <div className="flex justify-center mb-4">
                   <Avatar name={formData.name || user?.name} size="xl" />
                </div>
                <h2 className="text-xl font-bold">{formData.name}</h2>
                <p className="text-sm text-gray-400 mt-1">{formData.headline || "No headline added"}</p>
                
                <div className="mt-6 pt-4 border-t border-white/5 text-left">
                   <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">Profile Completeness</span>
                      <span className="text-emerald-400 font-bold">{completeness}%</span>
                   </div>
                   <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                       <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: `${completeness}%` }}></div>
                   </div>
                   {completeness < 100 && (
                       <p className="text-xs text-yellow-500 mt-2">Add a resume & skills to reach 100%</p>
                   )}
                </div>
            </div>
            
            <div className="bg-[#111111] border border-white/10 rounded-xl p-6">
               <h3 className="font-bold text-sm text-gray-400 uppercase mb-4">Your Resume</h3>
               {formData.resumeUrl ? (
                   <a 
                     href={formData.resumeUrl} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="block w-full text-center py-2 rounded-md bg-white/10 hover:bg-white/20 text-white text-sm transition"
                   >
                     View Uploaded Resume
                   </a>
               ) : (
                   <div className="text-center text-sm text-gray-500 py-4 border border-dashed border-white/10 rounded-md">
                       No resume linked
                   </div>
               )}
            </div>
        </div>

        {/* RIGHT: Edit Form */}
        <div className="md:col-span-8">
            <div className="bg-[#111111] border border-white/10 rounded-xl p-6 sm:p-8">
                <h1 className="text-2xl font-head font-bold mb-6">Edit Profile</h1>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Full Name</label>
                            <input 
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              className="w-full bg-[#0d0d0d] border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:border-emerald-500/50 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Phone (Optional)</label>
                            <input 
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              className="w-full bg-[#0d0d0d] border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:border-emerald-500/50 outline-none"
                              placeholder="+91..."
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Professional Headline</label>
                        <input 
                            name="headline"
                            value={formData.headline}
                            onChange={handleChange}
                            className="w-full bg-[#0d0d0d] border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:border-emerald-500/50 outline-none"
                            placeholder="e.g. Senior Frontend Developer | React | Next.js"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Current Location</label>
                        <input 
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full bg-[#0d0d0d] border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:border-emerald-500/50 outline-none"
                            placeholder="e.g. Bangalore, India"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Experience Level</label>
                        <select 
                            name="experienceLevel"
                            value={formData.experienceLevel}
                            onChange={handleChange}
                            className="w-full bg-[#0d0d0d] border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:border-emerald-500/50 outline-none"
                        >
                            <option value="fresher">Fresher</option>
                            <option value="1-3 years">1-3 years</option>
                            <option value="3-5 years">3-5 years</option>
                            <option value="5+ years">5+ years</option>
                        </select>
                    </div>
                    
                    {/* Key Skills */}
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Key Skills</label>
                        <p className="text-xs text-gray-500 mb-2">Comma separated (e.g. React, Node.js, AWS)</p>
                        <input 
                            name="skillsStr"
                            value={formData.skillsStr}
                            onChange={handleChange}
                            className="w-full bg-[#0d0d0d] border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:border-emerald-500/50 outline-none"
                        />
                    </div>

                    {/* Resume Link */}
                    <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                        <label className="block text-xs font-bold text-emerald-400 uppercase mb-1">Resume Link (Google Drive / Dropbox)</label>
                        <input 
                            name="resumeUrl"
                            value={formData.resumeUrl}
                            onChange={handleChange}
                            className="w-full bg-[#0d0d0d] border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:border-emerald-500/50 outline-none"
                            placeholder="https://..."
                        />
                        <p className="text-xs text-gray-500 mt-2">
                           Make sure the link is <strong>Public/Viewable</strong> by anyone with the link.
                        </p>
                    </div>

                    {/* Submit */}
                    <div className="pt-4 border-t border-white/5 flex items-center justify-end gap-4">
                        <button 
                          type="button"
                          onClick={() => router.push("/jobs")}
                          className="text-sm text-gray-400 hover:text-white"
                        >
                          Cancel
                        </button>
                        <button 
                          type="submit"
                          disabled={saving}
                          className="px-6 py-2 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold transition disabled:opacity-50"
                        >
                          {saving ? "Saving..." : "Save Profile"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
      </div>
    </main>
  );
}
