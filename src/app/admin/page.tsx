"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Package,
  ShoppingBag,
  TrendingUp,
  Users,
  Plus,
  Eye,
  Edit,
  Trash2,
  Check,
  X,
  ArrowUpRight,
} from "lucide-react";
import { Product, Category } from "@/types";
import { formatPrice, getTotalStock, cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [activeTab, setActiveTab] = useState<"dashboard" | "products" | "categories" | "banners">("dashboard");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<import("@/types").Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const router = useRouter();

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push("/admin/login");
        return;
      }
      
      setAuthed(true);
      
      Promise.all([
        supabase.from("products").select("*").order("createdAt", { ascending: false }),
        supabase.from("categories").select("*"),
      ])
        .then(([pRes, cRes]) => {
          if (pRes.data) setProducts(pRes.data as Product[]);
          if (cRes.data) {
            const mapped = (cRes.data as any[]).map(c => ({
              ...c,
              desc: c.description || c.desc || ""
            }));
            setCategories(mapped);
          } else {
            setCategories([]);
          }
        })
        .finally(() => setLoading(false));
    };

    checkAuthAndFetch();
  }, [router]);

  const deleteProduct = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (!error) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.brand && product.brand.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory =
      categoryFilter === "all" ||
      product.category.toLowerCase() === categoryFilter.toLowerCase();
      
    return matchesSearch && matchesCategory;
  });

  const uniqueCategories = Array.from(
    new Set(products.map((p) => p.category).filter(Boolean))
  );

  const totalLeads = products.reduce((acc, p) => acc + (p.whatsappClicks || 0), 0);
  const stats = [
    {
      label: "Total Products",
      value: products.length,
      icon: <Package size={18} />,
      color: "text-blue-400",
    },
    {
      label: "Live Categories",
      value: categories.filter(c => !c.storeType.endsWith("_hero")).length,
      icon: <TrendingUp size={18} />,
      color: "text-mute-beige",
    },
    {
      label: "WhatsApp Leads",
      value: totalLeads,
      icon: <ShoppingBag size={18} />,
      color: "text-green-400",
    },
  ];

  const addNewCategory = async (storeType: "gents" | "kids" | "gents_hero" | "kids_hero") => {
    const isHero = storeType.endsWith("_hero");
    const newCat: Category = {
      id: `cat_${Math.random().toString(36).substr(2, 9)}`,
      name: isHero ? "NEW TAG" : "New Sub-label",
      label: isHero ? "New Slide Title" : "New Category",
      slug: isHero ? "banner-link" : "new-category",
      desc: isHero ? "Slide description subtitle here." : "Description here.",
      image: isHero ? "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1600&q=80" : "",
      storeType
    };
    
    const dbCat = {
      id: newCat.id,
      name: newCat.name,
      label: newCat.label,
      slug: newCat.slug,
      image: newCat.image,
      storeType: newCat.storeType,
      description: newCat.desc || ""
    };
    
    const { error } = await supabase.from("categories").insert([dbCat]);
    if (!error) {
      setCategories((prev) => [...(prev || []), newCat]);
    } else {
      console.error("Add error:", error);
      alert("Failed to add: " + error.message);
    }
  };



  const deleteCategory = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (!error) {
      setCategories((prev) => (prev || []).filter(c => c.id !== id));
    }
  };

  const updateCategoryItem = async (cat: import("@/types").Category) => {
    const { desc, ...rest } = cat as any;
    const dbCat = {
      ...rest,
      description: desc || ""
    };
    const { error } = await supabase.from("categories").upsert([dbCat]);
    if (error) {
      console.error("Update error:", error);
      alert("Update failed: " + error.message);
    }
  };

  const uploadCategoryImage = async (file: File, catIdx: number) => {
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64Url = e.target?.result as string;
        if (!base64Url) return;
        
        const newCats = [...categories];
        newCats[catIdx].image = base64Url;
        setCategories(newCats);
        await updateCategoryItem(newCats[catIdx]);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error(err);
      alert("Failed to upload image");
    }
  };

  return (
    <div className="min-h-screen bg-mute-black text-mute-white">
      {/* Admin header */}
      <header className="border-b border-mute-grey-800 bg-mute-grey-900 px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl font-black tracking-widest">MUTE</span>
            <span className="text-xs text-mute-grey-600 font-medium border border-mute-grey-700 px-2 py-0.5 rounded">
              ADMIN
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 text-xs text-mute-grey-400 hover:text-mute-white transition-colors"
            >
              View Store <ArrowUpRight size={12} />
            </Link>
            <button
              onClick={async () => {
                await supabase.auth.signOut();
                router.push("/admin/login");
              }}
              className="text-xs text-red-400 hover:text-red-300 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-mute-grey-800 bg-mute-grey-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex gap-1">
            {(["dashboard", "products", "categories", "banners"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-5 py-3 text-sm font-semibold capitalize border-b-2 transition-colors",
                  activeTab === tab
                    ? "border-mute-beige text-mute-white"
                    : "border-transparent text-mute-grey-500 hover:text-mute-grey-300"
                )}
              >
                {tab === "banners" ? "Hero Banners" : tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {loading ? (
          <div className="py-24">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            {activeTab === "dashboard" && (
              <div className="space-y-8">
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {stats.map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="bg-mute-grey-900 border border-mute-grey-800 rounded-2xl p-5"
                    >
                      <div className={cn("mb-2", stat.color)}>{stat.icon}</div>
                      <p className="text-2xl font-black">{stat.value}</p>
                      <p className="text-xs text-mute-grey-500 mt-0.5">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "products" && (
              <div>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="font-bold text-lg">Products ({filteredProducts.length})</h2>
                    {searchQuery || categoryFilter !== "all" ? (
                      <p className="text-xs text-mute-grey-500 mt-0.5">Filtered from {products.length} total products</p>
                    ) : null}
                  </div>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-mute-grey-900 border border-mute-grey-800 rounded-xl px-4 py-2 text-sm text-mute-white focus:outline-none focus:border-mute-beige transition-colors min-w-[200px]"
                    />
                    <Link 
                      href="/admin/products/new"
                      className="bg-mute-beige hover:bg-mute-beige/95 text-mute-black font-black uppercase tracking-wider text-xs px-4 py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-center"
                    >
                      <Plus size={14} /> Add Product
                    </Link>
                  </div>
                </div>

                <div className="bg-mute-grey-900 border border-mute-grey-800 rounded-2xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-mute-grey-800 text-[11px] font-bold text-mute-grey-500 uppercase tracking-wider">
                          <th className="py-4 px-6">Product</th>
                          <th className="py-4 px-6">Category</th>
                          <th className="py-4 px-6">Store</th>
                          <th className="py-4 px-6">Price</th>
                          <th className="py-4 px-6 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-mute-grey-800/50 text-sm">
                        {filteredProducts.map((product) => (
                          <tr key={product.id} className="hover:bg-mute-grey-800/20 transition-colors">
                            <td className="py-4 px-6 flex items-center gap-3">
                              <div className="w-10 h-10 bg-mute-grey-800 rounded-lg overflow-hidden flex-shrink-0">
                                {product.images?.[0] && (
                                  <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                                )}
                              </div>
                              <div>
                                <span className="font-bold block">{product.name}</span>
                                <span className="text-[10px] text-mute-grey-600 block">{product.id}</span>
                              </div>
                            </td>
                            <td className="py-4 px-6 capitalize text-mute-grey-300">{product.category}</td>
                            <td className="py-4 px-6 capitalize">
                              <span className={cn(
                                "px-2 py-0.5 rounded text-[10px] font-black tracking-wider uppercase",
                                product.storeType === "gents" ? "bg-mute-beige/10 text-mute-beige" : "bg-blue-400/10 text-blue-300"
                              )}>
                                {product.storeType}
                              </span>
                            </td>
                            <td className="py-4 px-6 text-mute-grey-300">{formatPrice(product.price)}</td>
                            <td className="py-4 px-6 text-right">
                              <button 
                                onClick={() => deleteProduct(product.id)}
                                className="text-red-400 hover:text-red-300 p-1.5 rounded-full hover:bg-red-400/10 transition-colors"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "categories" && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="font-bold text-lg">Featured Collections</h2>
                    <p className="text-sm text-mute-grey-500">Manage the core featured visual grid sections on the Gents and Kids homepages.</p>
                  </div>
                </div>
                
                <div className="mb-12">
                  <div className="flex items-center justify-between border-b border-mute-grey-800 pb-2 mb-6">
                    <h3 className="font-bold text-mute-beige uppercase tracking-widest">Gents Studio</h3>
                    <button 
                      onClick={() => addNewCategory("gents")}
                      className="text-xs font-bold bg-mute-grey-800 hover:bg-mute-grey-700 px-3 py-1.5 rounded-full flex items-center gap-1 transition-colors text-mute-white"
                    >
                      <Plus size={14} /> Add Category
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {categories.filter(c => c.storeType === "gents").map((cat) => {
                      const idx = categories.findIndex(c => c.id === cat.id);
                      return (
                        <div key={cat.id} className="bg-mute-grey-900 border border-mute-grey-800 rounded-2xl p-6 relative overflow-hidden flex flex-col md:flex-row gap-6">
                          
                          {/* Visual image box */}
                          <div className="w-full md:w-36 h-36 relative bg-mute-grey-800 rounded-xl overflow-hidden group">
                            {cat.image ? (
                              <img src={cat.image} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-mute-grey-600 text-xs">No Image</div>
                            )}
                            <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity text-[10px] font-bold text-mute-white">
                              <input 
                                type="file" 
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  if (e.target.files && e.target.files[0]) {
                                    uploadCategoryImage(e.target.files[0], idx);
                                  }
                                }}
                              />
                              Change Cover
                            </label>
                          </div>

                          <div className="flex-1 space-y-3">
                            <div className="flex items-center justify-between">
                              <h4 className="font-bold text-mute-white">Category Setup</h4>
                              <button 
                                onClick={() => deleteCategory(cat.id)}
                                className="text-red-400 hover:text-red-300 p-1.5 rounded-full bg-red-400/10 transition-colors"
                                aria-label="Delete Category"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <label className="text-[10px] font-bold uppercase text-mute-grey-500 mb-0.5 block">Display Name</label>
                                  <input 
                                    type="text" 
                                    value={cat.label}
                                    onChange={async (e) => {
                                      const newCats = [...categories];
                                      newCats[idx].label = e.target.value;
                                      setCategories(newCats);
                                      await updateCategoryItem(newCats[idx]);
                                    }}
                                    className="w-full bg-mute-grey-800 border border-mute-grey-700 rounded-lg px-2.5 py-1.5 text-xs text-mute-white focus:outline-none focus:border-mute-beige"
                                  />
                                </div>
                                <div>
                                  <label className="text-[10px] font-bold uppercase text-mute-grey-500 mb-0.5 block">Sub-label</label>
                                  <input 
                                    type="text" 
                                    value={cat.name}
                                    onChange={async (e) => {
                                      const newCats = [...categories];
                                      newCats[idx].name = e.target.value;
                                      setCategories(newCats);
                                      await updateCategoryItem(newCats[idx]);
                                    }}
                                    className="w-full bg-mute-grey-800 border border-mute-grey-700 rounded-lg px-2.5 py-1.5 text-xs text-mute-white focus:outline-none focus:border-mute-beige"
                                  />
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <label className="text-[10px] font-bold uppercase text-mute-grey-500 mb-0.5 block">Search Slug</label>
                                  <input 
                                    type="text" 
                                    value={cat.slug}
                                    onChange={async (e) => {
                                      const newCats = [...categories];
                                      newCats[idx].slug = e.target.value;
                                      setCategories(newCats);
                                      await updateCategoryItem(newCats[idx]);
                                    }}
                                    className="w-full bg-mute-grey-800 border border-mute-grey-700 rounded-lg px-2.5 py-1.5 text-xs text-mute-white focus:outline-none focus:border-mute-beige"
                                  />
                                </div>
                                <div>
                                  <label className="text-[10px] font-bold uppercase text-mute-grey-500 mb-0.5 block">Description</label>
                                  <input 
                                    type="text" 
                                    value={cat.desc || ""}
                                    onChange={async (e) => {
                                      const newCats = [...categories];
                                      newCats[idx].desc = e.target.value;
                                      setCategories(newCats);
                                      await updateCategoryItem(newCats[idx]);
                                    }}
                                    className="w-full bg-mute-grey-800 border border-mute-grey-700 rounded-lg px-2.5 py-1.5 text-xs text-mute-white focus:outline-none focus:border-mute-beige"
                                  />
                                </div>
                              </div>
                              <div className="pt-1">
                                <label className="text-[10px] font-bold uppercase text-mute-grey-500 mb-0.5 block">Image URL (Direct Link)</label>
                                <input 
                                  type="text" 
                                  value={cat.image || ""}
                                  placeholder="Paste direct visual link (e.g. from Unsplash)"
                                  onChange={async (e) => {
                                    const newCats = [...categories];
                                    newCats[idx].image = e.target.value;
                                    setCategories(newCats);
                                    await updateCategoryItem(newCats[idx]);
                                  }}
                                  className="w-full bg-mute-grey-800 border border-mute-grey-700 rounded-lg px-2.5 py-1.5 text-xs text-mute-white focus:outline-none focus:border-mute-beige"
                                />
                              </div>
                            </div>
                          </div>

                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between border-b border-mute-grey-800 pb-2 mb-6">
                    <h3 className="font-bold text-mute-beige uppercase tracking-widest">Kids Studio</h3>
                    <button 
                      onClick={() => addNewCategory("kids")}
                      className="text-xs font-bold bg-mute-grey-800 hover:bg-mute-grey-700 px-3 py-1.5 rounded-full flex items-center gap-1 transition-colors text-mute-white"
                    >
                      <Plus size={14} /> Add Category
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {categories.filter(c => c.storeType === "kids").map((cat) => {
                      const idx = categories.findIndex(c => c.id === cat.id);
                      return (
                        <div key={cat.id} className="bg-mute-grey-900 border border-mute-grey-800 rounded-2xl p-6 relative overflow-hidden flex flex-col md:flex-row gap-6">
                          
                          {/* Visual image box */}
                          <div className="w-full md:w-36 h-36 relative bg-mute-grey-800 rounded-xl overflow-hidden group">
                            {cat.image ? (
                              <img src={cat.image} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-mute-grey-600 text-xs">No Image</div>
                            )}
                            <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity text-[10px] font-bold text-mute-white">
                              <input 
                                type="file" 
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  if (e.target.files && e.target.files[0]) {
                                    uploadCategoryImage(e.target.files[0], idx);
                                  }
                                }}
                              />
                              Change Cover
                            </label>
                          </div>

                          <div className="flex-1 space-y-3">
                            <div className="flex items-center justify-between">
                              <h4 className="font-bold text-mute-white">Category Setup</h4>
                              <button 
                                onClick={() => deleteCategory(cat.id)}
                                className="text-red-400 hover:text-red-300 p-1.5 rounded-full bg-red-400/10 transition-colors"
                                aria-label="Delete Category"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <label className="text-[10px] font-bold uppercase text-mute-grey-500 mb-0.5 block">Display Name</label>
                                  <input 
                                    type="text" 
                                    value={cat.label}
                                    onChange={async (e) => {
                                      const newCats = [...categories];
                                      newCats[idx].label = e.target.value;
                                      setCategories(newCats);
                                      await updateCategoryItem(newCats[idx]);
                                    }}
                                    className="w-full bg-mute-grey-800 border border-mute-grey-700 rounded-lg px-2.5 py-1.5 text-xs text-mute-white focus:outline-none focus:border-mute-beige"
                                  />
                                </div>
                                <div>
                                  <label className="text-[10px] font-bold uppercase text-mute-grey-500 mb-0.5 block">Sub-label</label>
                                  <input 
                                    type="text" 
                                    value={cat.name}
                                    onChange={async (e) => {
                                      const newCats = [...categories];
                                      newCats[idx].name = e.target.value;
                                      setCategories(newCats);
                                      await updateCategoryItem(newCats[idx]);
                                    }}
                                    className="w-full bg-mute-grey-800 border border-mute-grey-700 rounded-lg px-2.5 py-1.5 text-xs text-mute-white focus:outline-none focus:border-mute-beige"
                                  />
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <label className="text-[10px] font-bold uppercase text-mute-grey-500 mb-0.5 block">Search Slug</label>
                                  <input 
                                    type="text" 
                                    value={cat.slug}
                                    onChange={async (e) => {
                                      const newCats = [...categories];
                                      newCats[idx].slug = e.target.value;
                                      setCategories(newCats);
                                      await updateCategoryItem(newCats[idx]);
                                    }}
                                    className="w-full bg-mute-grey-800 border border-mute-grey-700 rounded-lg px-2.5 py-1.5 text-xs text-mute-white focus:outline-none focus:border-mute-beige"
                                  />
                                </div>
                                <div>
                                  <label className="text-[10px] font-bold uppercase text-mute-grey-500 mb-0.5 block">Description</label>
                                  <input 
                                    type="text" 
                                    value={cat.desc || ""}
                                    onChange={async (e) => {
                                      const newCats = [...categories];
                                      newCats[idx].desc = e.target.value;
                                      setCategories(newCats);
                                      await updateCategoryItem(newCats[idx]);
                                    }}
                                    className="w-full bg-mute-grey-800 border border-mute-grey-700 rounded-lg px-2.5 py-1.5 text-xs text-mute-white focus:outline-none focus:border-mute-beige"
                                  />
                                </div>
                              </div>
                              <div className="pt-1">
                                <label className="text-[10px] font-bold uppercase text-mute-grey-500 mb-0.5 block">Image URL (Direct Link)</label>
                                <input 
                                  type="text" 
                                  value={cat.image || ""}
                                  placeholder="Paste direct visual link (e.g. from Unsplash)"
                                  onChange={async (e) => {
                                    const newCats = [...categories];
                                    newCats[idx].image = e.target.value;
                                    setCategories(newCats);
                                    await updateCategoryItem(newCats[idx]);
                                  }}
                                  className="w-full bg-mute-grey-800 border border-mute-grey-700 rounded-lg px-2.5 py-1.5 text-xs text-mute-white focus:outline-none focus:border-mute-beige"
                                />
                              </div>
                            </div>
                          </div>

                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "banners" && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="font-bold text-lg">Hero Lookbook Banners</h2>
                    <p className="text-sm text-mute-grey-500">Manage the auto-sliding campaigns rendered at the top of the Gents and Kids homepages.</p>
                  </div>
                </div>

                {/* GENTS HERO SLIDESHOW SECTION */}
                <div className="mb-12">
                  <div className="flex items-center justify-between border-b border-mute-grey-800 pb-2 mb-6">
                    <h3 className="font-bold text-mute-beige uppercase tracking-widest">Gents Hero Slideshow</h3>
                    <button 
                      onClick={() => addNewCategory("gents_hero")}
                      className="text-xs font-bold bg-mute-grey-800 hover:bg-mute-grey-700 px-3 py-1.5 rounded-full flex items-center gap-1 transition-colors text-mute-white"
                    >
                      <Plus size={14} /> Add Slide
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {categories.filter(c => c.storeType === "gents_hero").map((cat) => {
                      const idx = categories.findIndex(c => c.id === cat.id);
                      return (
                        <div key={cat.id} className="bg-mute-grey-900 border border-mute-grey-800 rounded-2xl p-6 relative overflow-hidden flex flex-col md:flex-row gap-6">
                          
                          {/* Left Column: Visual Cover */}
                          <div className="w-full md:w-48 h-48 relative bg-mute-grey-800 rounded-xl overflow-hidden group">
                            {cat.image ? (
                              <img src={cat.image} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-mute-grey-600 text-xs">No Cover Image</div>
                            )}
                            <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity text-xs font-bold text-mute-white">
                              <input 
                                type="file" 
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  if (e.target.files && e.target.files[0]) {
                                    uploadCategoryImage(e.target.files[0], idx);
                                  }
                                }}
                              />
                              Change Slide Image
                            </label>
                          </div>

                          {/* Right Column: Fields */}
                          <div className="flex-1 space-y-3">
                            <div className="flex items-center justify-between">
                              <h4 className="font-bold text-mute-white">Slide Settings</h4>
                              <button 
                                onClick={() => deleteCategory(cat.id)}
                                className="text-red-400 hover:text-red-300 p-1.5 rounded-full bg-red-400/10 transition-colors"
                                aria-label="Delete Slide"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>

                            <div className="space-y-2">
                              <div>
                                <label className="text-[10px] font-bold uppercase text-mute-grey-500 mb-0.5 block">Slide Tag (Small Caps)</label>
                                <input 
                                  type="text" 
                                  value={cat.name}
                                  onChange={async (e) => {
                                    const newCats = [...categories];
                                    newCats[idx].name = e.target.value;
                                    setCategories(newCats);
                                    await updateCategoryItem(newCats[idx]);
                                  }}
                                  className="w-full bg-mute-grey-800 border border-mute-grey-700 rounded-lg px-2.5 py-1.5 text-xs text-mute-white focus:outline-none focus:border-mute-beige"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] font-bold uppercase text-mute-grey-500 mb-0.5 block">Slide Title (Serif Heading)</label>
                                <input 
                                  type="text" 
                                  value={cat.label}
                                  onChange={async (e) => {
                                    const newCats = [...categories];
                                    newCats[idx].label = e.target.value;
                                    setCategories(newCats);
                                    await updateCategoryItem(newCats[idx]);
                                  }}
                                  className="w-full bg-mute-grey-800 border border-mute-grey-700 rounded-lg px-2.5 py-1.5 text-xs text-mute-white focus:outline-none focus:border-mute-beige"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] font-bold uppercase text-mute-grey-500 mb-0.5 block">Slide Subtitle (Paragraph)</label>
                                <textarea 
                                  rows={2}
                                  value={cat.desc || ""}
                                  onChange={async (e) => {
                                    const newCats = [...categories];
                                    newCats[idx].desc = e.target.value;
                                    setCategories(newCats);
                                    await updateCategoryItem(newCats[idx]);
                                  }}
                                  className="w-full bg-mute-grey-800 border border-mute-grey-700 rounded-lg px-2.5 py-1.5 text-xs text-mute-white focus:outline-none focus:border-mute-beige resize-none"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] font-bold uppercase text-mute-grey-500 mb-0.5 block">Target Link (Search Slug)</label>
                                <input 
                                  type="text" 
                                  value={cat.slug}
                                  onChange={async (e) => {
                                    const newCats = [...categories];
                                    newCats[idx].slug = e.target.value;
                                    setCategories(newCats);
                                    await updateCategoryItem(newCats[idx]);
                                  }}
                                  className="w-full bg-mute-grey-800 border border-mute-grey-700 rounded-lg px-2.5 py-1.5 text-xs text-mute-white focus:outline-none focus:border-mute-beige"
                                />
                              </div>
                            </div>
                          </div>

                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* KIDS HERO SLIDESHOW SECTION */}
                <div>
                  <div className="flex items-center justify-between border-b border-mute-grey-800 pb-2 mb-6">
                    <h3 className="font-bold text-mute-beige uppercase tracking-widest">Kids Hero Slideshow</h3>
                    <button 
                      onClick={() => addNewCategory("kids_hero")}
                      className="text-xs font-bold bg-mute-grey-800 hover:bg-mute-grey-700 px-3 py-1.5 rounded-full flex items-center gap-1 transition-colors text-mute-white"
                    >
                      <Plus size={14} /> Add Slide
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {categories.filter(c => c.storeType === "kids_hero").map((cat) => {
                      const idx = categories.findIndex(c => c.id === cat.id);
                      return (
                        <div key={cat.id} className="bg-mute-grey-900 border border-mute-grey-800 rounded-2xl p-6 relative overflow-hidden flex flex-col md:flex-row gap-6">
                          
                          {/* Left Column: Visual Cover */}
                          <div className="w-full md:w-48 h-48 relative bg-mute-grey-800 rounded-xl overflow-hidden group">
                            {cat.image ? (
                              <img src={cat.image} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-mute-grey-600 text-xs">No Cover Image</div>
                            )}
                            <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity text-xs font-bold text-mute-white">
                              <input 
                                type="file" 
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  if (e.target.files && e.target.files[0]) {
                                    uploadCategoryImage(e.target.files[0], idx);
                                  }
                                }}
                              />
                              Change Slide Image
                            </label>
                          </div>

                          {/* Right Column: Fields */}
                          <div className="flex-1 space-y-3">
                            <div className="flex items-center justify-between">
                              <h4 className="font-bold text-mute-white">Slide Settings</h4>
                              <button 
                                onClick={() => deleteCategory(cat.id)}
                                className="text-red-400 hover:text-red-300 p-1.5 rounded-full bg-red-400/10 transition-colors"
                                aria-label="Delete Slide"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>

                            <div className="space-y-2">
                              <div>
                                <label className="text-[10px] font-bold uppercase text-mute-grey-500 mb-0.5 block">Slide Tag (Small Caps)</label>
                                <input 
                                  type="text" 
                                  value={cat.name}
                                  onChange={async (e) => {
                                    const newCats = [...categories];
                                    newCats[idx].name = e.target.value;
                                    setCategories(newCats);
                                    await updateCategoryItem(newCats[idx]);
                                  }}
                                  className="w-full bg-mute-grey-800 border border-mute-grey-700 rounded-lg px-2.5 py-1.5 text-xs text-mute-white focus:outline-none focus:border-mute-beige"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] font-bold uppercase text-mute-grey-500 mb-0.5 block">Slide Title (Serif Heading)</label>
                                <input 
                                  type="text" 
                                  value={cat.label}
                                  onChange={async (e) => {
                                    const newCats = [...categories];
                                    newCats[idx].label = e.target.value;
                                    setCategories(newCats);
                                    await updateCategoryItem(newCats[idx]);
                                  }}
                                  className="w-full bg-mute-grey-800 border border-mute-grey-700 rounded-lg px-2.5 py-1.5 text-xs text-mute-white focus:outline-none focus:border-mute-beige"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] font-bold uppercase text-mute-grey-500 mb-0.5 block">Slide Subtitle (Paragraph)</label>
                                <textarea 
                                  rows={2}
                                  value={cat.desc || ""}
                                  onChange={async (e) => {
                                    const newCats = [...categories];
                                    newCats[idx].desc = e.target.value;
                                    setCategories(newCats);
                                    await updateCategoryItem(newCats[idx]);
                                  }}
                                  className="w-full bg-mute-grey-800 border border-mute-grey-700 rounded-lg px-2.5 py-1.5 text-xs text-mute-white focus:outline-none focus:border-mute-beige resize-none"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] font-bold uppercase text-mute-grey-500 mb-0.5 block">Target Link (Search Slug)</label>
                                <input 
                                  type="text" 
                                  value={cat.slug}
                                  onChange={async (e) => {
                                    const newCats = [...categories];
                                    newCats[idx].slug = e.target.value;
                                    setCategories(newCats);
                                    await updateCategoryItem(newCats[idx]);
                                  }}
                                  className="w-full bg-mute-grey-800 border border-mute-grey-700 rounded-lg px-2.5 py-1.5 text-xs text-mute-white focus:outline-none focus:border-mute-beige"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] font-bold uppercase text-mute-grey-500 mb-0.5 block">Slide Image URL</label>
                                <input 
                                  type="text" 
                                  value={cat.image || ""}
                                  placeholder="Paste direct visual link"
                                  onChange={async (e) => {
                                    const newCats = [...categories];
                                    newCats[idx].image = e.target.value;
                                    setCategories(newCats);
                                    await updateCategoryItem(newCats[idx]);
                                  }}
                                  className="w-full bg-mute-grey-800 border border-mute-grey-700 rounded-lg px-2.5 py-1.5 text-xs text-mute-white focus:outline-none focus:border-mute-beige"
                                />
                              </div>
                            </div>
                          </div>

                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
