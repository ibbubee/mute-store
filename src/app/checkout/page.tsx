"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Package, Banknote, QrCode } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { formatPrice, cn } from "@/lib/utils";
import { toast } from "@/components/ui/Toaster";

type Step = "address" | "payment" | "review";

interface CustomerForm {
  name: string;
  phone: string;
  email: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  pincode: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, clearCart } = useCartStore();
  const [step, setStep] = useState<Step>("address");
  const [payment, setPayment] = useState<"cod" | "upi">("cod");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<CustomerForm>({
    name: "",
    phone: "",
    email: "",
    line1: "",
    line2: "",
    city: "",
    state: "Kerala",
    pincode: "",
  });

  const subtotal = getSubtotal();
  const shipping = subtotal >= 999 ? 0 : 99;
  const total = subtotal + shipping;

  const update = (field: keyof CustomerForm, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const validateAddress = () => {
    if (!form.name || !form.phone || !form.line1 || !form.city || !form.pincode) {
      toast("Please fill all required fields", "error");
      return false;
    }
    if (!/^\d{10}$/.test(form.phone)) {
      toast("Enter a valid 10-digit phone number", "error");
      return false;
    }
    if (!/^\d{6}$/.test(form.pincode)) {
      toast("Enter a valid 6-digit pincode", "error");
      return false;
    }
    return true;
  };

  const placeOrder = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          customer: {
            name: form.name,
            phone: form.phone,
            email: form.email,
            address: {
              line1: form.line1,
              line2: form.line2,
              city: form.city,
              state: form.state,
              pincode: form.pincode,
            },
          },
          paymentMethod: payment,
          subtotal,
          discount: 0,
          total,
        }),
      });
      const data = await res.json();
      clearCart();
      router.push(`/order-success?id=${data.orderId}`);
    } catch {
      toast("Something went wrong. Try again.", "error");
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center text-center px-4">
        <p className="text-mute-grey-400 text-lg">Your cart is empty</p>
        <Link
          href="/shop"
          className="mt-6 px-6 py-3 bg-mute-white text-mute-black font-bold rounded-full hover:bg-mute-beige transition-colors text-sm"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  const steps: { key: Step; label: string }[] = [
    { key: "address", label: "Address" },
    { key: "payment", label: "Payment" },
    { key: "review", label: "Review" },
  ];

  const stepIdx = steps.findIndex((s) => s.key === step);

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {/* Back */}
        <Link
          href="/cart"
          className="flex items-center gap-2 text-sm text-mute-grey-400 hover:text-mute-white transition-colors mb-8"
        >
          <ArrowLeft size={16} /> Back to Cart
        </Link>

        <h1 className="text-3xl font-black uppercase tracking-tight mb-8">
          Checkout
        </h1>

        {/* Steps */}
        <div className="flex items-center gap-0 mb-10">
          {steps.map((s, i) => (
            <div key={s.key} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors",
                    i < stepIdx
                      ? "bg-green-500 text-white"
                      : i === stepIdx
                      ? "bg-mute-white text-mute-black"
                      : "bg-mute-grey-800 text-mute-grey-500"
                  )}
                >
                  {i < stepIdx ? <Check size={14} /> : i + 1}
                </div>
                <p className={cn(
                  "text-[10px] mt-1 uppercase tracking-wider font-bold",
                  i === stepIdx ? "text-mute-white" : "text-mute-grey-600"
                )}>
                  {s.label}
                </p>
              </div>
              {i < steps.length - 1 && (
                <div className={cn(
                  "flex-1 h-px mx-2 mb-4",
                  i < stepIdx ? "bg-green-500" : "bg-mute-grey-800"
                )} />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form area */}
          <div className="lg:col-span-2">
            {step === "address" && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <h2 className="text-lg font-bold mb-6">Delivery Address</h2>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Full Name *" id="checkout-name">
                    <input
                      id="checkout-name"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="Your name"
                      className="input-field"
                    />
                  </Field>
                  <Field label="Phone *" id="checkout-phone">
                    <input
                      id="checkout-phone"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder="10-digit number"
                      className="input-field"
                      maxLength={10}
                    />
                  </Field>
                </div>
                <Field label="Email (optional)" id="checkout-email">
                  <input
                    id="checkout-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="For order updates"
                    className="input-field"
                  />
                </Field>
                <Field label="Address Line 1 *" id="checkout-line1">
                  <input
                    id="checkout-line1"
                    value={form.line1}
                    onChange={(e) => update("line1", e.target.value)}
                    placeholder="House no, Street"
                    className="input-field"
                  />
                </Field>
                <Field label="Address Line 2" id="checkout-line2">
                  <input
                    id="checkout-line2"
                    value={form.line2}
                    onChange={(e) => update("line2", e.target.value)}
                    placeholder="Area, Landmark"
                    className="input-field"
                  />
                </Field>
                <div className="grid grid-cols-3 gap-4">
                  <Field label="City *" id="checkout-city">
                    <input
                      id="checkout-city"
                      value={form.city}
                      onChange={(e) => update("city", e.target.value)}
                      placeholder="City"
                      className="input-field"
                    />
                  </Field>
                  <Field label="State" id="checkout-state">
                    <input
                      id="checkout-state"
                      value={form.state}
                      onChange={(e) => update("state", e.target.value)}
                      placeholder="State"
                      className="input-field"
                    />
                  </Field>
                  <Field label="Pincode *" id="checkout-pincode">
                    <input
                      id="checkout-pincode"
                      value={form.pincode}
                      onChange={(e) => update("pincode", e.target.value)}
                      placeholder="6 digits"
                      className="input-field"
                      maxLength={6}
                    />
                  </Field>
                </div>
                <button
                  id="checkout-next-address"
                  onClick={() => { if (validateAddress()) setStep("payment"); }}
                  className="w-full mt-4 py-4 bg-mute-white text-mute-black font-bold rounded-full hover:bg-mute-beige transition-colors"
                >
                  Continue to Payment
                </button>
              </motion.div>
            )}

            {step === "payment" && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <h2 className="text-lg font-bold mb-6">Payment Method</h2>
                <div className="space-y-3">
                  {[
                    {
                      value: "cod" as const,
                      label: "Cash on Delivery",
                      desc: "Pay when you receive",
                      icon: <Banknote size={20} />,
                    },
                    {
                      value: "upi" as const,
                      label: "UPI / Online",
                      desc: "GPay, PhonePe, Paytm",
                      icon: <QrCode size={20} />,
                    },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setPayment(opt.value)}
                      className={cn(
                        "w-full flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-all",
                        payment === opt.value
                          ? "border-mute-white bg-mute-white/5"
                          : "border-mute-grey-700 hover:border-mute-grey-500"
                      )}
                    >
                      <span className={payment === opt.value ? "text-mute-white" : "text-mute-grey-500"}>
                        {opt.icon}
                      </span>
                      <div>
                        <p className="font-bold">{opt.label}</p>
                        <p className="text-sm text-mute-grey-400">{opt.desc}</p>
                      </div>
                      <div className={cn(
                        "ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0",
                        payment === opt.value
                          ? "border-mute-white bg-mute-white"
                          : "border-mute-grey-600"
                      )}>
                        {payment === opt.value && (
                          <div className="w-2.5 h-2.5 rounded-full bg-mute-black" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                {payment === "upi" && (
                  <div className="bg-mute-grey-900 border border-mute-grey-800 rounded-2xl p-5 text-center">
                    <p className="text-sm text-mute-grey-400">
                      UPI ID: <span className="font-bold text-mute-white">mutestore@paytm</span>
                    </p>
                    <p className="text-xs text-mute-grey-600 mt-2">
                      After placing order, pay to the above UPI ID and send screenshot on WhatsApp
                    </p>
                  </div>
                )}

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setStep("address")}
                    className="flex-1 py-4 border border-mute-grey-700 rounded-full text-sm font-semibold hover:border-mute-grey-500 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    id="checkout-next-payment"
                    onClick={() => setStep("review")}
                    className="flex-1 py-4 bg-mute-white text-mute-black font-bold rounded-full hover:bg-mute-beige transition-colors"
                  >
                    Review Order
                  </button>
                </div>
              </motion.div>
            )}

            {step === "review" && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-lg font-bold">Review Order</h2>

                {/* Address review */}
                <div className="bg-mute-grey-900 border border-mute-grey-800 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-bold text-mute-grey-500 uppercase tracking-wider">
                      Delivery To
                    </p>
                    <button
                      onClick={() => setStep("address")}
                      className="text-xs text-mute-beige hover:underline"
                    >
                      Edit
                    </button>
                  </div>
                  <p className="font-bold">{form.name}</p>
                  <p className="text-sm text-mute-grey-400">{form.phone}</p>
                  <p className="text-sm text-mute-grey-400 mt-1">
                    {form.line1}, {form.line2 && `${form.line2}, `}
                    {form.city}, {form.state} — {form.pincode}
                  </p>
                </div>

                {/* Payment review */}
                <div className="bg-mute-grey-900 border border-mute-grey-800 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-bold text-mute-grey-500 uppercase tracking-wider">
                      Payment
                    </p>
                    <button
                      onClick={() => setStep("payment")}
                      className="text-xs text-mute-beige hover:underline"
                    >
                      Edit
                    </button>
                  </div>
                  <p className="font-bold">
                    {payment === "cod" ? "Cash on Delivery" : "UPI / Online"}
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep("payment")}
                    className="flex-1 py-4 border border-mute-grey-700 rounded-full text-sm font-semibold hover:border-mute-grey-500 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    id="place-order-btn"
                    onClick={placeOrder}
                    disabled={loading}
                    className="flex-1 py-4 bg-mute-white text-mute-black font-bold rounded-full hover:bg-mute-beige transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span className="animate-spin w-4 h-4 border-2 border-mute-black border-t-transparent rounded-full" />
                    ) : (
                      <>
                        <Package size={16} />
                        Place Order
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Order summary sidebar */}
          <div>
            <div className="bg-mute-grey-900 border border-mute-grey-800 rounded-2xl p-5 sticky top-20">
              <p className="font-bold text-sm uppercase tracking-wider mb-4">
                Order ({items.length} items)
              </p>
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.size}`} className="flex gap-3">
                    <div className="w-12 h-14 bg-mute-grey-800 rounded-lg shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold line-clamp-1">
                        {item.product.name}
                      </p>
                      <p className="text-[10px] text-mute-grey-500">
                        {item.size} × {item.quantity}
                      </p>
                      <p className="text-xs font-bold mt-0.5">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-mute-grey-800 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-mute-grey-400">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-mute-grey-400">Shipping</span>
                  <span className={shipping === 0 ? "text-green-400" : ""}>
                    {shipping === 0 ? "FREE" : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between font-black text-lg border-t border-mute-grey-800 pt-3 mt-2">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .input-field {
          width: 100%;
          padding: 12px 16px;
          background: #1a1a1a;
          border: 1px solid #3d3d3d;
          border-radius: 12px;
          font-size: 14px;
          color: #f5f5f3;
          transition: border-color 0.2s;
          outline: none;
        }
        .input-field::placeholder {
          color: #525252;
        }
        .input-field:focus {
          border-color: #e8e0d5;
        }
      `}</style>
    </div>
  );
}

function Field({
  label,
  id,
  children,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-bold text-mute-grey-500 uppercase tracking-wider mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}
