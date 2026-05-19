import { NextResponse } from "next/server";
import { updateOrderStatus, getOrderById } from "@/lib/db";
import { Order } from "@/types";

interface Props {
  params: Promise<{ id: string }>;
}

export async function GET(_req: Request, { params }: Props) {
  const { id } = await params;
  const order = getOrderById(id);
  if (!order) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(order);
}

export async function PATCH(req: Request, { params }: Props) {
  const { id } = await params;
  const body = await req.json();
  updateOrderStatus(id, body.status as Order["orderStatus"]);
  return NextResponse.json({ success: true });
}
