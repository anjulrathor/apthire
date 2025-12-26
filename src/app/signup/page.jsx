"use client";
import React, { useState } from "react";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Client-side validation
    if (!name.trim() || !email.trim() || !password) {
      setError("Please fill all required fields.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
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
        body: JSON.stringify({ name, email, password }),
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

      setSuccess("Account created successfully. Please log in.");
      setName("");
      setEmail("");
      setPassword("");
      setConfirm("");
      
      // Redirect to login
      setTimeout(() => {
          router.push("/login");
      }, 1500);
    } catch (err) {
      setError(err.message || "Something went wrong.");
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

        {error && <div className="mb-3 text-sm text-red-400">{error}</div>}
        {success && <div className="mb-3 text-sm text-emerald-300">{success}</div>}

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
