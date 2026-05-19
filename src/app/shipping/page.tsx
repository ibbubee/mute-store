import type { Metadata } from "next";

export const metadata: Metadata = { title: "Shipping Policy | MUTE" };

export default function ShippingPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 max-w-3xl mx-auto px-4 sm:px-6">
      <h1 className="text-4xl font-black uppercase tracking-tight mb-8">Shipping Policy</h1>
      <div className="space-y-6 text-mute-grey-400 leading-relaxed">
        <section>
          <h2 className="text-mute-white font-bold mb-2 uppercase text-sm tracking-widest">Delivery Time</h2>
          <p>Orders within Kerala are usually delivered within 2-4 business days. Pan-India shipping takes 4-7 business days.</p>
        </section>
        <section>
          <h2 className="text-mute-white font-bold mb-2 uppercase text-sm tracking-widest">Shipping Rates</h2>
          <p>We offer FREE shipping on all orders above ₹999. For orders below ₹999, a flat shipping fee of ₹99 applies.</p>
        </section>
        <section>
          <h2 className="text-mute-white font-bold mb-2 uppercase text-sm tracking-widest">Tracking</h2>
          <p>Once your order is shipped, you will receive a tracking link via WhatsApp and email.</p>
        </section>
      </div>
    </div>
  );
}
