"use client";
import React, { useState } from "react";
import { useToast } from "@/context/ToastContext";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5001';

export default function SignUpPage() {
  const { error: toastError, success } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [role, setRole] = useState("candidate"); // 'candidate' | 'recruiter'
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    // Client-side validation
    if (!name.trim() || !email.trim() || !password) {
      toastError("Please fill all required fields.");
      return;
    }
    if (password.length < 6) {
      toastError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
        toastError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5001';
      const res = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, role }),
      });

      let data;
      const contentType = res.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();
        throw new Error(text || "Signup failed");
      }

      if (!res.ok) {
        throw new Error(data?.message || "Signup failed");
      }

      success("Account created! Redirecting to login...");
      setName("");
      setEmail("");
      setPassword("");
      setConfirm("");
      
      // Redirect to login
      setTimeout(() => {
          window.location.href = "/login";
      }, 1500);
    } catch (err) {
        toastError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center py-16">
      <div className="w-full max-w-md p-6 rounded-lg bg-[#111111] border border-white/6 shadow-sm">
        <h1 className="font-head text-2xl mb-2">Create an account</h1>
        <p className="text-sm text-gray-400 mb-4 font-main">
          Sign up to apply for jobs & chat with recruiters.
        </p>
        
        {/* Role Helper */}
        <div className="flex bg-[#0d0d0d] p-1 rounded-lg border border-white/10 mb-6">
            <button 
              type="button" 
              onClick={() => setRole('candidate')}
              className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${role === 'candidate' ? 'bg-emerald-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
                🎓 Candidate
            </button>
            <button 
              type="button" 
              onClick={() => setRole('recruiter')}
              className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${role === 'recruiter' ? 'bg-emerald-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
                🏢 Recruiter
            </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-sm font-main text-gray-300">Full name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 bg-transparent border border-white/6 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/30"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="text-sm font-main text-gray-300">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 bg-transparent border border-white/6 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/30"
              placeholder="you@example.com"
              type="email"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-main text-gray-300">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 bg-transparent border border-white/6 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/30"
                placeholder="At least 6 characters"
                type="password"
              />
            </div>
            <div>
              <label className="text-sm font-main text-gray-300">Confirm</label>
              <input
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full mt-1 bg-transparent border border-white/6 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/30"
                placeholder="Repeat password"
                type="password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-alt text-sm"
          >
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>

        <div className="mt-4 text-sm text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="text-emerald-400 hover:underline">
            Sign in
          </a>
        </div>
      </div>
    </main>
  );
}
