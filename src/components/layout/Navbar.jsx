"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import UserMenu from "../ui/UserMenu";

export default function Navbar() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0d0d0d]/80 backdrop-blur-md border-b border-white/10 py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12 sm:h-16">
          
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center gap-2">
              <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-emerald-600 flex items-center justify-center font-bold text-lg sm:text-xl shadow-lg shadow-emerald-500/20">A</span>
              <span className="font-head font-bold text-xl sm:text-2xl tracking-tight hidden sm:block">Apthire</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/jobs" className="text-gray-300 hover:text-emerald-400 font-medium transition-colors">Jobs</Link>
            <Link href="/companies" className="text-gray-300 hover:text-emerald-400 font-medium transition-colors">Companies</Link>
            <Link href="/services" className="text-gray-300 hover:text-emerald-400 font-medium transition-colors">Services</Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            
            {/* Search Toggle */}
            <div className="relative">
              <button 
                onClick={() => setShowSearch(!showSearch)}
                className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-all"
                aria-label="Search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              
              {showSearch && (
                <div className="absolute right-0 mt-3 w-72 bg-[#111] border border-white/10 rounded-xl shadow-2xl p-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    if(searchQuery.trim()) window.location.href = `/jobs?q=${encodeURIComponent(searchQuery)}`;
                    setShowSearch(false);
                  }} className="relative">
                    <input 
                      autoFocus
                      type="text"
                      placeholder="Search jobs, skills..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-[#0d0d0d] border border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/50"
                    />
                    <button type="submit" className="absolute right-2 top-1.5 p-1 text-emerald-500 hover:text-emerald-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* User Profile / Auth */}
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="hidden sm:block">
                  <UserMenu />
                </div>
                {(user.role === 'admin' || user.role === 'recruiter') && (
                  <Link
                    href={user.role === 'admin' ? "/admin/jobs/new" : "/recruiter/jobs/new"}
                    className="hidden sm:inline-flex items-center px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-sm font-bold transition shadow-lg shadow-emerald-500/20"
                  >
                    Post Job
                  </Link>
                )}
                <div className="sm:hidden">
                    <UserMenu />
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2 sm:space-x-4">
                <Link href="/login" className="text-sm font-bold text-gray-300 hover:text-white px-3 py-2 transition">Login</Link>
                <Link href="/signup" className="text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg transition shadow-lg shadow-emerald-500/20">Sign Up</Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white rounded-lg transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`md:hidden fixed inset-x-0 top-[64px] sm:top-[80px] bg-[#0d0d0d] border-b border-white/10 transition-all duration-300 transform ${
        isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
      }`}>
        <div className="px-4 pt-2 pb-6 space-y-1">
          <Link href="/jobs" onClick={() => setIsOpen(false)} className="block px-3 py-4 text-base font-medium text-gray-300 hover:text-emerald-400 hover:bg-white/5 rounded-lg transition">Jobs List</Link>
          <Link href="/companies" onClick={() => setIsOpen(false)} className="block px-3 py-4 text-base font-medium text-gray-300 hover:text-emerald-400 hover:bg-white/5 rounded-lg transition">Explore Companies</Link>
          <Link href="/services" onClick={() => setIsOpen(false)} className="block px-3 py-4 text-base font-medium text-gray-300 hover:text-emerald-400 hover:bg-white/5 rounded-lg transition">Our Services</Link>
          {user && (user.role === 'admin' || user.role === 'recruiter') && (
            <Link href={user.role === 'admin' ? "/admin/jobs/new" : "/recruiter/jobs/new"} onClick={() => setIsOpen(false)} className="block px-3 py-4 text-base font-medium text-emerald-400 hover:bg-emerald-400/10 rounded-lg transition">Post a Job</Link>
          )}
        </div>
      </div>
    </header>
  );
}
