"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "What is skill-first hiring?",
      a: "Skill-first hiring focuses on a candidate's actual ability to perform job-related tasks rather than relying strictly on education background or years of experience. We use assessments and project verified profiles to prove what you can actually do."
    },
    {
      q: "How does the evaluation process work?",
      a: "When you apply for a job on Apthire, you may be asked to complete a specific coding challenge or task simulation. Your score and performance metrics are then shared with the hiring team alongside your profile."
    },
    {
      q: "Is Apthire free for job seekers?",
      a: "Yes, creating a profile, taking assessments, and applying for jobs is completely free for all candidates. We only charge companies for advanced hiring tools and premium job placements."
    },
    {
      q: "Can I use my Apthire profile as a portfolio?",
      a: "Absolutely. Every user gets a unique profile URL that showcases their verified skill badges, assessment scores, and linked projects. It's designed to be the only link you need in your bio."
    },
    {
      q: "How can my company start hiring?",
      a: "You can sign up as a Recruiter and post your first job for free. For larger teams, check out our Pricing page to see our Business and Enterprise plans."
    }
  ];

  return (
    <main className="min-h-screen bg-[#0d0d0d] pt-28 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-head font-bold text-white mb-6">
            Frequently Asked <span className="text-emerald-500">Questions</span>
          </h1>
          <p className="text-gray-400 font-main">
            Everything you need to know about the Apthire platform and skill-first hiring.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-12">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search FAQs..."
            className="w-full bg-[#111] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-main"
          />
        </div>

        {/* FAQ list */}
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden transition-all">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
              >
                <span className="font-bold text-white sm:text-lg pr-4">{faq.q}</span>
                {openIndex === i ? (
                  <ChevronUp className="w-5 h-5 text-emerald-500 shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 shrink-0" />
                )}
              </button>
              
              {openIndex === i && (
                <div className="px-6 pb-6 animate-in slide-in-from-top-2 duration-300">
                  <p className="text-gray-400 font-main leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Support Link */}
        <div className="mt-20 text-center p-8 bg-white/5 rounded-3xl border border-white/5">
          <p className="text-gray-400 mb-4 font-main">Still have questions?</p>
          <a href="/contact" className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-bold transition shadow-lg shadow-emerald-500/20">
            Contact Support
          </a>
        </div>
      </div>
    </main>
  );
}
