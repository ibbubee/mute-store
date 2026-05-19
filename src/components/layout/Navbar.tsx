"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X, MapPin, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "The Drop", href: "/gents" },
  { label: "Kids Studio", href: "/kids" },
  { label: "Find Us", href: "/#location" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Top Bar */}
      <div style={{ background: "#1a1714", borderBottom: "1px solid rgba(61,56,54,0.7)" }}
        className="py-1.5 md:py-2 px-4 md:px-12">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-4">
            <span className="flex items-center gap-1.5 md:gap-2 text-[8px] md:text-[9px] font-bold uppercase tracking-widest"
              style={{ color: "#7a6d62" }}>
              <Globe size={10} /> Kerala, India
            </span>
          </div>
          <div className="flex items-center gap-4 md:gap-6">
            <Link href="/about"
              className="text-[8px] md:text-[9px] font-bold uppercase tracking-widest transition-colors"
              style={{ color: "#7a6d62" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#f5f0e8")}
              onMouseLeave={e => (e.currentTarget.style.color = "#7a6d62")}
            >
              Our Story
            </Link>
            <Link href="/contact"
              className="text-[8px] md:text-[9px] font-bold uppercase tracking-widest transition-colors"
              style={{ color: "#7a6d62" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#f5f0e8")}
              onMouseLeave={e => (e.currentTarget.style.color = "#7a6d62")}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div
        className="transition-all duration-500"
        style={
          scrolled
            ? { background: "rgba(14,12,11,0.96)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(61,56,54,0.6)", paddingTop: "0.75rem", paddingBottom: "0.75rem" }
            : { background: "transparent", paddingTop: "1.5rem", paddingBottom: "1.5rem" }
        }
      >
        <div className="max-w-[1440px] mx-auto px-4 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-50 flex items-center gap-2 md:gap-3 group">
            <span className="text-2xl md:text-3xl font-black tracking-tighter uppercase transition-transform group-hover:scale-105"
              style={{ color: "#f5f0e8" }}>
              MUTE
            </span>
            <div className="h-3 md:h-4 w-px" style={{ background: "rgba(61,56,54,0.8)" }} />
            <span className="text-[7px] md:text-[9px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] mt-0.5"
              style={{ color: "#7a6d62" }}>
              Quietly Loud
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[11px] font-black uppercase tracking-[0.2em] transition-all relative group"
                style={{ color: "#a09282" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#f5f0e8")}
                onMouseLeave={e => (e.currentTarget.style.color = "#a09282")}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full"
                  style={{ background: "#9c5a60" }} />
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            <button className="p-1.5 md:p-2 transition-colors"
              style={{ color: "#a09282" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#f5f0e8")}
              onMouseLeave={e => (e.currentTarget.style.color = "#a09282")}
            >
              <Search size={20} />
            </button>
            <Link
              href="/#location"
              className="hidden sm:flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 text-[9px] md:text-[10px] font-black uppercase tracking-widest rounded-full transition-all"
              style={{ background: "#ede6d4", color: "#0e0c0b" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#f5f0e8")}
              onMouseLeave={e => (e.currentTarget.style.background = "#ede6d4")}
            >
              <MapPin size={12} /> Visit
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-1.5 md:p-2"
              style={{ color: "#f5f0e8" }}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-0 z-[40] flex flex-col pt-32 px-8 overflow-hidden"
            style={{ background: "#0e0c0b" }}
          >
            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-4xl font-black uppercase tracking-tighter pb-4"
                  style={{ color: "#f5f0e8", borderBottom: "1px solid rgba(61,56,54,0.5)" }}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/#location"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between w-full p-6 text-[12px] font-black uppercase tracking-[0.3em] rounded-full mt-4"
                style={{ background: "#ede6d4", color: "#0e0c0b" }}
              >
                Find Our Studio
                <MapPin size={18} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
