import { NextResponse } from "next/server";
import { getOrderDelivery, getProduct } from "@/lib/products";
import { sasPayRequest } from "@/lib/saspay";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    if (!/^[0-9a-f-]{36}$/i.test(id))
      return NextResponse.json({ error: "Session invalide." }, { status: 400 });
    const payload = await sasPayRequest(`/checkout-sessions/${id}/`);
    const session = payload?.data ?? payload;
    let transaction = null;
    const transactionId =
      typeof session.transaction === "string"
        ? session.transaction
        : session.transaction?.id;
    if (session.status === "PAID" && transactionId) {
      const verified = await sasPayRequest(
        `/payments/${transactionId}/verify/`,
      );
      transaction = verified?.data ?? verified;
    }
    const verified = transaction?.status === "SUCCESS";
    let delivery = { files: [] as string[], bonuses: [] as string[] };
    if (verified) {
      const sessionItems = session.metadata?.items;
      if (!Array.isArray(sessionItems) || sessionItems.length === 0) {
        return NextResponse.json(
          { error: "Les produits de la commande sont invalides." },
          { status: 502 },
        );
      }
      const productIds: string[] = [];
      for (const item of sessionItems) {
        if (
          !item ||
          typeof item.productId !== "string" ||
          !getProduct(item.productId) ||
          !Number.isInteger(item.quantity) ||
          item.quantity < 1 ||
          item.quantity > 20
        ) {
          return NextResponse.json(
            { error: "Les produits de la commande sont invalides." },
            { status: 502 },
          );
        }
        productIds.push(item.productId);
      }
      delivery = getOrderDelivery(productIds);
    }
    return NextResponse.json({
      status: session.status,
      verified,
      transaction,
      downloadFiles: delivery.files,
      bonuses: delivery.bonuses,
      customerEmail: session.customer_email ?? "",
      customerName: session.customer_name ?? "Client",
    });
  } catch (error) {
    console.error("SasPay status error", error);
    return NextResponse.json(
      { error: "Impossible de vérifier le paiement." },
      { status: 502 },
    );
  }
}
