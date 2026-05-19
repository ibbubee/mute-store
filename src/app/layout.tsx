import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Toaster } from "@/components/ui/Toaster";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "MUTE — Streetwear & Korean Fashion | Kerala",
    template: "%s | MUTE",
  },
  description:
    "MUTE is Kerala's go-to streetwear & Korean fashion store. Oversized fits, surplus drops, trending collections. Mobile-first, Gen Z approved.",
  keywords: [
    "streetwear Kerala",
    "Korean fashion Kerala",
    "oversized clothing",
    "surplus clothing",
    "MUTE fashion",
    "Gen Z fashion India",
  ],
  openGraph: {
    title: "MUTE — Streetwear & Korean Fashion | Kerala",
    description: "Kerala's coolest fashion drop. Streetwear, Korean fits, surplus finds.",
    url: "https://mutestore.in",
    siteName: "MUTE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MUTE — Streetwear Kerala",
    description: "Kerala's coolest fashion drop.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable} ${montserrat.variable}`}>
      <body className="min-h-screen">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
