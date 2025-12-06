// app/about/page.jsx
"use client";



/* ---------- ValueCard COMPONENT (defined first to avoid runtime errors) ---------- */
function ValueCard({ title, children }) {
  return (
    <div className="bg-[#0b0b0b] rounded-xl border border-white/5 p-6 shadow-sm">
      <h3 className="font-head text-lg font-semibold text-slate-200 mb-1">{title}</h3>
      <p className="font-main text-slate-300 leading-relaxed">{children}</p>
    </div>
  );
}

/* ---------------- MAIN ABOUT PAGE ---------------- */
export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0d0d0d] text-slate-100 py-14 px-4">
      <div className="max-w-6xl mx-auto space-y-14">
        {/* HEADER */}
        <section className="bg-[#0f0f0f] rounded-2xl border border-white/5 p-10 shadow-lg">
          <h1 className="font-head text-4xl md:text-5xl font-semibold leading-tight">
            About APTHIRE
          </h1>
          <p className="mt-4 text-slate-300 text-lg max-w-3xl font-main leading-relaxed">
            APTHIRE is a skill-first job discovery platform focused on helping freshers and
            junior developers find meaningful opportunities based on what they know — not what
            degree they hold.
          </p>
        </section>

        {/* MISSION + VISION */}
        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#0b0b0b] rounded-2xl border border-white/5 p-8 shadow-sm">
            <h2 className="font-head text-2xl mb-3">Our Mission</h2>
            <p className="text-slate-300 font-main leading-relaxed">
              To make job hunting easier, fairer, and more transparent for freshers by highlighting
              skills, practical experience, and project-based capabilities — enabling talented beginners
              to be seen and taken seriously.
            </p>
          </div>

          <div className="bg-[#0b0b0b] rounded-2xl border border-white/5 p-8 shadow-sm">
            <h2 className="font-head text-2xl mb-3">Our Vision</h2>
            <p className="text-slate-300 font-main leading-relaxed">
              To become India’s most trusted skill-first job platform, where students and entry-level
              developers can discover verified opportunities, build confidence, and apply directly to
              genuine openings — including official government listings.
            </p>
          </div>
        </section>

        {/* PURPOSE */}
        <section className="bg-[#0f0f0f] rounded-2xl border border-white/5 p-10 shadow-md">
          <h2 className="font-head text-2xl mb-4">Why APTHIRE Was Created</h2>

          <ul className="space-y-5 font-main text-slate-300 leading-relaxed">
            <li>
              <span className="text-slate-100 font-semibold">Freshers deserve visibility.</span>{" "}
              Most platforms prioritize experience or degrees. APTHIRE shifts focus to projects,
              skills, and real ability — giving beginners a fair chance.
            </li>

            <li>
              <span className="text-slate-100 font-semibold">Job discovery is confusing.</span>{" "}
              Fake listings, outdated posts, and endless searching waste time. APTHIRE highlights
              verified opportunities from trusted and official sources.
            </li>

            <li>
              <span className="text-slate-100 font-semibold">The job hunt shouldn’t feel overwhelming.</span>{" "}
              Clear filters, direct apply links, and a clean interface help users focus on the roles
              that truly match their strengths.
            </li>
          </ul>
        </section>

        {/* WHO WE HELP */}
        <section className="bg-[#0b0b0b] rounded-2xl border border-white/5 p-10 shadow-md">
          <h2 className="font-head text-2xl mb-4">Who APTHIRE Helps</h2>

          <ul className="space-y-4 font-main text-slate-300 leading-relaxed">
            <li>
              <strong className="text-slate-100">Fresh graduates</strong> seeking internships and first-job opportunities.
            </li>
            <li>
              <strong className="text-slate-100">Junior developers</strong> building real-world skills and projects.
            </li>
            <li>
              <strong className="text-slate-100">Students</strong> preparing for placements and wanting a clean, verified job list.
            </li>
            <li>
              <strong className="text-slate-100">Aspirants for government openings</strong> looking for direct, official apply links.
            </li>
          </ul>
        </section>

        {/* CORE VALUES */}
        <section className="bg-[#0f0f0f] rounded-2xl border border-white/5 p-10 shadow-lg">
          <h2 className="font-head text-2xl mb-4">Our Core Values</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <ValueCard title="Transparency">
              Every job links directly to its official source — no middlemen, no confusion.
            </ValueCard>

            <ValueCard title="Skill-First Approach">
              We prioritize skills & projects, not degrees or inflated experience requirements.
            </ValueCard>

            <ValueCard title="Simplicity">
              Clean UI and frictionless workflows — job search made effortless.
            </ValueCard>

            <ValueCard title="Authenticity">
              Genuine opportunities only — including verified government and trusted public listings.
            </ValueCard>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="text-center text-slate-500 text-sm pt-4 pb-10 font-main">
          Built with purpose by{" "}
          <span className="text-slate-300 font-medium">Anjul Rathor</span>
        </footer>
      </div>
    </main>
  );
}
