"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { useState, useEffect } from "react";
import { Category } from "@/types";

export function CategoriesSection({ storeType = "gents" }: { storeType?: "gents" | "kids" }) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch(`/api/categories?storeType=${storeType}`)
      .then(res => res.json())
      .then(data => {
        if (data) setCategories(data);
      })
      .catch(console.error);
  }, [storeType]);

  return (
    <section style={{ borderTop: "1px solid rgba(61,56,54,0.5)", borderBottom: "1px solid rgba(61,56,54,0.5)" }}>
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.slug}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
            className="group relative aspect-[3/4] overflow-hidden"
            style={{
              borderRight: (i + 1) % 4 !== 0 ? "1px solid rgba(61,56,54,0.5)" : "none",
              borderBottom: i >= 4 ? "1px solid rgba(61,56,54,0.5)" : "none"
            }}
          >
            <Link href={`/shop?category=${cat.slug}`} className="absolute inset-0 p-12 flex flex-col justify-between">
              {/* Background */}
              <div
                className="absolute inset-0 transition-colors duration-700 overflow-hidden"
                style={{ background: "#1a1714" }}
              >
                {cat.image && (
                  <Image
                    src={cat.image}
                    alt={cat.label}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                  />
                )}
              </div>
              
              {/* Subtle elegant gradient overlay for pristine text readability over bright images */}
              <div
                className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60 z-[1] pointer-events-none"
              />

              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-[2]"
                style={{ background: "radial-gradient(ellipse at 50% 80%, rgba(156,90,96,0.15) 0%, transparent 60%)" }}
              />

              <div className="relative z-10">
                <span className="text-[9px] font-black uppercase tracking-[0.5em] mb-4 block"
                  style={{ color: "#ede6d4", opacity: 0.8 }}>
                  {cat.name}
                </span>
                <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none"
                  style={{ color: "#ede6d4" }}>
                  {cat.label}
                </h3>
              </div>

              <div className="relative z-10">
                <p className="text-[10px] font-bold uppercase tracking-widest mb-6"
                  style={{ color: "#ede6d4", opacity: 0.9 }}>
                  {cat.desc}
                </p>
                <div
                  className="flex items-center gap-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500"
                  style={{ color: "#ede6d4" }}
                >
                  <span className="text-[9px] font-black uppercase tracking-[0.4em]">Explore</span>
                  <ArrowRight size={14} />
                </div>
              </div>

              {/* Corner accent */}
              <div
                className="absolute top-0 right-0 w-8 h-8 translate-x-8 -translate-y-8 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-700"
                style={{ borderTop: "1px solid rgba(156,90,96,0.5)", borderRight: "1px solid rgba(156,90,96,0.5)" }}
              />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
