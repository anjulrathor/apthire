"use client";
import React, { useMemo, useState } from "react";
import Image from "next/image";

/**
 * JobsList.jsx
 * - Drop into /components
 * - Uses Tailwind + your global fonts/colors
 * - Works with sample data; later replace `jobsData` with API data
 */

const jobsData = [
  {
    id: 1,
    title: "Junior MERN Developer",
    company: "Acme Labs",
    logo: "/logo-acme.png", // replace or use /logo.png
    skills: ["React", "Node", "MongoDB"],
    exp: "0-1 yrs",
    location: "Remote",
    salary: "₹18k - ₹25k",
    postedAt: "3 days ago",
  },
  {
    id: 2,
    title: "Frontend Intern (React)",
    company: "Startup X",
    logo: "/logo-startupx.png",
    skills: ["React", "Tailwind"],
    exp: "0 yrs",
    location: "Delhi",
    salary: "Internship",
    postedAt: "1 day ago",
  },
  {
    id: 3,
    title: "Backend Developer (Node.js)",
    company: "TechWorks",
    logo: "/logo-techworks.png",
    skills: ["Node", "Express", "MongoDB"],
    exp: "1-2 yrs",
    location: "Bengaluru",
    salary: "₹30k - ₹45k",
    postedAt: "7 days ago",
  },
  // add more sample items as needed
];

export default function JobsList() {
  const [q, setQ] = useState("");
  const [skillFilter, setSkillFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [visible, setVisible] = useState(6); // pagination: show 6 then load more

  // all skills for quick-filter buttons
  const allSkills = useMemo(() => {
    const s = new Set();
    jobsData.forEach((j) => j.skills.forEach((k) => s.add(k)));
    return Array.from(s);
  }, []);

  const filtered = useMemo(() => {
    return jobsData.filter((job) => {
      const matchQ =
        !q ||
        job.title.toLowerCase().includes(q.toLowerCase()) ||
        job.company.toLowerCase().includes(q.toLowerCase());
      const matchSkill =
        !skillFilter || job.skills.map((s) => s.toLowerCase()).includes(skillFilter.toLowerCase());
      const matchLoc = !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase());
      return matchQ && matchSkill && matchLoc;
    });
  }, [q, skillFilter, locationFilter]);

  return (
    <section className="w-full bg-[#0d0d0d] text-white py-12">
      <div className="max-w-6xl mx-auto px-4">

        {/* header + filters */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h2 className="font-head text-2xl">Jobs</h2>
            <p className="text-sm text-gray-400 font-main">Browse latest jobs — skill-first listings.</p>
          </div>

          <div className="flex items-center gap-3">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by title or company"
              className="bg-[#111] border border-white/6 rounded-md px-3 py-2 text-sm min-w-[220px] font-main"
            />

            <input
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              placeholder="Location"
              className="bg-[#111] border border-white/6 rounded-md px-3 py-2 text-sm min-w-[160px] font-main hidden sm:block"
            />

            <select
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
              className="bg-[#111] border border-white/6 rounded-md px-3 py-2 text-sm font-main"
            >
              <option value="">All skills</option>
              {allSkills.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            <button
              onClick={() => { setQ(""); setSkillFilter(""); setLocationFilter(""); }}
              className="text-sm text-gray-400 hover:text-gray-200"
            >
              Reset
            </button>
          </div>
        </div>

        {/* quick skill chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          {allSkills.map((s) => (
            <button
              key={s}
              onClick={() => setSkillFilter(s === skillFilter ? "" : s)}
              className={`px-3 py-1 rounded-md text-sm ${
                skillFilter === s ? "bg-emerald-600 text-white" : "bg-white/6 text-gray-200 hover:bg-white/10"
              } font-main`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* job cards grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.slice(0, visible).map((job) => (
            <article key={job.id} className="bg-[#0f0f0f] border border-white/6 rounded-lg p-4 flex gap-4 items-start">
              <div className="w-14 h-14 rounded-md bg-[#111] flex items-center justify-center overflow-hidden">
                {/* show logo if available else placeholder */}
                {job.logo ? (
                  <Image src={job.logo} alt={job.company} width={56} height={56} className="object-contain" />
                ) : (
                  <div className="text-sm text-gray-400">{job.company[0]}</div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-semibold font-head truncate">{job.title}</h3>
                    <div className="text-xs text-gray-400 font-main">{job.company} · <span className="text-gray-300">{job.location}</span></div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-semibold">{job.salary}</div>
                    <div className="text-xs text-gray-400">{job.postedAt}</div>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {job.skills.map((s) => (
                    <span key={s} className="text-xs px-2 py-1 rounded-md bg-white/6 text-gray-200 font-main">{s}</span>
                  ))}
                </div>

                <div className="mt-3 flex items-center gap-3">
                  <button className="text-sm px-3 py-1 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-alt">
                    Apply
                  </button>
                  <button className="text-sm px-3 py-1 rounded-md border border-white/6 text-gray-200 font-main">
                    Save
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* load more / no results */}
        <div className="mt-6 text-center">
          {filtered.length === 0 ? (
            <div className="text-gray-400">No jobs found — try changing filters.</div>
          ) : visible < filtered.length ? (
            <button
              onClick={() => setVisible((v) => v + 6)}
              className="px-4 py-2 rounded-md bg-transparent border border-white/6 text-sm text-white font-main"
            >
              Load more
            </button>
          ) : (
            <div className="text-sm text-gray-400">End of results</div>
          )}
        </div>
      </div>
    </section>
  );
}
