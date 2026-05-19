import { notFound } from "next/navigation";
import { getProductById } from "@/lib/db";
import { ProductForm } from "@/components/admin/ProductForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  const product = await getProductById(id);
  
  if (!product) notFound();

  return (
    <div className="min-h-screen bg-mute-black py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-black uppercase tracking-tight mb-8">Edit Product</h1>
        <ProductForm initialData={product} />
      </div>
    </div>
  );
}
