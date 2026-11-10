import { NextResponse } from "next/server";
import { getProduct } from "@/lib/products";
import { sasPayRequest } from "@/lib/saspay";

type RequestItem = { productId: string; quantity: number };

function isRequestItem(item: unknown): item is RequestItem {
  if (!item || typeof item !== "object") return false;
  const candidate = item as Record<string, unknown>;
  return (
    typeof candidate.productId === "string" &&
    typeof candidate.quantity === "number" &&
    Number.isInteger(candidate.quantity)
  );
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Informations de commande invalides." },
        { status: 400 },
      );
    }
    const requestBody = body as {
      items?: unknown;
      name?: unknown;
      email?: unknown;
    };
    const items = requestBody.items;
    const name =
      typeof requestBody.name === "string" ? requestBody.name.trim() : "";
    const email =
      typeof requestBody.email === "string" ? requestBody.email.trim() : "";

    if (
      !Array.isArray(items) ||
      items.length === 0 ||
      !items.every(isRequestItem) ||
      !name ||
      !/^\S+@\S+\.\S+$/.test(email)
    ) {
      return NextResponse.json(
        { error: "Informations de commande invalides." },
        { status: 400 },
      );
    }

    const requestItems = items.filter(isRequestItem);
    if (requestItems.length !== items.length) {
      return NextResponse.json(
        { error: "Produit ou quantité invalide." },
        { status: 400 },
      );
    }

    const safeItems: Array<{
      productId: string;
      name: string;
      quantity: number;
      unitPrice: number;
    }> = [];
    for (const item of requestItems) {
      const product = getProduct(item.productId);
      if (!product || item.quantity < 1 || item.quantity > 20) {
        return NextResponse.json(
          { error: "Produit ou quantité invalide." },
          { status: 400 },
        );
      }
      if (!product.availableForPurchase) {
        return NextResponse.json(
          {
            error: `Le fichier de livraison de ${product.name} n’est pas encore disponible.`,
          },
          { status: 409 },
        );
      }
      safeItems.push({
        productId: product.id,
        name: product.name,
        quantity: item.quantity,
        unitPrice: product.price,
      });
    }
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
        description: `Commande NovaStudio - ${safeItems.map((item) => item.name).join(", ")}`,
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
