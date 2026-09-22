import { NextResponse } from "next/server";
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
    return NextResponse.json({
      status: session.status,
      verified: transaction?.status === "SUCCESS",
      transaction,
      items: session.metadata?.items ?? [],
    });
  } catch (error) {
    console.error("SasPay status error", error);
    return NextResponse.json(
      { error: "Impossible de vérifier le paiement." },
      { status: 502 },
    );
  }
}
