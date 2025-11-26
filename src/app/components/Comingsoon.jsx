"use client";

import { motion } from "framer-motion";

export default function Comingsoon() {
  return (
    <main className="min-h-screen flex flex-col bg-neutral-950">

      {/* ░░░ SMALL NAVBAR ░░░ */}
      <header className="w-full border-b border-slate-800">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-white tracking-wide">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-indigo-400">
              AptHire
            </span>
          </h1>
          <p className="text-slate-400 text-sm">
            Call: <span className="text-indigo-400">9027969808</span>
          </p>
        </nav>
      </header>

      {/* ░░░ MAIN CONTENT ░░░ */}
      <div className="flex-1 flex items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-xl mx-auto"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-violet-400 to-indigo-400">
              AptHire
            </span>{" "}
            is cooking something big 🔥
          </h1>

          <p className="text-slate-400 mt-4 text-lg">
            The AI-powered job board that actually gives a shoot about your skills —
            not your buzzwords.
            <br />We’re gearing up for launch. Stay tuned 👀
          </p>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8"
          >
            {/* Empty block kept for your future animation */}
          </motion.div>
        </motion.div>
      </div>

      {/* ░░░ SMALL FOOTER ░░░ */}
      <footer className="w-full border-t border-slate-800 bg-neutral-950 py-4">
        <div className="container mx-auto px-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} AptHire • Built with ❤️ by{" "}
          <span className="text-indigo-400 font-medium">Anjul Rathor</span>
        </div>
      </footer>

    </main>
  );
}
