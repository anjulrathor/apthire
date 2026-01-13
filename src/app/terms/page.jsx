"use client";
import React from "react";

export default function TermsPage() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing or using Apthire, you agree to be bound by these Terms of Service and all applicable laws and regulations."
    },
    {
      title: "2. User Accounts",
      content: "You are responsible for maintaining the confidentiality of your account credentials. You must provide accurate and complete information during registration."
    },
    {
      title: "3. Skill Assessments",
      content: "All skill assessments must be completed by the account holder alone. Use of external aids or impersonation during assessments will result in immediate termination of the account."
    },
    {
      title: "4. Prohibited Conduct",
      content: "You agree not to use the platform for any unlawful purpose or to solicit users for services outside of legitimate employment opportunities."
    }
  ];

  return (
    <main className="min-h-screen bg-[#0d0d0d] pt-28 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-head font-bold text-white mb-2">Terms of Service</h1>
        <p className="text-gray-500 mb-12 italic">Last updated: January 13, 2026</p>
        
        <div className="space-y-12">
          {sections.map((sec, i) => (
            <section key={i} className="bg-white/5 border border-white/5 rounded-2xl p-8 transition-transform hover:scale-[1.01]">
              <h2 className="text-xl font-bold text-white mb-4">{sec.title}</h2>
              <p className="text-gray-400 font-main leading-loose">
                {sec.content}
              </p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
