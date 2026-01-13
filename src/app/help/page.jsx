"use client";
import React from "react";
import Link from "next/link";
import { HelpCircle, User, Briefcase, Mail, Shield, Book } from "lucide-react";

export default function HelpCenterPage() {
  const categories = [
    { title: "Account & Profile", icon: <User className="text-blue-500" />, links: ["Create account", "Profile settings", "Verification"] },
    { title: "For Candidates", icon: <Book className="text-emerald-500" />, links: ["Finding jobs", "Assessment tips", "Managing applications"] },
    { title: "For Recruiters", icon: <Briefcase className="text-amber-500" />, links: ["Post jobs", "Search talent", "Pricing plans"] },
    { title: "Security & Trust", icon: <Shield className="text-rose-500" />, links: ["Privacy policy", "Data safety", "Reporting issues"] }
  ];

  return (
    <main className="min-h-screen bg-[#0d0d0d] pt-28 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-20">
          <h1 className="text-4xl sm:text-6xl font-head font-bold text-white mb-6">
            Help <span className="text-emerald-500">Center</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-main mb-12">
            Search our knowledge base or browse categories below to find answers to common questions.
          </p>
          
          <div className="max-w-2xl mx-auto relative group">
            <input 
              type="text" 
              placeholder="Search for articles, guides..."
              className="w-full bg-[#111] border border-white/10 rounded-2xl py-5 px-14 text-white outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-main"
            />
            <HelpCircle className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 w-6 h-6 group-focus-within:text-emerald-500 transition-colors" />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-emerald-600 hover:bg-emerald-700 px-6 py-2 rounded-xl text-white font-bold text-sm transition shadow-lg shadow-emerald-500/10">
              Search
            </button>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          {categories.map((cat, i) => (
            <div key={i} className="bg-[#111] border border-white/5 rounded-[32px] p-8 hover:bg-[#151515] transition-all">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center">
                   {cat.icon}
                </div>
                <h2 className="text-2xl font-bold text-white font-head">{cat.title}</h2>
              </div>
              <ul className="space-y-4">
                {cat.links.map((link, j) => (
                  <li key={j}>
                    <Link href="#" className="flex items-center justify-between text-gray-400 hover:text-emerald-400 transition-colors group">
                      <span className="font-main italic">"{link}"</span>
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all">
                        →
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="bg-emerald-600/10 border border-emerald-500/20 rounded-[32px] p-10 flex flex-col items-center text-center">
              <Mail className="w-10 h-10 text-emerald-500 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Contact Support</h3>
              <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                Can't find what you're looking for? Our friendly team is here to help you via email or chat.
              </p>
              <Link href="/contact" className="px-10 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-full transition shadow-lg shadow-emerald-500/20">
                Email Us
              </Link>
           </div>
           
           <div className="bg-blue-600/10 border border-blue-500/20 rounded-[32px] p-10 flex flex-col items-center text-center">
              <HelpCircle className="w-10 h-10 text-blue-500 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Read our FAQ</h3>
              <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                Check our frequently asked questions for quick answers to our most common inquiries.
              </p>
              <Link href="/faq" className="px-10 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition shadow-lg shadow-blue-500/20">
                View FAQ
              </Link>
           </div>
        </div>
      </div>
    </main>
  );
}
