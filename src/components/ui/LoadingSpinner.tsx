"use client";

import { motion } from "framer-motion";

export function LoadingSpinner() {
  const letters = ["M", "U", "T", "E"];
  
  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.15,
      }
    }
  };

  const letterVariants: any = {
    initial: { opacity: 0.2, y: 3, scale: 0.95 },
    animate: {
      opacity: [0.2, 1, 0.2],
      y: [3, -3, 3],
      scale: [0.95, 1.1, 0.95],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[250px] w-full gap-6">
      {/* Dynamic Spinning Orbit */}
      <div className="relative w-20 h-20 flex items-center justify-center">
        {/* Outer Glowing Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-mute-beige border-r-[#9c5a60]/30"
          style={{ boxShadow: "0 0 15px rgba(237,230,212,0.05)" }}
        />
        {/* Outer Shadow/Accent Ring */}
        <div className="absolute inset-0 rounded-full border border-mute-grey-800/40" />

        {/* Center Animated Brand Letters */}
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="flex items-baseline gap-0.5 z-10 select-none"
        >
          {letters.map((char, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              className="text-sm font-black tracking-tight text-mute-white"
            >
              {char}
            </motion.span>
          ))}
          {/* Glowing Period */}
          <motion.span
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.6
            }}
            className="text-sm font-black text-[#9c5a60] ml-px"
          >
            .
          </motion.span>
        </motion.div>
      </div>

      {/* Soft Text Label */}
      <motion.p
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="text-[10px] font-black uppercase tracking-[0.4em] text-mute-grey-500"
      >
        Loading Studio
      </motion.p>
    </div>
  );
}
