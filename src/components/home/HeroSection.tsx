"use client";

import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#0e0c0b" }}
    >

      {/* 2. BACKGROUND: giant tall MUTE. — matching the dots color */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex items-baseline"
          style={{ marginTop: "2vh" }}
        >
          {/* The word MUTE — tall glowing maroon watermark matching dots */}
          <span
            style={{
              fontSize: "clamp(60px, 24vw, 420px)",
              fontWeight: 950,
              lineHeight: 0.9,
              letterSpacing: "-0.03em",
              background: "linear-gradient(to bottom, #9c5a60 0%, #6b3a3f 35%, #3a1e21 65%, #0e0c0b 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              display: "block",
              userSelect: "none",
              transform: "scaleY(1.8)",
              transformOrigin: "bottom center",
            }}
          >
            MUTE
          </span>
          {/* Period — maroon, visible on dark */}
          <span
            style={{
              fontSize: "clamp(16px, 5vw, 80px)",
              fontWeight: 950,
              lineHeight: 1,
              color: "#6b3a3f",
              marginLeft: "-0.02em",
              marginBottom: "0.4em",
              userSelect: "none",
            }}
          >
            .
          </span>
        </motion.div>
      </div>

      {/* 3. MID LAYER: "QUIETLY" — warm sand/gold, thin weight */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none select-none">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginTop: "4vh" }}
        >
          <span
            style={{
              fontSize: "clamp(24px, 8vw, 140px)",
              fontWeight: 300,
              letterSpacing: "0.12em",
              color: "#a09282",
              textTransform: "uppercase",
              display: "block",
              lineHeight: 1,
            }}
          >
            QUIETLY
          </span>
        </motion.div>
      </div>

      {/* 4. FRONT LAYER: "LOUD." — cream/parchment, heavy weight */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none select-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginTop: "24vh" }}
          className="flex items-baseline"
        >
          <span
            style={{
              fontSize: "clamp(48px, 12vw, 200px)",
              fontWeight: 900,
              letterSpacing: "-0.02em",
              color: "#ede6d4",
              textTransform: "uppercase",
              lineHeight: 0.85,
            }}
          >
            LOUD
          </span>
          {/* Period in maroon */}
          <span
            style={{
              fontSize: "clamp(48px, 12vw, 200px)",
              fontWeight: 900,
              color: "#9c5a60",
              lineHeight: 0.85,
            }}
          >
            .
          </span>
        </motion.div>
      </div>

      {/* 5. DECORATIVE DOTS — maroon with glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="absolute z-30 pointer-events-none"
        style={{
          bottom: "22%", right: "18%",
          width: "clamp(24px, 3.5vw, 56px)",
          height: "clamp(24px, 3.5vw, 56px)",
          borderRadius: "50%",
          background: "#6b3a3f",
          boxShadow: "0 0 20px rgba(156,90,96,0.35)",
        }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        className="absolute z-30 pointer-events-none"
        style={{
          bottom: "30%", right: "3%",
          width: "clamp(20px, 2.8vw, 46px)",
          height: "clamp(20px, 2.8vw, 46px)",
          borderRadius: "50%",
          background: "#48262a",
          boxShadow: "0 0 14px rgba(156,90,96,0.25)",
        }}
      />

    </section>
  );
}