import { Suspense } from "react";
import type { Metadata } from "next";
import { getAllProducts } from "@/lib/db";
import { ShopClient } from "@/components/shop/ShopClient";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Browse MUTE's full collection — streetwear, Korean fashion, oversized fits, surplus drops. Filter by size, category, and price.",
};

export default async function ShopPage() {
  const products = await getAllProducts();
  return (
    <Suspense fallback={<div className="pt-32 text-center text-mute-grey-500">Loading...</div>}>
      <ShopClient products={products} />
    </Suspense>
  );
}
