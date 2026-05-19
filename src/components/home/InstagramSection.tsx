"use client";

import { motion } from "framer-motion";
import { Instagram, ExternalLink } from "lucide-react";

const instagramPosts = [
  { id: 1, caption: "Shadow Oversized Tee — the one everyone wants.", likes: 342, tag: "#mutestore" },
  { id: 2, caption: "Seoul Cargo Pants just dropped 🔥", likes: 289, tag: "#koreanfashion" },
  { id: 3, caption: "Void Hoodie. Limited run.", likes: 512, tag: "#streetwear" },
  { id: 4, caption: "Surplus drop incoming. Stay tuned.", likes: 198, tag: "#surplusfashion" },
  { id: 5, caption: "K-Wave Tee — front print, back detail.", likes: 276, tag: "#kwave" },
  { id: 6, caption: "Street Jogger Set. Full coord energy.", likes: 443, tag: "#outfitoftheday" },
];

export function InstagramSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-2 mb-3">
          <Instagram size={16} className="text-pink-400" />
          <span className="text-xs font-bold text-mute-grey-500 tracking-[0.2em] uppercase">
            @mutestore
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
          The Feed
        </h2>
        <p className="text-sm text-mute-grey-500 mt-2">
          Tag us in your fits. We see you. 👀
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {instagramPosts.map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            className="group relative aspect-square bg-mute-grey-800 rounded-2xl overflow-hidden cursor-pointer"
          >
            {/* BG placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-mute-grey-700 text-2xl font-black">
                MUTE
              </span>
            </div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Hover content */}
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-xs text-mute-white line-clamp-2 leading-relaxed">
                {post.caption}
              </p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-[10px] text-mute-grey-400">{post.tag}</span>
                <span className="text-[10px] text-mute-grey-400">❤️ {post.likes}</span>
              </div>
            </div>

            {/* Corner icon */}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <ExternalLink size={14} className="text-mute-white" />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mt-8"
      >
        <a
          href="https://instagram.com/mutestore"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-7 py-3 border border-mute-grey-700 text-sm rounded-full hover:border-mute-grey-400 hover:text-mute-white transition-colors"
        >
          <Instagram size={15} />
          Follow on Instagram
        </a>
      </motion.div>
    </section>
  );
}
