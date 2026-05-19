import { ProductForm } from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <div className="min-h-screen bg-mute-black py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-black uppercase tracking-tight mb-8">Add New Product</h1>
        <ProductForm />
      </div>
    </div>
  );
}
