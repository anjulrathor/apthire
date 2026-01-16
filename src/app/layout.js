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
  title: "Apthire | Jobs That Match You. Nothing Else.",
  description: "Smart matching for your next big role. We filter out the noise and show you only the jobs that match your skills and experience. Fast apply, zero clutter.",
  keywords: "smart job matching, skill based hiring, tech jobs india, remote work, Apthire, personalized job feed",
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
