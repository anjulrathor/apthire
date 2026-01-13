"use client";
import React from "react";
import { Check, Zap, Building2, Flame } from "lucide-react";

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "0",
      description: "Perfect for students and individuals just starting their career journey.",
      icon: <Zap className="w-6 h-6 text-emerald-500" />,
      features: [
        "Create candidate profile",
        "Take up to 3 skill assessments",
        "Join 10 job pipelines / month",
        "Public portfolio link"
      ],
      cta: "Start for Free",
      highlight: false
    },
    {
      name: "Pro",
      price: "1,499",
      description: "For active job seekers who want to stand out and get hired faster.",
      icon: <Flame className="w-6 h-6 text-orange-500" />,
      features: [
        "Unlimited skill assessments",
        "Unlimited job applications",
        "Priority skill verification",
        "Advanced profile analytics",
        "Direct recruiter messaging"
      ],
      cta: "Get Started",
      highlight: true
    },
    {
      name: "Business",
      price: "9,999",
      description: "For startups and small teams looking to hire the best talent quickly.",
      icon: <Building2 className="w-6 h-6 text-blue-500" />,
      features: [
        "Post up to 5 active jobs",
        "Access to search talent pool",
        "Skill-based applicant ranking",
        "Team collaboration (3 seats)",
        "Automated interview scoring"
      ],
      cta: "Hire with Pro",
      highlight: false
    }
  ];

  return (
    <main className="min-h-screen bg-[#0d0d0d] pt-28 pb-20 px-4 font-main">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20 animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-4xl sm:text-6xl font-head font-bold text-white mb-6">
            Simple, Transparent <br />
            <span className="text-emerald-500">Pricing</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Choose the plan that fits your growth. Whether you're a candidate looking for a dream job or a recruiter building a dream team.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <div 
              key={i} 
              className={`relative rounded-3xl p-8 transition-all duration-300 hover:translate-y-[-8px] ${
                plan.highlight 
                  ? "bg-[#151515] border-2 border-emerald-500 shadow-2xl shadow-emerald-500/10" 
                  : "bg-[#111] border border-white/5 hover:border-white/20"
              }`}
            >
              {plan.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-500 text-white text-xs font-bold px-4 py-1.5 rounded-full tracking-wide">
                  MOST POPULAR
                </div>
              )}
              
              <div className="mb-6 flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1 font-head">{plan.name}</h3>
                  <p className="text-gray-500 text-xs">{plan.description}</p>
                </div>
                <div className="p-3 bg-white/5 rounded-xl">
                  {plan.icon}
                </div>
              </div>

              <div className="mb-8 font-head">
                <span className="text-5xl font-bold text-white">₹{plan.price}</span>
                <span className="text-gray-500 text-sm ml-2">/month</span>
              </div>

              <ul className="space-y-4 mb-10">
                {plan.features.map((feat, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-gray-300">
                    <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-xl font-bold text-sm transition-all shadow-xl ${
                plan.highlight 
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20" 
                  : "bg-white/5 hover:bg-white/10 text-white border border-white/5"
              }`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Enterprise CTA */}
        <div className="mt-20 text-center bg-white/5 rounded-3xl p-12 max-w-4xl mx-auto border border-white/5">
           <h4 className="text-2xl font-bold text-white mb-4 font-head">Need something bigger?</h4>
           <p className="text-gray-400 mb-8 max-w-xl mx-auto">
             For enterprises looking for custom integrations, managed recruitment, and unlimited hiring seats.
           </p>
           <button className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition">
             Contact Sales
           </button>
        </div>
      </div>
    </main>
  );
}
