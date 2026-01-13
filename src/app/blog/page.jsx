"use client";
import React from "react";
import Link from "next/link";
import { BookOpen, Calendar, User, ArrowRight } from "lucide-react";

export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: "The Rise of Skill-First Hiring in 2026",
      excerpt: "Why top startups are ditching traditional resume screens for practical skill assessments.",
      author: "Anjul Rathor",
      date: "Jan 12, 2026",
      category: "Trends",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: 2,
      title: "How to Build a Portfolio that Actually Gets You Hired",
      excerpt: "Focus on these 3 things to make your GitHub projects stand out to technical recruiters.",
      author: "Sarah Chen",
      date: "Jan 10, 2026",
      category: "Career Advice",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: 3,
      title: "Mastering the Technical Interview without a CS Degree",
      excerpt: "Proven strategies for self-taught developers to excel in algorithm and system design rounds.",
      author: "Marcus Brown",
      date: "Jan 05, 2026",
      category: "Engineering",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60"
    }
  ];

  return (
    <main className="min-h-screen bg-[#0d0d0d] pt-28 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-head font-black text-white mb-6 tracking-[-0.04em] leading-tight">
            Insights & <br />
            <span className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500 bg-clip-text text-transparent">Stories</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-main">
            Latest trends in remote recruitment, engineering culture, and career growth for the modern Indian developer.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {posts.map((post) => (
            <div key={post.id} className="group bg-[#111] border border-white/5 rounded-3xl overflow-hidden hover:border-emerald-500/30 transition-all">
              <div className="aspect-video w-full overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 bg-emerald-600/10 text-emerald-500 text-xs font-bold rounded-full uppercase tracking-wider">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1 text-gray-500 text-xs">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors leading-tight">
                  {post.title}
                </h3>
                <p className="text-gray-400 text-sm mb-8 font-main line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto border-t border-white/5 pt-6">
                   <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-xs">{post.author[0]}</div>
                      <span className="text-xs text-gray-300 font-medium">{post.author}</span>
                   </div>
                   <Link href={`/blog/${post.id}`} className="text-emerald-400 hover:text-emerald-300 transition-colors">
                      <ArrowRight className="w-5 h-5" />
                   </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="bg-emerald-600 rounded-3xl p-12 text-center text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full"></div>
           <h3 className="text-3xl font-bold mb-4 font-head">Subscribe to our newsletter</h3>
           <p className="mb-8 opacity-90 max-w-lg mx-auto">Get the latest career advice and job opportunities delivered straight to your inbox every week.</p>
           <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto relative z-10">
              <input 
                type="email" 
                placeholder="you@example.com"
                className="flex-grow px-6 py-3 rounded-xl bg-white/20 border border-white/10 placeholder:text-white/60 outline-none focus:bg-white/30 transition-all"
              />
              <button className="bg-white text-emerald-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition">
                Subscribe
              </button>
           </div>
        </div>
      </div>
    </main>
  );
}
