"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Trash2,
  Minus,
  Plus,
  ArrowRight,
  ShoppingBag,
  Tag,
  X,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { formatPrice, cn } from "@/lib/utils";

const COUPONS: Record<string, { type: "percentage" | "fixed"; value: number; min?: number }> = {
  MUTE10: { type: "percentage", value: 10 },
  KERALA50: { type: "fixed", value: 50, min: 500 },
  FIRSTDROP: { type: "percentage", value: 15, min: 999 },
};

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal, clearCart } = useCartStore();
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState("");

  const subtotal = getSubtotal();

  const getDiscount = () => {
    if (!appliedCoupon) return 0;
    const c = COUPONS[appliedCoupon];
    if (!c) return 0;
    if (c.type === "percentage") return Math.round((subtotal * c.value) / 100);
    return c.value;
  };

  const discount = getDiscount();
  const shipping = subtotal >= 999 ? 0 : 99;
  const total = subtotal - discount + shipping;

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    const c = COUPONS[code];
    if (!c) {
      setCouponError("Invalid coupon code");
      return;
    }
    if (c.min && subtotal < c.min) {
      setCouponError(`Min order ₹${c.min} required`);
      return;
    }
    setAppliedCoupon(code);
    setCouponError("");
    setCoupon("");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-16 flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <ShoppingBag size={64} className="text-mute-grey-700 mx-auto mb-6" />
          <h1 className="text-3xl font-black uppercase tracking-tight">
            Your cart is empty
          </h1>
          <p className="text-sm text-mute-grey-500 mt-3">
            Time to add some drip
          </p>
          <Link
            href="/shop"
            className="mt-8 inline-flex items-center gap-2 px-8 py-4 bg-mute-white text-mute-black font-bold text-sm rounded-full hover:bg-mute-beige transition-colors"
          >
            Start Shopping <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-8">
          Cart
          <span className="ml-3 text-lg text-mute-grey-500 font-normal normal-case tracking-normal">
            {items.length} item{items.length !== 1 ? "s" : ""}
          </span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-3">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={`${item.product.id}-${item.size}`}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20, height: 0 }}
                  className="flex gap-4 bg-mute-grey-900 border border-mute-grey-800 rounded-2xl p-4"
                >
                  {/* Image */}
                  <div className="w-24 h-28 bg-mute-grey-800 rounded-xl shrink-0 flex items-center justify-center text-mute-grey-600 text-xs font-bold">
                    IMG
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-xs text-mute-grey-500 uppercase tracking-wider">
                          {item.product.category}
                        </p>
                        <h3 className="font-bold mt-0.5 leading-tight">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-mute-grey-400 mt-0.5">
                          Size: <span className="text-mute-white font-semibold">{item.size}</span>
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id, item.size)}
                        className="p-1.5 text-mute-grey-600 hover:text-red-400 transition-colors shrink-0"
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity */}
                      <div className="flex items-center bg-mute-grey-800 rounded-full border border-mute-grey-700">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.size,
                              item.quantity - 1
                            )
                          }
                          className="w-8 h-8 flex items-center justify-center text-mute-grey-400 hover:text-mute-white"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center text-sm font-bold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.size,
                              item.quantity + 1
                            )
                          }
                          className="w-8 h-8 flex items-center justify-center text-mute-grey-400 hover:text-mute-white"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <span className="font-black text-lg">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="space-y-4">
            {/* Coupon */}
            <div className="bg-mute-grey-900 border border-mute-grey-800 rounded-2xl p-5">
              <p className="text-xs font-bold text-mute-grey-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Tag size={12} /> Coupon Code
              </p>
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-green-500/10 border border-green-500/30 rounded-xl px-4 py-2.5">
                  <span className="text-sm font-bold text-green-400">
                    {appliedCoupon} applied!
                  </span>
                  <button
                    onClick={() => setAppliedCoupon(null)}
                    className="text-mute-grey-500 hover:text-mute-white"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    id="coupon-input"
                    type="text"
                    value={coupon}
                    onChange={(e) => { setCoupon(e.target.value); setCouponError(""); }}
                    placeholder="Enter code"
                    className="flex-1 px-4 py-2.5 bg-mute-grey-800 border border-mute-grey-700 rounded-xl text-sm text-mute-white placeholder-mute-grey-600 focus:outline-none focus:border-mute-beige transition-colors uppercase"
                  />
                  <button
                    id="apply-coupon-btn"
                    onClick={applyCoupon}
                    className="px-4 py-2.5 bg-mute-grey-700 text-sm font-bold rounded-xl hover:bg-mute-grey-600 transition-colors"
                  >
                    Apply
                  </button>
                </div>
              )}
              {couponError && (
                <p className="text-xs text-red-400 mt-2">{couponError}</p>
              )}
              <p className="text-[10px] text-mute-grey-600 mt-2">
                Try: MUTE10 · KERALA50 · FIRSTDROP
              </p>
            </div>

            {/* Order summary */}
            <div className="bg-mute-grey-900 border border-mute-grey-800 rounded-2xl p-5 space-y-3">
              <p className="font-bold text-sm uppercase tracking-wider">
                Order Summary
              </p>
              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-sm">
                  <span className="text-mute-grey-400">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-green-400">Discount</span>
                    <span className="text-green-400">-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-mute-grey-400">Shipping</span>
                  <span className={shipping === 0 ? "text-green-400" : ""}>
                    {shipping === 0 ? "FREE" : formatPrice(shipping)}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-[10px] text-mute-grey-600">
                    Free shipping on orders above ₹999
                  </p>
                )}
              </div>
              <div className="border-t border-mute-grey-800 pt-3 flex justify-between font-black text-lg">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>

              <Link
                href="/checkout"
                id="proceed-checkout-btn"
                className="flex items-center justify-center gap-2 w-full py-4 bg-mute-white text-mute-black font-bold text-sm rounded-full hover:bg-mute-beige transition-colors mt-2"
              >
                Proceed to Checkout <ArrowRight size={16} />
              </Link>
              <Link
                href="/shop"
                className="flex items-center justify-center w-full py-3 text-sm text-mute-grey-400 hover:text-mute-white transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
