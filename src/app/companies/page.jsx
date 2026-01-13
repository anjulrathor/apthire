"use client";
import React from "react";
import Link from "next/link";
import { Search, MapPin, Briefcase, Star, ExternalLink } from "lucide-react";

export default function CompaniesPage() {
  const companies = [
    {
      id: 1,
      name: "TechNova Solutions",
      industry: "Software & AI",
      location: "San Francisco, US (Remote)",
      jobs: 14,
      rating: 4.8,
      logo: "T",
      color: "bg-blue-600",
      description: "Hiring India's top distributed systems engineers for our US-based AI infrastructure team."
    },
    {
      id: 2,
      name: "GreenStep Energy",
      industry: "Renewable Energy",
      location: "London, UK (Remote)",
      jobs: 8,
      rating: 4.5,
      logo: "G",
      color: "bg-emerald-600",
      description: "Join our European green-tech revolution from your home in India. Scaling our IoT team."
    },
    {
      id: 3,
      name: "SwiftPay Systems",
      industry: "FinTech",
      location: "Singapore (Remote)",
      jobs: 21,
      rating: 4.9,
      logo: "S",
      color: "bg-indigo-600",
      description: "Building Southeast Asia's fastest payment rail. Hiring senior developers across India."
    },
    {
      id: 4,
      name: "CloudScale Inc",
      industry: "Cloud Infrastructure",
      location: "Berlin, Germany (Remote)",
      jobs: 12,
      rating: 4.7,
      logo: "C",
      color: "bg-cyan-600",
      description: "German engineering meets Indian talent. Scaling our infrastructure from Berlin to Bangalore."
    },
    {
      id: 5,
      name: "BioGenix Lab",
      industry: "HealthTech",
      location: "Boston, US (Remote)",
      jobs: 6,
      rating: 4.6,
      logo: "B",
      color: "bg-rose-600",
      description: "Innovating personalized medicine. Hiring talented Bio-informaticians from top Indian hubs."
    },
    {
      id: 6,
      name: "Velocity Motors",
      industry: "Automotive Tech",
      location: "Munich, Germany (Remote)",
      jobs: 18,
      rating: 4.4,
      logo: "V",
      color: "bg-amber-600",
      description: "Leading the EV movement in Europe. We're looking for India's best embedded systems talent."
    }
  ];

  return (
    <main className="min-h-screen bg-[#0d0d0d] pt-28 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-head font-bold text-white mb-4">
            Explore <span className="text-emerald-500">Companies</span>
          </h1>
          <p className="text-gray-400 max-w-2xl font-main">
            Discover your next employer from our curated list of world-class companies hiring top talent through skill-first evaluation.
          </p>
        </div>

        {/* Filter/Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="flex-grow relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search companies by name or industry..."
              className="w-full bg-[#111] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
            />
          </div>
          <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl text-white font-bold hover:bg-white/10 transition">
            Apply Filters
          </button>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((comp) => (
            <div key={comp.id} className="group bg-[#111] border border-white/5 rounded-2xl p-6 hover:border-emerald-500/30 transition-all hover:shadow-2xl hover:shadow-emerald-500/5">
              <div className="flex justify-between items-start mb-6">
                <div className={`w-14 h-14 ${comp.color} rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>
                  {comp.logo}
                </div>
                <div className="flex items-center gap-1 text-amber-500 bg-amber-500/10 px-2 py-1 rounded-lg text-xs font-bold">
                  <Star className="w-3 h-3 fill-current" />
                  {comp.rating}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">{comp.name}</h3>
              <p className="text-emerald-500 text-sm font-medium mb-4">{comp.industry}</p>
              
              <p className="text-gray-400 text-sm mb-6 line-clamp-2 italic">
                "{comp.description}"
              </p>
              
              <div className="flex items-center gap-4 text-xs text-gray-500 border-t border-white/5 pt-6">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {comp.location}
                </div>
                <div className="flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5" />
                  {comp.jobs} Open Jobs
                </div>
              </div>
              
              <Link 
                href={`/companies/${comp.id}`}
                className="mt-6 flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white/5 hover:bg-emerald-600 text-white text-sm font-bold transition-all group-hover:bg-emerald-600/20 group-hover:text-emerald-400"
              >
                View Profile
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
