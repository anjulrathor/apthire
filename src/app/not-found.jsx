import Link from "next/link";

export const metadata = {
  title: "404 - Page Not Found | Apthire",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0d0d0d] flex items-center justify-center px-4 pt-20">
      <div className="text-center">
        <div className="relative inline-block mb-8">
          <h1 className="text-8xl sm:text-[12rem] font-bold text-white/5 leading-none select-none">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-3xl sm:text-5xl font-head font-bold text-white">Lost in Space?</h2>
          </div>
        </div>
        <p className="text-gray-400 max-w-md mx-auto mb-10 font-main">
          The page you're looking for was moved, removed, or never existed in the first place. Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/" 
            className="px-8 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition shadow-lg shadow-emerald-500/20"
          >
            Back to Home
          </Link>
          <Link 
            href="/jobs" 
            className="px-8 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 transition"
          >
            Browse Jobs
          </Link>
        </div>
      </div>
    </main>
  );
}
