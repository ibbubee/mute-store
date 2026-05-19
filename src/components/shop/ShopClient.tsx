"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { Product, FilterState } from "@/types";
import { ProductCard } from "@/components/shop/ProductCard";
import { formatPrice, cn } from "@/lib/utils";

interface ShopClientProps {
  products: Product[];
}

const defaultCategories = ["oversize t-shirt", "full sleeve t-shirt", "hoodies", "trackpants", "jersey", "printed shirts", "plain shirts", "jeans shirt", "formal pants", "baggy jeans", "straight fit jeans", "linen pants", "boxers", "locket for men", "bracelet for men", "surplus inners"];
const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "28", "30", "32", "34", "36"];
const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "trending", label: "Trending" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

const defaultFilters: FilterState = {
  category: "all",
  sizes: [],
  minPrice: 0,
  maxPrice: 5000,
  style: "all",
  availability: "all",
  sort: "newest",
};

export function ShopClient({ products }: ShopClientProps) {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    const cat = searchParams.get("category");
    const filter = searchParams.get("filter");
    if (cat) setFilters((f) => ({ ...f, category: cat }));
    if (filter === "trending") setFilters((f) => ({ ...f, sort: "trending" }));
    if (filter === "new") setFilters((f) => ({ ...f, sort: "newest" }));
  }, [searchParams]);

  const CATEGORIES = useMemo(() => {
    const uniqueCats = Array.from(new Set(products.map(p => p.category?.toLowerCase() || ""))).filter(Boolean);
    const combined = [...defaultCategories];
    uniqueCats.forEach(c => {
      if (!combined.includes(c)) combined.push(c);
    });
    return ["all", ...combined];
  }, [products]);

  const filtered = useMemo(() => {
    let result = [...products];

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags?.some((t) => t.includes(q))
      );
    }

    // Category
    if (filters.category !== "all") {
      result = result.filter((p) => p.category === filters.category);
    }

    // Sizes
    if (filters.sizes.length > 0) {
      result = result.filter((p) =>
        filters.sizes.some((size) =>
          p.sizes.find((s) => s.size === size && s.stock > 0)
        )
      );
    }

    // Price
    result = result.filter(
      (p) => p.price >= filters.minPrice && p.price <= filters.maxPrice
    );

    // Availability
    if (filters.availability === "instock") {
      result = result.filter((p) => p.sizes.some((s) => s.stock > 0));
    }

    // Sort
    switch (filters.sort) {
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "trending":
        result.sort((a, b) => (b.trending ? 1 : 0) - (a.trending ? 1 : 0));
        break;
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
    }

    return result;
  }, [products, search, filters]);

  const activeFilterCount = [
    filters.category !== "all" ? 1 : 0,
    filters.sizes.length,
    filters.availability !== "all" ? 1 : 0,
    filters.minPrice > 0 || filters.maxPrice < 5000 ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  const toggleSize = (size: string) =>
    setFilters((f) => ({
      ...f,
      sizes: f.sizes.includes(size)
        ? f.sizes.filter((s) => s !== size)
        : [...f.sizes, size],
    }));

  const clearFilters = () => setFilters(defaultFilters);

  return (
    <div className="min-h-screen pt-16" style={{ background: "#0e0c0b" }}>
      {/* Header */}
      <div style={{ borderBottom: "1px solid rgba(61,56,54,0.5)", background: "#1a1714" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight" style={{ color: "#ede6d4" }}>
            Shop
          </h1>
          <p className="text-sm mt-2" style={{ color: "#7a6d62" }}>
            {filtered.length} products
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Toolbar */}
        <div className="flex items-center gap-3 mb-6">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-mute-grey-500"
            />
            <input
              id="shop-search"
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full text-sm focus:outline-none transition-colors"
              style={{ background: "#1a1714", border: "1px solid rgba(61,56,54,0.5)", color: "#ede6d4" }}
            />
          </div>

          {/* Filter toggle */}
          <button
            id="shop-filter-toggle"
            onClick={() => setFiltersOpen(!filtersOpen)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-medium transition-colors",
              filtersOpen
                ? "border-mute-beige text-mute-beige bg-mute-beige/10"
                : "border-mute-grey-700 text-mute-grey-300 hover:border-mute-grey-500"
            )}
          >
            <SlidersHorizontal size={15} />
            Filters
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-mute-beige text-mute-black text-[10px] font-bold flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Sort */}
          <div className="relative hidden sm:block">
            <select
              id="shop-sort"
              value={filters.sort}
              onChange={(e) =>
                setFilters((f) => ({
                  ...f,
                  sort: e.target.value as FilterState["sort"],
                }))
              }
              className="appearance-none pl-4 pr-8 py-2.5 rounded-full text-sm focus:outline-none transition-colors cursor-pointer"
              style={{ background: "#1a1714", border: "1px solid rgba(61,56,54,0.5)", color: "#7a6d62" }}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-mute-grey-500 pointer-events-none"
            />
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilters((f) => ({ ...f, category: cat }))}
              className={cn(
                "flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors capitalize",
                filters.category === cat
                  ? "bg-mute-white text-mute-black"
                  : "hover:text-mute-white border"
              )}
              style={filters.category !== cat ? { background: "#1a1714", borderColor: "rgba(61,56,54,0.5)", color: "#7a6d62" } : undefined}
            >
              {cat === "all" ? "All" : cat}
            </button>
          ))}
        </div>

        {/* Filters panel */}
        {filtersOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="rounded-2xl p-5 mb-6"
            style={{ background: "#1a1714", border: "1px solid rgba(61,56,54,0.5)" }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {/* Size filter */}
              <div>
                <p className="text-xs font-bold text-mute-grey-500 uppercase tracking-wider mb-3">
                  Size
                </p>
                <div className="flex flex-wrap gap-2">
                  {SIZES.map((size) => (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors",
                        filters.sizes.includes(size)
                          ? "border-mute-beige text-mute-beige bg-mute-beige/10"
                          : "hover:text-mute-white border"
                      )}
                      style={!filters.sizes.includes(size) ? { borderColor: "rgba(61,56,54,0.5)", color: "#7a6d62" } : undefined}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price filter */}
              <div>
                <p className="text-xs font-bold text-mute-grey-500 uppercase tracking-wider mb-3">
                  Max Price
                </p>
                <input
                  type="range"
                  min={0}
                  max={5000}
                  step={100}
                  value={filters.maxPrice}
                  onChange={(e) =>
                    setFilters((f) => ({
                      ...f,
                      maxPrice: Number(e.target.value),
                    }))
                  }
                  className="w-full accent-mute-beige"
                />
                <p className="text-sm font-bold mt-2">
                  Up to {formatPrice(filters.maxPrice)}
                </p>
              </div>

              {/* Availability */}
              <div>
                <p className="text-xs font-bold text-mute-grey-500 uppercase tracking-wider mb-3">
                  Availability
                </p>
                <div className="flex flex-col gap-2">
                  {["all", "instock"].map((opt) => (
                    <button
                      key={opt}
                      onClick={() =>
                        setFilters((f) => ({
                          ...f,
                          availability: opt as FilterState["availability"],
                        }))
                      }
                      className={cn(
                        "px-3 py-1.5 rounded-lg border text-xs font-medium text-left transition-colors capitalize",
                        filters.availability === opt
                          ? "border-mute-beige text-mute-beige bg-mute-beige/10"
                          : "hover:text-mute-white border"
                      )}
                      style={filters.availability !== opt ? { borderColor: "rgba(61,56,54,0.5)", color: "#7a6d62" } : undefined}
                    >
                      {opt === "all" ? "All Items" : "In Stock Only"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear */}
              <div className="flex items-end">
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition-colors"
                  >
                    <X size={14} />
                    Clear All
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-4xl mb-4">🙈</p>
            <p className="text-mute-grey-400 text-lg font-semibold">
              No products found
            </p>
            <p className="text-sm text-mute-grey-600 mt-2">
              Try adjusting your filters
            </p>
            <button
              onClick={clearFilters}
              className="mt-6 px-6 py-2.5 border border-mute-grey-700 rounded-full text-sm hover:border-mute-grey-500 transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
