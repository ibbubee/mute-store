"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, Trash2, Save, Image as ImageIcon, X } from "lucide-react";
import Link from "next/link";
import { Product, ProductSize } from "@/types";
import { toast } from "@/components/ui/Toaster";
import { cn, slugify } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

interface ProductFormProps {
  initialData?: Product;
}

const CATEGORIES = [
  "oversize t-shirt",
  "full sleeve t-shirt",
  "hoodies",
  "trackpants",
  "jersey",
  "printed shirts",
  "plain shirts",
  "formal pants",
  "baggy jeans",
  "straight fit jeans",
  "linen pants",
  "boxers",
  "locket for men",
  "bracelet for men",
  "surplus inners",
  "jeans shirt"
];
const STORE_TYPES = ["gents", "kids"];
const SIZE_OPTIONS = ["XS", "S", "M", "L", "XL", "XXL", "28", "30", "32", "34", "36", "2-3Y", "4-5Y", "6-7Y", "8-9Y"];

export function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dbCategories, setDbCategories] = useState<string[]>([]);
  const [formData, setFormData] = useState<Partial<Product>>(
    initialData || {
      name: "",
      price: 0,
      originalPrice: 0,
      category: "oversize t-shirt",
      storeType: "gents",
      brand: "MUTE",
      style: "streetwear",
      description: "",
      material: "",
      fitType: "",
      sizes: [{ size: "M", stock: 10 }],
      images: [],
      featured: false,
      trending: false,
      newArrival: true,
      limitedStock: false,
      tags: [],
    }
  );

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("name");
      if (!error && data) {
        setDbCategories(data.map((c: any) => c.name));
      }
    };
    fetchCategories();
  }, []);

  const mergedCategories = Array.from(new Set([...CATEGORIES, ...dbCategories])).filter(Boolean);

  const updateField = (field: keyof Product, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addSize = () => {
    const currentSizes = formData.sizes || [];
    updateField("sizes", [...currentSizes, { size: "L", stock: 0 }]);
  };

  const removeSize = (index: number) => {
    const currentSizes = formData.sizes || [];
    updateField("sizes", currentSizes.filter((_, i) => i !== index));
  };

  const updateSize = (index: number, field: keyof ProductSize, value: any) => {
    const currentSizes = [...(formData.sizes || [])];
    currentSizes[index] = { ...currentSizes[index], [field]: value };
    updateField("sizes", currentSizes);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Url = event.target?.result as string;
        if (base64Url) {
          updateField("images", [...(formData.images || []), base64Url]);
          toast("Image uploaded successfully!");
        }
        setUploading(false);
      };
      reader.onerror = () => {
        toast("Image upload failed", "error");
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (err: any) {
      toast(err.message || "Image upload failed", "error");
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    updateField("images", (formData.images || []).filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.storeType) {
      toast("Name, Price, and Store Type are required", "error");
      return;
    }

    setLoading(true);
    try {
      let error = null;
      const productToSave = { ...formData };
      
      if (initialData) {
        productToSave.id = initialData.id;
        const res = await supabase.from("products").update(productToSave).eq("id", initialData.id);
        error = res.error;
      } else {
        productToSave.id = `prod-${Math.random().toString(36).substr(2, 9)}`;
        productToSave.slug = slugify(productToSave.name || "");
        productToSave.createdAt = new Date().toISOString();
        const res = await supabase.from("products").insert([productToSave]);
        error = res.error;
      }

      if (!error) {
        toast(initialData ? "Product updated!" : "Product created!");
        router.push("/admin");
        router.refresh();
      } else {
        throw new Error(error.message || "Failed to save");
      }
    } catch (err: any) {
      toast(err.message || "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-2 text-sm text-mute-grey-400 hover:text-mute-white transition-colors">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-6 py-2.5 bg-mute-white text-mute-black font-bold rounded-full hover:bg-mute-beige transition-colors disabled:opacity-50"
        >
          {loading ? <span className="animate-spin w-4 h-4 border-2 border-mute-black border-t-transparent rounded-full" /> : <Save size={18} />}
          {initialData ? "Update Product" : "Save Product"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Basic Info */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-mute-grey-900 border border-mute-grey-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-bold">General Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-mute-grey-500 uppercase tracking-wider mb-1.5">Product Name</label>
                <input
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="e.g. Shadow Oversized Tee"
                  className="w-full px-4 py-3 bg-mute-grey-800 border border-mute-grey-700 rounded-xl text-mute-white focus:outline-none focus:border-mute-beige"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-mute-grey-500 uppercase tracking-wider mb-1.5">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  placeholder="Tell the story of this piece..."
                  rows={4}
                  className="w-full px-4 py-3 bg-mute-grey-800 border border-mute-grey-700 rounded-xl text-mute-white focus:outline-none focus:border-mute-beige resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-mute-grey-500 uppercase tracking-wider mb-1.5">Material</label>
                  <input
                    value={formData.material}
                    onChange={(e) => updateField("material", e.target.value)}
                    placeholder="e.g. 100% Cotton"
                    className="w-full px-4 py-3 bg-mute-grey-800 border border-mute-grey-700 rounded-xl text-mute-white focus:outline-none focus:border-mute-beige"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-mute-grey-500 uppercase tracking-wider mb-1.5">Fit Type</label>
                  <input
                    value={formData.fitType}
                    onChange={(e) => updateField("fitType", e.target.value)}
                    placeholder="e.g. Boxy Fit"
                    className="w-full px-4 py-3 bg-mute-grey-800 border border-mute-grey-700 rounded-xl text-mute-white focus:outline-none focus:border-mute-beige"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="bg-mute-grey-900 border border-mute-grey-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Inventory & Sizes</h2>
              <button
                type="button"
                onClick={addSize}
                className="text-xs font-bold text-mute-beige hover:underline flex items-center gap-1"
              >
                <Plus size={14} /> Add Size
              </button>
            </div>
            <div className="space-y-3">
              {formData.sizes?.map((s, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <select
                    value={s.size}
                    onChange={(e) => updateSize(idx, "size", e.target.value)}
                    className="bg-mute-grey-800 border border-mute-grey-700 rounded-xl px-3 py-2 text-sm focus:outline-none"
                  >
                    {SIZE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                  <input
                    type="number"
                    value={s.stock}
                    onChange={(e) => updateSize(idx, "stock", parseInt(e.target.value) || 0)}
                    placeholder="Stock"
                    className="flex-1 bg-mute-grey-800 border border-mute-grey-700 rounded-xl px-4 py-2 text-sm focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => removeSize(idx)}
                    className="p-2 text-mute-grey-500 hover:text-red-400"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Organization & Media */}
        <div className="space-y-6">
          <section className="bg-mute-grey-900 border border-mute-grey-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-bold">Images</h2>
            <div className="space-y-4">
              {formData.images && formData.images.length > 0 && (
                <div className="grid grid-cols-2 gap-2">
                  {formData.images.map((img, idx) => (
                    <div key={idx} className="relative aspect-square rounded-lg overflow-hidden bg-mute-grey-800">
                      <Image src={img} alt="Product" fill className="object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-1 right-1 p-1 bg-black/50 rounded-full text-white hover:bg-red-500 transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                />
                <div className={cn(
                  "flex items-center justify-center gap-2 w-full py-4 border-2 border-dashed border-mute-grey-700 rounded-xl text-sm font-bold transition-colors",
                  uploading ? "bg-mute-grey-800 text-mute-grey-500" : "hover:border-mute-grey-500 hover:text-mute-white text-mute-grey-400"
                )}>
                  {uploading ? (
                    <span className="animate-pulse">Uploading...</span>
                  ) : (
                    <>
                      <ImageIcon size={18} /> Upload Image
                    </>
                  )}
                </div>
              </div>

              <div className="pt-2 border-t border-mute-grey-800/50 mt-4">
                <label className="block text-[10px] font-bold uppercase text-mute-grey-500 mb-1">Or Add Image URL Directly</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Paste direct visual link (e.g. from Pinterest)"
                    id="direct_product_image_url"
                    className="flex-1 bg-mute-grey-800 border border-mute-grey-700 rounded-xl px-3 py-2 text-xs text-mute-white focus:outline-none focus:border-mute-beige"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const target = e.currentTarget;
                        const url = target.value.trim();
                        if (url) {
                          updateField("images", [...(formData.images || []), url]);
                          target.value = "";
                          toast("Image URL added successfully!");
                        }
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const input = document.getElementById("direct_product_image_url") as HTMLInputElement;
                      const url = input?.value.trim();
                      if (url) {
                        updateField("images", [...(formData.images || []), url]);
                        input.value = "";
                        toast("Image URL added successfully!");
                      }
                    }}
                    className="bg-mute-beige text-mute-black font-black uppercase text-[10px] px-3 py-2 rounded-xl hover:bg-mute-white transition-colors cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-mute-grey-900 border border-mute-grey-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-bold">Pricing</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-mute-grey-500 uppercase tracking-wider mb-1.5">Sale Price</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => updateField("price", parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 bg-mute-grey-800 border border-mute-grey-700 rounded-xl text-mute-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-mute-grey-500 uppercase tracking-wider mb-1.5">Original Price</label>
                <input
                  type="number"
                  value={formData.originalPrice}
                  onChange={(e) => updateField("originalPrice", parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 bg-mute-grey-800 border border-mute-grey-700 rounded-xl text-mute-white focus:outline-none"
                />
              </div>
            </div>
          </section>

          <section className="bg-mute-grey-900 border border-mute-grey-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-bold">Organization</h2>
            
            <div>
              <label className="block text-xs font-bold text-mute-grey-500 uppercase tracking-wider mb-1.5">Store / Studio</label>
              <select
                value={formData.storeType}
                onChange={(e) => updateField("storeType", e.target.value as "gents" | "kids")}
                className="w-full px-4 py-3 bg-mute-grey-800 border border-mute-grey-700 rounded-xl text-mute-white focus:outline-none capitalize"
              >
                {STORE_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-mute-grey-500 uppercase tracking-wider mb-1.5 mt-4">Category</label>
              <input
                list="category-list"
                value={formData.category}
                onChange={(e) => updateField("category", e.target.value)}
                placeholder="Select or type new category..."
                className="w-full px-4 py-3 bg-mute-grey-800 border border-mute-grey-700 rounded-xl text-mute-white focus:outline-none focus:border-mute-beige capitalize"
              />
              <datalist id="category-list">
                {mergedCategories.map(cat => <option key={cat} value={cat} />)}
              </datalist>
            </div>
            
            <div className="space-y-3 pt-4 border-t border-mute-grey-800">
              {[
                { id: "featured", label: "Featured Product" },
                { id: "trending", label: "Trending" },
                { id: "newArrival", label: "New Arrival" },
                { id: "limitedStock", label: "Limited Stock" },
              ].map((toggle) => (
                <label key={toggle.id} className="flex items-center gap-3 cursor-pointer group">
                  <div className={cn(
                    "w-10 h-5 rounded-full relative transition-colors",
                    formData[toggle.id as keyof Product] ? "bg-mute-beige" : "bg-mute-grey-700"
                  )}>
                    <div className={cn(
                      "absolute top-1 w-3 h-3 rounded-full bg-mute-black transition-all",
                      formData[toggle.id as keyof Product] ? "left-6" : "left-1"
                    )} />
                  </div>
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={!!formData[toggle.id as keyof Product]}
                    onChange={(e) => updateField(toggle.id as keyof Product, e.target.checked)}
                  />
                  <span className="text-sm font-medium text-mute-grey-300 group-hover:text-mute-white">{toggle.label}</span>
                </label>
              ))}
            </div>
          </section>
        </div>
      </div>
    </form>
  );
}
