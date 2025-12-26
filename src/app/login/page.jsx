"use client";
import React, { useState } from "react";


import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email.trim() || !password) {
      setError("Please enter email and password.");
      return;
    }

    setLoading(true);
    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5001';
      const res = await fetch(`${API_BASE_URL}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Login failed");

      // Successful login: backend should return JWT & user details
      setSuccess("Logged in successfully. Redirecting...");
      
      if (data?.token) {
        localStorage.setItem("token", data.token);
        // Store user info for global access
        localStorage.setItem("user", JSON.stringify({
            _id: data._id,
            name: data.name,
            email: data.email,
            role: data.role
        }));
      }

      // Redirect to home
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center py-16">
      <div className="w-full max-w-md p-6 rounded-lg bg-[#111111] border border-white/6 shadow-sm">
        <h1 className="font-head text-2xl mb-2">Sign in</h1>
        <p className="text-sm text-gray-400 mb-4 font-main">Access your Apthire account.</p>

        {error && <div className="mb-3 text-sm text-red-400">{error}</div>}
        {success && <div className="mb-3 text-sm text-emerald-300">{success}</div>}

        <form onSubmit={handleLogin} className="space-y-3">
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

          <div>
            <label className="text-sm font-main text-gray-300">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 bg-transparent border border-white/6 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/30"
              placeholder="Your password"
              type="password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-alt text-sm"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="mt-4 text-sm text-gray-400">
          New here?{" "}
          <a href="/signup" className="text-emerald-400 hover:underline">Create an account</a>
        </div>
      </div>
    </main>
  );
}
