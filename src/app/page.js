"use client";
import React from "react";
import Hero from "@/components/home/Hero";
import { motion } from "framer-motion";

const features = [
  {
    title: "Skill-First Matching",
    description: "Our algorithms prioritize what you can do over where you studied.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "Verified Listings",
    description: "Every job is manually verified to ensure high quality and authenticity.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Direct Application",
    description: "Apply directly to the company with our streamlined one-click process.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
      </svg>
    ),
  },
];

const partners = ["Google", "Meta", "Amazon", "Netflix", "OpenAI", "Strip", "Vercel", "Airbnb"];

export default function Homepage() {
  return (
    <div className="bg-[#0d0d0d]">
      <Hero />

      {/* Trust Section */}
      <section className="py-20 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-bold text-gray-500 uppercase tracking-[0.3em] mb-12">Trusted by builders from</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
             {partners.map(p => (
               <span key={p} className="text-xl md:text-2xl font-head font-black tracking-tighter text-white">{p}</span>
             ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-4">Why Apthire?</h2>
            <h3 className="text-3xl md:text-5xl font-head font-bold text-white">The Smartest Way to <br />Build Your Career</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-10 rounded-[40px] hover:border-emerald-500/20 transition-all group"
              >
                <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 mb-8 grooup-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h4 className="text-xl font-bold text-white mb-4">{f.title}</h4>
                <p className="text-gray-400 font-main leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4">
        <div className="max-w-5xl mx-auto glass rounded-[50px] p-12 md:p-24 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-transparent"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-head font-bold text-white mb-8">Ready to showcase <br />your skills?</h2>
            <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto font-main">
              Join thousands of developers who have found their dream roles through Apthire. 
              Setup your profile in less than 2 minutes.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
               <button onClick={() => window.location.href='/signup'} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-10 rounded-2xl transition shadow-lg shadow-emerald-500/20 active:scale-95">
                  Get Started for Free
               </button>
               <button onClick={() => window.location.href='/jobs'} className="glass hover:bg-white/5 text-white font-bold py-4 px-10 rounded-2xl transition active:scale-95">
                  Browse Opportunities
               </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
