"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle2, Zap, Target, Users, BarChart3, ShieldCheck } from "lucide-react";

export default function ServicesPage() {
  const services = [
    {
      title: "Skill-First Assessment",
      description: "Proprietary testing framework that evaluates actual technical competencies over keyword-matching resumes.",
      icon: <Target className="w-8 h-8 text-emerald-500" />,
      features: ["Custom coding challenges", "Behavioral task simulation", "Score-based ranking"]
    },
    {
      title: "Smart Talent Matching",
      description: "Our AI engine connects startups with candidates who have exactly the right skill profile for their stack.",
      icon: <Zap className="w-8 h-8 text-amber-500" />,
      features: ["Niche skill targeting", "Culture-fit indicators", "Automated shortlisting"]
    },
    {
      title: "Recruiter Dashboard",
      description: "Centralized hub to manage applicants, schedule interviews, and track hiring velocity across departments.",
      icon: <BarChart3 className="w-8 h-8 text-blue-500" />,
      features: ["Pipeline visualizations", "Team collaboration tools", "Email automation"]
    },
    {
      title: "Candidate Branding",
      description: "Tools for developers to showcase their projects, GitHub history, and verified skill badges to top employers.",
      icon: <Users className="w-8 h-8 text-purple-500" />,
      features: ["Dynamic portfolio builder", "Verified skill badges", "Interview prep tools"]
    },
    {
      title: "Global Pay & Compliance",
      description: "We handle international payroll, local tax compliance, and legal contracts so you can focus on building.",
      icon: <ShieldCheck className="w-8 h-8 text-rose-500" />,
      features: ["Compliant Indian contracts", "Hassle-free INR payouts", "Tax & benefit management"]
    }
  ];

  return (
    <main className="min-h-screen bg-[#0d0d0d] pt-28 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-emerald-500 font-bold tracking-[0.2em] uppercase text-[10px] mb-6"
          >
            Capabilities & Ecosystem
          </motion.h2>
          <h1 className="text-5xl sm:text-7xl font-head font-black text-white mb-8 tracking-[-0.04em] leading-[1.1]">
            Everything you need to <br />
            <span className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500 bg-clip-text text-transparent">Hire or get Hired</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-main leading-relaxed">
            We provide specialized services designed to eliminate the friction in modern recruitment, focusing on verified skills and real-world performance for Indian talent and global startups.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-[#111] border border-white/5 rounded-3xl p-8 hover:bg-[#151515] transition-all group">
              <div className="mb-6 bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
              <p className="text-gray-400 mb-8 font-main leading-relaxed">
                {service.description}
              </p>
              <ul className="space-y-3">
                {service.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          {/* CTA Card */}
          <div className="bg-emerald-600 rounded-3xl p-8 flex flex-col justify-center items-center text-center text-white shadow-2xl shadow-emerald-600/20">
            <h3 className="text-3xl font-bold mb-4">Need something custom?</h3>
            <p className="mb-8 opacity-90">
              We offer enterprise solutions and managed hiring services for high-growth tech teams.
            </p>
            <Link href="/contact" className="bg-white text-emerald-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition shadow-lg inline-block">
              Contact Sales
            </Link>
          </div>
        </div>

        {/* FAQ Preview */}
        <div className="mt-32 text-center bg-white/5 rounded-3xl p-12 py-16">
          <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-400 mb-10">Got questions? We've got answers.</p>
          <div className="grid md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
            {[
                {q: "How does the skill assessment work?", a: "We use a combination of automated coding tasks and live project simulators to verify your expertise."},
                {q: "Is Apthire free for candidates?", a: "Yes, candidates can build their profile, take assessments, and apply to jobs completely free."}
            ].map((faq, i) => (
              <div key={i}>
                <h4 className="text-white font-bold mb-2">{faq.q}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
