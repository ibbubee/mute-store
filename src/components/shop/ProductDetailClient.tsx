"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MessageCircle,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Zap,
  ShieldCheck,
  Truck,
  ArrowRight,
} from "lucide-react";
import { Product } from "@/types";
import { formatPrice, getTotalStock, isLowStock, cn } from "@/lib/utils";
import { ProductGridSection } from "@/components/home/ProductGridSection";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

interface Props {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailClient({ product, relatedProducts }: Props) {
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes.find((s) => s.stock > 0)?.size || ""
  );
  const [currentImg, setCurrentImg] = useState(0);

  const totalStock = getTotalStock(product.sizes);
  const lowStock = isLowStock(product.sizes);
  const inStock = totalStock > 0;

  const whatsappLink = `https://wa.me/917907603503?text=${encodeURIComponent(
    `Hi MUTE, I'm interested in the ${product.name}${
      selectedSize ? ` (Size: ${selectedSize})` : ""
    }. Is it available at the store?`
  )}`;

  return (
    <div className="min-h-screen pt-20" style={{ background: "#0e0c0b" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden" style={{ background: "#1a1714", border: "1px solid rgba(61,56,54,0.5)" }}>
              {product.images && product.images.length > 0 ? (
                <Image
                  src={product.images[currentImg] || product.images[0]}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-mute-grey-900 text-6xl font-black tracking-tighter opacity-20">
                    MUTE
                  </span>
                </div>
              )}

              {/* Navigation arrows */}
              {product.images && product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImg((p) => (p === 0 ? product.images.length - 1 : p - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-mute-white hover:bg-black/60 transition-colors z-10"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() => setCurrentImg((p) => (p === product.images.length - 1 ? 0 : p + 1))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-mute-white hover:bg-black/60 transition-colors z-10"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-4">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImg(i)}
                    className={cn(
                      "w-20 aspect-[3/4] rounded-xl overflow-hidden border-2 transition-all relative",
                      currentImg === i ? "border-mute-beige" : "border-transparent opacity-50 hover:opacity-100"
                    )}
                    style={{ background: "#1a1714" }}
                  >
                    <Image src={img} alt="Thumbnail" fill sizes="80px" className="w-full h-full object-cover absolute inset-0" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info */}
          <div className="flex flex-col">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-mute-grey-900 text-mute-grey-400 text-[10px] font-bold rounded-full uppercase tracking-widest border border-mute-grey-800">
                  {product.category}
                </span>
                {product.newArrival && (
                  <span className="text-mute-beige text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-mute-beige animate-ping" />
                    New Drop
                  </span>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-none mb-4" style={{ color: "#ede6d4" }}>
                {product.name}
              </h1>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black" style={{ color: "#ede6d4" }}>
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl line-through font-medium" style={{ color: "#7a6d62" }}>
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
            </div>

            {/* Stock status */}
            <div className="mb-8 p-4 rounded-2xl" style={{ background: "#1a1714", border: "1px solid rgba(61,56,54,0.5)" }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#7a6d62" }}>
                  Availability
                </span>
                {inStock ? (
                  <span className="text-xs font-bold text-green-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Zap size={12} fill="currentColor" /> In Stock
                  </span>
                ) : (
                  <span className="text-xs font-bold text-red-400 uppercase tracking-wider">
                    Sold Out
                  </span>
                )}
              </div>
              {lowStock && inStock && (
                <p className="text-sm text-red-400 font-medium">
                  Limited stock! Only {totalStock} items remaining.
                </p>
              )}
            </div>

            {/* Sizes */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#7a6d62" }}>
                  Select Size
                </span>
                <button className="text-[10px] text-mute-beige font-bold uppercase tracking-widest hover:underline">
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s.size}
                    disabled={s.stock === 0}
                    onClick={() => setSelectedSize(s.size)}
                    className="py-4 rounded-xl text-sm font-black transition-all border-2"
                    style={{
                      transform: selectedSize === s.size ? "scale(0.98)" : "scale(1)",
                      background: selectedSize === s.size ? "#ede6d4" : "transparent",
                      color: selectedSize === s.size ? "#0e0c0b" : (s.stock > 0 ? "#ede6d4" : "#7a6d62"),
                      borderColor: selectedSize === s.size ? "#ede6d4" : (s.stock > 0 ? "rgba(61,56,54,0.8)" : "rgba(61,56,54,0.3)"),
                      opacity: s.stock === 0 ? 0.4 : 1,
                      textDecoration: s.stock === 0 ? "line-through" : "none",
                      cursor: s.stock === 0 ? "not-allowed" : "pointer"
                    }}
                    onMouseEnter={e => {
                      if (s.stock > 0 && selectedSize !== s.size) {
                        e.currentTarget.style.borderColor = "#ede6d4";
                      }
                    }}
                    onMouseLeave={e => {
                      if (s.stock > 0 && selectedSize !== s.size) {
                        e.currentTarget.style.borderColor = "rgba(61,56,54,0.8)";
                      }
                    }}
                  >
                    {s.size}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mb-10">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  supabase.rpc("increment_whatsapp_clicks", { product_id: product.id }).then();
                }}
                className="w-full flex items-center justify-center gap-3 py-5 font-black rounded-2xl transition-all group active:scale-[0.98]"
                style={{ background: "#ede6d4", color: "#0e0c0b" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#f5f0e8")}
                onMouseLeave={e => (e.currentTarget.style.background = "#ede6d4")}
              >
                <MessageCircle size={20} />
                Reserve on WhatsApp
                <ArrowRight size={18} className="translate-x-0 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                href="/#location"
                className="w-full flex items-center justify-center gap-3 py-5 font-black rounded-2xl transition-all active:scale-[0.98]"
                style={{ border: "1px solid rgba(61,56,54,0.5)", color: "#ede6d4", background: "transparent" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#1a1714")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                <MapPin size={20} />
                Find Store Location
              </Link>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 py-8" style={{ borderTop: "1px solid rgba(61,56,54,0.5)" }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#1a1714", color: "#ede6d4" }}>
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-tight" style={{ color: "#ede6d4" }}>Authentic</p>
                  <p className="text-[10px]" style={{ color: "#7a6d62" }}>100% Quality Check</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#1a1714", color: "#ede6d4" }}>
                  <Truck size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-tight" style={{ color: "#ede6d4" }}>Quick Pickup</p>
                  <p className="text-[10px]" style={{ color: "#7a6d62" }}>Visit store today</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-6" style={{ color: "#a09282" }}>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "#7a6d62" }}>Details</h3>
                <p className="text-sm leading-relaxed">{product.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Section */}
      <section className="mt-20 pt-10 pb-20" style={{ borderTop: "1px solid rgba(61,56,54,0.5)" }}>
        <ProductGridSection title="More from the Drop" products={relatedProducts} />
      </section>
    </div>
  );
}
