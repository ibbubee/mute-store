import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function calculateDiscount(price: number, originalPrice: number): number {
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getTotalStock(sizes: { size: string; stock: number }[]): number {
  return sizes.reduce((acc, s) => acc + s.stock, 0);
}

export function isLowStock(sizes: { size: string; stock: number }[], threshold = 3): boolean {
  const total = getTotalStock(sizes);
  return total > 0 && total <= threshold;
}

export function getWhatsAppUrl(phone: string, message: string): string {
  const cleanPhone = phone.replace(/\D/g, "");
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_NUMBER = "+919895000000"; // Replace with actual number

export function buildWhatsAppProductMessage(
  productName: string,
  size: string,
  price: number,
  productUrl: string
): string {
  return `Hi MUTE! 👋\n\nI'm interested in:\n*${productName}*\nSize: ${size}\nPrice: ₹${price}\n\n${productUrl}\n\nIs it available?`;
}
