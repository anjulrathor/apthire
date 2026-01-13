"use client";
import React from "react";
import { motion } from "framer-motion";

function ValueCard({ title, children, icon }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass-card p-8 rounded-2xl border border-white/5"
    >
      <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500 mb-6">
        {icon}
      </div>
      <h3 className="font-head text-xl font-bold text-white mb-3">
        {title}
      </h3>
      <p className="font-main text-gray-400 leading-relaxed text-sm">{children}</p>
    </motion.div>
  );
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0d0d0d] pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Hero Section */}
        <section className="text-center mb-24">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-head text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight"
          >
            Our Mission is <span className="text-emerald-500">Global</span>.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto font-main leading-relaxed"
          >
            Apthire is a premier platform dedicated to helping Indian engineers land roles in world-class companies across the US, Europe, and Asia. 
            We believe geographic boundaries shouldn't limit your career potential.
          </motion.p>
        </section>

        {/* Vision/Mission Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass p-10 rounded-3xl"
          >
            <h2 className="font-head text-3xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-gray-400 font-main leading-relaxed text-lg">
              To make job hunting fair and transparent by focusing on skills and practical experience. 
              We empower beginners to showcase their projects and get hired by companies that value talent over traditional credentials.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass p-10 rounded-3xl border-emerald-500/10"
          >
            <h2 className="font-head text-3xl font-bold text-white mb-6">Our Vision</h2>
            <p className="text-gray-400 font-main leading-relaxed text-lg">
              To become the global standard for skill-based recruitment. 
              A world where every developer, regardless of their background, has direct access to opportunities that match their true potential.
            </p>
          </motion.div>
        </div>

        {/* Why Apthire */}
        <section className="mb-24">
          <h2 className="font-head text-3xl font-bold text-white mb-12 text-center text-emerald-500 uppercase tracking-widest text-sm">Why Apthire exists?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-4">
                <h3 className="text-white font-bold text-xl uppercase tracking-tighter">Visibility</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Most platforms prioritize experience. We shift the focus to projects and real coding ability, giving beginners the spotlight they deserve.</p>
            </div>
            <div className="space-y-4">
                <h3 className="text-white font-bold text-xl uppercase tracking-tighter">Verified</h3>
                <p className="text-gray-400 text-sm leading-relaxed">No more ghost jobs or fake listings. Every opportunity on Apthire is verified and links directly to official application portals.</p>
            </div>
            <div className="space-y-4">
                <h3 className="text-white font-bold text-xl uppercase tracking-tighter">Simplicity</h3>
                <p className="text-gray-400 text-sm leading-relaxed">The job search should be exciting, not exhausting. Our clean interface ensures you spend more time applying and less time searching.</p>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="bg-white/5 rounded-[40px] p-12 md:p-20 border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px]"></div>
          <h2 className="font-head text-3xl md:text-5xl font-bold text-white mb-16 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ValueCard title="Transparency" icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>}>
                Complete clarity in every job post. No middlemen, no confusion.
            </ValueCard>
            <ValueCard title="Skill-First" icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>}>
                We prioritize talent and projects over traditional credentials.
            </ValueCard>
            <ValueCard title="Authenticity" icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>}>
                Only genuine, verified opportunities make it to our platform.
            </ValueCard>
            <ValueCard title="Simplicity" icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>}>
                Clean design, focused user experience, and fast workflows.
            </ValueCard>
          </div>
        </section>

        {/* Footer info */}
        <footer className="mt-24 text-center">
            <p className="text-gray-500 font-main text-sm">Founded by <span className="text-white font-bold">Anjul Rathor</span> • Built for the developers of tomorrow.</p>
        </footer>

      </div>
    </main>
  );
}
