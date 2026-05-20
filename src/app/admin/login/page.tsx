"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
        setLoading(false);
      } else {
        router.push("/admin");
      }
    } catch (err) {
      setError("Failed to connect to authentication server.");
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen w-full flex flex-col items-center justify-center p-6 relative overflow-hidden" 
      style={{ background: "#0e0c0b" }}
    >
      {/* Background Watermark MUTE */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <span
          style={{
            fontSize: "clamp(60px, 20vw, 360px)",
            fontWeight: 950,
            lineHeight: 0.9,
            letterSpacing: "-0.03em",
            color: "#6b3a3f",
            opacity: 0.08,
            display: "block",
            userSelect: "none",
            transform: "scaleY(1.8)",
            transformOrigin: "bottom center",
          }}
        >
          MUTE
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md z-10 p-10 shadow-2xl relative"
        style={{ 
          background: "rgba(26, 23, 20, 0.45)", 
          backdropFilter: "blur(20px)", 
          border: "1px solid rgba(61, 56, 54, 0.5)" 
        }}
      >
        {/* Accent corner line */}
        <div 
          className="absolute top-0 right-0 w-8 h-8 translate-x-px -translate-y-px"
          style={{ borderTop: "1px solid rgba(156,90,96,0.6)", borderRight: "1px solid rgba(156,90,96,0.6)" }}
        />

        <div className="flex flex-col items-center text-center mb-8">
          <span className="text-2xl font-black tracking-tighter uppercase mb-2" style={{ color: "#ede6d4" }}>
            MUTE
          </span>
          <div className="h-px w-8 mb-4" style={{ background: "rgba(156,90,96,0.5)" }} />
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em]" style={{ color: "#a09282" }}>
            STUDIO ENTRANCE
          </h2>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div className="relative">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
              className="w-full bg-transparent px-4 py-3.5 text-sm font-bold placeholder-stone-700 outline-none transition-all"
              style={{ 
                borderBottom: "1px solid rgba(61, 56, 54, 0.8)", 
                color: "#ede6d4",
              }}
              onFocus={(e) => (e.currentTarget.style.borderBottom = "1px solid #9c5a60")}
              onBlur={(e) => (e.currentTarget.style.borderBottom = "1px solid rgba(61, 56, 54, 0.8)")}
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
              className="w-full bg-transparent px-4 py-3.5 pr-12 text-sm font-bold placeholder-stone-700 outline-none transition-all"
              style={{ 
                borderBottom: "1px solid rgba(61, 56, 54, 0.8)", 
                color: "#ede6d4",
              }}
              onFocus={(e) => (e.currentTarget.style.borderBottom = "1px solid #9c5a60")}
              onBlur={(e) => (e.currentTarget.style.borderBottom = "1px solid rgba(61, 56, 54, 0.8)")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
              style={{ color: "#7a6d62" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#ede6d4")}
              onMouseLeave={e => (e.currentTarget.style.color = "#7a6d62")}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-[10px] font-bold uppercase tracking-wider text-center"
                style={{ color: "#9c5a60" }}
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-between w-full py-4 px-6 text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-300 rounded-none mt-2 shadow-lg"
            style={{ 
              background: loading ? "rgba(160,146,130,0.2)" : "#ede6d4", 
              color: loading ? "#7a6d62" : "#0e0c0b" 
            }}
            onMouseEnter={e => {
              if (!loading) e.currentTarget.style.background = "#f5f0e8";
            }}
            onMouseLeave={e => {
              if (!loading) e.currentTarget.style.background = "#ede6d4";
            }}
          >
            {loading ? "Entering Studio..." : "Access Dashboard"}
            {!loading && <ArrowRight size={14} />}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
