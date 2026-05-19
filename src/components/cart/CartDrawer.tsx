"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, ArrowRight, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getSubtotal } =
    useCartStore();
  const subtotal = getSubtotal();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-mute-grey-900 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-mute-grey-800">
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} className="text-mute-grey-300" />
                <h2 className="font-bold text-base tracking-wide">
                  Your Cart
                  {items.length > 0 && (
                    <span className="ml-2 text-mute-grey-400 font-normal text-sm">
                      ({items.length} {items.length === 1 ? "item" : "items"})
                    </span>
                  )}
                </h2>
              </div>
              <button
                onClick={closeCart}
                className="p-2 text-mute-grey-400 hover:text-mute-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto py-4 px-5">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <ShoppingBag size={48} className="text-mute-grey-700" />
                  <div>
                    <p className="font-semibold text-mute-grey-300">
                      Your cart is empty
                    </p>
                    <p className="text-sm text-mute-grey-500 mt-1">
                      Add some drip to get started
                    </p>
                  </div>
                  <button
                    onClick={closeCart}
                    className="mt-2 px-6 py-2.5 bg-mute-white text-mute-black text-sm font-bold rounded-full hover:bg-mute-beige transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li
                      key={`${item.product.id}-${item.size}`}
                      className="flex gap-3 bg-mute-grey-800 rounded-xl p-3"
                    >
                      {/* Image */}
                      <div className="relative w-20 h-24 rounded-lg overflow-hidden bg-mute-grey-700 shrink-0">
                        <div className="w-full h-full flex items-center justify-center text-mute-grey-500 text-xs">
                          IMG
                        </div>
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm leading-tight line-clamp-2">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-mute-grey-400 mt-0.5">
                          Size: {item.size}
                        </p>
                        <p className="text-sm font-bold mt-1 text-mute-beige">
                          {formatPrice(item.product.price)}
                        </p>

                        <div className="flex items-center justify-between mt-2">
                          {/* Qty */}
                          <div className="flex items-center gap-2 bg-mute-grey-700 rounded-full px-1 py-0.5">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.size,
                                  item.quantity - 1
                                )
                              }
                              className="w-6 h-6 flex items-center justify-center text-mute-grey-300 hover:text-mute-white"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-xs font-bold w-4 text-center">
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
                              className="w-6 h-6 flex items-center justify-center text-mute-grey-300 hover:text-mute-white"
                            >
                              <Plus size={12} />
                            </button>
                          </div>

                          {/* Remove */}
                          <button
                            onClick={() =>
                              removeItem(item.product.id, item.size)
                            }
                            className="p-1.5 text-mute-grey-500 hover:text-red-400 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-mute-grey-800 px-5 py-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-mute-grey-400 text-sm">Subtotal</span>
                  <span className="font-bold text-lg">{formatPrice(subtotal)}</span>
                </div>
                <p className="text-xs text-mute-grey-500">
                  Shipping & taxes calculated at checkout
                </p>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-mute-white text-mute-black font-bold text-sm rounded-full hover:bg-mute-beige transition-colors"
                >
                  Checkout
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="flex items-center justify-center w-full py-3 border border-mute-grey-700 text-mute-grey-300 text-sm rounded-full hover:border-mute-grey-500 hover:text-mute-white transition-colors"
                >
                  View Cart
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
