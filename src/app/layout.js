import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/context/ToastContext";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Apthire | Skill-First Hiring Platform",
  description: "Simple, skill-first hiring for freshers and startups. Find jobs based on your skills and projects, not just degrees.",
  keywords: "jobs, hiring, freshers, startups, skill-first, recruitment, apthire",
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#0d0d0d",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${outfit.variable} ${inter.variable} font-sans antialiased bg-[#0d0d0d] text-white overflow-x-hidden`}
      >
        <AuthProvider>
          <ToastProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />  
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
