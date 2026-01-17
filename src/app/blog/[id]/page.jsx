"use client";
import React from "react";
import Link from "next/link";
import { ArrowLeft, User, Calendar, Tag, Share2, Linkedin, Twitter } from "lucide-react";

export default function BlogPostPage({ params }) {
  const { id } = params;

  // Fake Data Generator based on ID (for consistent results)
  const numericId = parseInt(id) || 1;
  const titles = [
    "The Rise of Skill-First Hiring in 2026",
    "How to Build a Portfolio that Actually Gets You Hired",
    "Mastering the Technical Interview without a CS Degree",
    "Remote Work Trends: Why India is the New Hub",
    "5 Soft Skills Every Senior Developer Needs"
  ];
  const title = titles[(numericId - 1) % titles.length];
  
  const content = (
    <div className="space-y-6 text-gray-300 leading-relaxed font-main text-lg">
      <p>
        In the rapidly evolving landscape of the tech industry, the traditional markers of competence—university degrees, certifications, and years of experience—are undergoing a significant re-evaluation. A paradigm shift is underway, moving towards what is now commonly referred to as "skill-first hiring." This approach prioritizes a candidate's demonstrable ability to perform specific tasks over their pedigree or the prestige of their previous employers. This change is not merely a trend but a necessary adaptation to the pace of technological innovation.
      </p>
      <p>
        The driving force behind this shift is the realization that technical skills have a shelf life. What was cutting-edge five years ago may be obsolete today. Consequently, the ability to learn, adapt, and apply new knowledge is becoming far more valuable than a static reservoir of facts. Companies are increasingly using practical assessments, coding challenges, and take-home projects to gauge a candidate's real-world problem-solving abilities. This democratization of opportunity means that self-taught developers and those from non-traditional backgrounds have a fairer shot at landing top-tier roles.
      </p>
      <p>
        Furthermore, the rise of remote work has expanded the talent pool globally. When geography is no longer a constraint, competition intensifies, and meritocracy becomes the primary filter. Hiring managers are looking for evidence of impact. They want to see GitHub repositories with clean, documented code; they want to hear about complex system architecture decisions during interviews; and they want to understand how a candidate approaches debugging a critical failure in production.
      </p>
      <div className="my-8 p-6 bg-emerald-900/10 border-l-4 border-emerald-500 rounded-r-xl">
        <h4 className="text-xl font-bold text-white mb-2">Key Takeaway</h4>
        <p className="text-emerald-400 italic">
          "Your portfolio is your new resume. Show, don't just tell, what you can build."
        </p>
      </div>
      <p>
        However, technical prowess is only one side of the coin. As AI tools handle more of the boilerplate coding, the human element—communication, empathy, and leadership—becomes the differentiator. "Skill-first" also encompasses these soft skills. Can you explain a complex technical concept to a non-technical stakeholder? Can you mentor junior developers? Do you collaborate well in an asynchronous, remote environment? These questions are now central to the hiring process.
      </p>
      <p>
        For job seekers, this means that improved documentation of your projects is crucial. A brilliant app with a README file that says "run npm start" is a missed opportunity. treat your public projects as products. Explain the 'why' behind your technology choices, the challenges you faced, and how you overcame them. This narrative adds depth to your code and gives recruiters insight into your thought process.
      </p>
      <p>
        Looking ahead to the rest of 2026, we expect to see AI-driven hiring platforms become more sophisticated, potentially reducing bias in the initial screening stages. But ultimately, the human connection remains vital. Networking, attending hackathons (virtual or physical), and contributing to open source are still the most effective ways to bypass the algorithm and get your work in front of a decision-maker.
      </p>
      <p>
        In conclusion, the era of relying solely on the brand name of your college is fading. The future belongs to the builders, the problem solvers, and the lifelong learners. Whether you are a veteran engineer or a bootcamp graduate, the playing field is leveling. The question is no longer "Where did you study?" but "What can you build today?"
      </p>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#0d0d0d] pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-emerald-400 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        {/* Article Header */}
        <header className="mb-12">
           <div className="flex gap-2 mb-6">
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-bold uppercase tracking-widest border border-emerald-500/20">
                Insights
              </span>
              <span className="px-3 py-1 bg-white/5 text-gray-400 rounded-full text-xs font-bold uppercase tracking-widest border border-white/10">
                5 min read
              </span>
           </div>
           
           <h1 className="text-4xl md:text-5xl lg:text-6xl font-head font-bold text-white mb-8 leading-tight">
             {title}
           </h1>

           <div className="flex items-center justify-between border-y border-white/10 py-6">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white text-lg">
                    A
                 </div>
                 <div>
                    <div className="text-white font-bold">Anjul Rathor</div>
                    <div className="text-gray-500 text-sm flex items-center gap-2">
                       <span>Jan 12, 2026</span>
                       <span>•</span>
                       <span>Product Designer</span>
                    </div>
                 </div>
              </div>
              
              <div className="flex gap-4">
                 <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-emerald-500 hover:text-white transition-all">
                    <Linkedin className="w-5 h-5" />
                 </button>
                 <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-emerald-500 hover:text-white transition-all">
                    <Twitter className="w-5 h-5" />
                 </button>
                 <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-emerald-500 hover:text-white transition-all">
                    <Share2 className="w-5 h-5" />
                 </button>
              </div>
           </div>
        </header>

        {/* Featured Image */}
        <div className="mb-12 rounded-3xl overflow-hidden border border-white/5 aspect-video relative group">
           <img 
             src={`https://images.unsplash.com/photo-${numericId % 2 === 0 ? "1507238691740-187a5b1d37b8" : "1516321318423-f06f85e504b3"}?w=1200&auto=format&fit=crop&q=80`} 
             className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" 
             alt="Blog Cover"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent opacity-60"></div>
        </div>

        {/* Content */}
        <article className="prose prose-invert prose-emerald max-w-none">
          {content}
        </article>

        {/* Footer / newsletter CTA */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-gray-900 to-black border border-white/10 text-center">
           <h3 className="text-2xl font-bold text-white mb-4">Enjoyed this article?</h3>
           <p className="text-gray-400 mb-8">Join 15,000+ developers getting the best career advice weekly.</p>
           <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input type="email" placeholder="Enter your email" className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-emerald-500 transition-all flex-grow" />
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">Subscribe</button>
           </div>
        </div>
      </div>
    </main>
  );
}
