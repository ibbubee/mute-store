"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ProductCard } from "@/components/shop/ProductCard";
import { Product } from "@/types";

// ─── Types ────────────────────────────────────────────────────────────────────

export type GridColumns = 2 | 3 | 4;

export interface ProductGridSectionProps {
  /** Section heading */
  title: string;
  /** Optional subtitle copy below heading */
  subtitle?: string;
  /** Products to render */
  products: Product[];
  /** Link shown next to the heading — e.g. "/shop" */
  viewAllHref?: string;
  /** Label for the view-all link. Defaults to "Explore All" */
  viewAllLabel?: string;
  /** Number of columns on large screens. Defaults to 4. */
  columns?: GridColumns;
  /**
   * Shows skeleton placeholder cards instead of real products.
   * Use while data is loading from the server/API.
   */
  loading?: boolean;
  /** Number of skeleton cards to show when loading. Defaults to columns value. */
  loadingCount?: number;
  /**
   * Custom empty-state content rendered when products is empty and loading is false.
   * Falls back to a default message if omitted.
   */
  emptyState?: React.ReactNode;
  /** Background color class — defaults to mute-black */
  backgroundClassName?: string;
}

// ─── Skeleton card ─────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div
      aria-hidden="true"
      className="flex flex-col gap-4 animate-pulse"
    >
      {/* Image placeholder */}
      <div className="aspect-[3/4] rounded-lg" style={{ background: "#2a2623" }} />
      {/* Text placeholders */}
      <div className="space-y-2 px-1">
        <div className="h-3 w-3/4 rounded-full" style={{ background: "#2a2623" }} />
        <div className="h-3 w-1/2 rounded-full" style={{ background: "#2a2623" }} />
      </div>
    </div>
  );
}

// ─── Default empty state ───────────────────────────────────────────────────────

function DefaultEmptyState() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-24 text-center gap-4">
      <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: "#7a6d62" }}>
        No products found
      </p>
      <p className="text-xs max-w-xs leading-relaxed" style={{ color: "#4a403b" }}>
        Check back soon — new items drop regularly.
      </p>
    </div>
  );
}

// ─── Column class map ──────────────────────────────────────────────────────────

const columnClassMap: Record<GridColumns, string> = {
  2: "grid-cols-2",
  3: "grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-2 lg:grid-cols-4",
};

// ─── Component ────────────────────────────────────────────────────────────────

export function ProductGridSection({
  title,
  subtitle,
  products,
  viewAllHref,
  viewAllLabel = "Explore All",
  columns = 4,
  loading = false,
  loadingCount,
  emptyState,
  backgroundClassName,
}: ProductGridSectionProps) {
  const safeProducts = products || [];
  const isEmpty = !loading && safeProducts.length === 0;
  const skeletonCount = loadingCount ?? columns;
  const colClass = columnClassMap[columns];

  return (
    <section className={`section-spacing ${backgroundClassName ?? ""}`} style={!backgroundClassName ? { background: "#0e0c0b" } : undefined}>
      <div className="max-w-7xl mx-auto px-6">

        {/* ── Section header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between title-spacing gap-6">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-4 leading-none"
              style={{ color: "#ede6d4" }}
            >
              {title}
            </motion.h2>

            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.1 }}
                className="text-sm max-w-sm font-medium tracking-wide leading-relaxed"
                style={{ color: "#7a6d62" }}
              >
                {subtitle}
              </motion.p>
            )}
          </div>

          {viewAllHref && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link
                href={viewAllHref}
                className="group inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-colors duration-200"
                style={{ color: "#7a6d62" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#f5f0e8")}
                onMouseLeave={e => (e.currentTarget.style.color = "#7a6d62")}
                aria-label={`${viewAllLabel} — ${title}`}
              >
                {viewAllLabel}
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1.5"
                />
              </Link>
            </motion.div>
          )}
        </div>

        {/* ── Horizontal Scroll Row ── */}
        <div className="relative">
          <style dangerouslySetInnerHTML={{ __html: `
            .no-scrollbar::-webkit-scrollbar {
              display: none !important;
            }
          `}} />
          
          <div 
            className="flex overflow-x-auto snap-x snap-mandatory gap-x-6 pb-8 no-scrollbar -mx-6 px-6 lg:mx-0 lg:px-0"
            style={{ 
              scrollbarWidth: "none", 
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch"
            }}
          >
            {loading ? (
              // Skeleton placeholders while fetching
              Array.from({ length: skeletonCount }).map((_, i) => (
                <div key={`skeleton-${i}`} className="flex-shrink-0 w-[72vw] sm:w-[45vw] md:w-[30vw] lg:w-[23%] snap-start">
                  <SkeletonCard />
                </div>
              ))
            ) : isEmpty ? (
              // Empty state
              <div className="w-full flex-shrink-0">
                {emptyState ?? <DefaultEmptyState />}
              </div>
            ) : (
              // Real products
              safeProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.55,
                    delay: Math.min(i * 0.07, 0.4),
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex-shrink-0 w-[72vw] sm:w-[45vw] md:w-[30vw] lg:w-[23%] snap-start"
                >
                  <ProductCard product={product} index={i} />
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}