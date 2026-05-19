import type { Metadata } from "next";
import { motion } from "framer-motion";

export const metadata: Metadata = {
  title: "About",
  description:
    "MUTE is Kerala's go-to streetwear and Korean fashion store. Born from a love for fashion, built for Gen Z.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="relative border-b border-mute-grey-800 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #fff 0px, #fff 1px, transparent 1px, transparent 60px)`,
          }}
        />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-24 md:py-36">
          <p className="text-xs font-bold text-mute-grey-500 tracking-[0.2em] uppercase mb-4">
            Our Story
          </p>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-[0.95]">
            Born in
            <br />
            <span className="text-mute-beige">Kerala.</span>
            <br />
            Built for
            <br />
            <span style={{ WebkitTextStroke: "1px #E8E0D5", color: "transparent" }}>
              Everyone.
            </span>
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-20">
        <div className="space-y-8 text-mute-grey-300 text-base md:text-lg leading-relaxed">
          <p>
            <span className="text-2xl font-black text-mute-white">MUTE</span> started with one
            simple belief — great fashion shouldn&apos;t cost a fortune or require a trip to
            the mall.
          </p>
          <p>
            We&apos;re a Kerala-based fashion store obsessed with streetwear, Korean fashion,
            surplus finds, and oversized everything. We believe what you wear says
            everything — without saying a word.
          </p>
          <p>
            Every drop is curated with intent. From deadstock denim jackets to Seoul-inspired
            cargo pants, from heavyweight hoodies to graphic tees — we source pieces that
            actually slap. No fast-fashion fillers.
          </p>
          <p>
            We&apos;re built for the Instagram generation. Mobile-first, trend-first, Kerala-first.
            WhatsApp us at any time. COD always available. Returns easy.
          </p>
          <p className="text-xl font-black text-mute-white">
            Dress loud. Stay MUTE. 🖤
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-mute-grey-900 border-y border-mute-grey-800 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-black uppercase tracking-tight text-center mb-12">
            What We Stand For
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Quality First",
                desc: "Every piece passes our hands before it reaches yours. No compromises on material or construction.",
              },
              {
                title: "Real Prices",
                desc: "Premium fashion at street prices. Surplus drops, mixed brands, and MUTE originals — always priced right.",
              },
              {
                title: "Built for Kerala",
                desc: "Breathable fabrics for the heat. Bold fits for the streets. Fashion that actually makes sense here.",
              },
            ].map((val) => (
              <div key={val.title} className="bg-mute-grey-800 rounded-2xl p-6">
                <h3 className="text-lg font-black mb-3">{val.title}</h3>
                <p className="text-sm text-mute-grey-400 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
