"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Instagram, Phone, MapPin, Mail, Send, Check } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="mb-12">
          <p className="text-xs font-bold text-mute-grey-500 tracking-[0.2em] uppercase mb-2">
            Get In Touch
          </p>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
            Contact Us
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact methods */}
          <div className="space-y-6">
            <p className="text-mute-grey-400 leading-relaxed">
              Slide into our DMs, give us a ring, or just WhatsApp us. We&apos;re fast to respond — usually within the hour.
            </p>

            {[
              {
                icon: <MessageCircle size={20} className="text-green-400" />,
                label: "WhatsApp",
                value: "+91 98950 00000",
                href: "https://wa.me/919895000000",
                sub: "Fastest response",
              },
              {
                icon: <Instagram size={20} className="text-pink-400" />,
                label: "Instagram",
                value: "@mutestore",
                href: "https://instagram.com/mutestore",
                sub: "DMs open",
              },
              {
                icon: <Phone size={20} className="text-blue-400" />,
                label: "Phone",
                value: "+91 98950 00000",
                href: "tel:+919895000000",
                sub: "Mon–Sat 10am–8pm",
              },
              {
                icon: <Mail size={20} className="text-mute-beige" />,
                label: "Email",
                value: "hello@mutestore.in",
                href: "mailto:hello@mutestore.in",
                sub: "Reply within 24h",
              },
              {
                icon: <MapPin size={20} className="text-red-400" />,
                label: "Location",
                value: "Kerala, India",
                href: "#",
                sub: "Ships across India",
              },
            ].map((contact, i) => (
              <motion.a
                key={contact.label}
                href={contact.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                target={contact.href.startsWith("http") ? "_blank" : undefined}
                rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-center gap-4 bg-mute-grey-900 hover:bg-mute-grey-800 border border-mute-grey-800 rounded-2xl p-4 transition-colors group"
              >
                <div className="w-10 h-10 bg-mute-grey-800 group-hover:bg-mute-grey-700 rounded-full flex items-center justify-center transition-colors">
                  {contact.icon}
                </div>
                <div>
                  <p className="text-xs text-mute-grey-500 uppercase tracking-wider">{contact.label}</p>
                  <p className="font-bold mt-0.5">{contact.value}</p>
                  <p className="text-xs text-mute-grey-500">{contact.sub}</p>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Contact form */}
          <div>
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center gap-4 bg-mute-grey-900 border border-mute-grey-800 rounded-2xl p-8"
              >
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                  <Check size={30} className="text-green-400" />
                </div>
                <h3 className="text-xl font-black">Message Sent!</h3>
                <p className="text-mute-grey-400 text-sm">
                  We&apos;ll get back to you within 24 hours. Or just WhatsApp us for faster help.
                </p>
                <a
                  href="https://wa.me/919895000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 flex items-center gap-2 px-6 py-3 border border-green-600 text-green-400 rounded-full text-sm font-bold hover:bg-green-500/10 transition-colors"
                >
                  <MessageCircle size={15} /> WhatsApp us
                </a>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-xl font-bold mb-6">Send a Message</h2>
                {[
                  { label: "Your Name", id: "contact-name", field: "name", type: "text", placeholder: "What do we call you?" },
                  { label: "Email", id: "contact-email", field: "email", type: "email", placeholder: "your@email.com" },
                ].map((f) => (
                  <div key={f.id}>
                    <label htmlFor={f.id} className="block text-xs font-bold text-mute-grey-500 uppercase tracking-wider mb-1.5">
                      {f.label}
                    </label>
                    <input
                      id={f.id}
                      type={f.type}
                      value={form[f.field as keyof typeof form]}
                      onChange={(e) => setForm((p) => ({ ...p, [f.field]: e.target.value }))}
                      placeholder={f.placeholder}
                      required
                      className="w-full px-4 py-3 bg-mute-grey-900 border border-mute-grey-700 rounded-xl text-sm text-mute-white placeholder-mute-grey-600 focus:outline-none focus:border-mute-beige transition-colors"
                    />
                  </div>
                ))}
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-bold text-mute-grey-500 uppercase tracking-wider mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    value={form.message}
                    onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                    placeholder="What's on your mind?"
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-mute-grey-900 border border-mute-grey-700 rounded-xl text-sm text-mute-white placeholder-mute-grey-600 focus:outline-none focus:border-mute-beige transition-colors resize-none"
                  />
                </div>
                <button
                  id="contact-submit"
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-4 bg-mute-white text-mute-black font-bold rounded-full hover:bg-mute-beige transition-colors"
                >
                  <Send size={16} />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
