"use client";

import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle, MessageCircle, ArrowRight, Package } from "lucide-react";
import { Suspense } from "react";

function OrderSuccessContent() {
  const params = useSearchParams();
  const orderId = params.get("id") ?? "—";

  return (
    <div className="min-h-screen pt-16 flex flex-col items-center justify-center text-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle size={40} className="text-green-400" />
        </motion.div>

        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
          Order Placed!
        </h1>
        <p className="text-mute-grey-400 mt-3">
          Your drip is on its way 🔥
        </p>

        {/* Order ID */}
        <div className="mt-6 bg-mute-grey-900 border border-mute-grey-800 rounded-2xl px-6 py-4">
          <p className="text-xs text-mute-grey-500 uppercase tracking-wider mb-1">
            Order ID
          </p>
          <p className="font-mono text-lg font-bold text-mute-beige">{orderId}</p>
        </div>

        {/* Steps */}
        <div className="mt-8 grid grid-cols-3 gap-3">
          {[
            { icon: <Package size={18} />, label: "Order Confirmed" },
            { icon: <CheckCircle size={18} />, label: "Processing" },
            { icon: <ArrowRight size={18} />, label: "On the way" },
          ].map((step, i) => (
            <div key={i} className={`flex flex-col items-center gap-2 p-3 rounded-xl ${i === 0 ? "bg-green-500/10 border border-green-500/20" : "bg-mute-grey-900 border border-mute-grey-800"}`}>
              <span className={i === 0 ? "text-green-400" : "text-mute-grey-600"}>
                {step.icon}
              </span>
              <p className={`text-[10px] font-bold ${i === 0 ? "text-green-400" : "text-mute-grey-600"}`}>
                {step.label}
              </p>
            </div>
          ))}
        </div>

        <p className="text-sm text-mute-grey-500 mt-6">
          We&apos;ll notify you via WhatsApp once your order is shipped.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <a
            href="https://wa.me/919895000000"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3.5 border border-green-600 text-green-400 rounded-full font-bold text-sm hover:bg-green-500/10 transition-colors"
          >
            <MessageCircle size={16} />
            Track on WhatsApp
          </a>
          <Link
            href="/shop"
            className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-mute-white text-mute-black rounded-full font-bold text-sm hover:bg-mute-beige transition-colors"
          >
            Shop More
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 text-center text-mute-grey-500">Loading...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
