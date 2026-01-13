"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/context/ToastContext";
import { useAuth } from "@/context/AuthContext";

function SelectRoleContent() {
  const searchParams = useSearchParams();
  const { error: toastError, success } = useToast();
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const tokenParam = searchParams.get("token");
    if (!tokenParam) {
      toastError("Invalid session. Please try again.");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } else {
      setToken(tokenParam);
    }
  }, [searchParams, toastError]);

  async function handleRoleSelection() {
    if (!selectedRole) {
      toastError("Please select a role");
      return;
    }

    setLoading(true);
    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5001';
      const res = await fetch(`${API_BASE_URL}/api/users/role`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ role: selectedRole }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to set role");

      success("Role set successfully! Redirecting...");
      
      const updatedUserData = {
        _id: data._id,
        name: data.name,
        email: data.email,
        role: data.role,
      };

      // Use the context login function to handle state and redirects
      login(updatedUserData, data.token);
    } catch (err) {
      toastError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md p-6 rounded-lg bg-[#111111] border border-white/6 shadow-sm">
      <h1 className="font-head text-2xl mb-2">Choose Your Role</h1>
      <p className="text-sm text-gray-400 mb-6 font-main">
        Select how you want to use Apthire
      </p>

      <div className="space-y-3">
        {/* Candidate Option */}
        <button
          onClick={() => setSelectedRole("candidate")}
          className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
            selectedRole === "candidate"
              ? "border-emerald-500 bg-emerald-500/10"
              : "border-white/10 hover:border-white/20"
          }`}
        >
          <div className="flex items-start gap-3">
            <div className="text-3xl">🎓</div>
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-1">Candidate</h3>
              <p className="text-sm text-gray-400">
                Browse jobs, apply to positions, and connect with recruiters
              </p>
            </div>
            {selectedRole === "candidate" && (
              <div className="text-emerald-500">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </div>
        </button>

        {/* Recruiter Option */}
        <button
          onClick={() => setSelectedRole("recruiter")}
          className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
            selectedRole === "recruiter"
              ? "border-emerald-500 bg-emerald-500/10"
              : "border-white/10 hover:border-white/20"
          }`}
        >
          <div className="flex items-start gap-3">
            <div className="text-3xl">🏢</div>
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-1">Recruiter</h3>
              <p className="text-sm text-gray-400">
                Post jobs, review applications, and hire top talent
              </p>
            </div>
            {selectedRole === "recruiter" && (
              <div className="text-emerald-500">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </div>
        </button>
      </div>

      <button
        onClick={handleRoleSelection}
        disabled={!selectedRole || loading}
        className="w-full mt-6 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-md bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-alt text-sm"
      >
        {loading ? "Setting up your account..." : "Continue"}
      </button>

      <p className="text-xs text-gray-500 text-center mt-4">
        You can update your profile and preferences later
      </p>
    </div>
  );
}

export default function SelectRolePage() {
  return (
    <main className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center py-16">
      <Suspense fallback={<p className="text-gray-400">Loading...</p>}>
        <SelectRoleContent />
      </Suspense>
    </main>
  );
}
