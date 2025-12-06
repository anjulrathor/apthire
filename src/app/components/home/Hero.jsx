"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useMotionValue, animate } from "framer-motion";

/**
 * components/Hero.jsx (updated)
 *
 * Changes:
 * - Uses Framer Motion to animate stats smoothly when values change.
 * - Slower chip rotation (30s) and smoother visual behavior.
 * - Experience select replaced with styled native select + CSS to avoid white-on-white issue.
 * - When chips active, search input gets emerald outline.
 * - Stats persist in localStorage and still simulate day-based growth.
 *
 * Requirements:
 * - Install framer-motion: `npm install framer-motion`
 *
 * Paste this file as components/Hero.jsx (replacing previous).
 */

/* -------------------- CONFIG -------------------- */
const CHIP_POOL = ["React", "Node", "Frontend", "MERN", "Remote", "Vue", "Angular", "Django", "Express"];
const VISIBLE_CHIP_COUNT = 5;
// rotate chips every 30 seconds (slower)
const ROTATE_INTERVAL_MS = 30000;
// live increment every 60 seconds (demo)
const LIVE_INCREMENT_INTERVAL_MS = 60000;
// per-day growth simulation
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

/* -------------------- HELPERS -------------------- */
function randBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function formatCompact(n) {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M+`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k+`;
  return `${n}+`;
}

