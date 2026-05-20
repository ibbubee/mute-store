"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, MessageCircle, ArrowRight, Share2 } from "lucide-react";

export function LocationSection() {
  return (
    <section id="location" style={{ borderTop: "1px solid rgba(61,56,54,0.5)", background: "#0e0c0b" }}>
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2">
        {/* Contact Info */}
        <div
          className="p-12 md:p-20 flex flex-col justify-between space-y-12"
          style={{ borderRight: "1px solid rgba(61,56,54,0.5)" }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div>
              <span className="label-text mb-6 block">Store Locator</span>
              <h2 className="text-6xl md:text-7xl font-black uppercase tracking-tighter leading-[0.8]"
                style={{ color: "#ede6d4" }}>
                VISIT THE<br />
                STUDIO.
              </h2>
            </div>

            <div className="space-y-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: "#4a403b" }}>Address</h3>
                  <p className="text-sm font-medium leading-relaxed" style={{ color: "#a09282" }}>
                    MUTE Streetwear Studio<br />
                    Main Road, Calicut<br />
                    Kerala, 673001
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: "#4a403b" }}>Store Hours</h3>
                  <div className="space-y-1 text-[11px] uppercase font-bold tracking-wider" style={{ color: "#7a6d62" }}>
                    <p>Mon — Sat: 10:00 — 21:00</p>
                    <p>Sun: 11:00 — 19:00</p>
                  </div>
                </div>
              </div>

              <div className="h-px w-full" style={{ background: "rgba(61,56,54,0.5)" }} />

              <div className="flex flex-wrap gap-8 items-center">
                <a
                  href="https://wa.me/917907603503"
                  className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest group transition-colors"
                  style={{ color: "#a09282" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#f5f0e8")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#a09282")}
                >
                  <MessageCircle size={18} />
                  WhatsApp Us
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all" />
                </a>
                <a
                  href="https://maps.app.goo.gl/P8XFiUyE16zxqyJy9"
                  target="_blank"
                  className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest group transition-colors"
                  style={{ color: "#a09282" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#f5f0e8")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#a09282")}
                >
                  <MapPin size={18} />
                  Get Directions
                </a>
              </div>
            </div>
          </motion.div>

          <div>
            <button
              className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest transition-colors"
              style={{ color: "#4a403b" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#a09282")}
              onMouseLeave={e => (e.currentTarget.style.color = "#4a403b")}
            >
              <Share2 size={12} /> Share Studio Location
            </button>
          </div>
        </div>

        {/* Map Visual */}
        <div className="relative min-h-[500px] group overflow-hidden" style={{ background: "#1a1714" }}>
          <div className="absolute inset-0 z-10"
            style={{ background: "radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.15) 100%)" }} />

          <div className="absolute inset-0 flex items-center justify-center z-30">
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-3 h-3 rounded-full border-4 shadow-xl"
              style={{ background: "#9c5a60", borderColor: "#0e0c0b", boxShadow: "0 0 20px rgba(156,90,96,0.4)" }}
            />
            <div className="absolute w-40 h-40 rounded-full blur-3xl" style={{ background: "rgba(72,38,42,0.08)" }} />
          </div>

          <div
            className="absolute bottom-12 right-12 z-40 p-8 max-w-[280px] shadow-2xl"
            style={{ background: "#0e0c0b", border: "1px solid rgba(61,56,54,0.6)" }}
          >
            <p className="text-[10px] font-black mb-4 uppercase tracking-[0.3em]" style={{ color: "#4a403b" }}>
              MUTE_GPS_TARGET
            </p>
            <p className="text-sm font-black uppercase tracking-tight mb-6 leading-tight" style={{ color: "#ede6d4" }}>
              Come experience the signature boxy fits in person.
            </p>
            <a
              href="https://maps.app.goo.gl/P8XFiUyE16zxqyJy9"
              target="_blank"
              className="flex items-center justify-between w-full p-4 text-[10px] font-black uppercase tracking-widest transition-all"
              style={{ background: "#ede6d4", color: "#0e0c0b" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#f5f0e8")}
              onMouseLeave={e => (e.currentTarget.style.background = "#ede6d4")}
            >
              Start Navigation
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
