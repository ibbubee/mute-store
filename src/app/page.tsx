"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="h-screen w-full flex flex-col md:flex-row overflow-hidden relative bg-[#0e0c0b]">
      {/* Decorative center divider */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px hidden md:block z-30 bg-white/5" />
      <div className="absolute top-1/2 left-0 right-0 h-px md:hidden z-30 bg-white/5" />

      {/* GENTS STUDIO */}
      <Link
        href="/gents"
        className="group relative flex-1 h-[50vh] md:h-screen overflow-hidden block cursor-pointer"
      >
        <div className="absolute inset-0 z-0 bg-[#0e0c0b]">
          <Image
            src="https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=2787&auto=format&fit=crop"
            alt="Gents Studio"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="w-full h-full object-cover object-top md:object-center grayscale opacity-40 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)]"
          />
          {/* Gradients for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0e0c0b]/80 via-[#0e0c0b]/20 to-[#0e0c0b]/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e0c0b]/50 to-transparent" />
        </div>

        <div className="relative h-full flex flex-col items-center justify-center p-6 pt-20 md:p-12 text-center z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <span className="text-[10px] md:text-[12px] font-bold uppercase tracking-[0.5em] mb-4 md:mb-6 block text-[#ede6d4] opacity-80">
              Studio One
            </span>
            <h2 className="text-7xl sm:text-8xl md:text-[10vw] font-black uppercase tracking-tighter leading-none mb-8 md:mb-12 text-white drop-shadow-2xl">
              GENTS
            </h2>
            <div className="inline-flex items-center justify-center gap-4 py-3.5 px-8 text-[10px] font-black uppercase tracking-[0.3em] rounded-full transition-all duration-500 bg-white text-black group-hover:bg-[#9c5a60] group-hover:text-white shadow-[0_0_40px_rgba(255,255,255,0.1)]">
              Enter Collection <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        </div>
      </Link>

      {/* KIDS STUDIO */}
      <Link
        href="/kids"
        className="group relative flex-1 h-[50vh] md:h-screen overflow-hidden block cursor-pointer"
      >
        <div className="absolute inset-0 z-0 bg-[#0e0c0b]">
          <Image
            src="https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?q=80&w=2948&auto=format&fit=crop"
            alt="Kids Studio"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="w-full h-full object-cover grayscale opacity-40 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0e0c0b]/80 via-[#0e0c0b]/20 to-[#0e0c0b]/90" />
          <div className="absolute inset-0 bg-gradient-to-l from-[#0e0c0b]/50 to-transparent" />
        </div>

        <div className="relative h-full flex flex-col items-center justify-center p-6 pt-20 md:p-12 text-center z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <span className="text-[10px] md:text-[12px] font-bold uppercase tracking-[0.5em] mb-4 md:mb-6 block text-[#ede6d4] opacity-80">
              Studio Two
            </span>
            <h2 className="text-7xl sm:text-8xl md:text-[10vw] font-black uppercase tracking-tighter leading-none mb-8 md:mb-12 text-white drop-shadow-2xl">
              KIDS
            </h2>
            <div className="inline-flex items-center justify-center gap-4 py-3.5 px-8 text-[10px] font-black uppercase tracking-[0.3em] rounded-full transition-all duration-500 border border-white/20 text-white backdrop-blur-sm group-hover:bg-[#9c5a60] group-hover:border-[#9c5a60] group-hover:text-white shadow-[0_0_40px_rgba(0,0,0,0.3)]">
              Explore Drops <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        </div>
      </Link>

      {/* CENTER BRANDING BADGE */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none flex flex-col items-center scale-90 md:scale-100">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center mt-6 md:mt-0"
        >
          {/* Glowing sophisticated pill */}
          <div className="flex flex-col items-center justify-center w-28 h-28 md:w-36 md:h-36 rounded-full backdrop-blur-xl shadow-[0_0_60px_rgba(0,0,0,0.8)] relative"
            style={{ background: "rgba(14, 12, 11, 0.85)", border: "1px solid rgba(156, 90, 96, 0.4)" }}>
            <span className="text-3xl md:text-4xl font-black tracking-tighter uppercase text-[#ede6d4]">MUTE</span>
            <div className="h-px w-8 bg-[#9c5a60]/50 my-2" />
            <span className="text-[7px] md:text-[8px] font-bold uppercase tracking-[0.3em] text-[#a09282]">Quietly Loud</span>
            {/* Outer glow rings */}
            <div className="absolute inset-[-1px] rounded-full border border-[#9c5a60]/20 scale-[1.15] pointer-events-none" />
            <div className="absolute inset-[-1px] rounded-full border border-[#9c5a60]/10 scale-[1.3] pointer-events-none" />
          </div>
        </motion.div>
      </div>

      {/* Ticker Bottom */}
      <div className="absolute bottom-0 left-0 right-0 py-2 md:py-3 z-40 overflow-hidden bg-[#0e0c0b]/90 backdrop-blur-md border-t border-white/5">
        <div className="animate-marquee whitespace-nowrap flex gap-10 md:gap-12">
          {Array.from({ length: 15 }).map((_, i) => (
            <span key={i} className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] text-[#a09282]/60">
              MUTE_STUDIO <span className="mx-2 text-[#9c5a60]">/</span> NEW_SEASON_ARRIVALS <span className="mx-2 text-[#9c5a60]">/</span> KERALA_DISTRICT_673 <span className="mx-2 text-[#9c5a60]">/</span> RESERVE_WHATSAPP
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}
