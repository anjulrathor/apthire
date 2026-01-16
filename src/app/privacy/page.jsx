"use client";
import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#0d0d0d] text-white py-16 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="border-b border-white/10 pb-8">
          <h1 className="text-4xl font-bold font-head text-emerald-400 mb-2">Privacy Policy</h1>
          <p className="text-gray-400">Last Updated: January 16, 2026</p>
        </header>

        <section className="space-y-4 text-gray-300 font-main leading-relaxed">
          <h2 className="text-2xl font-bold text-white font-head">1. Introduction</h2>
          <p>
            Welcome to Apthire ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. 
            This Privacy Policy explains how we collect, use, and safeguard your data when you use our platform, including our website and services.
          </p>

          <h2 className="text-2xl font-bold text-white font-head mt-8">2. Information We Collect</h2>
          <p>We collect information to provide and improve our services to you. This includes:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="text-white">Account Information:</strong> When you sign up via Google or email, we collect your name, email address, and profile picture.
            </li>
            <li>
              <strong className="text-white">Profile Data:</strong> Information you provide for your candidate or recruiter profile, such as your resume, skills, experience, education, and social links.
            </li>
            <li>
              <strong className="text-white">Usage Data:</strong> Information about how you interact with our platform, including job applications, page views, and device information.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-white font-head mt-8">3. How We Use Your Information</h2>
          <p>We use your data for the following purposes:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>To provide, maintain, and improve our recruitment platform.</li>
            <li>To authenticate your identity and manage your account.</li>
            <li>To facilitate job Matching: Connecting candidates with recruiters and vice versa.</li>
            <li>To communicate with you regarding your account, updates, or support inquiries.</li>
            <li>To ensure the security and integrity of our platform.</li>
          </ul>

          <h2 className="text-2xl font-bold text-white font-head mt-8">4. Data Sharing and Third Parties</h2>
          <p>
            We do not sell your personal data. We may share your information only in the following circumstances:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="text-white">With Recruiters/Companies:</strong> If you are a candidate, your profile and resume are visible to verified recruiters when you apply for jobs or if your profile is public.
            </li>
            <li>
              <strong className="text-white">Service Providers:</strong> We use trusted third-party services (e.g., database hosting, authentication) to operate our platform. They are bound by confidentiality agreements.
            </li>
            <li>
              <strong className="text-white">Legal compliance:</strong> We may disclose information if required by law or to protect our rights.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-white font-head mt-8">5. Google User Data</h2>
          <p>
            Our use and transfer to any other app of information received from Google APIs will adhere to the 
            <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline mx-1">
              Google API Services User Data Policy
            </a>, including the Limited Use requirements.
          </p>
        
          <h2 className="text-2xl font-bold text-white font-head mt-8">6. Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your data. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2 className="text-2xl font-bold text-white font-head mt-8">7. Your Rights</h2>
          <p>
            You have the right to access, update, or delete your personal information. You can manage your profile settings directly within the app or contact us to request data deletion.
          </p>

          <h2 className="text-2xl font-bold text-white font-head mt-8">8. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at: anjulrathor.dev@gmail.com
          </p>
        </section>
      </div>
    </main>
  );
}
