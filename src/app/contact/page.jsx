"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EMAIL = "hello@apthire.com";
const WEBSITE = "https://apthire.com";
const LINKEDIN = "https://www.linkedin.com/company/apthire";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); 
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (status) {
      const t = setTimeout(() => setStatus(null), 5000);
      return () => clearTimeout(t);
    }
  }, [status]);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus(null);
    setErrorMsg("");

    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMsg("Please fill all mandatory fields.");
      setStatus("error");
      return;
    }

    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 1200));
      setStatus("ok");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setErrorMsg("Something went wrong. Please try again.");
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0d0d0d] pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-head text-4xl md:text-6xl font-bold text-white mb-6 uppercase tracking-tighter"
          >
            Let's <span className="text-emerald-500">Connect</span>.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto font-main"
          >
            Have a question, feedback, or a partnership idea? We'd love to hear from you. 
            Our team typically responds within 24 hours.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Methods */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-4 space-y-6"
          >
            <div className="glass p-8 rounded-3xl space-y-8">
                <div>
                   <h3 className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-4">Email Us</h3>
                   <a href={`mailto:${EMAIL}`} className="text-xl font-bold text-white hover:text-emerald-400 transition-colors">{EMAIL}</a>
                </div>
                <div>
                   <h3 className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-4">Location</h3>
                   <p className="text-xl font-bold text-white leading-tight">Remote-First Team<br /><span className="text-sm font-normal text-gray-400">HQ: Lucknow, India</span></p>
                </div>
                <div>
                   <h3 className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-4">Follow Us</h3>
                   <div className="flex gap-4">
                      {['twitter', 'linkedin', 'github'].map(social => (
                        <a key={social} href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all text-gray-400">
                           <span className="sr-only">{social}</span>
                           <div className="w-5 h-5 bg-current rounded-sm"></div>
                        </a>
                      ))}
                   </div>
                </div>
            </div>

            <div className="bg-emerald-600/10 border border-emerald-500/20 p-8 rounded-3xl">
                <h3 className="text-white font-bold mb-2">Need immediate help?</h3>
                <p className="text-emerald-500/80 text-sm mb-4">Check our frequently asked questions for quick answers.</p>
                <a href="/faq" className="text-white text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all">
                    Visit Support Center 
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-8"
          >
            <form onSubmit={handleSubmit} className="glass p-8 md:p-12 rounded-[40px] space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Full Name</label>
                        <input 
                            type="text" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Email Address</label>
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="john@example.com"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">How can we help?</label>
                    <textarea 
                        rows={6}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us more about your inquiry..."
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all resize-none"
                    />
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-xs text-gray-600 max-w-xs">By submitting this form, you agree to our privacy policy and terms of service.</p>
                    <button 
                        type="submit"
                        disabled={loading}
                        className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-12 rounded-2xl transition shadow-lg shadow-emerald-500/20 active:scale-95 disabled:opacity-50"
                    >
                        {loading ? "Sending Message..." : "Send Message"}
                    </button>
                </div>

                <AnimatePresence>
                    {status === 'ok' && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-500 text-sm font-bold text-center">
                            Thank you! Your message has been sent successfully.
                        </motion.div>
                    )}
                    {status === 'error' && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm font-bold text-center">
                            {errorMsg}
                        </motion.div>
                    )}
                </AnimatePresence>
            </form>
          </motion.div>

        </div>
      </div>
    </main>
  );
}
