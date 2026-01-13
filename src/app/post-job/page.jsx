"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function PostJobRedirect() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.push("/login?redirect=/post-job");
    } else if (user.role === "admin" || user.role === "recruiter") {
      router.push(user.role === "admin" ? "/admin/jobs/new" : "/recruiter/jobs/new");
    } else {
      // If candidate tries to post, redirect to dashboard or show info
      router.push("/dashboard?error=access_denied");
    }
  }, [user, loading, router]);

  return (
    <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500 mb-4"></div>
        <p className="text-gray-400">Redirecting to post a job...</p>
      </div>
    </div>
  );
}
