import { NextResponse } from "next/server";
import { getAllCategories, addCategory, updateCategory, deleteCategory } from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const storeType = searchParams.get("storeType");
  
  let categories = await getAllCategories();
  if (storeType) {
    categories = categories.filter((c) => c.storeType === storeType);
  }
  
  return NextResponse.json(categories);
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const newCategory = {
      ...data,
      id: `cat_${Date.now()}`,
    };
    await addCategory(newCategory);
    return NextResponse.json({ success: true, category: newCategory });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function PUT(req: Request) {
  try {
    const data = await req.json();
    if (!data.id) throw new Error("ID required");
    await updateCategory(data);
    return NextResponse.json({ success: true, category: data });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) throw new Error("ID required");
    await deleteCategory(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
