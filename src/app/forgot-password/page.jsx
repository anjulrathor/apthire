"use client";
import React, { useState, useEffect } from "react";
import { useToast } from "@/context/ToastContext";
import { useAuth } from "@/context/AuthContext";
import Logo from "@/components/ui/Logo";

export default function ForgotPasswordPage() {
  const { error: toastError, success } = useToast();
  const { login } = useAuth();

  const [step, setStep] = useState(1); // 1: Email, 2: OTP & New Password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

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

  async function handleSendOTP(e) {
    if (e) e.preventDefault();

    if (!email.trim()) {
      toastError("Please enter your email address.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/users/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed to send OTP");
      }

      success("OTP sent to your email!");
      setStep(2);
      setTimeLeft(300); // 5 minutes
    } catch (err) {
      toastError(err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  }

  async function handleResetPassword(e) {
    e.preventDefault();

    if (!otp || otp.length !== 4) {
      toastError("Please enter valid 4-digit OTP");
      return;
    }

    if (!password || password.length < 6) {
      toastError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirm) {
      toastError("Passwords do not match");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(password)) {
        toastError("Password must contain uppercase, lowercase, number & special char.");
        return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/users/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword: password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Password reset failed");
      }

      success("Password reset successful! Logging you in...");
      
      // Auto-login logic
      if (data?.token) {
         login({
            _id: data._id,
            name: data.name,
            email: data.email,
            role: data.role
        }, data.token);
      } else {
        // Fallback if no token returned (though controller returns it)
        setTimeout(() => {
             window.location.href = "/login";
        }, 1500);
      }

    } catch (err) {
      toastError(err.message || "Password reset failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#0d0d0d] to-[#111111] text-white flex items-center justify-center px-4 py-8 sm:py-16">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <Logo size="lg" />
          </div>
          <h1 className="font-head text-3xl sm:text-4xl mb-3 bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent pb-1">
            {step === 1 ? "Forgot Password" : "Reset Password"}
          </h1>
          <p className="text-sm sm:text-base text-gray-400 font-main">
            {step === 1 ? "Enter your email to receive an OTP" : `Enter OTP sent to ${email}`}
          </p>
        </div>

        {/* Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#111111]/80 backdrop-blur-sm border border-white/10 shadow-2xl">
          {step === 1 ? (
             <form onSubmit={handleSendOTP} className="space-y-4">
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
                    autoFocus
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40"
                >
                  {loading ? "Sending OTP..." : "Send OTP"}
                </button>

                <div className="mt-6 text-center text-sm text-gray-400">
                    <a href="/login" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
                    ← Back to Login
                    </a>
                </div>
             </form>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-4">
                {/* OTP Input */}
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

                {/* Password Fields */}
                <div className="relative">
                   <label className="text-sm font-medium font-main text-gray-300 block mb-2">
                     New Password
                   </label>
                   <div className="relative">
                     <input
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       className="w-full bg-[#0d0d0d] border border-white/10 rounded-lg pl-4 pr-12 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                       placeholder="Min. 6 characters"
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

                {/* Expiry and Resend */}
                <div className="flex items-center justify-between text-sm">
                  <span className={`font-medium ${timeLeft < 60 ? 'text-red-400' : 'text-gray-400'}`}>
                    {timeLeft > 0 ? `Expires in ${formatTime(timeLeft)}` : "OTP Expired"}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleSendOTP(null)}
                    disabled={loading || timeLeft > 240}
                    className="text-emerald-400 hover:text-emerald-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                   Resend OTP
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40"
                >
                  {loading ? "Resetting..." : "Reset Password"}
                </button>

                <div className="mt-2 text-center text-sm text-gray-400">
                    <button type="button" onClick={() => setStep(1)} className="text-gray-400 hover:text-white transition-colors">
                     ← Change Email
                    </button>
                </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
