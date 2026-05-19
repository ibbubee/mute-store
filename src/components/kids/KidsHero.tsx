"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

const DEFAULT_BANNERS = [
  {
    image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=1600&q=80",
    tag: "MINI URBANWEAR",
    title: "Mini Streetwear",
    subtitle: "Oversized comfortable tees & joggers tailored for kids' high-fidelity play."
  },
  {
    image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=1600&q=80",
    tag: "OUTDOOR BASICS",
    title: "Playground Sets",
    subtitle: "Durable crewnecks, soft knits, and coordinates built for everyday play."
  }
];

export function KidsHero() {
  const [banners, setBanners] = useState<any[]>(DEFAULT_BANNERS);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch banners from Supabase database
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const { data, error } = await supabase
          .from("categories")
          .select("*")
          .eq("storeType", "kids_hero");
        
        if (data && data.length > 0) {
          const mapped = data.map((b: any) => ({
            image: b.image || "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=1600&q=80",
            tag: b.name || "MINI DROP",
            title: b.label || "Mini Collection",
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

  // Auto rotate banner slideshow every 6 seconds
  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
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

  return (
    <section className="relative w-full h-[75vh] md:h-[80vh] bg-[#0c0b0a] overflow-hidden">
      
      {/* Banner Slideshow */}
      <div className="absolute inset-0 w-full h-full z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.55 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={currentBanner.image}
              alt={currentBanner.title}
              fill
              priority
              sizes="100vw"
              className="object-cover object-top grayscale"
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Solid Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent z-1" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0c0b] via-transparent to-transparent z-1" />
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 md:px-8 flex items-center relative z-10">
        
        {/* Left-Aligned Kids Content Block */}
        <div className="max-w-xl space-y-6 text-left select-none">
          
          <motion.span
            key={`tag-${currentIndex}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ fontFamily: "var(--font-montserrat)" }}
            className="text-[9px] font-bold uppercase tracking-[0.6em] text-mute-beige block"
          >
            {currentBanner.tag}
          </motion.span>

          <motion.h1
            key={`title-${currentIndex}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ fontFamily: "var(--font-cormorant)" }}
            className="text-6xl sm:text-7xl md:text-8xl font-light italic leading-[0.95] text-mute-white tracking-wide"
          >
            {currentBanner.title}
          </motion.h1>

          <motion.p
            key={`sub-${currentIndex}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ fontFamily: "var(--font-montserrat)" }}
            className="text-[11px] font-medium tracking-wider text-[#a09282] leading-relaxed max-w-sm"
          >
            {currentBanner.subtitle}
          </motion.p>

          {/* Action Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pt-4"
          >
            <a
              href="#mini-essentials"
              style={{ fontFamily: "var(--font-montserrat)" }}
              className="inline-flex px-8 py-4.5 bg-mute-white hover:bg-mute-beige text-mute-black font-black uppercase tracking-widest text-[10px] rounded-none transition-all shadow-md"
            >
              Shop Mini Drop
            </a>
          </motion.div>
        </div>

      </div>

      {/* Slide Navigation Arrows */}
      {banners.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 bg-black/40 hover:bg-black/80 border border-mute-grey-800/40 text-mute-white transition-all rounded-full hidden md:block"
            aria-label="Previous Slide"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 bg-black/40 hover:bg-black/80 border border-mute-grey-800/40 text-mute-white transition-all rounded-full hidden md:block"
            aria-label="Next Slide"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {/* Minimal Line Progress Indicators */}
      {banners.length > 1 && (
        <div className="absolute bottom-10 right-4 sm:right-8 md:right-12 z-20 flex gap-2">
          {banners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className="h-1 rounded-none transition-all duration-300 relative overflow-hidden bg-mute-grey-800"
              style={{ width: idx === currentIndex ? "45px" : "18px" }}
            >
              {idx === currentIndex && (
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{ duration: 6, ease: "linear" }}
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
