"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MessageCircle, Zap, ArrowRight } from "lucide-react";
import { Product } from "@/types";
import { formatPrice, getTotalStock } from "@/lib/utils";

interface LimitedStockSectionProps {
  products: Product[];
}

export function LimitedStockSection({ products }: LimitedStockSectionProps) {
  if (products.length === 0) return null;

  return (
    <section className="bg-mute-grey-900 border-y border-mute-grey-800 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs font-bold text-red-400 tracking-[0.2em] uppercase">
              Limited Stock
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
            Almost Gone
          </h2>
          <p className="text-sm text-mute-grey-500 mt-2">
            Surplus & rare finds — once gone, they&apos;re gone forever.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product, i) => {
            const totalStock = getTotalStock(product.sizes);
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={`/product/${product.slug}`}
                  className="group flex gap-4 bg-mute-grey-800 hover:bg-mute-grey-700 rounded-2xl p-4 transition-colors"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-24 bg-mute-grey-700 rounded-xl shrink-0 flex items-center justify-center text-mute-grey-600 text-xs font-bold">
                    IMG
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-xs text-mute-grey-500 uppercase tracking-wider">
                          {product.category}
                        </p>
                        <h3 className="font-bold text-sm mt-0.5 leading-tight group-hover:text-mute-beige transition-colors line-clamp-2">
                          {product.name}
                        </h3>
                      </div>
                    </div>

                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-base font-black">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-mute-grey-500 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>

                    <div className="mt-2 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full">
                        <Zap size={9} />
                        Only {totalStock} left
                      </span>
                    </div>

                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-xs font-semibold text-mute-grey-300 group-hover:text-mute-white flex items-center gap-1 transition-colors">
                        Grab it <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