/* -------------------- AnimatedNumber (Framer) -------------------- */
function AnimatedNumber({ value, format = (v) => v, duration = 0.9, className = "" }) {
  const mv = useMotionValue(value);
  const [display, setDisplay] = useState(() => Math.round(value));

  useEffect(() => {
    const controls = animate(mv, value, {
      duration,
      ease: [0.2, 0.8, 0.2, 1],
    });
    const unsub = mv.on("change", (v) => setDisplay(Math.round(v)));
    return () => {
      unsub();
      controls.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return <div className={className}>{format(display)}</div>;
}

/* -------------------- HERO -------------------- */
export default function Hero() {
  const [query, setQuery] = useState("");
  const [experience, setExperience] = useState("any");
  const [location, setLocation] = useState("");
  const [activeTags, setActiveTags] = useState([]);

  const [chipStartIndex, setChipStartIndex] = useState(() => {
    try {
      const saved = parseInt(localStorage.getItem(LS_KEYS.chipIndex) || "0", 10);
      return Number.isFinite(saved) ? saved : 0;
    } catch {
      return 0;
    }
  });

  const [stats, setStats] = useState(() => ({
    jobs: 1200,
    companies: 850,
    applications: 5000,
  }));

  const visibleChips = useMemo(() => {
    const pool = CHIP_POOL;
    const res = [];
    for (let i = 0; i < VISIBLE_CHIP_COUNT; i++) {
      res.push(pool[(chipStartIndex + i) % pool.length]);
    }
    return res;
  }, [chipStartIndex]);

  /* --- load saved stats + day-based growth --- */
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(LS_KEYS.stats) || "null");
      const savedDate = localStorage.getItem(LS_KEYS.statsDate);
      if (saved && savedDate) {
        const prev = saved;
        const prevDate = new Date(savedDate);
        const now = new Date();
        const dayDiff = Math.floor((now - prevDate) / (1000 * 60 * 60 * 24));
        let updated = { ...prev };
        if (dayDiff > 0) {
          for (let d = 0; d < dayDiff; d++) {
            updated.jobs += randBetween(...PER_DAY_GROWTH.jobs);
            updated.companies += randBetween(...PER_DAY_GROWTH.companies);
            updated.applications += randBetween(...PER_DAY_GROWTH.applications);
          }
        }
        setStats(updated);
        localStorage.setItem(LS_KEYS.stats, JSON.stringify(updated));
        localStorage.setItem(LS_KEYS.statsDate, new Date().toISOString());
      } else {
        localStorage.setItem(LS_KEYS.stats, JSON.stringify(stats));
        localStorage.setItem(LS_KEYS.statsDate, new Date().toISOString());
      }
    } catch {
      localStorage.setItem(LS_KEYS.stats, JSON.stringify(stats));
      localStorage.setItem(LS_KEYS.statsDate, new Date().toISOString());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* --- live increments (slower, every minute) --- */
  useEffect(() => {
    const id = setInterval(() => {
      setStats((prev) => {
        const next = {
          jobs: prev.jobs + randBetween(0, 3),
          companies: prev.companies + (Math.random() < 0.02 ? 1 : 0),
          applications: prev.applications + randBetween(1, 12),
        };
        localStorage.setItem(LS_KEYS.stats, JSON.stringify(next));
        localStorage.setItem(LS_KEYS.statsDate, new Date().toISOString());
        return next;
      });
    }, LIVE_INCREMENT_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  /* --- rotate chips (slower) --- */
  useEffect(() => {
    const id = setInterval(() => {
      setChipStartIndex((i) => {
        const next = (i + 1) % CHIP_POOL.length;
        try {
          localStorage.setItem(LS_KEYS.chipIndex, String(next));
        } catch {}
        return next;
      });
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  function toggleTag(tag) {
    setActiveTags((prev) => {
      const next = prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag];
      if (!prev.includes(tag)) {
        setQuery((q) => (q ? `${q} ${tag}` : tag));
      }
      return next;
    });
  }

  function onSearch(e) {
    e.preventDefault();
    console.log("Search", { query, experience, location, activeTags });
  }

  return (
    <section className="w-full bg-[#0d0d0d] text-white">
      {/* small global CSS to style select/options for dark dropdown to avoid white-on-white */}
      <style jsx global>{`
        /* Ensure native select and options are dark in the dropdown where browser allows */
        select.experience-select {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          background: transparent;
          color: #fff;
        }
        select.experience-select option {
          background-color: #0d0d0d;
          color: #fff;
        }
        /* small arrow replacement for select */
        .select-wrapper {
          position: relative;
        }
        .select-wrapper::after {
          content: "";
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          width: 8px;
          height: 8px;
          border-right: 2px solid rgba(255,255,255,0.8);
          border-bottom: 2px solid rgba(255,255,255,0.8);
          transform: translateY(-50%) rotate(45deg);
          pointer-events: none;
        }
      `}</style>

      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="flex flex-col items-center text-center gap-6">
          <div>
            <h1 className="font-head text-3xl sm:text-4xl md:text-5xl leading-tight">
              Find skill-first jobs — fast.
            </h1>
            <p className="mt-4 text-gray-300 max-w-2xl font-main mx-auto">
              Apthire helps freshers and junior developers get hired on skills and projects — not degrees.
              Search roles, filter by experience and location, and apply with confidence.
            </p>
          </div>

          {/* Search card centered */}
          <form
            onSubmit={onSearch}
            className="w-full bg-[#111111] border border-white/6 rounded-lg p-4 shadow-sm"
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-center">
              {/* Query */}
              <div className="flex-1 min-w-0">
                <label className="sr-only">Job title or skill</label>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Job title or skill (eg. React, MERN, API)"
                  className={`w-full bg-transparent border border-white/6 rounded-md px-3 py-2 placeholder:text-gray-400 focus:outline-none focus:ring-2 ${
                    activeTags.length > 0 ? "focus:ring-emerald-500/60 border-emerald-500/40" : "focus:ring-emerald-500/30"
                  } font-main text-sm`}
                />
              </div>

              {/* Experience - styled select */}
              <div className="w-full md:w-36 select-wrapper">
                <label className="sr-only">Experience</label>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="experience-select w-full border border-white/6 rounded-md px-3 py-2 font-main text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 bg-transparent"
                >
                  <option value="any">Experience</option>
                  <option value="0">Fresher</option>
                  <option value="0-1">0 - 1 yr</option>
                  <option value="1-2">1 - 2 yrs</option>
                  <option value="2-4">2 - 4 yrs</option>
                  <option value="2-4">4 - 6 yrs</option>
                  <option value="2-4">6  - 8 yrs</option>
                  <option value="2-4">10+ yrs</option>
                </select>
              </div>

              {/* Location */}
              <div className="w-full md:w-56">
                <label className="sr-only">Location</label>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Location (eg. Delhi, Remote)"
                  className="w-full bg-transparent border border-white/6 rounded-md px-3 py-2 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 font-main text-sm"
                />
              </div>

              {/* Search button - fixed size and aligned */}
              <div className="flex-shrink-0">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-alt text-sm transition"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="11" cy="11" r="6" strokeWidth="2" />
                    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
                  </svg>
                  Search
                </button>
              </div>
            </div>

            {/* Active filters summary (centered, live) */}
            <div className="mt-3 flex flex-wrap justify-center items-center gap-2">
              {query && (
                <div className="inline-flex items-center gap-2 bg-white/6 px-3 py-1 rounded text-sm font-main">
                  <strong className="font-semibold text-white">Query:</strong>
                  <span className="text-gray-200 truncate max-w-xs">{query}</span>
                </div>
              )}

              {location && (
                <div className="inline-flex items-center gap-2 bg-white/6 px-3 py-1 rounded text-sm font-main">
                  <strong className="font-semibold text-white">Location:</strong>
                  <span className="text-gray-200">{location}</span>
                </div>
              )}

              {experience !== "any" && (
                <div className="inline-flex items-center gap-2 bg-white/6 px-3 py-1 rounded text-sm font-main">
                  <strong className="font-semibold text-white">Exp:</strong>
                  <span className="text-gray-200">{experience}</span>
                </div>
              )}

              {activeTags.length > 0 &&
                activeTags.map((t) => (
                  <button
                    key={t}
                    onClick={() => toggleTag(t)}
                    type="button"
                    className="inline-flex items-center gap-2 bg-emerald-600 text-white px-3 py-1 rounded text-sm font-main"
                  >
                    {t}
                    <span className="text-xs text-emerald-100/80">×</span>
                  </button>
                ))}

              {(query || location || experience !== "any" || activeTags.length > 0) && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setLocation("");
                    setExperience("any");
                    setActiveTags([]);
                  }}
                  className="ml-1 text-sm text-gray-400 hover:text-gray-200"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick tags (centered, rotating) */}
            <div className="mt-3 flex justify-center flex-wrap gap-2">
              {visibleChips.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded-md text-sm font-main transition ${
                    activeTags.includes(tag)
                      ? "bg-emerald-600 text-white"
                      : "bg-white/6 text-gray-200 hover:bg-white/10"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </form>

          {/* Stats centered and animated */}
          <div className="mt-8 flex flex-wrap justify-center gap-8 text-center">
            <div className="min-w-[90px]">
              <AnimatedNumber value={stats.jobs} format={formatCompact} className="font-head text-2xl sm:text-3xl text-white" />
              <div className="text-sm font-main text-gray-300">Jobs live</div>
            </div>

            <div className="min-w-[90px]">
              <AnimatedNumber value={stats.companies} format={formatCompact} className="font-head text-2xl sm:text-3xl text-white" />
              <div className="text-sm font-main text-gray-300">Companies</div>
            </div>

            <div className="min-w-[90px]">
              <AnimatedNumber value={stats.applications} format={formatCompact} className="font-head text-2xl sm:text-3xl text-white" />
              <div className="text-sm font-main text-gray-300">Applications</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
