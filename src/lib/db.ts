import { Product, Order, Category } from "@/types";
import { supabase } from "./supabase";

// ─── Products ──────────────────────────────────────────────────────────────

export async function getAllProducts(): Promise<Product[]> {
  const { data } = await supabase.from("products").select("*").order("createdAt", { ascending: false });
  return data as Product[] || [];
}

export async function getProductsByStore(storeType: "gents" | "kids"): Promise<Product[]> {
  const { data } = await supabase.from("products").select("*").eq("storeType", storeType).order("createdAt", { ascending: false });
  return data as Product[] || [];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data } = await supabase.from("products").select("*").eq("slug", slug).single();
  return data as Product || null;
}

export async function getProductById(id: string): Promise<Product | null> {
  const { data } = await supabase.from("products").select("*").eq("id", id).single();
  return data as Product || null;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const { data } = await supabase.from("products").select("*").eq("featured", true).order("createdAt", { ascending: false });
  return data as Product[] || [];
}

export async function getTrendingProducts(): Promise<Product[]> {
  const { data } = await supabase.from("products").select("*").eq("trending", true).order("createdAt", { ascending: false });
  return data as Product[] || [];
}

export async function getNewArrivals(): Promise<Product[]> {
  const { data } = await supabase.from("products").select("*").eq("newArrival", true).order("createdAt", { ascending: false });
  return data as Product[] || [];
}

export async function getLimitedStockProducts(): Promise<Product[]> {
  const { data } = await supabase.from("products").select("*").eq("limitedStock", true).order("createdAt", { ascending: false });
  return data as Product[] || [];
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  const { data } = await supabase.from("products")
    .select("*")
    .neq("id", product.id)
    .eq("category", product.category)
    .limit(limit);
  return data as Product[] || [];
}

export async function addProduct(product: Product): Promise<void> {
  await supabase.from("products").insert([product]);
}

export async function updateProduct(updated: Product): Promise<void> {
  await supabase.from("products").update(updated).eq("id", updated.id);
}

export async function deleteProduct(id: string): Promise<void> {
  await supabase.from("products").delete().eq("id", id);
}

// ─── Orders ────────────────────────────────────────────────────────────────

export async function getAllOrders(): Promise<Order[]> {
  const { data } = await supabase.from("orders").select("*").order("createdAt", { ascending: false });
  return data as Order[] || [];
}

export async function getOrderById(id: string): Promise<Order | null> {
  const { data } = await supabase.from("orders").select("*").eq("id", id).single();
  return data as Order || null;
}

export async function addOrder(order: Order): Promise<void> {
  await supabase.from("orders").insert([order]);
}

export async function updateOrderStatus(id: string, status: Order["orderStatus"]): Promise<void> {
  await supabase.from("orders").update({ orderStatus: status, updatedAt: new Date().toISOString() }).eq("id", id);
}

// ─── Categories ────────────────────────────────────────────────────────────

export async function getAllCategories(): Promise<Category[]> {
  const { data } = await supabase.from("categories").select("*");
  return data as Category[] || [];
}

export async function addCategory(category: Category): Promise<void> {
  await supabase.from("categories").insert([category]);
}

export async function updateCategory(updated: Category): Promise<void> {
  await supabase.from("categories").update(updated).eq("id", updated.id);
}

export async function deleteCategory(id: string): Promise<void> {
  await supabase.from("categories").delete().eq("id", id);
}
