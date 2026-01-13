import React from "react";
import Link from "next/link";
import Logo from "../ui/Logo";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-gray-400 py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          
          {/* Brand Col */}
          <div className="col-span-2 lg:col-span-2">
            <Logo size="md" className="mb-4" />
            <p className="text-sm max-w-xs mb-6">
              Empowering Indian tech talent to secure high-paying overseas roles. Bridge the gap between India and the global startup ecosystem.
            </p>
            <div className="flex space-x-4">
              {['twitter', 'github', 'linkedin'].map(social => (
                <a key={social} href="#" className="hover:text-emerald-500 transition-colors">
                  <span className="sr-only">{social}</span>
                  <div className="w-5 h-5 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20">
                     {/* Dynamic Icon placeholder or SVGs can go here */}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Links Col 1 */}
          <div>
            <h3 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/jobs" className="hover:text-emerald-400 transition-colors">Browse Jobs</Link></li>
              <li><Link href="/companies" className="hover:text-emerald-400 transition-colors">Companies</Link></li>
              <li><Link href="/services" className="hover:text-emerald-400 transition-colors">Our Services</Link></li>
              <li><Link href="/pricing" className="hover:text-emerald-400 transition-colors">Pricing</Link></li>
              <li><Link href="/post-job" className="hover:text-emerald-400 transition-colors">Post a Job</Link></li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div>
            <h3 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-emerald-400 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-emerald-400 transition-colors">Contact</Link></li>
              <li><Link href="/careers" className="hover:text-emerald-400 transition-colors">Careers</Link></li>
              <li><Link href="/blog" className="hover:text-emerald-400 transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Links Col 3 */}
          <div>
            <h3 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/help" className="hover:text-emerald-400 transition-colors">Help Center</Link></li>
              <li><Link href="/privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-emerald-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/faq" className="hover:text-emerald-400 transition-colors">FAQs</Link></li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs">
          <p>© {new Date().getFullYear()} Apthire. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Build for the future of work <span className="text-emerald-500">✦</span> Skill-first hiring
          </p>
        </div>
      </div>
    </footer>
  );
}
