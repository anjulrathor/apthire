import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import NavigationManager from "@/components/layout/NavigationManager";
import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/context/ToastContext";
import LoginPrompt from "@/components/ui/LoginPrompt";

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
  title: "Apthire | Remote Overseas Jobs for Indian Talent",
  description: "Land high-paying tech jobs in the US, Europe, and UAE directly from India. Skill-based hiring for global startups.",
  keywords: "remote jobs india, overseas software jobs, US tech jobs from india, Apthire, skill-based hiring, international remote work",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
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
            <NavigationManager>
              {children}
            </NavigationManager>
            <LoginPrompt />
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
