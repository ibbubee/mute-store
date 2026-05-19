const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabase = createClient(
  'https://kvnfmitoqdfhrzsogktx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2bmZtaXRvcWRmaHJ6c29na3R4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxMDA4ODksImV4cCI6MjA5NDY3Njg4OX0.Ghm4eQzuj95tG05JsVzicrq-a75y534hcFa-hfE10Ro'
);

let products = [];
try {
  products = JSON.parse(fs.readFileSync('./data/products.json', 'utf8'));
} catch(e) {}

let categories = [];
try {
  categories = JSON.parse(fs.readFileSync('./data/categories.json', 'utf8'));
} catch(e) {}

async function run() {
  if (products.length > 0) {
    console.log("Migrating products...");
    const pRes = await supabase.from('products').upsert(products);
    if (pRes.error) console.error("Products error:", pRes.error);
    else console.log("Products migrated successfully.");
  }

  if (categories.length > 0) {
    console.log("Migrating categories...");
    const mappedCategories = categories.map(c => {
      const { desc, ...rest } = c;
      return { ...rest, description: desc || "" };
    });
    const cRes = await supabase.from('categories').upsert(mappedCategories);
    if (cRes.error) console.error("Categories error:", cRes.error);
    else console.log("Categories migrated successfully.");
  }

  // Seed default hero banner slides into categories table
  console.log("Migrating default hero banners...");
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
      image: "https://images.unsplash.com/photo-1503341455253-b2641285928d?w=1600&q=80",
      storeType: "kids_hero"
    }
  ];

  const hRes = await supabase.from('categories').upsert(defaultBanners);
  if (hRes.error) console.error("Hero banners error:", hRes.error);
  else console.log("Hero banners migrated successfully.");
  
  console.log("Done.");
}

run();
