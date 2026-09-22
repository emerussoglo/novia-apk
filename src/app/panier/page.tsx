"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/components/CartProvider";

const formatPrice = (amount: number) =>
  `${amount.toLocaleString("fr-FR")} FCFA`;
const PENDING_PAYMENT_KEY = "prime-digital-pending-payment";

export default function CartPage() {
  const { items, total, updateQuantity, removeItem, clear, getItemProduct } =
    useCart();
  const [customer, setCustomer] = useState({ name: "", email: "" });
  const [message, setMessage] = useState("");
  const [isPaying, setIsPaying] = useState(false);
  const [purchasedFiles, setPurchasedFiles] = useState<string[]>([]);

  useEffect(() => {
    const pending = window.localStorage.getItem(PENDING_PAYMENT_KEY);
    if (!pending) return;
    let payment: { sessionId: string };
    try {
      payment = JSON.parse(pending) as { sessionId: string };
    } catch {
      window.localStorage.removeItem(PENDING_PAYMENT_KEY);
      return;
    }

    let cancelled = false;
    const checkPayment = async () => {
      const response = await fetch(
        `/api/payment/checkout/${payment.sessionId}`,
      );
      const result = await response.json();
      if (cancelled) return;
      if (result.status === "PENDING") {
        setMessage("Vérification de ton paiement en cours...");
      }
      if (result.verified === true) {
        const files = Array.from(
          new Set(
            (result.items as { productId: string }[]).flatMap(
              (item) => getItemProduct(item.productId)?.downloadFiles ?? [],
            ),
          ),
        );
        setPurchasedFiles(files);
        clear();
        window.localStorage.removeItem(PENDING_PAYMENT_KEY);
        setMessage("Paiement confirmé. Tes fichiers sont prêts.");
        return;
      }
      if (result.status === "FAILED" || result.status === "EXPIRED") {
        window.localStorage.removeItem(PENDING_PAYMENT_KEY);
        setMessage("Le paiement n’a pas abouti. Tu peux réessayer.");
        return;
      }
      window.setTimeout(checkPayment, 3000);
    };
    void checkPayment();
    return () => {
      cancelled = true;
    };
  }, [clear, getItemProduct]);

  async function handlePayment() {
    if (!customer.name || !customer.email || items.length === 0) {
      setMessage("Renseigne ton nom et ton adresse email avant de payer.");
      return;
    }
    setIsPaying(true);
    try {
      const response = await fetch("/api/payment/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          name: customer.name,
          email: customer.email,
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.checkoutUrl || !result.id) {
        throw new Error(result.error ?? "Impossible de lancer le paiement.");
      }
      window.localStorage.setItem(
        PENDING_PAYMENT_KEY,
        JSON.stringify({ sessionId: result.id }),
      );
      window.location.href = result.checkoutUrl;
    } catch (error) {
      setIsPaying(false);
      setMessage(
        error instanceof Error
          ? error.message
          : "Impossible de lancer le paiement.",
      );
    }
  }

  return (
    <main className="cart-page">
      <div className="cart-header">
        <span className="section-badge">PANIER</span>
        <h1>Finalise ta commande.</h1>
        <p>Paiement sécurisé en FCFA via SasPay.</p>
      </div>
      {items.length === 0 ? (
        <section className="cart-empty">
          <i
            className={`fa-solid ${purchasedFiles.length ? "fa-circle-check" : "fa-bag-shopping"}`}
          ></i>
          <h2>
            {purchasedFiles.length
              ? "Commande confirmée"
              : "Ton panier est vide"}
          </h2>
          <p>
            {purchasedFiles.length
              ? "Tes fichiers sont prêts à être téléchargés."
              : "Ajoute une offre pour commencer."}
          </p>
          {purchasedFiles.length ? (
            <div className="download-links">
              {purchasedFiles.map((file) => (
                <a key={file} href={file} download className="secondary-btn">
                  <i className="fa-solid fa-download"></i> Télécharger{" "}
                  {file.split("/").pop()}
                </a>
              ))}
            </div>
          ) : (
            <Link href="/produits" className="primary-btn">
              Voir les produits <i className="fa-solid fa-arrow-right"></i>
            </Link>
          )}
        </section>
      ) : (
        <div className="cart-layout">
          <section className="cart-items">
            <h2>Ta sélection</h2>
            {items.map((item) => {
              const product = getItemProduct(item.productId);
              if (!product) return null;
              return (
                <article className="cart-item" key={item.productId}>
                  <div className="cart-item-icon">
                    <i className="fa-solid fa-mobile-screen-button"></i>
                  </div>
                  <div className="cart-item-info">
                    <h3>{product.name}</h3>
                    <p>{formatPrice(product.price)} · Spotify Premium offert</p>
                  </div>
                  <div className="quantity-control">
                    <button
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity - 1)
                      }
                      aria-label="Diminuer"
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity + 1)
                      }
                      aria-label="Augmenter"
                    >
                      +
                    </button>
                  </div>
                  <strong>{formatPrice(product.price * item.quantity)}</strong>
                  <button
                    className="remove-item"
                    onClick={() => removeItem(item.productId)}
                    aria-label={`Retirer ${product.name}`}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </article>
              );
            })}
          </section>
          <aside className="cart-summary">
            <h2>Récapitulatif</h2>
            <div className="summary-total">
              <span>Total</span>
              <strong>{formatPrice(total)}</strong>
            </div>
            <label>
              Nom complet
              <input
                value={customer.name}
                onChange={(event) =>
                  setCustomer({ ...customer, name: event.target.value })
                }
                placeholder="Ton nom"
              />
            </label>
            <label>
              Email
              <input
                type="email"
                value={customer.email}
                onChange={(event) =>
                  setCustomer({ ...customer, email: event.target.value })
                }
                placeholder="ton@email.com"
              />
            </label>
            <button
              className="primary-btn block-btn"
              onClick={handlePayment}
              disabled={isPaying}
            >
              {isPaying
                ? "Ouverture du paiement..."
                : `Payer ${formatPrice(total)}`}{" "}
              <i className="fa-solid fa-lock"></i>
            </button>
            {message && (
              <p className="cart-message" role="status">
                {message}
              </p>
            )}
            <small>
              En validant, tu acceptes le traitement de ta commande et la
              livraison numérique après confirmation du paiement.
            </small>
          </aside>
        </div>
      )}
    </main>
  );
}
