"use client";
import React from "react";
import Link from "next/link";
import { ArrowLeft, MapPin, Globe, CheckCircle, Users, Building, ExternalLink } from "lucide-react";

export default function CompanyProfilePage({ params }) {
  const { id } = params;
  
  // Fake Company Data Generator
  const numericId = parseInt(id) || 1;
  const companies = [
    { name: "TechNova Solutions", industry: "Software & AI", color: "bg-blue-600", logo: "T" },
    { name: "GreenStep Energy", industry: "Renewable Energy", color: "bg-emerald-600", logo: "G" },
    { name: "SwiftPay Systems", industry: "FinTech", color: "bg-indigo-600", logo: "S" },
    { name: "CloudScale Inc", industry: "Cloud Infrastructure", color: "bg-cyan-600", logo: "C" },
    { name: "BioGenix Lab", industry: "HealthTech", color: "bg-rose-600", logo: "B" },
    { name: "Velocity Motors", industry: "Automotive Tech", color: "bg-amber-600", logo: "V" },
  ];
  
  const company = companies[(numericId - 1) % companies.length];

  return (
    <main className="min-h-screen bg-[#0d0d0d] pt-28 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <Link href="/companies" className="inline-flex items-center gap-2 text-gray-400 hover:text-emerald-400 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Companies
        </Link>
        
        {/* Banner */}
        <div className="h-48 md:h-64 rounded-t-3xl bg-gradient-to-r from-gray-900 to-black relative overflow-hidden border-x border-t border-white/5">
            <div className={`absolute inset-0 opacity-20 ${company.color} blur-[100px]`}></div>
        </div>

        {/* Profile Info */}
        <div className="bg-[#111] border border-white/5 rounded-b-3xl p-8 md:p-12 relative -mt-4">
            <div className="flex flex-col md:flex-row gap-8 items-start">
                
                {/* Logo */}
                <div className={`w-32 h-32 ${company.color} rounded-3xl flex items-center justify-center text-white text-6xl font-bold shadow-2xl ring-8 ring-[#111] -mt-20 md:-mt-24`}>
                   {company.logo}
                </div>

                <div className="flex-grow">
                   <h1 className="text-4xl font-bold text-white mb-2">{company.name}</h1>
                   <div className="flex flex-wrap gap-4 text-gray-400 text-sm mb-6">
                       <span className="flex items-center gap-1">
                          <Building className="w-4 h-4 text-emerald-500" /> {company.industry}
                       </span>
                       <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-emerald-500" /> Remote First
                       </span>
                       <span className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-emerald-500" /> 500-1000 Employees
                       </span>
                   </div>
                </div>

                <div className="flex gap-4">
                    <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl transition-colors">
                        Follow
                    </button>
                    <button className="bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold py-3 px-6 rounded-xl transition-colors flex items-center gap-2">
                        <Globe className="w-4 h-4" /> Website
                    </button>
                </div>
            </div>

            <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8 text-gray-300 leading-relaxed font-main">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">About Us</h2>
                        <p>
                           {company.name} is a global leader in {company.industry}. We are pioneering new technologies to solve hard problems at scale. Our mission is to democratize access to world-class software solutions while building a diverse, remote-first team. We believe in autonomy, mastery, and purpose.
                        </p>
                        <p className="mt-4">
                            Founded in 2018, we have grown rapidly to serve millions of users across 150+ countries. Our engineering team is distributed across the globe, with a significant hub in India. We are backed by top-tier venture capital firms and are currently in hyper-growth mode.
                        </p>
                    </section>
                    
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Why Join Us?</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {["Competitive Salary (USD)", "Global Health Insurance", "Learning Stipend", "Flexible Hours", "Home Office Setup", "Employee Stock Options"].map((perk, i) => (
                                <div key={i} className="flex items-center gap-2 p-3 bg-white/5 rounded-lg border border-white/5">
                                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                                    <span className="text-sm font-bold text-white">{perk}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <aside className="space-y-6">
                    <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl">
                        <h3 className="text-white font-bold mb-4">Open Roles</h3>
                        <div className="space-y-3">
                            {["Senior Backend Engineer", "Product Manager", "Lead UX Designer", "DevOps Specialist"].map((role, i) => (
                                <Link href={`/careers/${role.toLowerCase().replace(/ /g, "-")}`} key={i} className="block p-4 rounded-xl bg-white/5 hover:bg-emerald-600/20 hover:border-emerald-500/30 border border-transparent transition-all group">
                                    <div className="font-bold text-emerald-400 group-hover:text-emerald-300 mb-1">{role}</div>
                                    <div className="text-xs text-gray-500 flex justify-between">
                                        <span>Engineering</span>
                                        <span>Remote</span>
                                    </div>
                                </Link>
                            ))}
                            <Link href="/jobs" className="block text-center text-sm font-bold text-gray-400 hover:text-white pt-2">
                                View all 12 positions
                            </Link>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
      </div>
    </main>
  );
}
