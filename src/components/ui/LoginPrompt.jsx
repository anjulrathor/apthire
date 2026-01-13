"use client";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { X, Sparkles } from "lucide-react";

export default function LoginPrompt() {
  const { user, loading } = useAuth();
  const [show, setShow] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // List of pages where the prompt should appear
    const activePages = ["/", "/jobs", "/companies", "/services"];
    
    // Don't show on login/signup pages or if user is already logged in
    if (loading || user || !activePages.includes(pathname)) {
      setShow(false);
      return;
    }

    // Check if the prompt was recently dismissed (within last 60 seconds)
    const dismissedAt = sessionStorage.getItem("login-prompt-dismissed-at");
    const now = Date.now();
    
    if (dismissedAt && (now - parseInt(dismissedAt)) < 60000) return;

    // Show after 6 seconds
    const timer = setTimeout(() => {
      setShow(true);
    }, 6000);

    return () => clearTimeout(timer);
  }, [user, loading, pathname]);

  const handleDismiss = () => {
    setShow(false);
    sessionStorage.setItem("login-prompt-dismissed-at", Date.now().toString());
  };

  const handleRedirect = (path) => {
    setShow(false);
    router.push(path);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] animate-in slide-in-from-bottom-5 duration-500">
      <div className="w-80 bg-[#111] border border-emerald-500/30 rounded-2xl p-6 shadow-2xl shadow-emerald-500/10 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl"></div>
        
        <button 
          onClick={handleDismiss}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-emerald-500/20 rounded-lg">
            <Sparkles className="w-5 h-5 text-emerald-500" />
          </div>
          <h4 className="font-bold text-white font-head">Ready to start?</h4>
        </div>

        <p className="text-sm text-gray-400 mb-6 font-main">
          Unlock the full potential of Apthire. Sign in to apply for jobs and showcase your skills to top companies.
        </p>

        <div className="space-y-3">
          <button 
            onClick={() => handleRedirect("/signup")}
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-sm transition shadow-lg shadow-emerald-500/20"
          >
            Create Free Account
          </button>
          <button 
            onClick={() => handleRedirect("/login")}
            className="w-full py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-lg font-bold text-sm transition border border-white/5"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
