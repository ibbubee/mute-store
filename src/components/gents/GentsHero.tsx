"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

const DEFAULT_BANNERS = [
  {
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1800&q=80",
    tag: "SEASON CAPSULE // 01",
    title: "The Baggy Denim Drop",
    subtitle: "Heavyweight drop-shoulder street tees paired with raw, hand-tailored loose denim for structural ease."
  },
  {
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1600&q=80",
    tag: "MINIMAL CLASSICS // 02",
    title: "Relaxed Linen Overshirts",
    subtitle: "Clean lines meets high-fidelity linen fabrics. Boxy silhouettes created for luxurious breathability."
  },
  {
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=1600&q=80",
    tag: "STUDIO DROPS // 03",
    title: "Oversized Streetwear",
    subtitle: "Contemporary relaxed silhouettes constructed from high-density organic cotton coordinates."
  }
];

export function GentsHero() {
  const [banners, setBanners] = useState<any[]>(DEFAULT_BANNERS);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch campaign banners from Supabase database
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const { data, error } = await supabase
          .from("categories")
          .select("*")
          .eq("storeType", "gents_hero");
        
        if (data && data.length > 0) {
          const mapped = data.map((b: any, index: number) => ({
            image: b.image || "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1800&q=80",
            tag: b.name || `COLLECTION DROP // 0${index + 1}`,
            title: b.label || "New Season Style",
            subtitle: b.description || b.desc || ""
          }));
          setBanners(mapped);
        }
      } catch (err) {
        console.error("Fetch banners error:", err);
      }
    };
    fetchBanners();
  }, []);

  // Ken-Burns Auto rotation slideshow loop
  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(timer);
  }, [currentIndex, banners]);

  const handleNext = () => {
    if (banners.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  const handlePrev = () => {
    if (banners.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  if (banners.length === 0) return null;
  const currentBanner = banners[currentIndex] || banners[0];
  
  // Calculate next slide information for the interactive preview card
  const nextIndex = (currentIndex + 1) % banners.length;
  const nextBanner = banners[nextIndex] || banners[0];

  return (
    <section className="relative w-full h-[85vh] md:h-[90vh] bg-[#0c0b0a] overflow-hidden">
      
      {/* 1. Full-Screen Visual Slideshow (Pure full-bleed) */}
      <div className="absolute inset-0 w-full h-full z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Ken-Burns slow scaling movement */}
            <motion.div
              initial={{ scale: 1.0 }}
              animate={{ scale: 1.06 }}
              transition={{ duration: 8, ease: "linear" }}
              className="w-full h-full relative"
            >
              <Image
                src={currentBanner.image}
                alt={currentBanner.title}
                fill
                priority
                sizes="100vw"
                className="object-cover object-top select-none pointer-events-none grayscale"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Cinematic Linear & Bottom-up Gradients (Zara-style dampening) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0c0b] via-[#0e0c0b]/40 to-[#0e0c0b]/80 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-10" />
      </div>

      {/* 2. Main High-Fashion Brand Content Overlays */}
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 md:px-8 flex items-end pb-16 md:pb-24 relative z-20">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          
          {/* Left Text Block: Floating minimalist elegant card */}
          <div className="lg:col-span-8 space-y-6 text-left max-w-2xl select-none">
            
            {/* Small caps category tag */}
            <span
              style={{ fontFamily: "var(--font-montserrat)" }}
              className="text-[9px] font-black uppercase tracking-[0.5em] text-mute-beige block"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={`tag-${currentIndex}`}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="inline-block"
                >
                  {currentBanner.tag}
                </motion.span>
              </AnimatePresence>
            </span>

            {/* Massive luxurious serif title */}
            <h1
              style={{ fontFamily: "var(--font-cormorant)" }}
              className="text-6xl sm:text-7xl md:text-[5.5rem] font-light italic leading-[0.9] text-mute-white tracking-wide"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={`title-${currentIndex}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="block"
                >
                  {currentBanner.title}
                </motion.span>
              </AnimatePresence>
            </h1>

            {/* Micro paragraph details */}
            <p
              style={{ fontFamily: "var(--font-montserrat)" }}
              className="text-[11px] font-medium tracking-wider text-mute-grey-400 leading-relaxed max-w-sm"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={`sub-${currentIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="block"
                >
                  {currentBanner.subtitle}
                </motion.span>
              </AnimatePresence>
            </p>

            {/* H&M / Zara solid brand button */}
            <div className="pt-4 flex items-center gap-4">
              <a
                href="#categories"
                style={{ fontFamily: "var(--font-montserrat)" }}
                className="inline-flex px-9 py-4 bg-mute-white hover:bg-mute-beige text-mute-black font-black uppercase tracking-[0.3em] text-[10px] rounded-none transition-all shadow-xl hover:-translate-y-0.5 duration-300"
              >
                Shop Collection
              </a>
              <span className="text-[9px] font-bold text-mute-grey-500 uppercase tracking-widest hidden sm:inline-block">
                STUDIO DIRECT / RESERVE VIA WHATSAPP
              </span>
            </div>

          </div>

          {/* Right Column: Premium Interactive Next-Look Thumbnail Card (Boutique Designer Touch) */}
          {banners.length > 1 && (
            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-end pt-8 lg:pt-0">
              
              {/* Interactive Thumbnail */}
              <motion.button
                onClick={handleNext}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative w-44 h-28 rounded-none border border-white/10 overflow-hidden cursor-pointer shadow-[0_15px_30px_rgba(0,0,0,0.5)] group text-left block"
              >
                {/* Visual Thumbnail */}
                <Image
                  src={nextBanner.image}
                  alt="Next Look"
                  fill
                  sizes="180px"
                  className="object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                
                {/* Glassmorphic Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10" />
                
                {/* Floating Content inside Thumbnail */}
                <div className="absolute inset-0 p-3 flex flex-col justify-between z-20">
                  <span
                    style={{ fontFamily: "var(--font-montserrat)" }}
                    className="text-[7px] font-black uppercase tracking-widest text-[#ede6d4]/90"
                  >
                    NEXT LOOK
                  </span>
                  
                  <div className="flex items-center justify-between">
                    <span
                      style={{ fontFamily: "var(--font-cormorant)" }}
                      className="text-sm italic font-light text-white truncate max-w-[110px]"
                    >
                      {nextBanner.title}
                    </span>
                    <ArrowRight size={12} className="text-white group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.button>
              
              {/* Slide Counter Info */}
              <div 
                className="text-[20px] font-light italic text-[#ede6d4]/70 tracking-widest mt-4" 
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                0{currentIndex + 1} <span className="text-mute-grey-600 text-xs mx-1">/</span> 0{banners.length}
              </div>

            </div>
          )}

        </div>
      </div>

      {/* Slide Navigation Left/Right Arrows (Zara Minimal Rounded Style) */}
      {banners.length > 1 && (
        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3 hidden md:flex">
          <button
            onClick={handlePrev}
            className="p-3 bg-black/40 hover:bg-[#9c5a60] border border-white/5 text-mute-white transition-all rounded-full hover:scale-110 cursor-pointer shadow-lg"
            aria-label="Previous Slide"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={handleNext}
            className="p-3 bg-black/40 hover:bg-[#9c5a60] border border-white/5 text-mute-white transition-all rounded-full hover:scale-110 cursor-pointer shadow-lg"
            aria-label="Next Slide"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      {/* Minimal Linear Progress Indicators at Bottom */}
      {banners.length > 1 && (
        <div className="absolute bottom-10 left-4 sm:left-8 md:left-12 z-20 flex gap-2.5">
          {banners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className="h-0.5 rounded-none transition-all duration-300 relative overflow-hidden bg-mute-grey-800"
              style={{ width: idx === currentIndex ? "50px" : "20px" }}
            >
              {idx === currentIndex && (
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{ duration: 8, ease: "linear" }}
                  className="absolute inset-0 bg-mute-beige"
                />
              )}
            </button>
          ))}
        </div>
      )}

    </section>
  );
}
