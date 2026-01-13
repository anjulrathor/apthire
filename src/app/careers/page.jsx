"use client";
import React from "react";
import { Heart, Rocket, Coffee, Globe, ArrowRight } from "lucide-react";

export default function CareersPage() {
  const perks = [
    { title: "Remote-First", icon: <Globe className="text-blue-400" />, desc: "Work from anywhere in the world. We value output over hours." },
    { title: "Health & Wellness", icon: <Heart className="text-rose-400" />, desc: "Full health coverage and monthly wellness stipends." },
    { title: "Learning Budget", icon: <Rocket className="text-emerald-400" />, desc: "Annual budget for courses, books, and conferences." },
    { title: "Team Retreats", icon: <Coffee className="text-amber-400" />, desc: "Bi-annual fully-funded retreats in beautiful locations." }
  ];

  return (
    <main className="min-h-screen bg-[#0d0d0d] pt-28 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-emerald-500 font-bold tracking-widest uppercase text-sm mb-4">Join our team</h2>
          <h1 className="text-4xl sm:text-6xl font-head font-bold text-white mb-6">
            Help us build the <br />
            <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">Future of Hiring</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-main leading-relaxed">
            We're a small, mission-driven team dedicated to making skill-based hiring the new global standard. We're always looking for passionate people to join us.
          </p>
        </div>

        {/* Culture Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
          {perks.map((perk, i) => (
            <div key={i} className="bg-[#111] border border-white/5 p-8 rounded-3xl hover:bg-[#151515] transition-all">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6">
                {perk.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{perk.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{perk.desc}</p>
            </div>
          ))}
        </div>

        {/* Open Positions Demo */}
        <div className="bg-white/5 rounded-[40px] p-8 sm:p-12 border border-white/5">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-12">
            <h2 className="text-3xl font-bold text-white">Open Positions</h2>
            <span className="px-4 py-1.5 bg-emerald-500/10 text-emerald-500 rounded-full text-xs font-bold uppercase tracking-widest border border-emerald-500/20">
              3 Opportunities
            </span>
          </div>

          <div className="space-y-4">
            {[
              { role: "Senior Full Stack Engineer", team: "Engineering", type: "Full-time" },
              { role: "Product Designer", team: "Design", type: "Full-time" },
              { role: "Community Manager", team: "Marketing", type: "Part-time" }
            ].map((job, i) => (
              <div key={i} className="group flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-[#0a0a0a] border border-white/5 rounded-2xl hover:border-emerald-500/30 transition-all cursor-pointer">
                <div>
                  <h4 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors mb-1">{job.role}</h4>
                  <div className="flex gap-4 text-xs text-gray-500">
                    <span>{job.team}</span>
                    <span>•</span>
                    <span>{job.type}</span>
                  </div>
                </div>
                <div className="mt-4 sm:mt-0 flex items-center gap-2 text-emerald-500 text-sm font-bold group-hover:gap-3 transition-all">
                  Apply Now <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center text-gray-500 text-sm">
            Don't see a fit? Send us an open application at <span className="text-emerald-500 font-bold">careers@apthire.com</span>
          </div>
        </div>
      </div>
    </main>
  );
}
