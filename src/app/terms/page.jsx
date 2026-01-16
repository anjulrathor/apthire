"use client";
import React from "react";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#0d0d0d] text-white py-16 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="border-b border-white/10 pb-8">
          <h1 className="text-4xl font-bold font-head text-emerald-400 mb-2">Terms of Service</h1>
          <p className="text-gray-400">Last Updated: January 16, 2026</p>
        </header>

        <section className="space-y-4 text-gray-300 font-main leading-relaxed">
          <h2 className="text-2xl font-bold text-white font-head">1. Acceptance of Terms</h2>
          <p>
            By accessing or using Apthire ("the Platform"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
          </p>

          <h2 className="text-2xl font-bold text-white font-head mt-8">2. Description of Service</h2>
          <p>
            Apthire is a recruitment platform connecting job seekers ("Candidates") with employers and recruiters ("Recruiters"). We provide tools for job posting, application management, and profile creation.
          </p>

          <h2 className="text-2xl font-bold text-white font-head mt-8">3. User Accounts</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>You must be at least 18 years old to use this Platform.</li>
            <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
            <li>You agree to provide accurate, current, and complete information during registration and profile creation.</li>
            <li>We reserve the right to suspend or terminate accounts that violate these terms or engage in fraudulent activity.</li>
          </ul>

          <h2 className="text-2xl font-bold text-white font-head mt-8">4. User Conduct</h2>
          <p>You agree NOT to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Post false, misleading, or discriminatory job listings or profiles.</li>
            <li>Use the Platform for any illegal purpose or unsolicited marketing (spam).</li>
            <li>Attempt to interfere with the proper working of the Platform or compromise its security.</li>
            <li>Scrape or collect data from the Platform without our express written permission.</li>
          </ul>

          <h2 className="text-2xl font-bold text-white font-head mt-8">5. Content and Intellectual Property</h2>
          <p>
            You retain ownership of the content (resumes, job posts) you submit. However, you grant Apthire a non-exclusive license to use, display, and distribute this content for the purpose of operating the Platform. All Platform branding, code, and design are owned by Apthire.
          </p>

          <h2 className="text-2xl font-bold text-white font-head mt-8">6. Validation and Google OAuth</h2>
          <p>
            Our service offers authentication via Google. By using this feature, you authorize us to access your Google profile information (name, email, photo) in accordance with our Privacy Policy.
          </p>

          <h2 className="text-2xl font-bold text-white font-head mt-8">7. Limitation of Liability</h2>
          <p>
            Apthire is provided "as is" without warranties of any kind. We are not responsible for the accuracy of user-submitted content or the outcome of any job application or hiring process initiated through the Platform.
          </p>

          <h2 className="text-2xl font-bold text-white font-head mt-8">8. Changes to Terms</h2>
          <p>
            We may modify these terms at any time. We will notify users of significant changes. Continued use of the Platform after changes constitutes acceptance of the new terms.
          </p>

          <h2 className="text-2xl font-bold text-white font-head mt-8">9. Contact</h2>
          <p>
            For any legal notices or questions regarding these terms, please contact: anjulrathor.dev@gmail.com
          </p>
        </section>
      </div>
    </main>
  );
}
