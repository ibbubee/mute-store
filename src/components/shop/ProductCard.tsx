"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className="group"
    >
      <Link href={`/product/${product.slug}`} className="block">
        {/* Image Frame */}
        <div
          className="relative aspect-[3/4] overflow-hidden mb-5"
          style={{ background: "#1a1714", border: "1px solid rgba(61,56,54,0.5)" }}
        >
          {product.images && product.images.length > 0 ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center transition-transform duration-1000 group-hover:scale-105">
              <span className="text-[10px] font-black tracking-[0.5em] select-none"
                style={{ color: "rgba(61,56,54,0.4)" }}>
                MUTE_STUDIO
              </span>
            </div>
          )}

          {/* New Tag */}
          {product.newArrival && (
            <div className="absolute top-0 left-0 p-4">
              <span
                className="px-2 py-1 text-[9px] font-black uppercase tracking-widest"
                style={{ background: "#48262a", color: "#ede6d4" }}
              >
                New Drop
              </span>
            </div>
          )}

          {/* Hover shimmer */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: "rgba(245,240,232,0.03)" }}
          />

          {/* Action overlay */}
          <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <div className="flex items-center justify-between">
              <span
                className="text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full shadow-sm"
                style={{ background: "#ede6d4", color: "#0e0c0b" }}
              >
                View Details
              </span>
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "#48262a", color: "#ede6d4" }}
              >
                <ArrowRight size={14} />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-1.5 px-1">
          <div className="flex items-start justify-between gap-4">
            <h3
              className="text-[12px] font-black uppercase tracking-tight leading-tight transition-colors"
              style={{ color: "#d4c9b2" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#f5f0e8")}
              onMouseLeave={e => (e.currentTarget.style.color = "#d4c9b2")}
            >
              {product.name}
            </h3>
            <span className="mono-text font-black text-[12px]" style={{ color: "#a09282" }}>
              {formatPrice(product.price)}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[9px] font-bold uppercase tracking-[0.3em]" style={{ color: "#4a403b" }}>
              {product.category}
            </span>
            <div className="h-px flex-1" style={{ background: "rgba(61,56,54,0.4)" }} />
            <span className="text-[8px] font-bold uppercase tracking-widest" style={{ color: "#3d3836" }}>
              Available
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
