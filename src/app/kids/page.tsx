import { CategoriesSection } from "@/components/home/CategoriesSection";
import { ProductGridSection } from "@/components/home/ProductGridSection";
import { LocationSection } from "@/components/home/LocationSection";
import { KidsHero } from "@/components/kids/KidsHero";
import { getProductsByStore } from "@/lib/db";

export const revalidate = 3600; // Cache the page for 1 hour

export default async function KidsHome() {
  const products = await getProductsByStore("kids");
  const featured = products.filter((p) => p.featured).slice(0, 4);

  return (
    <div className="flex flex-col gap-0 pt-0" style={{ background: "#0e0c0b" }}>
      {/* Dynamic Client-Side Hero Slideshow */}
      <KidsHero />

      <div id="mini-essentials" className="scroll-mt-20">
        <ProductGridSection
          title="Mini Essentials"
          subtitle="The latest arrivals in our Kids studio."
          products={featured}
          viewAllHref="/shop?category=kids"
        />

        <ProductGridSection
          title="Full Collection"
          subtitle="Everything for the next wave."
          products={products}
          viewAllHref="/shop?category=kids"
        />

        <CategoriesSection storeType="kids" />

        <LocationSection />
      </div>
    </div>
  );
}
