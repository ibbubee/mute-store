"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Eye, EyeOff } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Check if session token exists in localStorage
    const token = localStorage.getItem("mute_admin_session");
    if (token === "mute-secure-session-token-2026") {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;

    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("mute_admin_session", data.token);
        setIsAuthenticated(true);
      } else {
        setError(data.error || "Incorrect password");
      }
    } catch (err) {
      setError("Failed to connect to authentication server.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("mute_admin_session");
    setIsAuthenticated(false);
    setPassword("");
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center" style={{ background: "#0e0c0b" }}>
        <div className="animate-pulse flex flex-col items-center gap-4">
          <span className="text-2xl font-black tracking-widest uppercase" style={{ color: "#ede6d4" }}>
            MUTE
          </span>
          <span className="text-[9px] font-bold uppercase tracking-[0.4em]" style={{ color: "#7a6d62" }}>
            Authenticating...
          </span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
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
          className="w-full max-w-md z-10 p-10 shadow-2xl relative animate-fade-in"
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
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={submitting}
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
              disabled={submitting}
              className="flex items-center justify-between w-full py-4 px-6 text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-300 rounded-none mt-2 shadow-lg"
              style={{ 
                background: submitting ? "rgba(160,146,130,0.2)" : "#ede6d4", 
                color: submitting ? "#7a6d62" : "#0e0c0b" 
              }}
              onMouseEnter={e => {
                if (!submitting) e.currentTarget.style.background = "#f5f0e8";
              }}
              onMouseLeave={e => {
                if (!submitting) e.currentTarget.style.background = "#ede6d4";
              }}
            >
              {submitting ? "Entering Studio..." : "Access Dashboard"}
              {!submitting && <ArrowRight size={14} />}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // If authenticated, render children
  return (
    <>
      {/* Absolute clean layout wrapper to let admins log out if they want to */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-[9px] font-black uppercase tracking-widest rounded-full transition-all border shadow-lg"
          style={{ 
            background: "#1a1714", 
            borderColor: "rgba(61, 56, 54, 0.8)", 
            color: "#7a6d62" 
          }}
          onMouseEnter={e => {
            e.currentTarget.style.color = "#ede6d4";
            e.currentTarget.style.borderColor = "rgba(156,90,96,0.5)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = "#7a6d62";
            e.currentTarget.style.borderColor = "rgba(61, 56, 54, 0.8)";
          }}
        >
          Lock Dashboard
        </button>
      </div>
      {children}
    </>
  );
}
