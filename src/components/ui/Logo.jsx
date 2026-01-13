"use client";
import React from "react";
import Link from "next/link";

export default function Logo({ size = "md", className = "" }) {
  const sizes = {
    sm: { box: "w-7 h-7", text: "text-lg", char: "text-base" },
    md: { box: "w-9 h-9", text: "text-xl", char: "text-lg" },
    lg: { box: "w-11 h-11", text: "text-2xl", char: "text-xl" }
  };

  const current = sizes[size] || sizes.md;

  return (
    <Link href="/" className={`flex items-center gap-2.5 group ${className}`}>
      <div className={`relative ${current.box} flex items-center justify-center`}>
        {/* Background stylized shape */}
        <div className="absolute inset-0 bg-emerald-600 rounded-xl rotate-6 group-hover:rotate-12 transition-transform duration-300 opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300"></div>
        
        {/* The 'A' Letter */}
        <span className={`relative font-black text-white ${current.char} tracking-tighter`}>A</span>
        
        {/* Decoration */}
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full border-2 border-emerald-500 scale-0 group-hover:scale-100 transition-transform duration-300 delay-100"></div>
      </div>
      
      <span className={`font-head font-black tracking-tighter ${current.text} text-white group-hover:text-emerald-400 transition-colors hidden sm:block`}>
        Apthire<span className="text-emerald-500">.</span>
      </span>
    </Link>
  );
}
