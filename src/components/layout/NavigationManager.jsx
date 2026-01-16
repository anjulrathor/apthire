"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function NavigationManager({ children }) {
  const pathname = usePathname();
  const isDashboardPath = 
    pathname?.startsWith("/admin") || 
    pathname?.startsWith("/recruiter") || 
    pathname?.startsWith("/dashboard");

  if (isDashboardPath) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </>
  );
}
