import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { getAllProducts, addProduct, updateProduct, deleteProduct } from "@/lib/db";
import { Product } from "@/types";
import { slugify } from "@/lib/utils";

export async function GET() {
  const products = await getAllProducts();
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const product: Product = {
      id: `prod-${uuidv4().split("-")[0]}`,
      slug: slugify(body.name),
      name: body.name,
      price: Number(body.price),
      originalPrice: body.originalPrice ? Number(body.originalPrice) : undefined,
      category: body.category,
      storeType: body.storeType || "gents",
      brand: body.brand,
      style: body.style,
      description: body.description,
      material: body.material,
      fitType: body.fitType,
      sizes: body.sizes,
      images: body.images ?? [],
      featured: Boolean(body.featured),
      trending: Boolean(body.trending),
      newArrival: Boolean(body.newArrival),
      limitedStock: Boolean(body.limitedStock),
      tags: body.tags ?? [],
      createdAt: new Date().toISOString(),
    };
    await addProduct(product);
    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    await updateProduct(body as Product);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    await deleteProduct(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
