"use client";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function GoogleCallbackPage() {
  const searchParams = useSearchParams();
  const { login } = useAuth();

  useEffect(() => {
    const token = searchParams.get("token");
    const userParam = searchParams.get("user");

    if (token && userParam) {
      try {
        const userData = JSON.parse(decodeURIComponent(userParam));
        
        // Store token and user data, then redirect based on role
        login(userData, token);
      } catch (error) {
        console.error("Error parsing user data:", error);
        window.location.href = "/login?error=invalid_callback";
      }
    } else {
      window.location.href = "/login?error=missing_data";
    }
  }, [searchParams, login]);

  return (
    <main className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500 mb-4"></div>
        <p className="text-gray-400">Completing sign in...</p>
      </div>
    </main>
  );
}
