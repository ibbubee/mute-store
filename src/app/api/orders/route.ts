import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { addOrder, getAllOrders } from "@/lib/db";
import { Order } from "@/types";

export async function GET() {
  const orders = getAllOrders();
  return NextResponse.json(orders);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const order: Order = {
      id: `ORD-${uuidv4().split("-")[0].toUpperCase()}`,
      items: body.items,
      customer: body.customer,
      paymentMethod: body.paymentMethod,
      paymentStatus: "pending",
      orderStatus: "pending",
      subtotal: body.subtotal,
      discount: body.discount ?? 0,
      total: body.total,
      couponCode: body.couponCode,
      notes: body.notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    addOrder(order);
    return NextResponse.json({ success: true, orderId: order.id }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
