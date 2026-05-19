"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Instagram, Twitter, Facebook, ArrowUpRight } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="pt-24 pb-12" style={{ background: "#0e0c0b", borderTop: "1px solid rgba(61,56,54,0.5)" }}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          {/* Brand */}
          <div className="space-y-8">
            <div>
              <span className="text-3xl font-black tracking-tighter uppercase" style={{ color: "#f5f0e8" }}>MUTE</span>
              <p className="text-[10px] font-black uppercase tracking-[0.6em] mt-1" style={{ color: "#7a6d62" }}>Quietly Loud</p>
            </div>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "#a09282" }}>
              A premium streetwear studio based in Kerala. Focused on oversized silhouettes, technical fabrics, and minimal aesthetics.
            </p>
            <div className="flex items-center gap-4">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <a key={i} href="#"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
                  style={{ border: "1px solid rgba(61,56,54,0.7)", color: "#a09282" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#ede6d4"; e.currentTarget.style.color = "#0e0c0b"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#a09282"; }}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="space-y-8">
            <h4 className="text-[11px] font-black uppercase tracking-[0.3em]" style={{ color: "#f5f0e8" }}>Collections</h4>
            <ul className="space-y-4">
              {[
                { href: "/gents", label: "Gents Studio" },
                { href: "/kids", label: "Kids Studio" },
                { href: "/shop", label: "Latest Drops" },
                { href: "/shop?filter=limited", label: "Limited Series" },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href}
                    className="text-sm transition-colors"
                    style={{ color: "#7a6d62" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#f5f0e8")}
                    onMouseLeave={e => (e.currentTarget.style.color = "#7a6d62")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Studio */}
          <div className="space-y-8">
            <h4 className="text-[11px] font-black uppercase tracking-[0.3em]" style={{ color: "#f5f0e8" }}>The Studio</h4>
            <ul className="space-y-4">
              {[
                { href: "/#location", label: "Visit Us" },
                { href: "/about", label: "Our Story" },
                { href: "/contact", label: "Contact" },
                { href: "/shipping", label: "Shipping & Terms" },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href}
                    className="text-sm transition-colors"
                    style={{ color: "#7a6d62" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#f5f0e8")}
                    onMouseLeave={e => (e.currentTarget.style.color = "#7a6d62")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-8">
            <h4 className="text-[11px] font-black uppercase tracking-[0.3em]" style={{ color: "#f5f0e8" }}>Newsletter</h4>
            <p className="text-sm" style={{ color: "#7a6d62" }}>Sign up for early access to our limited series drops.</p>
            <div className="relative">
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                className="w-full py-4 text-[11px] font-black tracking-widest focus:outline-none transition-colors"
                style={{
                  background: "transparent",
                  borderBottom: "1px solid rgba(61,56,54,0.7)",
                  color: "#f5f0e8",
                }}
                onFocus={e => (e.currentTarget.style.borderBottomColor = "#ede6d4")}
                onBlur={e => (e.currentTarget.style.borderBottomColor = "rgba(61,56,54,0.7)")}
              />
              <button
                className="absolute right-0 bottom-4 transition-transform hover:translate-x-1"
                style={{ color: "#a09282" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#f5f0e8")}
                onMouseLeave={e => (e.currentTarget.style.color = "#a09282")}
              >
                <ArrowUpRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-12 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ borderTop: "1px solid rgba(61,56,54,0.5)" }}>
          <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#4a403b" }}>
            &copy; {currentYear} MUTE STUDIO KERALA. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-8">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: "#3d3836" }}>Quietly Loud</span>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(61,56,54,0.6)" }} />
              <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#4a403b" }}>Global Shipping</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
