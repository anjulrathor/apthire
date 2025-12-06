"use client";

import { useEffect, useState } from "react";

/**
 * Redesigned Contact Page
 * - Centered modern layout (single-column on mobile, two-column on desktop)
 * - Cleaner contact card, compact contact methods, and improved form UX
 * - Success toast, inline validation, accessible labels
 * - Uses your dark theme + emerald accent
 *
 * This is still UI-only (no server). Replace fake send with API call when ready.
 */

const EMAIL = "hello@anjulrathor.com";
const WEBSITE = "https://anjulrathor.com";
const LINKEDIN = "https://www.linkedin.com/in/anjulrathor";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // null | 'ok' | 'error'
  const [errorMsg, setErrorMsg] = useState("");

  // small toast auto-hide
  useEffect(() => {
    if (status === "ok") {
      const t = setTimeout(() => setStatus(null), 4500);
      return () => clearTimeout(t);
    }
    if (status === "error") {
      const t = setTimeout(() => setStatus(null), 6000);
      return () => clearTimeout(t);
    }
  }, [status]);

  function resetForm() {
    setName("");
    setEmail("");
    setMessage("");
    setErrorMsg("");
  }

  function validateEmail(e) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus(null);
    setErrorMsg("");

    // basic validation
    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMsg("Please fill all fields.");
      setStatus("error");
      return;
    }
    if (!validateEmail(email.trim())) {
      setErrorMsg("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    // simulate send
    try {
      setLoading(true);
      // simulate network latency
      await new Promise((r) => setTimeout(r, 700));
      // demo success
      setStatus("ok");
      resetForm();
    } catch (err) {
      setErrorMsg("Failed to send message. Try again.");
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0d0d0d] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Center container */}
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="font-head text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
            Get in touch
          </h1>
          <p className="mt-3 text-slate-400 max-w-2xl mx-auto font-main">
            Questions, feedback or partnership ideas — we’re listening. Drop a message and we'll get back to you
            as soon as possible.
          </p>
        </header>

        {/* Layout: Form (left) + Contact Card (right) */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Form column (span 2 on large) */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-[#0f0f0f] border border-[rgba(255,255,255,0.04)] p-6 sm:p-8 shadow-md">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-head text-2xl font-semibold">Send a message</h2>
                  <p className="mt-1 text-sm text-slate-400 font-main">
                    Use this form or email us directly. This demo page handles UI only.
                  </p>
                </div>

                {/* compact contact quick action */}
                <a
                  href={`mailto:${EMAIL}`}
                  className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-md bg-[#062014] border border-[rgba(255,255,255,0.04)] text-sm"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M3 8.5v7a2 2 0 002 2h14a2 2 0 002-2v-7" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M21 7l-9 6-9-6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Email us
                </a>
              </div>

              {/* Status toasts inside card */}
              <div className="mt-4">
                {status === "ok" && (
                  <div className="rounded-md bg-emerald-900/40 border border-emerald-700 px-4 py-3 text-emerald-200 text-sm">
                    Message sent (demo). We'll reply to your email shortly.
                  </div>
                )}
                {status === "error" && errorMsg && (
                  <div className="rounded-md bg-red-900/40 border border-red-700 px-4 py-3 text-red-300 text-sm">
                    {errorMsg}
                  </div>
                )}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-sm text-slate-300">Full name</span>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="mt-2 w-full px-4 py-3 rounded-lg bg-[#0b0b0b] border border-[rgba(255,255,255,0.05)] text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                      required
                      aria-label="Full name"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm text-slate-300">Email</span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="mt-2 w-full px-4 py-3 rounded-lg bg-[#0b0b0b] border border-[rgba(255,255,255,0.05)] text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                      required
                      aria-label="Email"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="text-sm text-slate-300">Message</span>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={6}
                    placeholder="Tell us how we can help — include links if needed."
                    className="mt-2 w-full px-4 py-3 rounded-lg bg-[#0b0b0b] border border-[rgba(255,255,255,0.05)] text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                    required
                    aria-label="Message"
                  />
                </label>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="text-sm text-slate-400">
                    Prefer email?{" "}
                    <a href={`mailto:${EMAIL}`} className="text-emerald-400 hover:underline">
                      {EMAIL}
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        resetForm();
                        setStatus(null);
                      }}
                      className="px-4 py-2 rounded-lg border border-[rgba(255,255,255,0.06)] text-sm"
                    >
                      Reset
                    </button>

                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm"
                    >
                      {loading ? "Sending…" : "Send Message"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Contact / Help card (right column) */}
          <aside>
            <div className="rounded-2xl bg-gradient-to-b from-[#07120f] to-[#071813] border border-[rgba(255,255,255,0.04)] p-6 shadow-md">
              <h3 className="text-lg font-medium mb-3">Contact & help</h3>

              {/* compact contact items */}
              <dl className="space-y-4 text-sm text-slate-300">
                <div>
                  <dt className="text-xs text-slate-400">Email</dt>
                  <dd className="mt-1">
                    <a href={`mailto:${EMAIL}`} className="font-medium text-slate-100 hover:underline">
                      {EMAIL}
                    </a>
                  </dd>
                </div>

                <div>
                  <dt className="text-xs text-slate-400">Website</dt>
                  <dd className="mt-1">
                    <a href={WEBSITE} target="_blank" rel="noreferrer" className="text-slate-100 hover:underline">
                      {WEBSITE.replace(/^https?:\/\//, "")}
                    </a>
                  </dd>
                </div>

                <div>
                  <dt className="text-xs text-slate-400">LinkedIn</dt>
                  <dd className="mt-1">
                    <a href={LINKEDIN} target="_blank" rel="noreferrer" className="text-slate-100 hover:underline">
                      anjulrathor
                    </a>
                  </dd>
                </div>

                <div>
                  <dt className="text-xs text-slate-400">Office</dt>
                  <dd className="mt-1 text-slate-100">
                    Apthire Labs (Demo) · Lucknow, Uttar Pradesh
                  </dd>
                </div>

                <div>
                  <dt className="text-xs text-slate-400">Hours</dt>
                  <dd className="mt-1 text-slate-100">Mon — Fri · 10:00 AM – 6:00 PM</dd>
                </div>
              </dl>

              <div className="mt-6 grid grid-cols-1 gap-3">
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M3 8.5v7a2 2 0 002 2h14a2 2 0 002-2v-7" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M21 7l-9 6-9-6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Email us
                </a>

                <a
                  href="/faq"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-[rgba(255,255,255,0.06)] text-sm"
                >
                  View FAQ
                </a>
              </div>
            </div>

            {/* Help / quick tips */}
            <div className="mt-6 rounded-2xl bg-[#0b0b0b] border border-[rgba(255,255,255,0.04)] p-5 text-sm text-slate-300">
              <h4 className="font-medium text-slate-100 mb-2">Quick help</h4>
              <ul className="space-y-2">
                <li>
                  <strong className="text-slate-200">Apply issues</strong>
                  <p className="text-slate-400">Open the job and click "Apply" to visit the official listing.</p>
                </li>
                <li>
                  <strong className="text-slate-200">Report a bug</strong>
                  <p className="text-slate-400">Include page URL and steps — we'll investigate.</p>
                </li>
                <li>
                  <strong className="text-slate-200">Partnerships</strong>
                  <p className="text-slate-400">Email with subject "Partnership".</p>
                </li>
              </ul>
            </div>
          </aside>
        </section>
      </div>

      {/* Floating toast (top-right) */}
      {status === "ok" && (
        <div className="fixed right-4 top-6 z-50">
          <div className="rounded-lg bg-emerald-800/90 px-4 py-2 text-emerald-100 shadow-lg">
            Message sent — thank you!
          </div>
        </div>
      )}

      {status === "error" && errorMsg && (
        <div className="fixed right-4 top-6 z-50">
          <div className="rounded-lg bg-red-800/90 px-4 py-2 text-red-100 shadow-lg">
            {errorMsg}
          </div>
        </div>
      )}
    </main>
  );
}
