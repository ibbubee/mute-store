import { GentsHero } from "@/components/gents/GentsHero";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { ProductGridSection } from "@/components/home/ProductGridSection";
import { LocationSection } from "@/components/home/LocationSection";
import { getProductsByStore } from "@/lib/db";

export const revalidate = 3600;

export default async function GentsHome() {
  const products = await getProductsByStore("gents");
  const featured = products.filter((p) => p.featured).slice(0, 4);
  const trending = products.filter((p) => p.trending).slice(0, 8);
  const newArrivals = products.slice(0, 8); // Just the newest 8 items

  return (
    <div className="flex flex-col gap-0 pt-20" style={{ background: "#0e0c0b" }}>
      <GentsHero />

      <CategoriesSection storeType="gents" />

      <ProductGridSection
        title="Featured Drop"
        subtitle="Exclusive pieces available in our Gents studio."
        products={featured}
        viewAllHref="/shop"
      />

      <ProductGridSection
        title="New Arrivals"
        subtitle="The latest pieces added to the collection."
        products={newArrivals}
        viewAllHref="/shop"
      />

      <ProductGridSection
        title="Trending Now"
        subtitle="High-demand items moving fast this week."
        products={trending}
        viewAllHref="/shop?filter=trending"
      />

      <LocationSection />
    </div>
  );
}
