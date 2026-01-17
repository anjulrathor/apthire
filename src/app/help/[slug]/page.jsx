"use client";
import React from "react";
import Link from "next/link";
import { ArrowLeft, ThumbsUp, ThumbsDown, Clock } from "lucide-react";

export default function HelpArticlePage({ params }) {
  // Safe destructuring with fallback
  const slug = params?.slug || "general-help";
  const title = decodeURIComponent(slug).replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());

  return (
    <main className="min-h-screen bg-[#0d0d0d] pt-32 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/help" className="inline-flex items-center gap-2 text-gray-400 hover:text-emerald-400 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Help Center
        </Link>

        <article className="bg-[#111] border border-white/5 rounded-3xl p-8 md:p-12">
            <header className="mb-8 pb-8 border-b border-white/5">
                <div className="flex items-center gap-3 text-emerald-500 text-xs font-bold uppercase tracking-widest mb-4">
                    <Clock className="w-4 h-4" />
                    <span>Updated 2 days ago</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-head font-bold text-white mb-6">
                    {title}
                </h1>
                <p className="text-gray-400 text-lg leading-relaxed">
                   Comprehensive guide on how to manage your {title.toLowerCase()} effectively on the Apthire platform.
                </p>
            </header>

            <div className="space-y-6 text-gray-300 leading-relaxed font-main">
                <p>
                    {title} is a core feature of the Apthire ecosystem designed to streamline your experience. Whether you are a candidate or a recruiter, understanding this workflow is essential for success.
                </p>
                
                <h3 className="text-xl font-bold text-white mt-8 mb-4">Step-by-Step Instructions</h3>
                <ol className="list-decimal pl-6 space-y-4 marker:text-emerald-500">
                    <li className="pl-2">Navigate to your main dashboard after logging in.</li>
                    <li className="pl-2">Locate the settings menu in the top-right corner.</li>
                    <li className="pl-2">Select the option corresponding to <strong>{title}</strong>.</li>
                    <li className="pl-2">Follow the on-screen prompts to complete the action.</li>
                    <li className="pl-2">Save your changes to ensure they take immediate effect.</li>
                </ol>

                <div className="bg-blue-500/10 border-l-4 border-blue-500 p-6 rounded-r-xl my-8">
                    <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                        Pro Tip
                    </h4>
                    <p className="text-blue-300 text-sm">
                        If you encounter any issues during this process, try clearing your browser cache or contact our support team immediately.
                    </p>
                </div>

                <h3 className="text-xl font-bold text-white mt-8 mb-4">Common Issues</h3>
                <p>
                    Occasionally users may face delays if their internet connection is unstable. Ensure you have a strong connection before initiating this task.
                </p>
            </div>

            <footer className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
                <div className="text-gray-400 text-sm font-bold">Was this article helpful?</div>
                <div className="flex gap-4">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-emerald-600/20 text-white rounded-lg transition-colors group">
                        <ThumbsUp className="w-4 h-4 group-hover:text-emerald-500" /> Yes
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-red-600/20 text-white rounded-lg transition-colors group">
                        <ThumbsDown className="w-4 h-4 group-hover:text-red-500" /> No
                    </button>
                </div>
            </footer>
        </article>
      </div>
    </main>
  );
}
