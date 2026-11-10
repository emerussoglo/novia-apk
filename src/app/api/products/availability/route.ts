import { NextResponse } from "next/server";
import { products } from "@/lib/products";

export async function GET() {
  const availability = Object.fromEntries(
    products.map((product) => [product.id, product.availableForPurchase]),
  );
  return NextResponse.json({ products: availability });
}
