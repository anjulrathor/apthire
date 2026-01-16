"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useMotionValue, animate, motion } from "framer-motion";

const CHIP_POOL = ["React", "Node", "Frontend", "MERN", "Remote", "UI/UX", "Python", "Fullstack"];
const VISIBLE_CHIP_COUNT = 5;
const ROTATE_INTERVAL_MS = 20000;
const LIVE_INCREMENT_INTERVAL_MS = 60000;

const PER_DAY_GROWTH = {
  jobs: [5, 40],
  companies: [0, 3],
  applications: [10, 150],
};

const LS_KEYS = {
  stats: "apthire_stats_v1",
  statsDate: "apthire_stats_date_v1",
  chipIndex: "apthire_chip_index_v1",
};

function randBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatCompact(n) {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M+`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k+`;
  return `${n}+`;
}

function AnimatedNumber({ value, format = (v) => v, duration = 2, className = "" }) {
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(mv, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
    });
    const unsub = mv.on("change", (v) => setDisplay(Math.round(v)));
    return () => {
      unsub();
      controls.stop();
    };
  }, [value]);

  return <div className={className}>{format(display)}</div>;
}

export default function Hero() {
  const [query, setQuery] = useState("");
  const [experience, setExperience] = useState("any");
  const [location, setLocation] = useState("");
  const [activeTags, setActiveTags] = useState([]);
  const [chipStartIndex, setChipStartIndex] = useState(0);

  const [stats, setStats] = useState({
    jobs: 1240,
    companies: 862,
    applications: 5120,
  });

  const visibleChips = useMemo(() => {
    const res = [];
    for (let i = 0; i < VISIBLE_CHIP_COUNT; i++) {
      res.push(CHIP_POOL[(chipStartIndex + i) % CHIP_POOL.length]);
    }
    return res;
  }, [chipStartIndex]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(LS_KEYS.stats));
      const savedDate = localStorage.getItem(LS_KEYS.statsDate);
      if (saved && savedDate) {
        const prevDate = new Date(savedDate);
        const now = new Date();
        const dayDiff = Math.floor((now - prevDate) / (1000 * 60 * 60 * 24));
        let updated = { ...saved };
        if (dayDiff > 0) {
          for (let d = 0; d < dayDiff; d++) {
            updated.jobs += randBetween(...PER_DAY_GROWTH.jobs);
            updated.companies += randBetween(...PER_DAY_GROWTH.companies);
            updated.applications += randBetween(...PER_DAY_GROWTH.applications);
          }
        }
        setStats(updated);
        localStorage.setItem(LS_KEYS.stats, JSON.stringify(updated));
        localStorage.setItem(LS_KEYS.statsDate, now.toISOString());
      } else {
        localStorage.setItem(LS_KEYS.stats, JSON.stringify(stats));
        localStorage.setItem(LS_KEYS.statsDate, new Date().toISOString());
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setChipStartIndex((i) => (i + 1) % CHIP_POOL.length);
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  const onSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (experience !== 'any') params.set('exp', experience);
    if (location) params.set('loc', location);
    window.location.href = `/jobs?${params.toString()}`;
  };

  const toggleTag = (tag) => {
    setActiveTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
    if (!activeTags.includes(tag)) {
        setQuery(q => q ? `${q} ${tag}` : tag);
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0d0d0d] pt-20 pb-12 sm:pt-32">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05)_0%,transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Badge */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white text-[10px] font-bold mb-10 uppercase tracking-[0.2em] relative overflow-hidden group shadow-2xl"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-emerald-500/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            New: Skill-based challenges live
        </motion.div>

        {/* Hero Content */}
        <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-head text-5xl sm:text-7xl lg:text-8xl font-black text-white mb-8 leading-[1.1] tracking-[-0.04em]"
        >
            Jobs that <span className="relative inline-block">
              <span className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500 bg-clip-text text-transparent">match you.</span>
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-emerald-500/0 via-emerald-500/50 to-emerald-500/0 rounded-full"></span>
            </span><br className="hidden sm:block" /> 
            <span className="text-white/40 italic font-light text-3xl sm:text-5xl">Nothing else.</span>
        </motion.h1>

        <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-gray-400 text-lg sm:text-xl mb-12 font-main leading-relaxed"
        >
            Apthire shows you only the jobs you're meant for — based on your skills, experience, and goals. No clutter. No spam.
        </motion.p>

        {/* Search Bar */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-4xl mx-auto mb-16"
        >
            <form 
              onSubmit={onSearch}
              className="glass p-2 sm:p-3 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-2 items-stretch"
            >
              <div className="flex-grow flex items-center bg-white/5 rounded-xl border border-white/5 px-4 focus-within:border-emerald-500/50 transition-all">
                <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input 
                  type="text" 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Job title, skills, or company..."
                  className="w-full bg-transparent py-3 text-sm focus:outline-none placeholder:text-gray-600"
                />
              </div>

              <div className="flex-shrink-0 md:w-48 bg-white/5 rounded-xl border border-white/5 px-4 focus-within:border-emerald-500/50 transition-all">
                <select 
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full bg-transparent h-full py-3 text-sm focus:outline-none text-gray-400 font-main"
                >
                  <option value="any">Experience</option>
                  <option value="0">Fresher</option>
                  <option value="1-3">1-3 Years</option>
                  <option value="3-5">3-5 Years</option>
                  <option value="5+">5+ Years</option>
                </select>
              </div>

              <button 
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-xl transition shadow-lg shadow-emerald-500/20 active:scale-95"
              >
                Find my matched jobs
              </button>
            </form>

            <div className="flex flex-wrap justify-center items-center gap-3 mt-6">
              <span className="text-xs text-gray-500 font-bold uppercase tracking-wider mr-2">Hot Topics:</span>
              {visibleChips.map(tag => (
                <button 
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                    activeTags.includes(tag) 
                      ? "bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-500/20" 
                      : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/20"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-8 max-w-3xl mx-auto border-t border-white/5 pt-12"
        >
            <div>
                <AnimatedNumber value={stats.jobs} format={formatCompact} className="text-3xl sm:text-4xl font-head font-bold text-white mb-2" />
                <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">Jobs Live</p>
            </div>
            <div>
                <AnimatedNumber value={stats.companies} format={formatCompact} className="text-3xl sm:text-4xl font-head font-bold text-white mb-2" />
                <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">Companies</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
                <AnimatedNumber value={stats.applications} format={formatCompact} className="text-3xl sm:text-4xl font-head font-bold text-white mb-2" />
                <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">Applications</p>
            </div>
        </motion.div>

      </div>
    </section>
  );
}
