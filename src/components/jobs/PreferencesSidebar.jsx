"use client";
import React from "react";

export default function PreferencesSidebar() {
  return (
    <div className="hidden xl:block">
       <div className="bg-[#111111] border border-white/10 rounded-xl p-5 sticky top-20">
          <div className="flex justify-between items-center mb-4">
             <h3 className="font-bold text-sm">Job Preferences</h3>
             <button className="text-xs text-emerald-400 hover:underline">Edit</button>
          </div>

          <div className="space-y-4">
             {/* Preferred Role */}
             <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider font-bold">Preferred Role</label>
                <div className="mt-1 flex flex-wrap gap-2">
                   {["Developer", "Frontend", "Remote"].map(tag => (
                      <span key={tag} className="text-xs bg-white/5 px-2 py-1 rounded text-gray-300 border border-white/5">
                        {tag}
                      </span>
                   ))}
                </div>
             </div>

             {/* Location */}
             <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider font-bold">Location</label>
                <p className="text-sm text-gray-300 mt-1">Remote, India</p>
             </div>

             {/* Salary */}
             <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider font-bold">Salary Expectation</label>
                <p className="text-sm text-gray-300 mt-1">₹ 6 LPA - 12 LPA</p>
             </div>
             
             {/* Promo / Upsell mockup */}
             <div className="mt-6 pt-4 border-t border-white/5">
                <p className="text-xs text-gray-400 leading-relaxed">
                   <strong>Get noticed faster.</strong> Keep your preferences up to date to get relevant job recommendations.
                </p>
             </div>
          </div>
       </div>
    </div>
  );
}
