import { NextResponse } from "next/server";
import { getProduct } from "@/lib/products";
import { sasPayRequest } from "@/lib/saspay";

type RequestItem = { productId: string; quantity: number };

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const items = body.items as RequestItem[];
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";

    if (!Array.isArray(items) || items.length === 0 || !name || !email) {
      return NextResponse.json(
        { error: "Informations de commande invalides." },
        { status: 400 },
      );
    }

    const safeItems = items.map((item) => {
      const product = getProduct(item.productId);
      const quantity = Number.isInteger(item.quantity) ? item.quantity : 0;
      if (!product || quantity < 1 || quantity > 20)
        throw new Error("Produit ou quantité invalide.");
      return {
        productId: product.id,
        name: product.name,
        quantity,
        unitPrice: product.price,
      };
    });
    const amount = safeItems.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0,
    );
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    if (!siteUrl) throw new Error("NEXT_PUBLIC_SITE_URL est manquante.");

    const payload = await sasPayRequest("/checkout-sessions/", {
      method: "POST",
      body: JSON.stringify({
        amount: amount.toFixed(2),
        currency: "XOF",
        country: "BJ",
        description: `Commande Prime Digital - ${safeItems.map((item) => item.name).join(", ")}`,
        customer_email: email,
        customer_name: name,
        return_url: `${siteUrl.replace(/\/$/, "")}/panier`,
        metadata: { items: safeItems },
      }),
    });
    const session = payload?.data ?? payload;
    return NextResponse.json({
      id: session.id,
      checkoutUrl: session.checkout_url,
      amount,
    });
  } catch (error) {
    console.error("SasPay checkout error", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Impossible de créer le paiement.",
      },
      { status: 500 },
    );
  }
}
