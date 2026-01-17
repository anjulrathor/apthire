"use client";
import React, { useState, useEffect } from "react";
import { useToast } from "@/context/ToastContext";
import { useAuth } from "@/context/AuthContext";
import Logo from "@/components/ui/Logo";

export default function SignUpPage() {
  const { error: toastError, success } = useToast();

  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [role, setRole] = useState("candidate");
  const [loading, setLoading] = useState(false);

  const [otp, setOtp] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    // Check if redirected from login for verification
    const params = new URLSearchParams(window.location.search);
    const verifyParam = params.get('verify');
    const emailParam = params.get('email');
    
    if (verifyParam === 'true' && emailParam) {
      setEmail(emailParam);
      setStep(2);
      setTimeLeft(300);
    }
  }, []); // 5 minutes in seconds

  useEffect(() => {
    if (step === 2 && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [step, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  async function handleSignup(e) {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password) {
      toastError("Please fill all required fields.");
      return;
    }
    if (password.length < 6) {
      toastError("Password must be at least 6 characters.");
      return;
    }

    // Password Complexity Check
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(password)) {
        toastError("Password must contain uppercase, lowercase, number & special char.");
        return;
    }

    if (password !== confirm) {
        toastError("Passwords do not match.");
        return;
    }

    setLoading(true);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 45000); // Increased to 45s for Render cold starts (Free Tier)

    try {
      const res = await fetch(`/api/users/register`, {
        signal: controller.signal,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, role }),
      });

      clearTimeout(timeoutId);

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

      success("OTP sent to your email!");
      setStep(2);
      setTimeLeft(300);
    } catch (err) {
        console.error("Signup error:", err);
        if (err.name === 'AbortError') {
            toastError("Server timeout. This usually happens if the backend is waking up. Please try again in a few seconds.");
        } else {
            toastError(err.message || "Signup failed. Check console for details.");
        }
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
    }
  }

  const { login } = useAuth();

  async function handleVerifyOTP(e) {
    e.preventDefault();

    if (!otp || otp.length !== 4) {
      toastError("Please enter a valid 4-digit OTP");
      return;
    }

    setVerifying(true);
    try {
      const res = await fetch(`/api/users/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Verification failed");
      }

      success("Email verified! Logging you in...");
      
      // Auto-login user
      // Construct user object similar to what login expects
      const userData = {
        _id: data._id,
        name: data.name,
        email: data.email,
        role: data.role,
        profile: data.profile 
      };
      
      login(userData, data.token);

    } catch (err) {
        toastError(err.message || "Verification failed");
    } finally {
      setVerifying(false);
    }
  }

  async function handleResendOTP() {
    setResending(true);
    try {
      const res = await fetch(`/api/users/resend-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Resend failed");
      }

      success("New OTP sent to your email!");
      setTimeLeft(300);
      setOtp("");
    } catch (err) {
        toastError(err.message || "Failed to resend OTP");
    } finally {
      setResending(false);
    }
  }

  function handleGoogleSignup() {
    window.location.href = `/api/auth/google`;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#0d0d0d] to-[#111111] text-white flex items-center justify-center px-4 py-8 sm:py-16">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <Logo size="lg" />
          </div>
          <h1 className="font-head text-3xl sm:text-4xl mb-3 bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
            {step === 1 ? "Join Apthire" : "Verify Email"}
          </h1>
          <p className="text-sm sm:text-base text-gray-400 font-main">
            {step === 1 ? "Create your account to get started" : `Enter the OTP sent to ${email}`}
          </p>
        </div>

        {/* Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#111111]/80 backdrop-blur-sm border border-white/10 shadow-2xl">
          {step === 1 ? (
            <>
              {/* Role Selector */}
              <div className="flex bg-[#0d0d0d] p-1 rounded-lg border border-white/10 mb-6">
                <button 
                  type="button" 
                  onClick={() => setRole('candidate')}
                  className={`flex-1 py-2.5 text-sm font-bold rounded-md transition-all ${
                    role === 'candidate' 
                      ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  🎓 Candidate
                </button>
                <button 
                  type="button" 
                  onClick={() => setRole('recruiter')}
                  className={`flex-1 py-2.5 text-sm font-bold rounded-md transition-all ${
                    role === 'recruiter' 
                      ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  🏢 Recruiter
                </button>
              </div>

              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <label className="text-sm font-medium font-main text-gray-300 block mb-2">
                    Full Name
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#0d0d0d] border border-white/10 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                    placeholder="Full Name"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium font-main text-gray-300 block mb-2">
                    Email Address
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#0d0d0d] border border-white/10 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                    placeholder="Enter your email"
                    type="email"
                  />
                </div>

                <div className="relative">
                  <label className="text-sm font-medium font-main text-gray-300 block mb-2">
                    Create Password
                  </label>
                  <div className="relative">
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-[#0d0d0d] border border-white/10 rounded-lg pl-4 pr-12 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                      placeholder="Min. 6 characters (A-Z, a-z, 0-9, @#$)"
                      type={showPassword ? "text" : "password"}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      )}
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <label className="text-sm font-medium font-main text-gray-300 block mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      className="w-full bg-[#0d0d0d] border border-white/10 rounded-lg pl-4 pr-12 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                      placeholder="Repeat password"
                      type={showConfirm ? "text" : "password"}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showConfirm ? (
                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-6 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                <span className="text-xs text-gray-500 font-medium">OR</span>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              </div>

              {/* Google Signup Button */}
              <button
                onClick={handleGoogleSignup}
                type="button"
                className="w-full inline-flex items-center justify-center gap-3 px-4 py-3 rounded-lg bg-white hover:bg-gray-50 text-gray-900 font-semibold text-sm border border-gray-200 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </button>
              <div className="text-center mt-2">
                <span className="text-[10px] uppercase tracking-wider text-emerald-500/80 font-bold bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20">
                  Candidates Only
                </span>
              </div>

              {/* Footer */}
              <div className="mt-6 text-center text-sm text-gray-400">
                Already have an account?{" "}
                <a href="/login" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
                  Sign in
                </a>
              </div>
            </>
          ) : (
            <>
              {/* OTP Verification Step */}
              <form onSubmit={handleVerifyOTP} className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <p className="text-sm text-gray-400 mb-6">
                    We've sent a 4-digit code to your email. Please check your inbox.
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium font-main text-gray-300 block mb-2 text-center">
                    Enter OTP
                  </label>
                  <input
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 4))}
                    className="w-full bg-[#0d0d0d] border border-white/10 rounded-lg px-4 py-4 text-2xl text-center tracking-widest outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all font-mono"
                    placeholder="••••"
                    maxLength={4}
                    autoFocus
                  />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className={`font-medium ${timeLeft < 60 ? 'text-red-400' : 'text-gray-400'}`}>
                    {timeLeft > 0 ? `Expires in ${formatTime(timeLeft)}` : "OTP Expired"}
                  </span>
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    disabled={resending || timeLeft > 240}
                    className="text-emerald-400 hover:text-emerald-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {resending ? "Sending..." : "Resend OTP"}
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={verifying || otp.length !== 4 || timeLeft === 0}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40"
                >
                  {verifying ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Verifying...
                    </>
                  ) : (
                    "Verify Email"
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full text-sm text-gray-400 hover:text-white transition-colors"
                >
                  ← Back to signup
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
