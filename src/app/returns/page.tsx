import type { Metadata } from "next";

export const metadata: Metadata = { title: "Return Policy | MUTE" };

export default function ReturnsPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 max-w-3xl mx-auto px-4 sm:px-6">
      <h1 className="text-4xl font-black uppercase tracking-tight mb-8">Return Policy</h1>
      <div className="space-y-6 text-mute-grey-400 leading-relaxed">
        <section>
          <h2 className="text-mute-white font-bold mb-2 uppercase text-sm tracking-widest">7-Day Returns</h2>
          <p>We accept returns within 7 days of delivery. The item must be unused, unwashed, and with all original tags attached.</p>
        </section>
        <section>
          <h2 className="text-mute-white font-bold mb-2 uppercase text-sm tracking-widest">How to Return</h2>
          <p>Send us a message on WhatsApp with your Order ID and reason for return. Our team will guide you through the process.</p>
        </section>
        <section>
          <h2 className="text-mute-white font-bold mb-2 uppercase text-sm tracking-widest">Refunds</h2>
          <p>For prepaid orders, the refund will be processed back to your original payment method. For COD orders, we provide store credit or bank transfer.</p>
        </section>
      </div>
    </div>
  );
}
