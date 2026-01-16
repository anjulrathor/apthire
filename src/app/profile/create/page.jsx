"use client";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";
import { Upload, X, Check, Save } from "lucide-react";

export default function ProfileCreatePage() {
  const { user } = useAuth();
  const { success, error: toastError } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    headline: "",
    location: "",
    phone: "",
    experienceLevel: "fresher",
    summary: "",
    skills: "", // Comma separated for input
    linkedin: "",
    github: "",
    portfolio: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.headline || !formData.location) {
      toastError("Headline and Location are required");
      return;
    }

    setLoading(true);
    try {
      const skillsArray = formData.skills.split(",").map(s => s.trim()).filter(Boolean);
      
      const payload = {
        name: user?.name,
        profile: {
          headline: formData.headline,
          location: formData.location,
          phone: formData.phone,
          summary: formData.summary,
          experienceLevel: formData.experienceLevel,
          skills: skillsArray,
          socialLinks: {
            linkedin: formData.linkedin,
            github: formData.github,
            portfolio: formData.portfolio
          }
        }
      };

      const token = localStorage.getItem("token");
      const res = await fetch("/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (data.success) {
        success("Profile updated!");
        router.push("/dashboard"); // or /jobs
      } else {
        throw new Error(data.message || "Failed to update profile");
      }
    } catch (err) {
      toastError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0d0d0d] text-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold font-head text-emerald-400">Complete Your Profile</h1>
          <p className="text-gray-400 font-main mt-2">
            Tell recruiters a bit about yourself to get started. 
            <span className="text-emerald-500 font-semibold ml-1">Candidates only.</span>
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6 bg-[#111] p-6 sm:p-8 rounded-xl border border-white/10 shadow-xl">
          {/* Headline */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Professional Headline <span className="text-red-400">*</span>
            </label>
            <input
              name="headline"
              value={formData.headline}
              onChange={handleChange}
              placeholder="e.g. Frontend Developer | React.js Enthusiast"
              className="w-full bg-[#0d0d0d] border border-white/10 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500/50 outline-none"
            />
          </div>

          {/* Location & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Location <span className="text-red-400">*</span>
              </label>
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Bangalore, India"
                className="w-full bg-[#0d0d0d] border border-white/10 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500/50 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Phone Number
              </label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 9876543210"
                className="w-full bg-[#0d0d0d] border border-white/10 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500/50 outline-none"
              />
            </div>
          </div>

          {/* Experience Level */}
          <div>
             <label className="block text-sm font-medium text-gray-300 mb-2">
                Experience Level
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {['fresher', '1-3 years', '3-5 years', '5+ years'].map(level => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setFormData({...formData, experienceLevel: level})}
                    className={`py-2 text-sm rounded-lg border transition-all ${
                      formData.experienceLevel === level 
                      ? 'bg-emerald-600 border-emerald-500 text-white' 
                      : 'bg-[#0d0d0d] border-white/10 text-gray-400 hover:border-white/30'
                    }`}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </button>
                ))}
              </div>
          </div>

          {/* Bio/Summary */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Summary / Bio
            </label>
            <textarea
              name="summary"
              rows="4"
              value={formData.summary}
              onChange={handleChange}
              placeholder="Briefly describe your experience and what you are looking for..."
              className="w-full bg-[#0d0d0d] border border-white/10 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500/50 outline-none resize-none"
            />
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Skills (Comma separated)
            </label>
            <input
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="React, Node.js, Python, Figma"
              className="w-full bg-[#0d0d0d] border border-white/10 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500/50 outline-none"
            />
          </div>

          {/* Social Links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">LinkedIn URL</label>
               <input
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/..."
                className="w-full bg-[#0d0d0d] border border-white/10 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">GitHub URL</label>
               <input
                name="github"
                value={formData.github}
                onChange={handleChange}
                placeholder="https://github.com/..."
                className="w-full bg-[#0d0d0d] border border-white/10 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Portfolio URL</label>
               <input
                name="portfolio"
                value={formData.portfolio}
                onChange={handleChange}
                placeholder="https://myportfolio.com"
                className="w-full bg-[#0d0d0d] border border-white/10 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold py-3 px-8 rounded-lg shadow-lg shadow-emerald-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Save Profile
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
