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
        <div className="text-center mb-20">
          <h2 className="text-emerald-500 font-bold tracking-[0.2em] uppercase text-[10px] mb-6">Join our team</h2>
          <h1 className="text-5xl sm:text-7xl font-head font-black text-white mb-8 tracking-[-0.04em] leading-[1.1]">
            Build the <br />
            <span className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500 bg-clip-text text-transparent">Future of Hiring</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-main leading-relaxed">
            We're a mission-driven team dedicated to making skill-based hiring the new global standard for the next generation of Indian talent.
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
              Looking for talent?
            </span>
          </div>

          <div className="space-y-4">
          <div className="space-y-4 text-center py-12 text-gray-400">
             <p>No open positions right now.</p>
          </div>
          </div>
          
          <div className="mt-12 text-center text-gray-500 text-sm">
            Don't see a fit? Send us an open application at <span className="text-emerald-500 font-bold">apthire.care@gmail.com</span>
          </div>
        </div>
      </div>
    </main>
  );
}
