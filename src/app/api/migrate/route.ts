import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import productsData from "../../../../data/products.json";
import categoriesData from "../../../../data/categories.json";
import ordersData from "../../../../data/orders.json";

export async function GET() {
  try {
    // 1. Migrate Products
    if (productsData && productsData.length > 0) {
      const { error } = await supabase.from("products").upsert(
        productsData.map((p: any) => ({
          ...p,
          images: p.images || [],
          sizes: p.sizes || [],
        }))
      );
      if (error) throw new Error(`Products migration error: ${error.message}`);
    }

    // 2. Migrate Categories (mapping desc to description column)
    if (categoriesData && categoriesData.length > 0) {
      const mappedCategories = categoriesData.map((c: any) => {
        const { desc, ...rest } = c;
        return { 
          ...rest, 
          description: desc || "" 
        };
      });
      const { error } = await supabase.from("categories").upsert(mappedCategories);
      if (error) throw new Error(`Categories migration error: ${error.message}`);
    }

    // Seed default hero banner slides into categories table
    const defaultBanners = [
      {
        id: "hero_gents_1",
        name: "NEW SEASON DROP",
        label: "The Casual Shirt",
        slug: "banner-link-1",
        description: "Premium lightweight linens & tailored boxy silhouettes designed for everyday luxury.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1600&q=80",
        storeType: "gents_hero"
      },
      {
        id: "hero_gents_2",
        name: "STUDIO CLASSICS",
        label: "Gents Essentials",
        slug: "banner-link-2",
        description: "Heavyweight oversized tees, premium basics, and structural knits that speak for themselves.",
        image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=1600&q=80",
        storeType: "gents_hero"
      },
      {
        id: "hero_gents_3",
        name: "PREMIUM CO-ORDS",
        label: "Streetwear Denim",
        slug: "banner-link-3",
        description: "Hand-crafted rugged baggy jeans and relaxed fit shirts tailored in raw materials.",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1600&q=80",
        storeType: "gents_hero"
      },
      {
        id: "hero_kids_1",
        name: "MINI URBANWEAR",
        label: "Mini Streetwear",
        slug: "banner-kids-1",
        description: "Oversized comfortable tees & joggers tailored for kids' high-fidelity play.",
        image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=1600&q=80",
        storeType: "kids_hero"
      },
      {
        id: "hero_kids_2",
        name: "OUTDOOR BASICS",
        label: "Playground Sets",
        slug: "banner-kids-2",
        description: "Durable crewnecks, soft knits, and coordinates built for everyday play.",
        image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=1600&q=80",
        storeType: "kids_hero"
      }
    ];

    const { error: heroError } = await supabase.from("categories").upsert(defaultBanners);
    if (heroError) throw new Error(`Hero banners migration error: ${heroError.message}`);

    // 3. Migrate Orders
    if (ordersData && ordersData.length > 0) {
      const { error } = await supabase.from("orders").upsert(
        ordersData.map((o: any) => ({
          ...o,
          items: o.items || [],
        }))
      );
      if (error) throw new Error(`Orders migration error: ${error.message}`);
    }

    return NextResponse.json({ success: true, message: "Migration completed successfully!" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
