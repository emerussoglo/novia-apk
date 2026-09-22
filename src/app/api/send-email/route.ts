import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getProduct } from "@/lib/products";
import { sasPayRequest } from "@/lib/saspay";

type EmailItem = { productId: string; quantity: number };

function escapeHtml(value: string) {
  return value.replace(
    /[&<>'"]/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
      })[character] ?? character,
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const sessionId = typeof body.sessionId === "string" ? body.sessionId : "";
    if (!/^[0-9a-f-]{36}$/i.test(sessionId)) {
      return NextResponse.json(
        { error: "Session de paiement invalide." },
        { status: 400 },
      );
    }

    const sessionPayload = await sasPayRequest(
      `/checkout-sessions/${sessionId}/`,
    );
    const session = sessionPayload?.data ?? sessionPayload;
    const transactionId =
      typeof session.transaction === "string"
        ? session.transaction
        : session.transaction?.id;
    if (session.status !== "PAID" || !transactionId) {
      return NextResponse.json(
        { error: "Paiement non confirmé." },
        { status: 409 },
      );
    }

    const transactionPayload = await sasPayRequest(
      `/payments/${transactionId}/verify/`,
    );
    const transaction = transactionPayload?.data ?? transactionPayload;
    if (transaction.status !== "SUCCESS") {
      return NextResponse.json(
        { error: "Paiement non confirmé." },
        { status: 409 },
      );
    }

    const email =
      typeof session.customer_email === "string"
        ? session.customer_email.trim()
        : "";
    const customerName =
      typeof session.customer_name === "string"
        ? session.customer_name.trim()
        : "Client";
    const items = session.metadata?.items as EmailItem[];

    if (
      !/^\S+@\S+\.\S+$/.test(email) ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return NextResponse.json(
        { error: "Destinataire ou produits invalides." },
        { status: 400 },
      );
    }

    const products = items.map((item) => {
      const product = getProduct(item.productId);
      if (
        !product ||
        !Number.isInteger(item.quantity) ||
        item.quantity < 1 ||
        item.quantity > 20
      ) {
        throw new Error("Produit invalide.");
      }
      return { product, quantity: item.quantity };
    });

    const resend = new Resend(process.env.RESEND_API_KEY);
    const from =
      process.env.RESEND_FROM_EMAIL ?? "Prime Digital <onboarding@resend.dev>";
    const productLinks = products
      .map(
        ({ product, quantity }) => `
      <li style="margin: 0 0 16px;">
        <strong>${escapeHtml(product.name)}</strong> x${quantity}<br />
        <a href="${product.driveUrl}" style="color:#2563eb;">Accéder au téléchargement Google Drive</a>
      </li>`,
      )
      .join("");
    const text = products
      .map(
        ({ product, quantity }) =>
          `${product.name} x${quantity}: ${product.driveUrl}`,
      )
      .join("\n");
    const result = await resend.emails.send({
      from,
      to: email,
      subject: "Ton achat Prime Digital est confirmé",
      text: `Bonjour ${customerName},\n\nMerci pour ton achat. Voici tes liens de téléchargement :\n\n${text}\n\nPrime Digital`,
      html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;color:#172033;line-height:1.6;">
        <h1 style="color:#2563eb;">Merci pour ton achat, ${escapeHtml(customerName)} !</h1>
        <p>Ton paiement a été confirmé. Tes produits sont disponibles via les liens sécurisés ci-dessous :</p>
        <ul>${productLinks}</ul>
        <p>Conserve cet e-mail pour retrouver tes téléchargements.</p>
        <p style="color:#64748b;">Prime Digital</p>
      </div>`,
    });

    if (result.error) {
      console.error("Resend error", result.error);
      return NextResponse.json(
        { error: "L’e-mail n’a pas pu être envoyé." },
        { status: 502 },
      );
    }
    return NextResponse.json({ success: true, id: result.data?.id });
  } catch (error) {
    console.error("Send email error", error);
    return NextResponse.json(
      { error: "L’e-mail n’a pas pu être envoyé." },
      { status: 500 },
    );
  }
}
