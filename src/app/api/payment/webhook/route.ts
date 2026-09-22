import { NextResponse } from "next/server";
import crypto from "node:crypto";

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-webhook-signature") ?? "";
  const timestamp = request.headers.get("x-webhook-timestamp") ?? "";
  const secret = process.env.SASPAY_WEBHOOK_SECRET;
  const timestampNumber = Number(timestamp);
  const expected = secret
    ? crypto
        .createHmac("sha256", secret)
        .update(`${timestamp}.${rawBody}`)
        .digest("hex")
    : "";
  const validSignature =
    signature.length === expected.length &&
    crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  if (
    !secret ||
    !timestampNumber ||
    Math.abs(Math.floor(Date.now() / 1000) - timestampNumber) > 300 ||
    !validSignature
  )
    return NextResponse.json({ error: "Signature invalide." }, { status: 401 });
  const payload = JSON.parse(rawBody) as {
    event?: string;
    data?: { id?: string; status?: string; amount?: string };
  };
  console.info(
    "SasPay webhook",
    payload.event,
    payload.data?.id,
    payload.data?.status,
    payload.data?.amount,
  );
  return NextResponse.json({ received: true });
}
