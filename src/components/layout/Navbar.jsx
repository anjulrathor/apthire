"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false); 
  const [showTinySearch, setShowTinySearch] = useState(false);
  const [tinyQ, setTinyQ] = useState("");

  return (
    <header className="w-full bg-[#0d0d0d] text-white border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center h-16 gap-8">{/* ← increased gap */}

          {/* Left Section */}
          <div className="flex items-center gap-6 min-w-[200px]">{/* ← extra gap here */}
            <Link href="/" className="flex items-center gap-3">
              <Image src="/images/logo-1.png" width={106} height={66} alt="logo" />
            </Link>

            {/* Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 font-alt text-sm text-gray-300">
              <Link href="/jobs" className="hover:text-emerald-400 transition">Jobs</Link>
              <Link href="/companies" className="hover:text-emerald-400 transition">Companies</Link>
              <Link href="/services" className="hover:text-emerald-400 transition">Services</Link>
            </nav>
          </div>

          {/* Middle space */}
          <div className="flex-1" />

          {/* Right Section */}
          <div className="flex items-center gap-3">

            {/* Tiny Search Button */}
            <div className="relative">
              <button
                onClick={() => setShowTinySearch(v => !v)}
                aria-label="Search"
                className="w-9 h-9 rounded-full bg-white/6 hover:bg-white/10 flex items-center justify-center transition"
              >
                <svg className="w-4 h-4 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="6" strokeWidth="2"/>
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35"/>
                </svg>
              </button>

              {/* Tiny Search Box (Dropdown) */}
              {showTinySearch && (
                <div className="absolute right-0 mt-2 w-64 bg-[#0b0b0b] border border-white/8 rounded-md shadow-lg z-40 p-2">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      console.log("tiny search:", tinyQ);
                      setShowTinySearch(false);
                    }}
                    className="flex items-center gap-2"
                  >
                    <input
                      value={tinyQ}
                      onChange={(e) => setTinyQ(e.target.value)}
                      className="flex-1 bg-transparent outline-none px-3 py-2 text-sm placeholder:text-gray-400"
                      placeholder="Search jobs, skills…"
                      autoFocus
                    />

                    {/* FIXED: No shrinking */}
                    <button
                      type="submit"
                      className="w-10 h-10 flex-shrink-0 rounded-full bg-emerald-600 hover:bg-emerald-700 flex items-center justify-center"
                    >
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle cx="11" cy="11" r="6" strokeWidth="2"/>
                        <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35"/>
                      </svg>
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Notifications */}
            <button className="relative hover:bg-white/10 p-2 rounded-full transition">
              <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5"/>
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M13.73 21a2 2 0 01-3.46 0"/>
              </svg>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">3</span>
            </button>

            {/* Dynamic Auth Links */}
            {user ? (
              <>
                {/* User Info / Profile Link */}
                <div className="hidden md:flex items-center gap-2">
                  <span className="text-sm font-main text-gray-300">
                    Hello, <span className="text-white">{user.name}</span>
                  </span>
                </div>

                {user.role === 'admin' && (
                   <Link 
                     href="/admin"
                     className="px-3 py-1.5 rounded-md bg-purple-600 hover:bg-purple-700 text-sm font-alt transition"
                   >
                     Admin
                   </Link>
                )}

                 {/* Post Job (Admin/Recruiter only) */}
                 {(user.role === 'admin' || user.role === 'recruiter') && (
                   <Link
                    href="/post-job"
                    className="hidden sm:inline-flex items-center px-3 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-700 text-sm font-alt transition"
                  >
                    Post Job
                  </Link>
                 )}

                <button 
                  onClick={logout}
                  className="text-sm text-gray-400 hover:text-white transition"
                >
                  Logout
                </button>
                
                 {/* Avatar */}
                 <Image
                  src="/images/home/me.png"
                  alt="avatar"
                  width={36}
                  height={36}
                  className="rounded-full border border-white/10 object-cover"
                />
              </>
            ) : (
              <div className="flex items-center gap-4 text-sm font-alt">
                <Link href="/login" className="text-gray-300 hover:text-white transition">LOGIN</Link>
                <Link href="/signup" className="text-emerald-400 hover:text-emerald-300 transition">SIGNUP</Link>
              </div>
            )}

            {/* Mobile Menu Trigger */}
            <button onClick={() => setOpen(!open)} className="md:hidden p-2">
              <svg className="w-6 h-6" fill="none" stroke="white">
                {open ? (
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                ) : (
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16"/>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-[#0d0d0d] border-t border-white/10">
          <nav className="flex flex-col px-4 py-3 gap-2 font-alt text-sm">
            <Link href="/jobs" className="py-2">Jobs</Link>
            <Link href="/companies" className="py-2">Companies</Link>
            <Link href="/services" className="py-2">Services</Link>
            <Link href="/post-job" className="py-2">Post Job</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
