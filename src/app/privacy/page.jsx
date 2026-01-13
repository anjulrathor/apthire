"use client";
import React from "react";

export default function PrivacyPage() {
  const sections = [
    {
      title: "1. Information We Collect",
      content: "We collect information you provide directly to us, such as when you create an account, build a profile, or apply for a job. This includes your name, email, professional history, and skill assessment data."
    },
    {
      title: "2. How We Use Information",
      content: "We use your information to facilitate the hiring process, improve our skill assessment algorithms, and communicate with you about job opportunities or platform updates."
    },
    {
      title: "3. Information Sharing",
      content: "We share your profile and verified skill data with potential employers when you apply for a job. We do not sell your personal data to third parties for marketing purposes."
    },
    {
      title: "4. Data Security",
      content: "We implement industry-standard security measures to protect your data. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security."
    }
  ];

  return (
    <main className="min-h-screen bg-[#0d0d0d] pt-28 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-head font-bold text-white mb-2">Privacy Policy</h1>
        <p className="text-gray-500 mb-12 italic">Last updated: January 13, 2026</p>
        
        <div className="space-y-12">
          {sections.map((sec, i) => (
            <section key={i} className="bg-white/5 border border-white/5 rounded-2xl p-8">
              <h2 className="text-xl font-bold text-white mb-4">{sec.title}</h2>
              <p className="text-gray-400 font-main leading-loose">
                {sec.content}
              </p>
            </section>
          ))}
        </div>
        
        <div className="mt-12 p-8 border border-emerald-500/20 rounded-2xl bg-emerald-500/5">
          <h3 className="text-white font-bold mb-2">Contact Us</h3>
          <p className="text-gray-400 text-sm">
            If you have questions about this Privacy Policy, please contact our data protection team at 
            <span className="text-emerald-500 ml-1">privacy@apthire.com</span>
          </p>
        </div>
      </div>
    </main>
  );
}
