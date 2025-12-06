// components/Footer.jsx
import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-emerald-700 text-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">

          {/* Brand */}
          <div className="space-y-3">
            <Link href="/" className="inline-block">
              <span className="inline-flex items-center gap-2">
                <span
                  aria-hidden
                  className="w-10 h-10 rounded-md bg-emerald-800 flex items-center justify-center font-semibold"
                >
                  A
                </span>
                <span className="text-lg font-semibold">Apthire</span>
              </span>
            </Link>
            <p className="text-sm text-emerald-50/90 max-w-xs">
              Simple, skill-first hiring — built for freshers and startups.
            </p>
            <div className="flex items-center gap-3 mt-2">
              <a
                href="#"
                aria-label="Twitter"
                className="p-2 rounded-md hover:bg-emerald-800/60"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 5.92c-.64.28-1.32.47-2.04.56.73-.44 1.28-1.13 1.54-1.96-.69.41-1.45.71-2.26.87A3.5 3.5 0 0012.5 8c0 .27.03.53.09.78C8.12 8.6 5 6.5 2.87 3.4c-.3.52-.48 1.13-.48 1.78 0 1.23.63 2.31 1.59 2.95-.59-.02-1.14-.18-1.62-.45v.05c0 1.72 1.22 3.16 2.83 3.49-.3.08-.61.12-.94.12-.23 0-.45-.02-.67-.06.45 1.4 1.75 2.42 3.29 2.45A7.02 7.02 0 012 19.54 9.9 9.9 0 008.6 21c6.69 0 10.35-5.55 10.35-10.35v-.47c.72-.53 1.34-1.2 1.83-1.96-.66.3-1.36.5-2.09.59z" />
                </svg>
              </a>

              <a
                href="#"
                aria-label="GitHub"
                className="p-2 rounded-md hover:bg-emerald-800/60"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .5C5.65.5.5 5.66.5 12.02c0 5.08 3.29 9.39 7.86 10.92.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.35-1.3-1.71-1.3-1.71-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.56-.29-5.26-1.28-5.26-5.71 0-1.26.45-2.29 1.2-3.1-.12-.3-.52-1.52.11-3.17 0 0 .98-.31 3.21 1.18a11.1 11.1 0 015.84 0c2.23-1.5 3.21-1.18 3.21-1.18.63 1.65.23 2.87.11 3.17.75.81 1.2 1.84 1.2 3.1 0 4.44-2.71 5.42-5.29 5.7.42.36.8 1.08.8 2.18 0 1.57-.01 2.83-.01 3.22 0 .31.21.68.8.56A10.53 10.53 0 0023.5 12.02C23.5 5.66 18.35.5 12 .5z" />
                </svg>
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="p-2 rounded-md hover:bg-emerald-800/60"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.45 20.45h-3.55v-5.4c0-1.29-.02-2.96-1.8-2.96-1.8 0-2.07 1.4-2.07 2.86v5.5H9.44V9h3.41v1.56h.05c.48-.9 1.65-1.85 3.4-1.85 3.64 0 4.31 2.4 4.31 5.52v6.77zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.11 20.45H3.56V9h3.55v11.45z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="flex justify-between sm:col-span-2">
            <div>
              <h4 className="text-sm font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/jobs" className="hover:underline">
                    Browse Jobs
                  </Link>
                </li>
                <li>
                  <Link href="/post-job" className="hover:underline">
                    Post a Job
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:underline">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:underline">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div className="mt-6 sm:mt-0">
              <h4 className="text-sm font-semibold mb-3">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t border-emerald-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm text-emerald-50/90">
          <div>© {new Date().getFullYear()} Apthire. All rights reserved.</div>
          <div className="text-xs">Built for freshers • Skill-first hiring</div>
        </div>
      </div>
    </footer>
  );
}
