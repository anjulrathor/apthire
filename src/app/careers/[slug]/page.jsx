"use client";
import React from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle, MapPin, Clock, DollarSign } from "lucide-react";

export default function CareerJobPage({ params }) {
  const { slug } = params;
  
  // Fake Job Data (Dynamic based on slug for variety)
  const isEngineering = slug.includes("engineer") || slug.includes("stack");
  const jobTitle = decodeURIComponent(slug).replace(/-/g, " ");

  return (
    <main className="min-h-screen bg-[#0d0d0d] pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/careers" className="inline-flex items-center gap-2 text-gray-400 hover:text-emerald-400 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Careers
        </Link>
        
        <div className="bg-[#111] border border-white/5 rounded-[32px] overflow-hidden">
             <div className="p-8 sm:p-12 border-b border-white/5">
                <div className="flex gap-3 mb-6">
                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-xs font-bold uppercase rounded-full tracking-wider border border-emerald-500/20">
                        {isEngineering ? "Engineering" : "Product"}
                    </span>
                    <span className="px-3 py-1 bg-white/5 text-gray-400 text-xs font-bold uppercase rounded-full tracking-wider border border-white/10">
                        Full-Time
                    </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-head font-bold text-white mb-6 capitalize">{jobTitle}</h1>
                
                <div className="flex flex-wrap gap-6 text-gray-400 text-sm font-medium">
                    <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-emerald-500" />
                        Remote (Global)
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-emerald-500" />
                        Flexible Hours
                    </div>
                    <div className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-emerald-500" />
                        Competitive Equity + Salary
                    </div>
                </div>
             </div>

             <div className="p-8 sm:p-12 space-y-12 text-gray-300 leading-relaxed font-main">
                <section>
                    <h2 className="text-2xl font-bold text-white mb-6">About the Role</h2>
                    <p>
                        At Apthire, we are rewriting the playbook for technical recruitment. We believe that skills matter more than credentials. As a <b>{jobTitle}</b>, you will play a pivotal role in building the core infrastructure that thousands of developers and recruiters rely on daily. You will work directly with the founders to shape the product roadmap and engineering culture.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-white mb-6">What You'll Do</h2>
                    <ul className="space-y-4">
                        {[
                            "Design and implement scalable systems using Next.js, Node.js, and MongoDB.",
                            "Collaborate with detailed product specs to ship features quickly and reliably.",
                            "Write clean, maintainable code with high test coverage.",
                            "Participate in code reviews and mentor junior team members.",
                            "Optimize application performance for low-latency user experiences."
                        ].map((item, i) => (
                            <li key={i} className="flex gap-3 items-start">
                                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-1" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-white mb-6">Requirements</h2>
                    <ul className="space-y-4">
                        {[
                            "3+ years of experience in modern web development.",
                            "Deep understanding of React server components and edge computing.",
                            "Experience with database design and optimization.",
                            "Strong communication skills for asynchronous remote work.",
                            "Passion for the developer tools and recruitment space."
                        ].map((item, i) => (
                            <li key={i} className="flex gap-3 items-start">
                                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-1" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                <section>
                     <h2 className="text-2xl font-bold text-white mb-6">Benefits</h2>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                         {[
                             "100% Remote", "Unlimited PTO", "Health Insurance", 
                             "Home Office Stipend", "Learning Budget", "Team Retreats"
                         ].map((benefit, i) => (
                             <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/5 text-sm font-bold text-white">
                                 {benefit}
                             </div>
                         ))}
                     </div>
                </section>
             </div>

             <div className="p-8 sm:p-12 bg-[#0a0a0a] border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                   <h3 className="text-xl font-bold text-white mb-1">Ready to join us?</h3>
                   <p className="text-gray-400 text-sm">We'd love to see what you can build.</p>
                </div>
                <a 
                   href="mailto:jobs@apthire.com"
                   className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg shadow-emerald-500/20 active:scale-95 w-full sm:w-auto text-center"
                >
                   Apply for this Role
                </a>
             </div>
        </div>
      </div>
    </main>
  );
}
