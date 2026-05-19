import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "404 — Page Not Found" };

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <p className="text-[120px] md:text-[180px] font-black leading-none text-mute-grey-900 select-none">
        404
      </p>
      <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight -mt-4">
        Page Not Found
      </h1>
      <p className="text-sm text-mute-grey-500 mt-3 max-w-xs">
        This page went out of stock. Try heading back to the store.
      </p>
      <div className="flex gap-3 mt-8">
        <Link
          href="/"
          className="px-6 py-3 bg-mute-white text-mute-black font-bold text-sm rounded-full hover:bg-mute-beige transition-colors"
        >
          Home
        </Link>
        <Link
          href="/shop"
          className="px-6 py-3 border border-mute-grey-700 text-sm font-semibold rounded-full hover:border-mute-grey-500 transition-colors"
        >
          Shop
        </Link>
      </div>
    </div>
  );
}
