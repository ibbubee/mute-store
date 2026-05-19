"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative rounded-3xl bg-gradient-to-br from-mute-grey-800 to-mute-grey-900 border border-mute-grey-700 px-8 md:px-16 py-14 overflow-hidden text-center"
      >
        {/* BG Orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-mute-beige/5 blur-[80px] pointer-events-none" />

        <div className="relative z-10">
          <p className="text-xs font-bold text-mute-grey-500 tracking-[0.2em] uppercase mb-3">
            Early Access
          </p>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-mute-white">
            Get First Dibs
          </h2>
          <p className="text-sm text-mute-grey-400 mt-4 max-w-md mx-auto leading-relaxed">
            Be the first to know about new drops, limited restocks, and
            exclusive Kerala-only deals. No spam. Just fire.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-mute-grey-700 rounded-full text-sm text-mute-beige font-semibold"
            >
              <Check size={16} className="text-green-400" />
              You&apos;re on the list. Watch your inbox! 🔥
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-8 flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                id="newsletter-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full sm:flex-1 px-5 py-3.5 rounded-full bg-mute-grey-700 border border-mute-grey-600 text-sm text-mute-white placeholder-mute-grey-500 focus:outline-none focus:border-mute-beige transition-colors"
              />
              <button
                type="submit"
                id="newsletter-submit"
                className="w-full sm:w-auto px-6 py-3.5 bg-mute-white text-mute-black text-sm font-bold rounded-full hover:bg-mute-beige transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
              >
                Join the Drop
                <ArrowRight size={14} />
              </button>
            </form>
          )}

          <p className="text-[11px] text-mute-grey-600 mt-4">
            Zero spam. Unsubscribe anytime. 🔒
          </p>
        </div>
      </motion.div>
    </section>
  );
}
